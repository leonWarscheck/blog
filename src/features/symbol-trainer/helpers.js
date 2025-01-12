/*
handleLoadSymbolTrainer
*/

export const syncLevelIdFromLocalStorage = () => {
  return Number(localStorage.getItem('levelId'));
};

export const syncBackupDateFromLocalStorage = () => {
  return localStorage.getItem('backupDate');
};

export const syncHighScoresFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('highScores'));
};

/*
handleUserTypedInTrainerInput saga
*/

export const getTime = () => new Date();

export const updateHighScoresIfNewHighScore = (
  levelId,
  currentWpm,
  currentLevelHighScore,
  highScores,
) => {
  if (currentWpm > currentLevelHighScore) {
    const updatedHighScores = { ...highScores };
    updatedHighScores[levelId] = currentWpm;
    return updatedHighScores;
  }
  return '';
};

export const syncHighScoresToLocalStorage = highScores => {
  localStorage.setItem('highScores', JSON.stringify(highScores));
};

/*
handleBackupDownload saga
*/

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

export const syncBackupDateToLocalStorage = backupDate => {
  localStorage.setItem('backupDate', backupDate);
};

/*
handleSyncLevelId saga
*/

export const syncLevelIdToLocalStorage = levelId => {
  localStorage.setItem('levelId', levelId);
};

/*
handleImportBackup saga
*/

export async function getHighScoresFromImportFile(file) {
  if (!file) {
    throw { importMessage: 'No file provided.' };
  }

  try {
    // .text() always returns a promise
    const text = await file.text();
    const data = JSON.parse(text);
    return {
      highScoresFromImportFile: data,
      importMessage: 'Import Successful.',
    };
  } catch (error) {
    console.error('Error parsing or reading the file', error);

    throw {
      importMessage:
        error instanceof SyntaxError
          ? 'Import Error: Invalid JSON file.'
          : 'Error reading the file.',
    };
  }
}
