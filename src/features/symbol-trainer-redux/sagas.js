import {
  all,
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  backupDownloadClicked,
  levelAndBackupDateSyncedFromLocalStorage,
  levelChosenByShortcut,
  levelClicked,
  loadSymbolTrainer,
  selectBackupDate,
  selectCurrentLevelHighScore,
  selectCurrentWpm,
  selectInputString,
  selectIsFail,
  selectIsWin,
  selectLevelId,
  selectStartTime,
  typingEndedByWinning,
  typingStarted,
  userFailed,
  userTypedInTrainerInput,
  userWon,
} from './reducer';

// =====================
// trainerSection logic
// =====================
// helperfunctions:
const getTime = () => new Date();
const syncToLocalHighScores = (currentLevelHighScore, currentWpm, levelId) => {
  if (currentWpm > currentLevelHighScore) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || {};
    highScores[levelId] = currentWpm;

    localStorage.setItem('highScores', JSON.stringify(highScores));
  }
};
// hander & watcher sagas:
function* handleUserTypedInTrainerInput() {
  const inputString = yield select(selectInputString);
  const startTime = yield select(selectStartTime);

  if (inputString.length === 1 && startTime === null) {
    const now = yield call(getTime());
    yield put(typingStarted(now));
  }

  if (yield select(selectIsWin)) {
    const now = yield call(getTime());
    yield put(typingEndedByWinning(now));

    const currentWpm = yield select(selectCurrentWpm);
    const levelId = yield select(selectLevelId);
    const currentLevelHighScore = yield select(selectCurrentLevelHighScore);
    syncToLocalHighScores(currentLevelHighScore, currentWpm, levelId);

    yield delay(2000);
    yield put(userWon());
  }

  if (yield select(selectIsFail)) {
    yield delay(1000);
    yield put(userFailed());
  }
}

function* watchUserTypedInTrainerInput() {
  yield takeEvery(
    userTypedInTrainerInput().type,
    handleUserTypedInTrainerInput,
  );
}

// ========================================
// initial data sync FROM localStorage
// (on first mount of symbol-trainer page)
// ========================================
// handler & watcher sagas:
function* handleLoadSymbolTrainer() {
  const levelId = Number(localStorage.getItem('levelId'));
  const backupDate = localStorage.getItem('backupDate');
  yield put(levelAndBackupDateSyncedFromLocalStorage({ levelId, backupDate }));
}
function* watchLoadSymbolTrainer() {
  yield takeLatest(loadSymbolTrainer().type, handleLoadSymbolTrainer);
}

// ==========================================
// sync backupdate & levelId TO localStorage
// ==========================================
// helperfunctions:
const syncToLocalBackupDate = backupDate => {
  localStorage.setItem('backupDate', backupDate);
};
const syncToLocalLevelId = levelId => {
  localStorage.setItem('levelId', levelId);
};

// handler & watcher sagas:
function* handleSyncToLocalStorage(action) {
  if (action.type === backupDownloadClicked().type) {
    const backupDateFromReducer = yield select(selectBackupDate);
    syncToLocalBackupDate(backupDateFromReducer);
  }
  if (
    action.type === levelClicked().type ||
    action.type === levelChosenByShortcut().type
  ) {
    const levelIdFromReducer = yield select(selectLevelId);
    syncToLocalLevelId(levelIdFromReducer);
  }
}

function* watchSyncLocalStorage() {
  yield takeEvery(
    action =>
      action.type === backupDownloadClicked().type ||
      action.type === levelClicked().type ||
      action.type === levelChosenByShortcut().type,
    handleSyncToLocalStorage,
  );
}

// ==========
// root saga
// ==========
export function* rootSaga() {
  yield all([
    watchLoadSymbolTrainer(),
    watchUserTypedInTrainerInput(),
    watchSyncLocalStorage(),
  ]);
}
