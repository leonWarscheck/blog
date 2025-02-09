// !
/*

This file is a demonstration of functional composition with
`ramda`-functions. They are an interesting showcase for JavaScripts functional
programming capabilities. 

The biggest benefit of `ramda`-functions is a more declarative way to write and
read code, which can save mental capacity and reduce surface area for bugs. 

Using it can have a steep learning curve, and even then, sometimes
imperative code can have better readability. But it is still worth exploring!


> SIDENOTE: Luckily most of the functional programming principles applied in `reducer.js`
and the rest of the project, can be used without `ramda`-functions!

Just as a short summary, they are:
- pure, composable functions
- immutability, minimizing amount of mutations
- isolating sideeffect
- high modularity, low coupling
- testing (almost) without mocking
- instant, accurate bugreports through highly decoupled test units
- small changes in requirement only need small changes in implementation
- ability to practice testdriven development (writing tests before implementation)

*/
// !

import {
  __,
  always,
  concat,
  cond,
  converge,
  divide,
  equals,
  gte,
  identity,
  ifElse,
  isEmpty,
  length,
  nth,
  pipe,
  prop,
  propOr,
  subtract,
  T,
  useWith,
} from 'ramda';

import levels from './levels.json';

/*
selectors
*/

/*
selectors: navigation and init related
*/

// export const selectSection = state => state.section;
export const selectSection = prop('section');

// export const selectLevelId = state => state.levelId;
export const selectLevelId = prop('levelId');

// const selectLevel = state => levels[selectLevelId(state) - 1];
const selectLevel = pipe(selectLevelId, subtract(__, 1), nth(__, levels));

// export const selectLevelString = state => selectLevel(state)?.string;
export const selectLevelString = pipe(selectLevel, propOr('', 'string'));

/*
selectors: trainer related
*/

// export const selectInputString = state => state.inputString;
export const selectInputString = prop('inputString');

// export const selectIsWin = state =>
//   selectLevelString(state) === selectInputString(state);
export const selectIsWin = converge(equals, [
  selectLevelString,
  selectInputString,
]);

// export const selectIsFail = state => {
//   for (const [index, character] of [...selectInputString(state)].entries()) {
//     if (character !== selectLevelString(state)[index]) {
//       return true;
//     }
//   }
//   return false;
// };
export const selectIsFail = converge(
  ifElse(isEmpty, always(false), (inputString, levelString) => {
    for (const [index, character] of [...inputString].entries()) {
      if (character !== levelString[index]) {
        return true;
      }
    }
    return false;
  }),
  [selectInputString, selectLevelString],
);

// export const selectStartTime = state => state.startTime;
export const selectStartTime = prop('startTime');

// const selectEndTime = state => state.endTime;
export const selectEndTime = prop('endTime');

// export const selectCurrentWpm = state => {
//   const startTime = selectStartTime(state);
//   const endTime = selectEndTime(state);
//
//   // prevent Infinity
//   if (!endTime) {
//     return '';
//   }
//
//   const winTime = endTime - startTime;
//   const wordsPerString = selectLevelString(state).length / 5;
//   const winTimesPerMinute = 60_000 / winTime;
//
//   return Math.round(wordsPerString * winTimesPerMinute);
// };
export const selectWinTime = converge(
  ifElse(isEmpty, always(''), subtract(__, __)),
  [selectEndTime, selectStartTime],
);

export const selectWordsPerString = pipe(
  selectLevelString,
  length,
  divide(__, 5),
);

export const selectWinTimesPerMinute = pipe(
  selectWinTime,
  ifElse(isEmpty, always(''), divide(60_000, __)),
);

export const selectCurrentWpm = converge(
  (wordsPerString, winTimesPerMinute) =>
    Math.round(wordsPerString * winTimesPerMinute) || '',
  [selectWordsPerString, selectWinTimesPerMinute],
);

// export const selectHighScores = state => state.highScores;
export const selectHighScores = prop('highScores');

// export const selectCurrentLevelHighScore = state =>
//   selectHighScores(state)?.[selectLevelId(state)] || 0;
export const selectCurrentLevelHighScore = converge(propOr(0), [
  selectLevelId,
  selectHighScores,
]);

// export const selectScoreColor = state => {
//   const score = selectCurrentLevelHighScore(state);
//   return score >= 60
//     ? 'neutral-200'
//     : score >= 50
//       ? 'emerald-la'
//       : score >= 40
//         ? 'yellow-la'
//         : score >= 30
//           ? 'violet-500'
//           : score >= 20
//             ? 'red-500'
//             : 'neutral-200';
// };
export const selectScoreColor = pipe(
  selectCurrentLevelHighScore,
  cond([
    [gte(__, 60), always('yellow-la')],
    [gte(__, 50), always('emerald-la')],
    [gte(__, 40), always('yellow-la')],
    [gte(__, 30), always('violet-500')],
    [gte(__, 20), always('red-500')],
    [T, always('neutral-200')],
  ]),
);

