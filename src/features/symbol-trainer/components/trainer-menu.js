export default function MenuTrainer({ setSection, section, levelId, scores }) {
 const score = scores?.[levelId]
 
  const handleLevelToggle = () => {
    if (section === "levelSection") {
      setSection("trainerSection");
    } else {
      setSection("levelSection");
    }
  };
  const handleInfoToggle = () => {
    if (section === "infoSection") {
      setSection("trainerSection");
    } else {
      setSection("infoSection");
    }
  };
  const handleSaveToggle = () => {
    if (section === "saveSection") {
      setSection("trainerSection");
    } else {
      setSection("saveSection");
    }
  };

  return (
    <nav
      id="menu"
      className=" text-neutral-500 flex max-w-2xl w-full mx-auto px-4 mb-2 "
    >
      <ul className="flex w-full">
        <li className="mr-aut font-semibold text- 2xl hover:text-neutral-200">
          <button onClick={() => setSection("trainerSection")}>
            SymbolTrainer
          </button>
        </li>{" "}
        <li className="ml-auto mr-4 hover:text-neutral-200 mt-px font-medium">
          <button onClick={handleLevelToggle}>
            Level&nbsp;
            {levelId?.toString().length === 1
              ? levelId?.toString().padStart(2, "0")
              : levelId}
            &nbsp;/&nbsp;
            {score?.toString().length === 1
              ? score?.toString().padStart(2, "0")
              : score? score : "00"}
          </button>
        </li>
        <li className="hover:text-neutral-200 mt-px font-medium mr-4">
          <button onClick={handleInfoToggle}>Help</button>
        </li>{" "}
        <li className="hover:text-neutral-200 mt-px font-medium">
          <button onClick={handleSaveToggle}>Save</button>
        </li>{" "}
      </ul>
    </nav>
  );
}
