import { describe, expect, test } from 'vitest';

import {
  checkLevelChangeActions,
  getHighScoresFromImportFile,
  updateHighScoresIfNewHighScore,
} from './helpers';
import { levelChosenByShortcut, levelClicked } from './reducer';

describe('updateHighScoresIfNewHighScore()', () => {
  const levelId = 1;
  const currentLevelHighScore = 2;
  const highScores = { 1: 2 };

  test('given: currentWpm is higher than currentLevelHighScore, should: return highscores object including the new highscore', () => {
    const currentWpm = 3;

    const actual = updateHighScoresIfNewHighScore(
      levelId,
      currentWpm,
      currentLevelHighScore,
      highScores,
    );
    const expected = { 1: 3 };

    expect(actual).toEqual(expected);
  });

  test('given: currentWpm is lower than currentLevelHighScore, should: return empty string', () => {
    const currentWpm = 1;

    const actual = updateHighScoresIfNewHighScore(
      levelId,
      currentWpm,
      currentLevelHighScore,
      highScores,
    );
    const expected = '';

    expect(actual).toEqual(expected);
  });

  test('given: currentWpm is equal to currentLevelHighScore, should: return empty string', () => {
    const currentWpm = 2;

    const actual = updateHighScoresIfNewHighScore(
      levelId,
      currentWpm,
      currentLevelHighScore,
      highScores,
    );
    const expected = '';

    expect(actual).toEqual(expected);
  });
});

describe('checkLevelChangeActions()', () => {
  test('given: levelClicked() action, should: return true', () => {
    const action = levelClicked();

    const actual = checkLevelChangeActions(action);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  test('given: levelChosenByShortcut() action, should: return true', () => {
    const action = levelChosenByShortcut();

    const actual = checkLevelChangeActions(action);
    const expected = true;

    expect(actual).toEqual(expected);
  });
});

describe('getHighScoresFromImportFile()', () => {
  test('given: a valid file, should: return an object containing highScores and importMessage', async () => {
    const highScores = { 1: 2 };
    const fileContent = JSON.stringify(highScores);

    const file = new File([fileContent], 'highScores.json', {
      type: 'application/json',
    });

    const actual = await getHighScoresFromImportFile(file);
    const expected = {
      highScoresFromImportFile: highScores,
      importMessage: 'Import Successful.',
    };

    expect(actual).toEqual(expected);
  });

  test('given: an argument that is not a file, should: throw "No file provided" error', async () => {
    expect.assertions(1);

    try {
      await getHighScoresFromImportFile('');
    } catch (error) {
      const actual = error;
      const expected = { importMessage: 'No file provided.' };
      expect(actual).toEqual(expected);
    }
  });

  test('given: an invalid JSON file, should: throw Import Error', async () => {
    const invalidJson = '{ invalid json ';
    const file = new File([invalidJson], 'invalid.json', {
      type: 'application/json',
    });

    // Ensures the catch block has to be reached, so the try block has to
    // produce an error.
    expect.assertions(1);

    try {
      await getHighScoresFromImportFile(file);
    } catch (error) {
      const actual = error;
      const expected = { importMessage: 'Import Error: Invalid JSON file.' };
      expect(actual).toEqual(expected);
    }
  });

  test('given: corrupted JSON file, should: throw Reading Error', async () => {
    const brokenFile = {
      text: () => {
        throw new Error('Simulated read error');
      },
    };

    // Ensures the catch block has to be reached, so the try block has to
    // produce an error.
    expect.assertions(1);

    try {
      await getHighScoresFromImportFile(brokenFile);
    } catch (error) {
      const actual = error;
      const expected = { importMessage: 'Error reading the file.' };
      expect(actual).toEqual(expected);
    }
  });
});
