import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  all,
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { describe, expect, it, test } from 'vitest';

import {
  checkLevelChangeActions,
  downloadHighScoresJSON,
  getHighScoresFromImportFile,
  getTime,
  syncBackupDateToLocalStorage,
  syncFromLocalStorage,
  syncHighScoresToLocalStorage,
  syncLevelIdToLocalStorage,
  updateHighScoresIfNewHighScore,
} from './helpers';
import {
  backupDownloadClicked,
  highScoresImported,
  importBackupClicked,
  importStatusMessageRecieved,
  loadSymbolTrainer,
  newHighScoreAchieved,
  resetOnUserFailed,
  resetOnUserWon,
  selectBackupDate,
  selectCurrentLevelHighScore,
  selectCurrentWpm,
  selectHighScores,
  selectInputString,
  selectIsFail,
  selectIsWin,
  selectLevelId,
  selectStartTime,
  stateSyncedFromLocalStorage,
  typingEndedByWinning,
  typingStarted,
  userTypedInTrainerInput,
} from './reducer';
import {
  handleBackupDownload,
  handleImportBackup,
  handleLoadSymbolTrainer,
  handleSyncLevelId,
  handleUserTypedInTrainerInput,
  rootSaga,
  watchBackupDownload,
  watchImportBackup,
  watchLoadSymbolTrainer,
  watchSyncLevelId,
  watchUserTypedInTrainerInput,
} from './sagas';

describe('watchUserTypedInTrainerInput()', () => {
  it('listens for userTypedInTrainerInput() and calls handleUserTypedInTrainerInput()', () => {
    const saga = cloneableGenerator(watchUserTypedInTrainerInput)();

    // given: userTypedInTrainerInput() is dispatched, should call handleUserTypedInTrainerInput()
    expect(saga.next().value).toEqual(
      takeEvery(userTypedInTrainerInput().type, handleUserTypedInTrainerInput),
    );
    // then: should be done
    expect(saga.next().done).toBe(true);
  });
});

