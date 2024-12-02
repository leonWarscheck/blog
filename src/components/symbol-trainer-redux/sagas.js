import { all, select, put, delay, takeEvery } from "redux-saga/effects";
import {
  inputStringChanged,
  startTimeSet,
  endTimeSet,
  selectInputString,
  selectLevelId,
  selectCurrentWpm,
  selectIsWin,
  selectIsFail,
  selectCurrentLevelHighScore,
} from "./reducer";
{
  /**
-x watcher listens for inputStringChange and triggers handlersaga
  
- check inputString.length for moment of dispatching startTime action

  */
}

const getTime = () => new Date();

const syncLocalHighScores = (currentLevelHighScore, currentWpm, levelId) => {
  if (currentWpm > currentLevelHighScore) {
    const latestHighScores =
      JSON.parse(localStorage.getItem("highScores")) || {};
    latestHighScores[levelId] = currentWpm;

    localStorage.setItem("highScores", JSON.stringify(latestHighScores));
  }
};

function* handleInputStringChanged() {
  const inputString = yield select(selectInputString);

  if (inputString.length === 1) {
    yield put(startTimeSet(new Date()));
  } 
  
  if (yield select(selectIsWin)) {
    yield put(endTimeSet(getTime()));

    const currentWpm = yield select(selectCurrentWpm);
    const levelId = yield select(selectLevelId);
    const currentLevelHighScore = yield select(selectCurrentLevelHighScore);
    syncLocalHighScores(currentLevelHighScore, currentWpm, levelId);

    yield delay(3_000);
    yield put(inputStringChanged(""));
  }

  if (yield select(selectIsFail)) {
    yield delay(1_000);
    yield put(inputStringChanged(""));
  }
}

function* watchInputStringChanged() {
  yield takeEvery(inputStringChanged().type, handleInputStringChanged);
}

export function* rootSaga() {
  yield all([watchInputStringChanged()]);
}
