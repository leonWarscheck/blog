// handleUserTypedInTrainerInput
export const getTime = () => new Date();

export const syncToLocalHighScores = (
  currentLevelHighScore,
  currentWpm,
  levelId,
) => {
  // Syncs only scores that are higher than the previous highscore.
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
    // Creates a Blob object to hold the JSON data.
    const blob = new Blob([scoresJSON], { type: 'application/json' });

    // Creates a temporary anchor element to assign the download URL of the
    // Blob to it.
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'symbol-trainer-highScores.json';

    // Adds the anchor to the DOM and triggers a click event to start the
    // download.
    document.body.append(link);
    link.click();

    // Removes the anchor element after the download starts and revokes the Blob
    // URL to free up memory.
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
  // This promise wraps file.text() and subsequent steps (parse, setItem),
  // because they depend on successful file reading by file.text(), which is
  // asynchronous. Errors can occur in any of the steps, so we have to handle them
  // within an outer promise.
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file provided.');
      return;
    }

    file
      .text()
      .then(text => {
        try {
          const data = JSON.parse(text);
          localStorage.setItem('highScores', JSON.stringify(data));
          resolve('Import Successful.');
        } catch (error) {
          console.error('Invalid JSON file', error);
          reject('Import Error: Invalid JSON file.');
        }
      })
      .catch(() => {
        reject('Error reading the file.');
      });
  });
}
