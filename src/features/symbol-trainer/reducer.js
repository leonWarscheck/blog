import { createReducer } from 'react-use';
import createSagaMiddleware from 'redux-saga';

import levels from './levels.json';

/*
action creators
*/

/*
action creators: navigation related 
*/

// dispatched by user interaction
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

/*
action creators: trainer typing related
*/

// dispatched by user interaction
export const userTypedInTrainerInput = payload => ({
  type: 'userTypedInTrainerInput',
  payload,
});

// dispatched by handleUserTypedInTrainerInput saga
export const typingStarted = payload => ({ type: 'typingStarted', payload });

export const typingEndedByWinning = payload => ({
  type: 'typingEndedByWinning',
  payload,
});

export const newHighScoreAchieved = payload => ({
  type: 'newHighScoreAchieved',
  payload,
});

export const userWon = () => ({ type: 'userWon' });

export const userFailed = () => ({ type: 'userFailed' });

/*
action creators: loading and init related 
*/
// dispatched by useEffect on initial symbol-trainer page load
export const loadSymbolTrainer = () => ({ type: 'loadSymbolTrainer' });

// dispatched by saga
export const stateSyncedFromLocalStorage = ({
  levelId,
  backupDate,
  highScores,
} = {}) => ({
  type: 'stateSyncedFromLocalStorage',
  payload: { levelId, backupDate, highScores },
});

/*
action creators: backup related
*/

// dispatched by save-section user interaction
export const backupDownloadClicked = payload => ({
  type: ' backupDownloadClicked',
  payload,
});

export const importBackupClicked = payload => ({
  type: 'importBackupClicked',
  payload,
});

export const highScoresImported = payload => ({
  type: 'highScoresImported',
  payload,
});

// dispatched by saga
export const importStatusMessageRecieved = payload => ({
  type: 'importStatusMessageRecieved',
  payload,
});

/*
case handler helper functions
*/

const changeCurrentLevel = (state, levelId) => ({
  ...state,
  levelId: levelId,
});

const resetLevelOnWinOrFail = state => ({
  ...state,
  inputString: '',
  startTime: '',
  endTime: '',
});

const handleStateSyncFromLocalStorage = (
  state,
  { levelId, backupDate, highScores },
) => ({
  ...state,
  levelId: levelId || 1,
  backupDate: backupDate || '',
  highScores: highScores || {},
});

const changeHighScores = (state, highScores) => ({
  ...state,
  highScores: highScores,
});

/*
initialState + reducer + saga mount
*/

export const initialState = {
  section: 'introSection',
  levelId: 1,
  inputString: '',
  startTime: '',
  endTime: '',
  highScores: {},
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

    case stateSyncedFromLocalStorage().type: {
      return handleStateSyncFromLocalStorage(state, payload);
    }

    case userTypedInTrainerInput().type: {
      return { ...state, inputString: payload };
    }

    case newHighScoreAchieved().type: {
      return changeHighScores(state, payload);
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
      return { ...state, backupDate: payload };
    }

    case importStatusMessageRecieved().type: {
      return { ...state, importMessage: payload };
    }

    case highScoresImported().type: {
      return changeHighScores(state, payload);
    }

    default: {
      return state;
    }
  }
}

/**
 * Custom setup function to mount the reducer with an initial state and (saga)
 * middleware.
 *
 * @remarks
 * - `createReducer` uses `useReducer` under the hood.
 * - Mounted in `symbol-trainer-page`.
 *
 * @param saga - The root saga containing the sagas you want to chain with the
 * reducer.
 * @param reducer - The reducer you want to use.
 * @param initialState - The initial state for the reducer.
 * @returns An object with access to the state returned by the reducer and the
 * dispatch function that dispatches actions to the middleware and the reducer.
 */
export const useSagaReducer = (saga, reducer, initialState) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const middlewareReducer = createReducer(...middleware);
  const [state, dispatch] = middlewareReducer(reducer, initialState);
  sagaMiddleware.run(saga);

  return { state, dispatch };
};

/*
selectors
*/

/*
selectors: navigation and init related
*/

export const selectSection = state => state.section;

export const selectLevelId = state => state.levelId;

const selectLevel = state => levels[selectLevelId(state) - 1];

export const selectLevelString = state => selectLevel(state)?.string;

/*
selectors: trainer related
*/

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

export const selectStartTime = state => state.startTime;

const selectEndTime = state => state.endTime;

export const selectCurrentWpm = state => {
  const startTime = selectStartTime(state);
  const endTime = selectEndTime(state);
  
  // prevent Infinity
  if (!endTime || endTime <= startTime) {
    return '';
  }

  const winTime = endTime - startTime;
  const wordsPerString = selectLevelString(state).length / 5;
  const winTimesPerMinuteRatio = 60_000 / winTime;

  return Math.round(wordsPerString * winTimesPerMinuteRatio);
};

export const selectHighScores = state => state.highScores;

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

/*
selectors: backup related
*/

export const selectBackupDate = state => state.backupDate;

export const selectBackupDifference = (state, now) => {
  const differenceInHours = Math.round(
    (now - new Date(selectBackupDate(state))) / (1000 * 60 * 60),
  );
  return differenceInHours;
};

export const selectImportMessage = state => state.importMessage;
