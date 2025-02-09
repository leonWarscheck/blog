import { createReducer } from 'react-use';
import createSagaMiddleware from 'redux-saga';

import levels from './levels.json';
import { pipeline } from 'stream';

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

export const resetOnUserWon = () => ({ type: 'resetOnUserWon' });

export const resetOnUserFailed = () => ({ type: 'resetOnUserFailed' });

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
  ...(levelId && { levelId }),
  ...(backupDate && { backupDate }),
  ...(highScores && { highScores }),
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

    case resetOnUserWon().type: {
      return resetLevelOnWinOrFail(state);
    }

    case resetOnUserFailed().type: {
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

export const selectEndTime = state => state.endTime;

export const selectCurrentWpm = state => {
  const startTime = selectStartTime(state);
  const endTime = selectEndTime(state);

  // prevent Infinity
  if (!endTime) {
    return '';
  }

  const winTime = endTime - startTime;
  const wordsPerString = selectLevelString(state).length / 5;
  const winTimesPerMinute = 60_000 / winTime;

  return Math.round(wordsPerString * winTimesPerMinute);
};

export const selectHighScores = state => state.highScores;

export const selectCurrentLevelHighScore = state =>
  selectHighScores(state)?.[selectLevelId(state)] || 0;

export const selectScoreColor = state => {
  const score = selectCurrentLevelHighScore(state);
  if (score >= 60) return 'neutral-200';
  if (score >= 50) return 'emerald-la';
  if (score >= 40) return 'yellow-la';
  if (score >= 30) return 'violet-500';
  if (score >= 20) return 'red-500';
  return 'neutral-200';
};

export const selectTrainerStateColor = state => {
  const scoreColor = selectScoreColor(state);

  return selectIsFail(state)
    ? 'text-neutral-400'
    : selectIsWin(state)
      ? 'text-' + scoreColor
      : 'text-' + scoreColor + ' caret-' + scoreColor;
};


/*
selectors: backup related
*/

export const selectBackupDate = state => state.backupDate;

export const selectFormattedBackupDate = state => {
  const backupDate = selectBackupDate(state);
  if (!backupDate) return 'never';
  return new Date(backupDate).toISOString().slice(0, 10);
};


export const selectBackupDifference = (state, now) => {
  const backupDate = selectBackupDate(state);
  if (!backupDate) return 0;

  const differenceInHours = Math.round(
    (now - new Date(backupDate)) / (1000 * 60 * 60),
  );
  return differenceInHours;
};

export const selectImportMessage = state => state.importMessage;
