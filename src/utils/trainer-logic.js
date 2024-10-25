export function checkSpeed(
  inputString,
  levelString,
  trainerState,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
  setWpm
) {
  if (inputString.length < 2) {
    setStartTime(new Date() );
  }

  if (inputString === levelString) {
   const latestEndTime = new Date(); 
    setEndTime(latestEndTime);
    const winTime = latestEndTime - startTime;
    const wordsPerString = levelString.length / 5;
    const winTimesPerMinuteRatio =  60000/ winTime ;
    const wpm = Math.round(wordsPerString * winTimesPerMinuteRatio );
    console.log("wpm:", wpm);
    setWpm(wpm);
  }
    // return null;
}

export function checkWin(
  inputString,
  levelString,
  setInputString,
  setTrainerState,
  inputRef
) {
  if (inputString === levelString) {
    // setTrainerState("win");
    inputRef.current.blur();
    console.log();
    setTimeout(() => {
      setInputString("");
      setTrainerState("ready");
    }, 2222);
  }

  for (let i = 0; i < inputString.length; i++) {
    console.log("levelString[i]", inputString[i]);
    if (i > levelString.length || inputString[i] !== levelString[i]) {
      setTrainerState("fail");
      setTimeout(() => {
        setInputString("");
        setTrainerState("ready");
      }, 1000);
    }
  }
}

// export function saveScore(wpm, levelId, scores) {
//   const latestScore = scores[levelId - 1].wpm;
//   if (wpm > latestScore) {
//     scores[levelId - 1].wpm = wpm; // ! how do I best write into the file? setup browser store directly?
//   }
// }

export function saveLastLevel(levelId){

    
}

