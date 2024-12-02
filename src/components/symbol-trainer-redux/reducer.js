import createSagaMiddleware from "redux-saga";
import { createReducer } from "react-use";
import levels from "../../data/levels.json";

// action creators
export const sectionChanged = (payload) => ({
  type: "sectionChanged",
  payload,
});
export const levelIdChanged = (payload) => ({
  type: "levelIdChanged",
  payload,
});
export const inputStringChanged = (payload) => ({
  type: "inputStringChanged",
  payload,
});
export const startTimeSet = (payload) => ({ type: "startTimeSet", payload });
export const endTimeSet = (payload) => ({ type: "endTimeSet", payload });

// reducer + saga mount
export const initialState = {
  section: "introSection",
  levelId: 2,
  inputString: "",
  trainerState: "",
  startTime: null,
  endTime: null,
};

export function symbolTrainerReducer(state, action) {
  switch (action.type) {
    case sectionChanged().type:
      return { ...state, section: action.payload };
    case levelIdChanged().type:
      return { ...state, levelId: action.payload };
    case inputStringChanged().type:
      return { ...state, inputString: action.payload };
    case startTimeSet().type:
      return { ...state, startTime: action.payload };
    case endTimeSet().type:
      return { ...state, endTime: action.payload };
    
    default:
      return state;
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

// selectors
export const selectSection = (state) => state.section;
export const selectLevelId = (state) => state.levelId;
export const selectLevelString = (state) => levels[selectLevelId(state)].string;
export const selectInputString = (state) => state.inputString;

export const selectIsWin = (state) =>
  selectLevelString(state) === selectInputString(state);
export const selectIsFail = (state) => {

  for (let i = 0; i < inputString.length; i++) {
    if (i >= selectLevelString(state).length || selectInputString(state)[i] !== selectLevelString(state)[i]) {
      return true; 
    }
  }
  return false;
};


export const selectHighScores = () => JSON.parse(localStorage.getItem("highScores"));
export const selectCurrentLevelHighScore = (state) =>
  selectHighScores(state)?.[selectLevelId(state)] || 0;

export const selectTrainerColorClasses = (state) => {
  if (!selectIsFail(state)) {
    const trainerColor =
      selectCurrentLevelHighScore(state) >= 60
        ? "neutral-200"
        : selectCurrentLevelHighScore(state) >= 50
        ? "emerald-la"
        : selectCurrentLevelHighScore(state) >= 40
        ? "yellow-la"
        : selectCurrentLevelHighScore(state) >= 30
        ? "violet-500"
        : selectCurrentLevelHighScore(state) >= 20
        ? "red-500 "
        : "neutral-200";
    if (selectIsWin(state)) {
      // win
      return "text-" + trainerColor;
    } else {
      // neither fail or win (inputString is reset to "", or user is typing without mistakes)
      return "text-" + trainerColor + " caret-" + trainerColor;
    }
  } else {
    // fail
    return "text-neutral-400";
  }
};

const selectStartTime = (state) => state.startTime;
const selectEndTime =(state) => state.endTime;
export const selectCurrentWpm = (state)=>{
  const winTime = selectEndTime(state) - selectStartTime(state);
  const wordsPerString = selectLevelString(state).length / 5;
  const winTimesPerMinuteRatio = 60000 / winTime;
  return Math.round(wordsPerString * winTimesPerMinuteRatio)
} 

// export const setScores = (payload) => ({ type: "setScores", payload });
// export const setLevelId = (payload) => ({ type: "setLevelId", payload });
// export const setInputString = (payload) => ({
//   type: "setInputString",
//   payload,
// });
// export const setLevelString = (payload) => ({
//   type: "setLevelString",
//   payload,
// });
// export const setTrainerState = (payload) => ({
//   type: "setTrainerState",
//   payload,
// });
// export const setStartTime = (payload) => ({ type: "setStartTime", payload });
// export const setEndTime = (payload) => ({ type: "setEndTime", payload });
// export const setWpm = (payload) => ({ type: "setWpm", payload });
// export const setTrainerColorClasses = (payload) => ({
//   type: "setTrainerColorClasses",
//   payload,
// });

// case setInputString().type:
//   return { ...state, inputString: action.payload };
// case setLevelString().type:
//   return { ...state, levelString: action.payload };
// case setTrainerState().type:
//   return { ...state, trainerState: action.payload };
// case setStartTime().type:
//   return { ...state, startTime: action.payload };
// case setEndTime().type:
//   return { ...state, endTime: action.payload };
// case setWpm().type:
//   return { ...state, wpm: action.payload };
// case setScores().type:
//   return { ...state, scores: action.payload };
// case setLevelId().type:
//   return { ...state, levelId: action.payload };
