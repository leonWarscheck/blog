import {useState, useEffect} from "react";
import {
  saveLastBackupDate,
  downloadScoresJSON,
  importBackup,
  calcBackupDifference
} from "../../utils/trainer-logic";

export default function SaveSection({ scores, setScores }) {
const [message, setMessage] = useState();

useEffect(() => {
  if (message) {
    const timeoutId = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timeoutId);
  }
}, [message]);

  return (
    <section id="save" className={`flex grow `}>
      <div className=" flex flex-col max-w-2xl px-4 mx-auto w-full max-h-[30dvh] my-auto text-neutral-400">
        <h2 className="text-2xl font-bold text-center mb-4">
          {" "}
          Additional Saving Options
        </h2>
        <p className="text-center mb-8">
          Your scores get auto-saved in your browser's local storage. Often this
          can be enough. Risk of loss depends on your browser settings and
          behavior. Use this backup feature if you want to be extra safe:
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-neutral- hover:text-neutral-500 underline rounded-sm flex"
            onClick={() => {
              saveLastBackupDate(scores, setScores);
              downloadScoresJSON();
            }}
          >
            Download Backup File
          </button>

          <div className="mb-4">
            <input
              type="file"
              accept=".json"
              onChange={(event)=>importBackup(event, setMessage)}
              id="file-upload"
              className="hidden" // Hide the default file input
            />
            <label
              htmlFor="file-upload" // Link label to the hidden input
              className=" hover:text-neutral-500 underline cursor-pointer"
            >
              Import Backup File
            </label>
          </div>
        </div>
<p className={` ${scores[60]?.lastBackup ? "flex": "hidden"} justify-center  text-neutral-500 mb-4`}>last backup download was on { scores[60]?.lastBackup.toString().slice(0,10)}, about {calcBackupDifference(scores)}h ago</p>
<p className={` justify-center flex ${message === "Import Successful." ? "text-emerald-la": "text-red-500"} min-h-4`}>{message? message: ""}</p>

      </div>
      {/* <p className="my-auto text-center w-full">Saving options.</p> */}
      {/* <SavetyReminder {...{ reminder }} /> */}
    </section>
  );
}
