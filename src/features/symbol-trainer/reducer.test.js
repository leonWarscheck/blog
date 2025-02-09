import { describe, expect, test } from 'vitest';

import {
  backupDownloadClicked,
  highScoresImported,
  importStatusMessageRecieved,
  levelChosenByShortcut,
  levelClicked,
  newHighScoreAchieved,
  resetOnUserFailed,
  resetOnUserWon,
  sectionClicked,
  selectBackupDate,
  selectBackupDifference,
  selectCurrentLevelHighScore,
  selectCurrentWpm,
  selectDefaultColor,
  selectFormattedBackupDate,
  selectHighScores,
  selectImportMessage,
  selectInputString,
  selectIsFail,
  selectIsWin,
  selectLevelId,
  selectLevelString,
  selectScoreColor,
  selectSection,
  selectStartTime,
  selectTrainerStateColor,
  selectWinColor,
  selectWinTime,
  selectWinTimesPerMinute,
  selectWordsPerString,
  stateSyncedFromLocalStorage,
  symbolTrainerReducer,
  typingEndedByWinning,
  typingStarted,
  userTypedInTrainerInput,
} from './reducer';

describe('symbolTrainerReducer', () => {
  describe('selectSection()', () => {
    test('given: the initial state, should: return the default section', () => {
      const state = symbolTrainerReducer();

      const actual = selectSection(state);
      const expected = 'introSection';

      expect(actual).toEqual(expected);
    });

    test('given: sectionClicked() with a section, should: return the section', () => {
      const state = symbolTrainerReducer(
        undefined,
        sectionClicked('trainerSection'),
      );

      const actual = selectSection(state);
      const expected = 'trainerSection';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectLevelId()', () => {
    test('given: the initial state, should: return the default level', () => {
      const state = symbolTrainerReducer();

      const actual = selectLevelId(state);
      const expected = 1;

      expect(actual).toEqual(expected);
    });

    test('given: levelClicked() with a level, should: return the level', () => {
      const state = symbolTrainerReducer(undefined, levelClicked(2));

      const actual = selectLevelId(state);
      const expected = 2;

      expect(actual).toEqual(expected);
    });

    test('given: levelChosenByShortcut() with a level, should: return the level', () => {
      const state = symbolTrainerReducer(undefined, levelChosenByShortcut(2));

      const actual = selectLevelId(state);
      const expected = 2;

      expect(actual).toEqual(expected);
    });

    test('given: stateSyncedFromLocalStorage() with a levelId, should: return the levelId', () => {
      const state = symbolTrainerReducer(
        undefined,
        stateSyncedFromLocalStorage({
          levelId: 2,
        }),
      );

      const actual = selectLevelId(state);
      const expected = 2;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectLevelString()', () => {
    test('given: initial state, should: return levelString of level 1', () => {
      const state = symbolTrainerReducer();

      const actual = selectLevelString(state);
      const expected = '78637';

      expect(actual).toEqual(expected);
    });

    test('given: levelClicked() with a level, should: return levelString of the level', () => {
      const state = symbolTrainerReducer(undefined, levelClicked(2));

      const actual = selectLevelString(state);
      const expected = '94864';

      expect(actual).toEqual(expected);
    });

    test('given: levelChosenByShortcut() with a level, should: return levelString of the level', () => {
      const state = symbolTrainerReducer(undefined, levelChosenByShortcut(2));

      const actual = selectLevelString(state);
      const expected = '94864';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectInputString()', () => {
    test('given: the initial state, should: return the default ""', () => {
      const state = symbolTrainerReducer();

      const actual = selectInputString(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput() with a string, should: return the string', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('7'),
      );

      const actual = selectInputString(state);
      const expected = '7';

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput() and resetOnUserWon(), should: return ""', () => {
      const actions = [userTypedInTrainerInput('78637'), resetOnUserWon()];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectInputString(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput() and resetOnUserFailed(), should: return ""', () => {
      const actions = [userTypedInTrainerInput('8'), resetOnUserFailed()];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectInputString(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectIsWin()', () => {
    test('given: the initial state, should: return false', () => {
      const state = symbolTrainerReducer();

      const actual = selectIsWin(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput() with the correct string, should: return true', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('78637'),
      );

      const actual = selectIsWin(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput() with the wrong string, should: return false', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('w'),
      );

      const actual = selectIsWin(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectIsFail()', () => {
    test('given: the initial state, should: return false', () => {
      const state = symbolTrainerReducer();

      const actual = selectIsFail(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput() with the correct string, should: return false', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('78637'),
      );

      const actual = selectIsFail(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput() with part of the correct string, should: return false', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('7863'),
      );

      const actual = selectIsFail(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput() with the wrong string, should: return true', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('w'),
      );

      const actual = selectIsFail(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectStartTime()', () => {
    test('given: the initial state, should: return the default ""', () => {
      const state = symbolTrainerReducer();

      const actual = selectStartTime(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: typingStarted() with timestamp, should: return the timeStamp', () => {
      const state = symbolTrainerReducer(undefined, typingStarted('new Date'));

      const actual = selectStartTime(state);
      const expected = 'new Date';

      expect(actual).toEqual(expected);
    });

    test('given: typingStarted(), userTypedInTrainerInput() and resetOnUserWon(), should: return ""', () => {
      const actions = [
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
        userTypedInTrainerInput('78637'),
        resetOnUserWon(),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectStartTime(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: typingStarted(), userTypedInTrainerInput() and resetOnUserFailed(), should: return ""', () => {
      const actions = [
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
        userTypedInTrainerInput('783'),
        resetOnUserFailed(),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectStartTime(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });
  });



  describe('selectCurrentWpm', () => {
    test('given: the initial state, should: return ""', () => {
      const state = symbolTrainerReducer();

      const actual = selectCurrentWpm(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: typingStarted() and typingEnded() with valid dates, should: return a wpm score', () => {
      const actions = [
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
        typingEndedByWinning(Date.parse('2025-01-11T18:26:09.529Z')),
      ];

      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectCurrentWpm(state);
      const expected = 29;

      expect(actual).toEqual(expected);
    });

    // we don't test "only typingEnded", because this cannot & should
    // not happen if saga is setup correctly
    test('given: typingStarted() but NOT typingEnded(), should: return ""', () => {
      const state = symbolTrainerReducer(
        undefined,
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
      );

      const actual = selectCurrentWpm(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: typingStarted(), userTypedInTrainerInput(), and resetOnUserWon(), should: return ""', () => {
      const actions = [
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
        userTypedInTrainerInput('78637'),
        resetOnUserWon(),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectCurrentWpm(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: typingStarted(), userTypedInTrainerInput(), and resetOnUserFailed(), should: return ""', () => {
      const actions = [
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
        userTypedInTrainerInput('783'),
        resetOnUserFailed(),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectCurrentWpm(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectHighScores()', () => {
    test('given: the initial state, should: return the default {}', () => {
      const state = symbolTrainerReducer();

      const actual = selectHighScores(state);
      const expected = {};

      expect(actual).toEqual(expected);
    });

    test('given: highScoresImported() with highScores object, should: return the highScores object', () => {
      const state = symbolTrainerReducer(
        undefined,
        highScoresImported({ 1: 1 }),
      );

      const actual = selectHighScores(state);
      const expected = { 1: 1 };

      expect(actual).toEqual(expected);
    });

    test('given: newHighScoreAchieved() with highScores object, should: return the highScores object', () => {
      const state = symbolTrainerReducer(
        undefined,
        newHighScoreAchieved({ 1: 1 }),
      );

      const actual = selectHighScores(state);
      const expected = { 1: 1 };

      expect(actual).toEqual(expected);
    });
  });

  describe('selectCurrentLevelHighScore()', () => {
    test('given: initial state, should: return 0', () => {
      const state = symbolTrainerReducer();

      const actual = selectCurrentLevelHighScore(state);
      const expected = 0;

      expect(actual).toEqual(expected);
    });

    test('given: only levelClicked(), should: return 0', () => {
      const actions = [levelClicked(2)];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectCurrentLevelHighScore(state);
      const expected = 0;

      expect(actual).toEqual(expected);
    });

    test('given: highScoresImported() and levelClicked(), should: return the corresponding score of level', () => {
      const actions = [highScoresImported({ 1: 3, 2: 4 }), levelClicked(2)];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectCurrentLevelHighScore(state);
      const expected = 4;

      expect(actual).toEqual(expected);
    });

    test('given: levelClicked() and newHighScoreAchieved(), should: return the new high score', () => {
      const actions = [levelClicked(2), newHighScoreAchieved({ 2: 10 })];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectCurrentLevelHighScore(state);
      const expected = 10;

      expect(actual).toEqual(expected);
    });

    test('given: highScoresImported() and levelChosenByShortcut(), should: return the corresponding score of level', () => {
      const actions = [
        highScoresImported({ 1: 3, 2: 4 }),
        levelChosenByShortcut(2),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectCurrentLevelHighScore(state);
      const expected = 4;

      expect(actual).toEqual(expected);
    });

    test('given: levelChosenByShortcut() and newHighScoreAchieved(), should: return the new high score', () => {
      const actions = [
        levelChosenByShortcut(2),
        newHighScoreAchieved({ 2: 10 }),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectCurrentLevelHighScore(state);
      const expected = 10;

      expect(actual).toEqual(expected);
    });

    test('given: stateSyncedFromLocalStorage() with highScores and levelId, should: return the corresponding score', () => {
      const state = symbolTrainerReducer(
        undefined,
        stateSyncedFromLocalStorage({
          levelId: 2,
          highScores: { 1: 3, 2: 4 },
        }),
      );

      const actual = selectCurrentLevelHighScore(state);
      const expected = 4;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectScoreColor()', () => {
    test('given: the initial state, should: return "neutral-200"', () => {
      const state = symbolTrainerReducer();

      const actual = selectScoreColor(state);
      const expected = 'neutral-200';

      expect(actual).toEqual(expected);
    });

    test('given: currentLevelHighScore of 42, should: return "yellow-la"', () => {
      const state = symbolTrainerReducer(
        undefined,
        newHighScoreAchieved({ 1: 42 }),
      );

      const actual = selectScoreColor(state);
      const expected = 'yellow-la';

      expect(actual).toEqual(expected);
    });

    test('given: currentLevelHighScore of 21, should: return "red-500"', () => {
      const state = symbolTrainerReducer(
        undefined,
        newHighScoreAchieved({ 1: 21 }),
      );

      const actual = selectScoreColor(state);
      const expected = 'red-500';

      expect(actual).toEqual(expected);
    });
  });



  describe('selectTrainerStateColor()', () => {
    test('given: the initial state, should: return "text-neutral-200 caret-neutral-200"', () => {
      const state = symbolTrainerReducer();

      const actual = selectTrainerStateColor(state);
      const expected = 'text-neutral-200 caret-neutral-200';

      expect(actual).toEqual(expected);
    });

    // on win
    test('given: userTypedInTrainerInput() with the correct string and newHighScoreAchieved(), should: return "text-emerald-la"', () => {
      const actions = [
        userTypedInTrainerInput('78637'),
        newHighScoreAchieved({ 1: 50 }),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectTrainerStateColor(state);
      const expected = 'text-emerald-la';

      expect(actual).toEqual(expected);
    });

    // while typing at some point after a new high score above 50 was achieved
    test('given: userTypedInTrainerInput() with part of the correct string after newHighScoreAchieved(), should: return "text-emerald-la caret-emerald-la"', () => {
      const actions = [
        newHighScoreAchieved({ 1: 50 }),
        userTypedInTrainerInput('7863'),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectTrainerStateColor(state);
      const expected = 'text-emerald-la caret-emerald-la';

      expect(actual).toEqual(expected);
    });

    // on fail through typing a wrong character
    test('given: userTypedInTrainerInput() with at least one wrong character, should: return "text-neutral-400"', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('786f'),
      );

      const actual = selectTrainerStateColor(state);
      const expected = 'text-neutral-400';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectBackupDate()', () => {
    test('given: the initial state, should: return undefined', () => {
      const state = symbolTrainerReducer();

      const actual = selectBackupDate(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: backupDownloadClicked() with a date, should: return the date', () => {
      const state = symbolTrainerReducer(
        undefined,
        backupDownloadClicked('2025-01-11T18:26:07.429Z'),
      );

      const actual = selectBackupDate(state);
      const expected = '2025-01-11T18:26:07.429Z';

      expect(actual).toEqual(expected);
    });

    test('given: stateSyncedFromLocalStorage() with a backupDate, should: return the date', () => {
      const state = symbolTrainerReducer(
        undefined,
        stateSyncedFromLocalStorage({
          backupDate: '2025-01-11T18:26:07.429Z',
        }),
      );

      const actual = selectBackupDate(state);
      const expected = '2025-01-11T18:26:07.429Z';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectFormattedBackupDate()', () => {
    test('given: the initial state, should: return "never"', () => {
      const state = symbolTrainerReducer();

      const actual = selectFormattedBackupDate(state);
      const expected = 'never';

      expect(actual).toEqual(expected);
    });

    test('given: backupDownloadClicked() with a date, should: return the formatted date', () => {
      const state = symbolTrainerReducer(
        undefined,
        backupDownloadClicked('2025-01-11T18:26:07.429Z'),
      );

      const actual = selectFormattedBackupDate(state);
      const expected = '2025-01-11';

      expect(actual).toEqual(expected);
    });

    test('given: stateSyncedFromLocalStorage() with a backupDate, should: return the formatted date', () => {
      const state = symbolTrainerReducer(
        undefined,
        stateSyncedFromLocalStorage({
          backupDate: '2025-01-11T18:26:07.429Z',
        }),
      );

      const actual = selectFormattedBackupDate(state);
      const expected = '2025-01-11';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectBackupDifference()', () => {
    test('given: the initial state, should: return 0', () => {
      const state = symbolTrainerReducer();

      const actual = selectBackupDifference(
        state,
        Date.parse('2025-01-11T18:26:07.429Z'),
      );
      const expected = 0;

      expect(actual).toEqual(expected);
    });

    test('given: backupDownloadClicked() with a date, should: return the difference in hours', () => {
      const state = symbolTrainerReducer(
        undefined,
        backupDownloadClicked('2025-01-11T17:26:07.429Z'),
      );

      const actual = selectBackupDifference(
        state,
        Date.parse('2025-01-11T18:26:07.429Z'),
      );
      const expected = 1;

      expect(actual).toEqual(expected);
    });

    test('given: stateSyncedFromLocalStorage() with difference of 1,51h, should: return 2h', () => {
      const state = symbolTrainerReducer(
        undefined,
        stateSyncedFromLocalStorage({
          backupDate: '2025-01-11T16:26:07.429Z',
        }),
      );

      const actual = selectBackupDifference(
        state,
        Date.parse('2025-01-11T17:56:07.429Z'),
      );
      const expected = 2;

      expect(actual).toEqual(expected);
    });

    test('given: stateSyncedFromLocalStorage() with difference of 1,49h, should: return 1h', () => {
      const state = symbolTrainerReducer(
        undefined,
        stateSyncedFromLocalStorage({
          backupDate: '2025-01-11T16:26:07.429Z',
        }),
      );

      const actual = selectBackupDifference(
        state,
        Date.parse('2025-01-11T17:55:07.429Z'),
      );
      const expected = 1;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectImportMessage()', () => {
    test('given: the initial state, should: return ""', () => {
      const state = symbolTrainerReducer();

      const actual = selectImportMessage(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });
  });

  test('given: importMessageRecieved() with a message, should: return the message', () => {
    const state = symbolTrainerReducer(
      undefined,
      importStatusMessageRecieved('Import Successful.'),
    );

    const actual = selectImportMessage(state);
    const expected = 'Import Successful.';

    expect(actual).toEqual(expected);
  });
});
