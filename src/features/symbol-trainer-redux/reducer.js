import { createReducer } from 'react-use';
import createSagaMiddleware from 'redux-saga';

import levels from './levels-redux.json';

// ================
// action creators
// ================
export const sectionClicked = payload => ({
  type: 'sectionClicked',
  payload,
});

export const levelClicked = payload => ({
  type: 'levelClicked',
  payload,
});

export const levelChosenByShortcut = payload => ({
  type: 'levelChosenByShortcut',
  payload,
});

const changeCurrentLevel = (state, levelId) => ({
  ...state,
  levelId: levelId,
});

export const levelAndBackupDateSyncedFromLocalStorage = ({
  levelId,
  backupDate,
} = {}) => ({
  type: 'levelAndBackupDateSyncedFromLocalStorage',
  payload: { levelId, backupDate },
});

const handleLevelAndBackupSync = (state, { levelId, backupDate }) => ({
  ...state,
  levelId: levelId || 1,
  backupDate: backupDate || '',
});

export const loadSymbolTrainer = () => ({ type: 'loadSymbolTrainer' });

export const userTypedInTrainerInput = payload => ({
  type: 'userTypedInTrainerInput',
  payload,
});

export const userWon = () => ({ type: 'userWon' });

export const userFailed = () => ({ type: 'userFailed' });

const resetLevelOnWinOrFail = state => ({
  ...state,
  inputString: '',
  startTime: '',
});

export const typingStarted = payload => ({ type: 'typingStarted', payload });

export const typingEndedByWinning = payload => ({
  type: 'typingEndedByWinning',
  payload,
});

export const backupDownloadClicked = payload => ({
  type: ' backupDownloadClicked',
  payload,
});

const changeBackupDate = (state, backupDate) => ({
  ...state,
  backupDate: backupDate,
});

export const importBackupClicked = payload => ({
  type: 'importBackupClicked',
  payload,
});

export const importStatusMessageRecieved = payload => ({
  type: 'importStatusMessageRecieved',
  payload,
});

// =====================
// reducer + saga mount
// =====================
export const initialState = {
  section: 'introSection',
  levelId: 1,
  inputString: '',
  startTime: '',
  endTime: '',
  backupDate: '',
  importMessage: '',
};

export function symbolTrainerReducer(
  state = initialState,
  { type, payload } = {},
) {
  switch (type) {
    case sectionClicked().type: {
      return { ...state, section: payload };
    }

    case levelClicked().type: {
      return changeCurrentLevel(state, payload);
    }

    case levelChosenByShortcut().type: {
      return changeCurrentLevel(state, payload);
    }

    case levelAndBackupDateSyncedFromLocalStorage().type: {
      return handleLevelAndBackupSync(state, payload);
    }

    case userTypedInTrainerInput().type: {
      return { ...state, inputString: payload };
    }

    case userWon().type: {
      return resetLevelOnWinOrFail(state);
    }

    case userFailed().type: {
      return resetLevelOnWinOrFail(state);
    }

    case typingStarted().type: {
      return { ...state, startTime: payload };
    }

    case typingEndedByWinning().type: {
      return { ...state, endTime: payload };
    }

    case backupDownloadClicked().type: {
      return changeBackupDate(state, payload);
    }

    case importStatusMessageRecieved().type: {
      return { ...state, importMessage: payload };
    }

    default: {
      return state;
    }
  }
}

export const useSagaReducer = (saga, reducer, initial) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const middlewareReducer = createReducer(...middleware);
  const [state, dispatch] = middlewareReducer(reducer, initial);
  sagaMiddleware.run(saga);

  return { state, dispatch };
};

// ==========
// selectors
// ==========
export const selectSection = state => state.section;

export const selectLevelId = state => state.levelId;

const selectLevel = state => levels[selectLevelId(state)];

export const selectLevelString = state => selectLevel(state)?.string;

export const selectInputString = state => state.inputString;

export const selectIsWin = state =>
  selectLevelString(state) === selectInputString(state);

export const selectIsFail = state => {
  for (const [index, character] of [...selectInputString(state)].entries()) {
    if (character !== selectLevelString(state)[index]) {
      return true;
    }
  }
  return false;
};

export const selectHighScores = () =>
  JSON.parse(localStorage.getItem('highScores'));

export const selectCurrentLevelHighScore = state =>
  selectHighScores(state)?.[selectLevelId(state)] || 0;

export const selectTrainerColorClasses = state => {
  const trainerColor =
    selectCurrentLevelHighScore(state) >= 60
      ? 'neutral-200'
      : selectCurrentLevelHighScore(state) >= 50
        ? 'emerald-la'
        : selectCurrentLevelHighScore(state) >= 40
          ? 'yellow-la'
          : selectCurrentLevelHighScore(state) >= 30
            ? 'violet-500'
            : selectCurrentLevelHighScore(state) >= 20
              ? 'red-500 '
              : 'neutral-200';

  return selectIsFail(state)
    ? 'text-neutral-400'
    : selectIsWin(state)
      ? 'text-' + trainerColor
      : 'text-' + trainerColor + ' caret-' + trainerColor;
};

export const selectStartTime = state => state.startTime;

const selectEndTime = state => state.endTime;

export const selectCurrentWpm = state => {
  const endTime = selectEndTime(state);
  const startTime = selectStartTime(state);

  // prevent Infinity
  if (!endTime || endTime <= startTime) {
    return '00';
  }

  const winTime = endTime - startTime;
  const wordsPerString = selectLevelString(state).length / 5;
  const winTimesPerMinuteRatio = 60_000 / winTime;

  return Math.round(wordsPerString * winTimesPerMinuteRatio);
};

export const selectBackupDate = state => state.backupDate;

export const selectBackupDifference = (state, now) => {
  const differenceInHours = Math.round(
    (now - new Date(selectBackupDate(state))) / (1000 * 60 * 60),
  );
  return differenceInHours;
};

export const selectImportMessage = state => state.importMessage;