// export const selectTrainerStateColor = state => {
//   const scoreColor = selectScoreColor(state);
//
//   return selectIsFail(state)
//     ? 'text-neutral-400'
//     : selectIsWin(state)
//       ? 'text-' + scoreColor
//       : 'text-' + scoreColor + ' caret-' + scoreColor;
// };
export const selectWinColor = pipe(selectScoreColor, concat('text-'));

export const selectDefaultColor = pipe(
  selectScoreColor,
  color => `text-${color} caret-${color}`,
);

export const selectTrainerStateColor = cond([
  [selectIsFail, always('text-neutral-400')],
  [selectIsWin, selectWinColor],
  [T, selectDefaultColor],
]);

/*
selectors: backup related
*/

// export const selectBackupDate = state => state.backupDate;
export const selectBackupDate = prop('backupDate');

// export const selectFormattedBackupDate = state => {
//   const backupDate = selectBackupDate(state);
//   if (!backupDate) return 'never';
//   return new Date(backupDate).toISOString().slice(0, 10);
// };
export const selectFormattedBackupDate = pipe(
  selectBackupDate,
  ifElse(isEmpty, always('never'), date =>
    new Date(date).toISOString().slice(0, 10),
  ),
);

// export const selectBackupDifference = (state, now) => {
//   const backupDate = selectBackupDate(state);
//   if (!backupDate) return 0;
//
//   const differenceInHours = Math.round(
//     (now - new Date(backupDate)) / (1000 * 60 * 60),
//   );
//   return differenceInHours;
// };
// eslint-disable-next-line
export const selectBackupDifference = useWith(
  ifElse(isEmpty, always(0), (backupDate, now) =>
    Math.round((now - new Date(backupDate)) / (1000 * 60 * 60)),
  ),
  [selectBackupDate, identity],
);

// export const selectImportMessage = state => state.importMessage;
export const selectImportMessage = prop('importMessage');

/*
Here is an archive of the additional tests needed, when using the `ramda`-function
compositions.

  describe('selectWinTime()', () => { test('given: the initial state, should:
    return ""', () => { const state = symbolTrainerReducer();

      const actual = selectWinTime(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: typingStarted() and typingEnded() with valid dates, should: return the winTime', () => {
      const actions = [
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
        typingEndedByWinning(Date.parse('2025-01-11T18:26:09.529Z')),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectWinTime(state);
      const expected = 2100;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectWordsPerString()', () => { test('given: the initial state,
    should: return 1', () => { const state = symbolTrainerReducer();

      const actual = selectWordsPerString(state);
      const expected = 1;

      expect(actual).toEqual(expected);
    });

    test('given: levelClicked() with a level, should: return ', () => {
      const state = symbolTrainerReducer(undefined, levelClicked(100));

      const actual = selectWordsPerString(state);
      const expected = 3;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectWinTimesPerMinute()', () => { test('given: the initial state,
    should: return ""', () => { const state = symbolTrainerReducer();

      const actual = selectWinTimesPerMinute(state);
      const expected = '';

      expect(actual).toEqual(expected);
    });

    test('given: typingStarted() and typingEnded() with valid dates, should: return the winTimesPerMinute', () => {
      const actions = [
        typingStarted(Date.parse('2025-01-11T18:26:07.429Z')),
        typingEndedByWinning(Date.parse('2025-01-11T18:26:09.529Z')),
      ];
      const state = actions.reduce(
        symbolTrainerReducer,
        symbolTrainerReducer(),
      );

      const actual = selectWinTimesPerMinute(state);
      const expected = 28.571_428_571_428_573;

      expect(actual).toEqual(expected);
    });
  });

    describe('selectWinColor()', () => {
    test('given: the initial state, should: return "text-neutral-200"', () => {
      const state = symbolTrainerReducer();

      const actual = selectWinColor(state);
      const expected = 'text-neutral-200';

      expect(actual).toEqual(expected);
    });

    test('given: currentLevelHighScore of 42, should: return "text-yellow-la"', () => {
      const state = symbolTrainerReducer(
        undefined,
        newHighScoreAchieved({ 1: 42 }),
      );

      const actual = selectWinColor(state);
      const expected = 'text-yellow-la';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectDefaultColor()', () => {
    test('given: the initial state, should: return "text-neutral-200 caret-neutral-200"', () => {
      const state = symbolTrainerReducer();

      const actual = selectDefaultColor(state);
      const expected = 'text-neutral-200 caret-neutral-200';

      expect(actual).toEqual(expected);
    });

    test('given: currentLevelHighScore of 21, should: return "text-red-500 caret-red-500"', () => {
      const state = symbolTrainerReducer(
        undefined,
        newHighScoreAchieved({ 1: 21 }),
      );

      const actual = selectDefaultColor(state);
      const expected = 'text-red-500 caret-red-500';

      expect(actual).toEqual(expected);
    });
  });
*/
