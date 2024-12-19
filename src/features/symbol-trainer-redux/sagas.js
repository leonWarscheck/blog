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
  downloadHighScoresJSON,
  getTime,
  importBackup,
  syncToLocalBackupDate,
  syncToLocalHighScores,
  syncToLocalLevelId,
} from './helpers-redux';
import {
  backupDownloadClicked,
  importBackupClicked,
  importStatusMessageRecieved,
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
function* handleUserTypedInTrainerInput() {
  const inputString = yield select(selectInputString);
  const startTime = yield select(selectStartTime);

  if (inputString.length === 1 && startTime === null) {
    const now = yield call(getTime);
    yield put(typingStarted(now));
  }

  if (yield select(selectIsWin)) {
    const now = yield call(getTime);
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
function* handleLoadSymbolTrainer() {
  const levelId = Number(localStorage.getItem('levelId'));
  const backupDate = localStorage.getItem('backupDate');
  yield put(levelAndBackupDateSyncedFromLocalStorage({ levelId, backupDate }));
}
function* watchLoadSymbolTrainer() {
  yield takeLatest(loadSymbolTrainer().type, handleLoadSymbolTrainer);
}

// ==============================
// sync levelId TO local storage
// ==============================
function* handleSyncLevelId() {
  const levelIdFromReducer = yield select(selectLevelId);
  yield call(syncToLocalLevelId, levelIdFromReducer);
}

function* watchSyncLevelId() {
  yield takeEvery(
    action =>
      action.type === levelClicked().type ||
      action.type === levelChosenByShortcut().type,
    handleSyncLevelId,
  );
}

// ==================================================
// download backup & sync backupdate TO localStorage
// ==================================================
function* handleBackupDownload() {
  yield call(downloadHighScoresJSON);
  const backupDateFromReducer = yield select(selectBackupDate);
  yield call(syncToLocalBackupDate, backupDateFromReducer);
}

function* watchBackupDownload() {
  yield takeEvery(backupDownloadClicked().type, handleBackupDownload);
}

// ===============================================================
// importing backup file and setting import success/error message
// ===============================================================
function* handleImportBackup(action) {
  const file = action.payload;
  const importMessage = yield call(importBackup, file);
  yield put(importStatusMessageRecieved(importMessage));
  yield delay(4000);
  yield put(importStatusMessageRecieved(''));
}

function* watchImportBackup() {
  yield takeEvery(importBackupClicked().type, handleImportBackup);
}

// ==========
// root saga
// ==========
export function* rootSaga() {
  yield all([
    watchLoadSymbolTrainer(),
    watchUserTypedInTrainerInput(),
    watchBackupDownload(),
    watchSyncLevelId(),
    watchImportBackup(),
  ]);
}
