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
  if (inputString.length === 1) {
    setStartTime(new Date());
  }

  if (inputString === levelString) {
    const latestEndTime = new Date();
    setEndTime(latestEndTime);
    const winTime = latestEndTime - startTime;
    const wordsPerString = levelString.length / 5;
    const winTimesPerMinuteRatio = 60000 / winTime;
    const wpm = Math.round(wordsPerString * winTimesPerMinuteRatio);
    setWpm(wpm);
  }
}

export function checkWin(
  inputString,
  levelString,
  setInputString,
  setTrainerState,
  inputRef
) {
  if (inputString === levelString) {
    setTrainerState("win");
    inputRef.current.blur();
    console.log("programmatic .blur() on win");
    setTimeout(() => {
      setInputString("");
      setTrainerState("ready");
      
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }, 3000);
    
  }
  
  for (let i = 0; i < inputString.length; i++) {
    // console.log("inputCharLoop:", inputString[i]);
    if (i > levelString.length || inputString[i] !== levelString[i]) {
      setTrainerState("fail");
      inputRef.current.blur();
      setTimeout(() => {
        setInputString("");
        setTrainerState("ready");
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
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

export function saveLastBackupDate(scores, setScores) {
  const modifiedScores = scores.map((level) => {
    if (level.id === 49) {
      return {
        ...level,
        lastBackup: new Date(),
      };
    } else {
      return { ...level };
    }
  });

  localStorage.setItem("scores", JSON.stringify(modifiedScores));
  setScores(modifiedScores);
}

export function downloadScoresJSON() {
  const scoresJSON = localStorage.getItem("scores");

  if (scoresJSON) {
    const blob = new Blob([scoresJSON], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "symbol-trainer-scores.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } else {
    console.error("No scores found in localStorage.");
  }
}

export function importBackup(event, setMessage) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.setItem("scores", JSON.stringify(data));
      setMessage("Import Successful.");
    } catch (error) {
      console.error("Invalid JSON file", error);
      setMessage("Import Error:", error);
    }
  };

  if (file) {
    reader.readAsText(file);
  }
}

export function calcBackupDifference(scores) {
  const now = new Date();
  const lastBackupDate = new Date(scores[48]?.lastBackup);
  const differenceInHours = Math.round((now - lastBackupDate) / (1000 * 60 * 60));
  return differenceInHours
}

export function getProgressString(levelString, inputString, setProgressString) {
  const inputLength = inputString.length;
  const progressString = levelString?.slice(0, inputLength);

  setProgressString(progressString);
}
