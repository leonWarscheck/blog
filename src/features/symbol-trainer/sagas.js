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
  getHighScoresFromImportFile,
  updateHighScoresIfNewHighScore,
  syncBackupDateToLocalStorage,
  syncHighScoresToLocalStorage,
  syncLevelIdToLocalStorage,
  syncFromLocalStorage,
  checkLevelChangeActions,
} from './helpers';

import {
  backupDownloadClicked,
  importBackupClicked,
  importStatusMessageRecieved,
  stateSyncedFromLocalStorage,
  levelChosenByShortcut,
  levelClicked,
  newHighScoreAchieved,
  loadSymbolTrainer,
  selectBackupDate,
  selectCurrentLevelHighScore,
  selectCurrentWpm,
  selectInputString,
  selectIsFail,
  selectIsWin,
  selectLevelId,
  selectStartTime,
  selectHighScores,
  typingEndedByWinning,
  typingStarted,
  userFailed,
  userTypedInTrainerInput,
  userWon,
  highScoresImported,
} from './reducer';

/*
trainerSection logic
*/

export function* handleUserTypedInTrainerInput() {
  if (yield select(selectIsFail)) {
    yield delay(1000);
    yield put(userFailed());
    return;
  }

  const inputString = yield select(selectInputString);
  const startTime = yield select(selectStartTime);

  if (inputString.length === 1 && startTime === '') {
    const now = yield call(getTime);
    yield put(typingStarted(now));
  }

  if (yield select(selectIsWin)) {
    const now = yield call(getTime);
    yield put(typingEndedByWinning(now));

    const levelId = yield select(selectLevelId);
    const currentWpm = yield select(selectCurrentWpm);
    const currentLevelHighScore = yield select(selectCurrentLevelHighScore);
    const highScores = yield select(selectHighScores);
    const updatedHighScores = yield call(
      updateHighScoresIfNewHighScore,
      levelId,
      currentWpm,
      currentLevelHighScore,
      highScores,
    );

    if (updatedHighScores) {
      yield put(newHighScoreAchieved(updatedHighScores));
      yield call(syncHighScoresToLocalStorage, updatedHighScores);
    }

    yield delay(2000);
    yield put(userWon());
  }
}

export function* watchUserTypedInTrainerInput() {
  yield takeEvery(
    userTypedInTrainerInput().type,
    handleUserTypedInTrainerInput,
  );
}

/*
initial data sync FROM localStorage
(on first mount of symbol-trainer page)
*/

export function* handleLoadSymbolTrainer() {
  const { levelId, backupDate, highScores } = yield call(syncFromLocalStorage);
  yield put(stateSyncedFromLocalStorage({ levelId, backupDate, highScores }));
}
export function* watchLoadSymbolTrainer() {
  yield takeLatest(loadSymbolTrainer().type, handleLoadSymbolTrainer);
}

/*
sync levelId TO local storage
*/

export function* handleSyncLevelId() {
  const levelIdFromReducer = yield select(selectLevelId);
  yield call(syncLevelIdToLocalStorage, levelIdFromReducer);
}

export function* watchSyncLevelId() {
  yield takeEvery(checkLevelChangeActions, handleSyncLevelId);
}

/*
download backup & sync backupdate TO localStorage
*/

export function* handleBackupDownload() {
  yield call(downloadHighScoresJSON);
  const backupDateFromReducer = yield select(selectBackupDate);
  yield call(syncBackupDateToLocalStorage, backupDateFromReducer);
}

export function* watchBackupDownload() {
  yield takeEvery(backupDownloadClicked().type, handleBackupDownload);
}

/*
importing backup file and setting import success/error message
*/

export function* handleImportBackup(action) {
  const file = action.payload;
  const { highScoresFromImportFile, importMessage } = yield call(
    getHighScoresFromImportFile,
    file,
  );

  yield put(importStatusMessageRecieved(importMessage));
  if (highScoresFromImportFile) {
    yield put(highScoresImported(highScoresFromImportFile));
    yield call(syncHighScoresToLocalStorage, highScoresFromImportFile);
  }

  yield delay(4000);
  yield put(importStatusMessageRecieved(''));
}

export function* watchImportBackup() {
  yield takeEvery(importBackupClicked().type, handleImportBackup);
}

/*
root saga
*/

export function* rootSaga() {
  yield all([
    watchLoadSymbolTrainer(),
    watchUserTypedInTrainerInput(),
    watchBackupDownload(),
    watchSyncLevelId(),
    watchImportBackup(),
  ]);
}
