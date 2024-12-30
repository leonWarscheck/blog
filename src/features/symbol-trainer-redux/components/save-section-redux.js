import { useContext } from 'react';

import {
  backupDownloadClicked,
  importBackupClicked,
  selectBackupDate,
  selectBackupDifference,
  selectImportMessage,
} from '../reducer';
import { SymbolTrainerContext } from '../symbol-trainer-redux-page';

export default function SaveSection() {
  const { state, dispatch } = useContext(SymbolTrainerContext);

  const backupDate = selectBackupDate(state);
  const backupDifference = selectBackupDifference(state, new Date());
  const message = selectImportMessage(state);

  return (
    <section id="save" className={`flex grow`}>
      <div className="mx-auto my-auto flex max-h-[30dvh] w-full max-w-2xl flex-col px-4 pt-12 text-neutral-400">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Additional Saving Options
        </h2>
        <p className="mb-8 text-center">
          Your scores get auto-saved in your browser's local storage. Often this
          can be enough. Risk of loss depends on your browser settings and
          behavior. Use this backup feature if you want to be extra safe:
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="flex rounded-sm underline hover:text-neutral-500"
            // Downloads a backup of the JSON object from localStorage and sets
            // the latest backupDate to now, so the user can later see how long
            // it has been since the last backup. (see `sagas.js`)
            onClick={() =>
              dispatch(backupDownloadClicked(new Date().toString()))
            }
          >
            Download Backup File
          </button>

          <div className="mb-4">
            <input
              type="file"
              accept=".json"
              // Imports JSON backup files TO localStorage and sets a success of
              // fail message, which gets rendered below.
              onChange={event =>
                dispatch(importBackupClicked(event.target.files[0]))
              }
              id="file-upload"
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer underline hover:text-neutral-500"
            >
              Import Backup File
            </label>
          </div>
        </div>
        <p className={`mb-4 flex justify-center text-neutral-500`}>
          Last backup download was on {backupDate?.slice(0, 10) || 'never'},
          about {backupDifference || 0}h ago.
        </p>
        <p
          className={`flex min-h-4 justify-center ${
            message === 'Import Successful.'
              ? 'text-emerald-la'
              : 'text-red-500'
          } `}
        >
          {message || ''}
        </p>
      </div>
    </section>
  );
}
