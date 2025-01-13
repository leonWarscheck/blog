import { describe, expect, test, it } from 'vitest';
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

import {
  handleUserTypedInTrainerInput,
  watchUserTypedInTrainerInput,
  handleLoadSymbolTrainer,
  watchLoadSymbolTrainer,
  handleSyncLevelId,
  watchSyncLevelId,
  handleBackupDownload,
  watchBackupDownload,
  handleImportBackup,
} from './sagas';

import {
  backupDownloadClicked,
  importBackupClicked,
  importStatusMessageRecieved,
  stateSyncedFromLocalStorage,
  levelChosenByShortcut,
  levelClicked,
  newHighScoreAchieved,
  loadSymbolTrainer,
  selectBackupDate,
  selectCurrentLevelHighScore,
  selectCurrentWpm,
  selectInputString,
  selectIsFail,
  selectIsWin,
  selectLevelId,
  selectStartTime,
  selectHighScores,
  typingEndedByWinning,
  typingStarted,
  userFailed,
  userTypedInTrainerInput,
  userWon,
  highScoresImported,
} from './reducer';

import {
  downloadHighScoresJSON,
  getTime,
  getHighScoresFromImportFile,
  updateHighScoresIfNewHighScore,
  syncBackupDateFromLocalStorage,
  syncBackupDateToLocalStorage,
  syncHighScoresFromLocalStorage,
  syncHighScoresToLocalStorage,
  syncLevelIdFromLocalStorage,
  syncLevelIdToLocalStorage,
} from './helpers';

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
        // given: nothing, should: dispatch userWon()
        expect(clone.next().value).toEqual(put(userWon()));
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
        // given: nothing, should: dispatch userWon()
        expect(clone.next().value).toEqual(put(userWon()));
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
      // given: nothing, should: dispatch userFailed()
      expect(clone.next().value).toEqual(put(userFailed()));

      // RETURN;
      // given: nothing, should: be done
      expect(clone.next().done).toBe(true);
    }

  });
});
