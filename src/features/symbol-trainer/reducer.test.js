import { describe, expect, test } from 'vitest';
import {
  sectionClicked,
  selectSection,
  selectLevelId,
  levelChosenByShortcut,
  levelClicked,
  symbolTrainerReducer,
  selectLevelString,
  userTypedInTrainerInput,
  selectInputString,
  selectIsWin,
  selectIsFail,
  selectStartTime,
  typingStarted,
  selectCurrentWpm,
  typingEndedByWinning,
  selectHighScores,
  highScoresImported,
  newHighScoreAchieved,
  userFailed,
  userWon,
  selectCurrentLevelHighScore,
} from './reducer';

describe('symbolTrainerReducer', () => {
  describe('selectSection()', () => {
    test('given: the initial state, should: return the default section', () => {
      const state = symbolTrainerReducer();

      const actual = selectSection(state);
      const expected = 'introSection';

      expect(actual).toEqual(expected);
    });

    test('given: sectionClicked dispatched with a section, should: return the section from the payload', () => {
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

    test('given: levelClicked dispatched with a level, should: return the level from the payload', () => {
      const state = symbolTrainerReducer(undefined, levelClicked(2));

      const actual = selectLevelId(state);
      const expected = 2;

      expect(actual).toEqual(expected);
    });

    test('given: levelChosenByShortcut dispatched with a level, should: return the level from the payload', () => {
      const state = symbolTrainerReducer(undefined, levelChosenByShortcut(2));

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

    test('given: levelClicked dispatched with a level, should: return levelString of the level', () => {
      const state = symbolTrainerReducer(undefined, levelClicked(2));

      const actual = selectLevelString(state);
      const expected = '94864';

      expect(actual).toEqual(expected);
    });

    test('given: levelChosenByShortcut dispatched with a level, should: return levelString of the level', () => {
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

    test('given: userTypedInTrainerInput dispatched with a string, should: return the string', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('7'),
      );

      const actual = selectInputString(state);
      const expected = '7';

      expect(actual).toEqual(expected);
    });

    test('given: userWon dispatched, should: return ""', () => {
        const actions = [userTypedInTrainerInput("78637"), userWon()]
        const state = actions.reduce(symbolTrainerReducer, symbolTrainerReducer());
  
        const actual = selectInputString(state);
        const expected = '';
  
        expect(actual).toEqual(expected);
      });
  
      test('given: userFailed dispatched, should: return ""', () => {
        const actions = [userTypedInTrainerInput("8"), userFailed()]
        const state = actions.reduce(symbolTrainerReducer, symbolTrainerReducer())
  
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

    test('given: userTypedInTrainerInput dispatched with the correct string, should: return true ', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('78637'),
      );

      const actual = selectIsWin(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput dispatched with the wrong string, should: return false ', () => {
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

    test('given: userTypedInTrainerInput dispatched with the correct string, should: return false ', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('78637'),
      );

      const actual = selectIsFail(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput dispatched with part of the correct string, should: return false ', () => {
      const state = symbolTrainerReducer(
        undefined,
        userTypedInTrainerInput('7863'),
      );

      const actual = selectIsFail(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given: userTypedInTrainerInput dispatched with the wrong string, should: return true', () => {
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

    test('given: typingStarted dispatched with timestamp, should: return the timeStamp', () => {
      const state = symbolTrainerReducer(undefined, typingStarted('new Date'));

      const actual = selectStartTime(state);
      const expected = 'new Date';

      expect(actual).toEqual(expected);
    });

    test('given: userWon dispatched, should: return ""', () => {
      const state = symbolTrainerReducer(undefined, userWon());

      const actual = selectStartTime(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: userFailed dispatched, should: return ""', () => {
      const state = symbolTrainerReducer(undefined, userFailed());

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

    test('given: typingStarted and typingEnded dispatched with valid dates, should: return a number', () => {
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

    // we don't test "only typingEnded dispatched", because this cannot & should
    // not happen if saga is setup correctly
    test('given: typingStarted but NOT typingEnded dispatched, should: return ""', () => {
      const state = symbolTrainerReducer(
        undefined,
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
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

    test('given: highScoresImported() dispatched, should: return the payload highScores object', () => {
      const state = symbolTrainerReducer(
        undefined,
        highScoresImported({ 1: 1 }),
      );

      const actual = selectHighScores(state);
      const expected = { 1: 1 };

      expect(actual).toEqual(expected);
    });

    test('given: newHighScoreAchieved() dispatched, should: return the payload highScores object', () => {
      const state = symbolTrainerReducer(
        undefined,
        newHighScoreAchieved({ 1: 1 }),
      );

      const actual = selectHighScores(state);
      const expected = { 1: 1 };

      expect(actual).toEqual(expected);
    });
  });

  describe('selectCurrentLevelHighScore()', ()=>{
    test('given: initial state, should: return 0', ()=>{
        const state= symbolTrainerReducer();

        const actual = selectCurrentLevelHighScore(state);
        const expected = 0;

        expect(actual).toEqual(expected);
    })

    test('given: highScoresImported and levelClicked dispatched, should: return the corresponding score of level', ()=>{
        const actions = [highScoresImported({1:3, 2:4}), levelClicked(2)];
        const state = actions.reduce(symbolTrainerReducer, symbolTrainerReducer());

        const actual = selectCurrentLevelHighScore(state);
        const expected = 4;

        expect(actual).toEqual(expected);
    })

    test('given: only levelClicked dispatched, should: return 0', ()=>{
        const actions = [levelClicked(2)];
        const state = actions.reduce(symbolTrainerReducer, symbolTrainerReducer());

        const actual = selectCurrentLevelHighScore(state);
        const expected = 0;

        expect(actual).toEqual(expected);
    })
  })
});
