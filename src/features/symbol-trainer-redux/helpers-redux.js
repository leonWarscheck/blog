// handleUserTypedInTrainerInput
export const getTime = () => new Date();

export const syncToLocalHighScores = (
  currentLevelHighScore,
  currentWpm,
  levelId,
) => {
  if (currentWpm > currentLevelHighScore) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || {};
    highScores[levelId] = currentWpm;

    localStorage.setItem('highScores', JSON.stringify(highScores));
  }
};

// handleBackupDownload
export function downloadHighScoresJSON() {
  const scoresJSON = localStorage.getItem('highScores');

  if (scoresJSON) {
    const blob = new Blob([scoresJSON], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'symbol-trainer-highScores.json';

    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  } else {
    console.error('No highScores found in localStorage.');
  }
}

export const syncToLocalBackupDate = backupDate => {
  localStorage.setItem('backupDate', backupDate);
};

// handleSyncLevelId
export const syncToLocalLevelId = levelId => {
  localStorage.setItem('levelId', levelId);
};

// handleImportBackup
export function importBackup(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file provided.');
      return;
    }

    const reader = new FileReader();

    reader.addEventListener('load', event => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem('highScores', JSON.stringify(data));
        resolve('Import Successful.');
      } catch (error) {
        console.error('Invalid JSON file', error);
        reject('Import Error: Invalid JSON file.');
      }
    });

    reader.onerror = () => {
      reject('Error reading the file.');
    };

    reader.readAsText(file);
  });
}
