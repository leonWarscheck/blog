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
  if (inputString.length === 1 ) {
    setStartTime(new Date());
    console.log("setting startTime")
  }

  if (inputString === levelString) {
    const latestEndTime = new Date();
    setEndTime(latestEndTime);
    const winTime = latestEndTime - startTime;
    const wordsPerString = levelString.length / 5;
    const winTimesPerMinuteRatio = 60000 / winTime;
    const wpm = Math.round(wordsPerString * winTimesPerMinuteRatio);
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

  for (let i = 0; i < inputString?.length; i++) {
    console.log("inputCharLoop:", inputString[i]);
    if (i > levelString.length || inputString[i] !== levelString[i]) {
      setTrainerState("fail");
      setTimeout(() => {
        setInputString("");
        setTrainerState("ready");
      }, 1000);
    }
  }
}

export function saveScore(wpm, levelId, scores, setScores) {
  const latestScore = scores[levelId - 1]?.wpm;
  if (wpm > latestScore) {
    const modifiedScores = scores.map((level) => {
      if (level.id === levelId) {
        return {
          ...level,
          wpm: wpm,
        };
      } else {
        return { ...level };
      }
    });

    localStorage.setItem("scores", JSON.stringify(modifiedScores));
    setScores(modifiedScores);
  }
}

export function saveLastLevel(levelId, scores, setScores) {
  const modifiedScores = scores.map((level) => {
    if (level.id === 49) {
      return {
        ...level,
        lastLevel: levelId,
      };
    } else {
      return { ...level };
    }
  });
  
  localStorage.setItem("scores", JSON.stringify(modifiedScores));
  setScores(modifiedScores);
}
