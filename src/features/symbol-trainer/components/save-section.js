import { useState, useEffect } from 'react';
import {
  syncLastBackupDateToLocalStorage,
  downloadScoresJSON,
  importBackup,
  calcBackupDifference,
} from '../helpers';

export default function SaveSection({ scores, setScores }) {
  const [message, setMessage] = useState();
  const [backupDate, setBackupDate] = useState();
  const backupDifference = calcBackupDifference(backupDate, new Date());

  useEffect(() => {
    setBackupDate(localStorage.getItem('backupDate') || '');
  }, []);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage('');
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

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
            onClick={() => {
              syncLastBackupDateToLocalStorage(new Date().toString());
              setBackupDate(new Date().toString());
              downloadScoresJSON(setBackupDate, setMessage);
            }}
          >
            Download Backup File
          </button>

          <div className="mb-4">
            <input
              type="file"
              accept=".json"
              onChange={event => importBackup(event, setMessage)}
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
          last backup download was on {backupDate?.slice(0, 10) || 'never'},
          about {backupDifference || 0}h ago
        </p>
        <p
          className={`flex justify-center ${
            message === 'Import Successful.'
              ? 'text-emerald-la'
              : 'text-red-500'
          } min-h-4`}
        >
          {message ? message : ''}
        </p>
      </div>
    </section>
  );
}
