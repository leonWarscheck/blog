export function checkUserTyping(
  levelString,
  inputString,
  setInputString,
  startTime,
  setStartTime,
  setWpm,
  setTrainerState,
) {
  // on start of user typing
  if (inputString.length === 1 && startTime === null) {
    setStartTime(new Date());
  }

  // on win
  if (inputString === levelString) {
    // flag for conditional rendering of ui elements
    setTrainerState('win');

    // calculate and set wpm
    const endTime = new Date();
    const winTime = endTime - startTime;
    const wordsPerString = levelString.length / 5;
    const winTimesPerMinuteRatio = 60000 / winTime;
    const wpm = Math.round(wordsPerString * winTimesPerMinuteRatio);
    setWpm(wpm);

    // reset trainer
    setTimeout(() => {
      setInputString('');
      setTrainerState('');
      setStartTime(null);
    }, 2000);
  }

  // on fail
  for (let i = 0; i < inputString.length; i++) {
    if (i > levelString.length || inputString[i] !== levelString[i]) {
      // flag for conditional rendering of ui elements
      setTrainerState('fail');

      // reset trainer
      setTimeout(() => {
        setInputString('');
        setTrainerState('');
        setStartTime(null);
      }, 1000);
    }
  }
}

export const saveScore = (wpm, levelId, scores, setScores) => {
  const currentLevelHighScore = scores?.[levelId] ?? 0;
  if (wpm > currentLevelHighScore) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || {};
    highScores[levelId] = wpm;

    localStorage.setItem('highScores', JSON.stringify(highScores));
    setScores(highScores);
  }
};

export function saveLastLevel(levelId) {
  localStorage.setItem('levelId', levelId);
}

export function syncLastBackupDateToLocalStorage(now) {
  localStorage.setItem('backupDate', now);
}

export function downloadScoresJSON(setBackupDate, setMessage) {
  const scoresJSON = localStorage.getItem('highScores');

  if (scoresJSON) {
    const blob = new Blob([scoresJSON], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'symbol-trainer-scores.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } else {
    console.error('No scores found in localStorage.');
    setBackupDate('');
    setMessage('No scores found in localStorage.');
    syncLastBackupDateToLocalStorage('');
  }
}

export function importBackup(event, setMessage) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      localStorage.setItem('highScores', JSON.stringify(data));
      setMessage('Import Successful.');
    } catch (error) {
      console.error('Invalid JSON file', error);
      setMessage('Import Error:', error);
    }
  };

  if (file) {
    reader.readAsText(file);
  }
}

export function calcBackupDifference(backupDate, now) {
  const differenceInHours = Math.round(
    (now - new Date(backupDate)) / (1000 * 60 * 60),
  );
  return differenceInHours;
}