describe('handleUserTypedInTrainerInput()', () => {
  it('handles the core game logic related to user typing in the trainer input', () => {
    const saga = cloneableGenerator(handleUserTypedInTrainerInput)();

    {
      /* 
        winning path (including new high score)
        */

      const clone = saga.clone();

      // SKIPPED (condition not met), after calling select(selectIsFail): if (yield select(selectIsFail))
      // given: nothing (at saga start), should: yield select(selectIsFail)
      expect(clone.next().value).toEqual(select(selectIsFail));

      // given: false, should: get inputString
      expect(clone.next(false).value).toEqual(select(selectInputString));
      // given: correct inputString, should: get startTime
      expect(clone.next('78637').value).toEqual(select(selectStartTime));

      // SKIPPED: if (inputString.length === 1 && startTime === '')

      // if (yield select(selectIsWin))
      // given: startTime, should: get isWin boolean
      expect(clone.next(1000).value).toEqual(select(selectIsWin));
      // given: isWin is true, should: get now-time
      expect(clone.next(true).value).toEqual(call(getTime));
      // given: now-time, should: dispatch typingEndedByWinning()
      expect(clone.next(5000).value).toEqual(put(typingEndedByWinning(5000)));

      // given: nothing, should: get levelId
      expect(clone.next().value).toEqual(select(selectLevelId));
      // given: levelId, should: get currentWpm
      expect(clone.next(1).value).toEqual(select(selectCurrentWpm));
      // given: currentWpm, should: get currentLevelHighScore
      expect(clone.next(42).value).toEqual(select(selectCurrentLevelHighScore));
      // given: currentLevelHighScore, should: get highScores
      expect(clone.next(21).value).toEqual(select(selectHighScores));
      // given: highScores, should: call updateHighScoresIfNewHighScore()
      expect(clone.next({ 1: 21 }).value).toEqual(
        call(updateHighScoresIfNewHighScore, 1, 42, 21, { 1: 21 }),
      );

      // if (updatedHighScores)
      // given: updatedHighScores, should: dispatch newHighScoreAchieved()
      expect(clone.next({ 1: 42 }).value).toEqual(
        put(newHighScoreAchieved({ 1: 42 })),
      );
      // given: nothing, should: call syncHighScoresToLocalStorage()
      expect(clone.next().value).toEqual(
        call(syncHighScoresToLocalStorage, { 1: 42 }),
      );

      // given: nothing, should: delay 2000ms
      expect(clone.next().value).toEqual(delay(2000));
      // given: nothing, should: dispatch resetOnUserWon()
      expect(clone.next().value).toEqual(put(resetOnUserWon()));
    }

    {
      /* 
        winning path (without new high score)
        */

      const clone = saga.clone();

      // SKIPPED (condition not met), after calling select(selectIsFail): if (yield select(selectIsFail))
      // given: nothing (at saga start), should: yield select(selectIsFail)
      expect(clone.next().value).toEqual(select(selectIsFail));

      // given: false, should: get inputString
      expect(clone.next(false).value).toEqual(select(selectInputString));
      // given: correct inputString, should: get startTime
      expect(clone.next('78637').value).toEqual(select(selectStartTime));

      // SKIPPED (condition not met): if (inputString.length === 1 && startTime === '')

      // if (yield select(selectIsWin))
      // given: startTime, should: get isWin boolean
      expect(clone.next(1000).value).toEqual(select(selectIsWin));
      // given: isWin is true, should: get now-time
      expect(clone.next(true).value).toEqual(call(getTime));
      // given: now-time, should: dispatch typingEndedByWinning()
      expect(clone.next(5000).value).toEqual(put(typingEndedByWinning(5000)));

      // given: nothing, should: get levelId
      expect(clone.next().value).toEqual(select(selectLevelId));
      // given: levelId, should: get currentWpm
      expect(clone.next(1).value).toEqual(select(selectCurrentWpm));
      // given: currentWpm, should: get currentLevelHighScore
      expect(clone.next(11).value).toEqual(select(selectCurrentLevelHighScore));
      // given: currentLevelHighScore, should: get highScores
      expect(clone.next(21).value).toEqual(select(selectHighScores));
      // given: highScores, should: call updateHighScoresIfNewHighScore()
      expect(clone.next({ 1: 21 }).value).toEqual(
        call(updateHighScoresIfNewHighScore, 1, 11, 21, { 1: 21 }),
      );

      // SKIPPED (condition not met): if (updatedHighScores)

      // given: nothing, should: delay 2000ms
      expect(clone.next().value).toEqual(delay(2000));
      // given: nothing, should: dispatch resetOnUserWon()
      expect(clone.next().value).toEqual(put(resetOnUserWon()));
    }

    {
      /* 
        winning path (before winning, no win yet)
        */

      const clone = saga.clone();

      // SKIPPED (condition not met), after calling select(selectIsFail): if (yield select(selectIsFail))
      // given: nothing (at saga start), should: yield select(selectIsFail)
      expect(clone.next().value).toEqual(select(selectIsFail));

      // given: false, should: get inputString
      expect(clone.next(false).value).toEqual(select(selectInputString));
      // given: correct inputString, should: get startTime
      expect(clone.next('7863').value).toEqual(select(selectStartTime));

      // SKIPPED (condition not met): if (inputString.length === 1 && startTime === '')

      // SKIPPED (after select(selectIsWin) is called): if (yield select(selectIsWin))
      // given: startTime, should: get isWin boolean
      expect(clone.next(1000).value).toEqual(select(selectIsWin));

      // after final if block, no more yield calls
      expect(clone.next(false).done).toBe(true);
    }

    {
      /* 
        winning path: typed first character (correct)
        */

      const clone = saga.clone();

      // SKIPPED (condition not met), after calling select(selectIsFail): if (yield select(selectIsFail))
      // given: nothing (at saga start), should: yield select(selectIsFail)
      expect(clone.next().value).toEqual(select(selectIsFail));

      // given: false, should: get inputString
      expect(clone.next(false).value).toEqual(select(selectInputString));
      // given: correct first character, should: get startTime
      expect(clone.next('7').value).toEqual(select(selectStartTime));

      // if (inputString.length === 1 && startTime === '')
      // given: startTime (as empty string), should: get now-time
      expect(clone.next('').value).toEqual(call(getTime));
      // given: now-time, should: dispatch typingStarted()
      expect(clone.next(1000).value).toEqual(put(typingStarted(1000)));

      // SKIPPED (after select(selectIsWin) is called): if (yield select(selectIsWin))
      // given: nothing, should: get isWin boolean
      expect(clone.next().value).toEqual(select(selectIsWin));

      // after final if block, no more yield calls
      // given: false, should: be done
      expect(clone.next(false).done).toBe(true);
    }

    {
      /*
        failing path: instant fail
       
        As the saga reruns with each change in inputString this path covers both cases:
        - fail on the first and only character of the inputString being wrong
        - fail on the first wrong character *after* some correct characters within inputString 
        */

      const clone = saga.clone();

      // if (yield select(selectIsFail))
      // given: nothing (at saga start), should: yield select(selectIsFail)
      expect(clone.next().value).toEqual(select(selectIsFail));
      // given: true (isFail), should: delay 1000ms
      expect(clone.next(true).value).toEqual(delay(1000));
      // given: nothing, should: dispatch resetOnUserFailed()
      expect(clone.next().value).toEqual(put(resetOnUserFailed()));

      // RETURN;
      // given: nothing, should: be done
      expect(clone.next().done).toBe(true);
    }
  });
});

