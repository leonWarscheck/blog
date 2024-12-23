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
  if (inputString.length === 1 && startTime === '') {
    setStartTime(new Date());
  }

  // on win
  if (inputString === levelString && levelString != '') {
    // flag for conditional rendering of ui elements
    setTrainerState('win');

    // calculate and set wpm
    const endTime = new Date();
    const winTime = endTime - startTime;
    const wordsPerString = levelString.length / 5;
    const winTimesPerMinuteRatio = 60_000 / winTime;
    const wpm = Math.round(wordsPerString * winTimesPerMinuteRatio);
    setWpm(wpm);

    // reset trainer
    setTimeout(() => {
      setInputString('');
      setTrainerState('');
      setStartTime('');
    }, 2000);
  }

  // on fail
  for (const [index, character] of [...inputString].entries()) {
    if (character !== levelString[index]) {
      // flag for conditional rendering of UI elements
      setTrainerState('fail');

      // reset trainer
      setTimeout(() => {
        setInputString('');
        setTrainerState('');
        setStartTime('');
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

    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  } else {
    console.error('No scores found in localStorage.');
    setBackupDate('');
    setMessage('No scores found in localStorage.');
    syncLastBackupDateToLocalStorage('');
  }
}

export function importBackup(importEvent, setMessage) {
  const file = importEvent.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', event => {
    try {
      const data = JSON.parse(event.target.result);
      localStorage.setItem('highScores', JSON.stringify(data));
      setMessage('Import Successful.');
    } catch (error) {
      console.error('Invalid JSON file', error);
      setMessage('Import Error:', error);
    }
  });

  if (file) {
    // eslint-disable-next-line unicorn/prefer-blob-reading-methods
    reader.readAsText(file);
  }
}

export function calcBackupDifference(backupDate, now) {
  const differenceInHours = Math.round(
    (now - new Date(backupDate)) / (1000 * 60 * 60),
  );
  return differenceInHours;
}
