import { createReducer } from 'react-use';
import createSagaMiddleware from 'redux-saga';

import levels from './levels-redux.json';

// ================
// action creators
// ================

// Action creators create action objects that can be dispatched from anywhere in
// the app. On dispatch an action can trigger switch cases in the reducer (which
// acts as a store) or effects in sagas. For pure operations they target the
// reducer and for operations with side-effects they target sagas, which are
// middleware of the reducer.
//
// The naming of action creators is descriptive of the user interaction that
// triggers them to be dispatched. If an action creator is not named like a user
// interaction it might be an action that only gets dispatched from a saga.
//
// In between you can find helper function that are mounted in the reducer to
// either handle multiple actions that require the same handler behaviour, or to
// keep the switch cases clean from complex logic.

// ===== navigation related =====
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

const changeCurrentLevel = (state, levelId) => ({
  ...state,
  levelId: levelId,
});

// ===== trainer typing related =====

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

export const userWon = () => ({ type: 'userWon' });

export const userFailed = () => ({ type: 'userFailed' });

// handles reset by multiple actions
const resetLevelOnWinOrFail = state => ({
  ...state,
  inputString: '',
  startTime: '',
  endTime: '',
});

// ===== loading and init related =====

// dispatched by useEffect on initial symbol-trainer page load
export const loadSymbolTrainer = () => ({ type: 'loadSymbolTrainer' });

// dispatched by saga
export const levelAndBackupDateSyncedFromLocalStorage = ({
  levelId,
  backupDate,
} = {}) => ({
  type: 'levelAndBackupDateSyncedFromLocalStorage',
  payload: { levelId, backupDate },
});
// helper function to keep reducer clean
const handleLevelAndBackupSync = (state, { levelId, backupDate }) => ({
  ...state,
  levelId: levelId || 1,
  backupDate: backupDate || '',
});

// ===== backup related =====

// dispatched by save-section user interaction
export const backupDownloadClicked = payload => ({
  type: ' backupDownloadClicked',
  payload,
});

export const importBackupClicked = payload => ({
  type: 'importBackupClicked',
  payload,
});

// dispatched by saga
export const importStatusMessageRecieved = payload => ({
  type: 'importStatusMessageRecieved',
  payload,
});

// =====================
// reducer + saga mount
// =====================

// `initialState` sets default values of your store and defines its data shape.
export const initialState = {
  section: 'trainerSection',
  levelId: 1,
  inputString: '',
  startTime: '',
  endTime: '',
  backupDate: '',
  importMessage: '',
};

// Thw action handlers in the switch cases return new store objects created from the
// previous store state and new values, usually coming from the payload.
//
// `type` and `payload` get destructured so we can avoid repeatedly writing out
// `action.payload`. To enable destructuring even if only one of the keys is
// available, we set an empty object as the default for the action object. This
// way JS won't throw an error when a key or the whole action object is missing.
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
      return { ...state, backupDate: payload };
    }

    case importStatusMessageRecieved().type: {
      return { ...state, importMessage: payload };
    }

    default: {
      return state;
    }
  }
}

// Mounts the reducer including saga middleware.
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

// Selectors are pure functions that access values from the store and
// localStorage.
//
// They always only handle one step of property access at a time, building on
// top of each others access logic by composing them together. This way, if the
// data shape changes, you only have to modify the selector corresponding to the
// changed part and not the whole access chain.
//
// Selectors can also calculate secondary values from the values returned by other
// selectors. This way we can directly access the final values we want to inject
// into components.

// ===== navigation and init related =====

// primary value selectors
export const selectSection = state => state.section;

export const selectLevelId = state => state.levelId;

// secondary value selectors
const selectLevel = state => levels[selectLevelId(state)-1];

export const selectLevelString = state => selectLevel(state)?.string;

// ===== trainer related =====

// primary
export const selectInputString = state => state.inputString;

// secondary
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

// primary
export const selectStartTime = state => state.startTime;

const selectEndTime = state => state.endTime;

// secondary
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

// primary 
// This is not pure, but behaves consistent enough. With a full Redux
// setup, you would auto sync localStore to redux store via `redux-persist` so
// there would be no need to sync manually like this. 
const selectSerializedHighscores = () => localStorage.getItem('highScores');

// secondary
export const selectHighScores = () => JSON.parse(selectSerializedHighscores());

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

// ===== backup related =====

// primary
export const selectBackupDate = state => state.backupDate;

// secondary
export const selectBackupDifference = (state, now) => {
  const differenceInHours = Math.round(
    (now - new Date(selectBackupDate(state))) / (1000 * 60 * 60),
  );
  return differenceInHours;
};

// primary
export const selectImportMessage = state => state.importMessage;