describe('watchLoadSymbolTrainer()', () => {
  it('listens for loadSymbolTrainer() and calls handleLoadSymbolTrainer()', () => {
    const saga = cloneableGenerator(watchLoadSymbolTrainer)();

    // given: nothing (+ loadSymbolTrainer() is dispatched), should call handleLoadSymbolTrainer()
    expect(saga.next().value).toEqual(
      takeLatest(loadSymbolTrainer().type, handleLoadSymbolTrainer),
    );
    // then: should be done
    expect(saga.next().done).toBe(true);
  });
});

describe('handleLoadSymbolTrainer()', () => {
  it('loads the levelId, backupDate, and highScores from localStorage into the reducer store', () => {
    const saga = cloneableGenerator(handleLoadSymbolTrainer)();

    // given: nothing, should: call syncFromLocalStorage()
    expect(saga.next().value).toEqual(call(syncFromLocalStorage));
    // given: object with values from localStorage, should: yield put(stateSyncedFromLocalStorage());
    expect(
      saga.next({
        levelId: 1,
        backupDate: '2025-01-01',
        highScores: { 1: 100 },
      }).value,
    ).toEqual(
      put(
        stateSyncedFromLocalStorage({
          levelId: 1,
          backupDate: '2025-01-01',
          highScores: { 1: 100 },
        }),
      ),
    );

    // given: nothing, should: be done
    expect(saga.next().done).toBe(true);
  });
});

describe('handleSyncLevelId()', () => {
  it('syncs the levelId from the reducer to localStorage', () => {
    const saga = cloneableGenerator(handleSyncLevelId)();

    // given: nothing, should: select levelId from reducer
    expect(saga.next().value).toEqual(select(selectLevelId));
    // given: levelId from reducer, should: sync to localStorage
    expect(saga.next(42).value).toEqual(call(syncLevelIdToLocalStorage, 42));
    // then: should be done
    expect(saga.next().done).toBe(true);
  });
});

describe('watchBackupDownload()', () => {
  it('listens for backupDownloadClicked() and calls handleBackupDownload()', () => {
    const saga = cloneableGenerator(watchBackupDownload)();

    // given: nothing (+ backupDownloadClicked() is dispatched), should call handleBackupDownload()
    expect(saga.next().value).toEqual(
      takeEvery(backupDownloadClicked().type, handleBackupDownload),
    );
    // then: should be done
    expect(saga.next().done).toBe(true);
  });
});

describe('handleBackupDownload()', () => {
  it('downloads high scores JSON and syncs backup date to localStorage', () => {
    const saga = cloneableGenerator(handleBackupDownload)();

    // given: nothing, should: call downloadHighScoresJSON()
    expect(saga.next().value).toEqual(call(downloadHighScoresJSON));
    // given: nothing, should: select backup date from reducer
    expect(saga.next().value).toEqual(select(selectBackupDate));
    // given: backup date from reducer, should: sync to localStorage
    expect(saga.next('2025-01-01').value).toEqual(
      call(syncBackupDateToLocalStorage, '2025-01-01'),
    );
    // then: should be done
    expect(saga.next().done).toBe(true);
  });
});

