import {
  all,
  select,
  put,
  delay,
  takeEvery,
  take,
  takeLatest,
} from "redux-saga/effects";
import {
  userTypedInTrainerInput,
  levelClicked,
  typingStarted,
  typingEndedByWinning,
  selectInputString,
  selectLevelId,
  selectCurrentWpm,
  selectIsWin,
  selectIsFail,
  selectStartTime,
  selectCurrentLevelHighScore,
  loadSymbolTrainer,
  backupDownloadClicked,
  selectBackupDate,
  levelChosenByShortcut,
  levelSyncedFromLocalStorage,
  backupDateSyncedFromLocalStorage,
} from "./reducer";

// initial data sync FROM localStorage on first mount of symbol-trainer page
// handler & watcher saga
function* handleLoadSymbolTrainer() {
  const levelId = Number(localStorage.getItem("levelId"));
  const backupDate = localStorage.getItem("backupDate") || "";

  yield put(levelSyncedFromLocalStorage(levelId));
  yield put(backupDateSyncedFromLocalStorage(backupDate));
}
function* watchLoadSymbolTrainer() {
  yield takeLatest(loadSymbolTrainer().type, handleLoadSymbolTrainer);
}

//trainerSection logic
// helperfunctions:
const getTime = () => new Date();
const syncToLocalHighScores = (currentLevelHighScore, currentWpm, levelId) => {
  if (currentWpm > currentLevelHighScore) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || {};
    highScores[levelId] = currentWpm;

    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
};
// hander & watcher sagas:
function* handleUserTypedInTrainerInput() {
  const inputString = yield select(selectInputString);
  const startTime = yield select(selectStartTime);

  if (inputString.length === 1 && startTime === null) {
    yield put(typingStarted(getTime()));
  }

  if (yield select(selectIsWin)) {
    yield put(typingEndedByWinning(getTime()));

    const currentWpm = yield select(selectCurrentWpm);
    const levelId = yield select(selectLevelId);
    const currentLevelHighScore = yield select(selectCurrentLevelHighScore);
    syncToLocalHighScores(currentLevelHighScore, currentWpm, levelId);

    yield delay(2_000);
    yield put(userTypedInTrainerInput(""));
    yield put(typingStarted(null));
  }

  if (yield select(selectIsFail)) {
    yield delay(1_000);
    yield put(userTypedInTrainerInput(""));
    yield put(typingStarted(null));
  }
}

function* watchUserTypedInTrainerInput() {
  yield takeEvery(
    userTypedInTrainerInput().type,
    handleUserTypedInTrainerInput
  );
}

// sync backupdate & levelId TO localStorage
// helperfunctions:
const syncToLocalBackupDate = (backupDate) => {
  localStorage.setItem("backupDate", backupDate);
};
const syncToLocalLevelId = (levelId) => {
  localStorage.setItem("levelId", levelId);
};

// handler & watcher saga:
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
    (action) =>
      action.type === backupDownloadClicked().type ||
      action.type === levelClicked().type ||
      action.type === levelChosenByShortcut().type,
    handleSyncToLocalStorage
  );
}

export function* rootSaga() {
  yield all([
    watchLoadSymbolTrainer(),
    watchUserTypedInTrainerInput(),
    watchSyncLocalStorage(),
  ]);
}