describe('watchImportBackup()', () => {
  it('listens for importBackupClicked() and calls handleImportBackup()', () => {
    const saga = cloneableGenerator(watchImportBackup)();

    // given: nothing (+ importBackupClicked() is dispatched), should call handleImportBackup()
    expect(saga.next().value).toEqual(
      takeEvery(importBackupClicked().type, handleImportBackup),
    );
    // then: should be done
    expect(saga.next().done).toBe(true);
  });
});

describe('handleImportBackup()', () => {
  it('imports high scores to reducer store from a file and syncs them to localStorage', () => {
    {
      /*
        happy path: successful import
        */

      const fileDummy = new File(['{ "1": 100 }'], 'highScores.json');
      const saga = cloneableGenerator(handleImportBackup)({
        payload: fileDummy,
      });

      // given: nothing, should: call getHighScoresFromImportFile()
      expect(saga.next().value).toEqual(
        call(getHighScoresFromImportFile, fileDummy),
      );

      // given: highScores and importMessage from import file, should: dispatch importStatusMessageRecieved()
      expect(
        saga.next({
          highScoresFromImportFile: { 1: 100 },
          importMessage: 'import successful',
        }).value,
      ).toEqual(put(importStatusMessageRecieved('import successful')));

      // if (highScoresFromImportFile)
      // given: nothing, should: yield put(highScoresImported);
      expect(saga.next().value).toEqual(put(highScoresImported({ 1: 100 })));
      // given: nothing, should: call syncHighScoresToLocalStorage()
      expect(saga.next().value).toEqual(
        call(syncHighScoresToLocalStorage, { 1: 100 }),
      );
      // given: nothing, should: delay 4000ms
      expect(saga.next().value).toEqual(delay(4000));
      // given: nothing, should: dispatch importStatusMessageRecieved()
      expect(saga.next().value).toEqual(put(importStatusMessageRecieved('')));

      // given: nothing, should: be done
      expect(saga.next().done).toBe(true);
    }

    {
      /*
        unhappy path: import failure
        */

      const fileDummy = new File(['{ invalid json }'], 'highScores.json');
      const saga = cloneableGenerator(handleImportBackup)({
        payload: fileDummy,
      });

      // given: nothing, should: call getHighScoresFromImportFile()
      expect(saga.next().value).toEqual(
        call(getHighScoresFromImportFile, fileDummy),
      );

      // covers all 3 import fail message cases of the helper function
      // given: importMessage in (error-) object, should: yield put(importMessageRecieved)
      expect(saga.next({ importMessage: 'import failed' }).value).toEqual(
        put(importStatusMessageRecieved('import failed')),
      );

      // SKIPPED (condition not met): if (highScoresFromImportFile)

      // given: nothing, should: delay 4000ms
      expect(saga.next().value).toEqual(delay(4000));
      // given: nothing, should: dispatch importStatusMessageRecieved()
      expect(saga.next().value).toEqual(put(importStatusMessageRecieved('')));

      // given: nothing, should: be done
      expect(saga.next().done).toBe(true);
    }
  });
});

describe('watchSyncLevelId()', () => {
  it('listens for levelClicked() and levelChosenByShortcut() and calls handleSyncLevelId()', () => {
    const saga = cloneableGenerator(watchSyncLevelId)();

    // console.log(saga.next().value);
    // console.log(takeEvery(checkLevelChangeActions, handleSyncLevelId));

    // given: nothing, should: take every levelClicked or levelChosenByShortcut action
    expect(saga.next().value).toMatchObject(
      takeEvery(checkLevelChangeActions, handleSyncLevelId),
    );
    // then: should be done
    expect(saga.next().done).toBe(true);
  });
});

describe('rootSaga()', () => {
  it('combines all watcher sagas', () => {
    const saga = cloneableGenerator(rootSaga)();

    // given: nothing, should: yield all watcher sagas
    expect(saga.next().value).toEqual(
      all([
        watchLoadSymbolTrainer(),
        watchUserTypedInTrainerInput(),
        watchBackupDownload(),
        watchSyncLevelId(),
        watchImportBackup(),
      ]),
    );

    // then: should be done
    expect(saga.next().done).toBe(true);
  });
});
