export default function MenuTrainer({ setSection, section, levelId, scores }) {
  const score = scores?.[levelId];

  const handleLevelToggle = () => {
    if (section === 'levelSection') {
      setSection('trainerSection');
    } else {
      setSection('levelSection');
    }
  };
  const handleInfoToggle = () => {
    if (section === 'infoSection') {
      setSection('trainerSection');
    } else {
      setSection('infoSection');
    }
  };
  const handleSaveToggle = () => {
    if (section === 'saveSection') {
      setSection('trainerSection');
    } else {
      setSection('saveSection');
    }
  };

  return (
    <nav
      id="menu"
      className="mx-auto mb-2 flex w-full max-w-2xl px-4 text-neutral-500"
    >
      <ul className="flex w-full">
        <li className="text- 2xl font-semibold hover:text-neutral-200">
          <button onClick={() => setSection('trainerSection')}>
            SymbolTrainer
          </button>
        </li>{' '}
        <li className="ml-auto mr-4 mt-px font-medium hover:text-neutral-200">
          <button onClick={handleLevelToggle}>
            Level&nbsp;
            {levelId?.toString().length === 1
              ? levelId?.toString().padStart(2, '0')
              : levelId}
            &nbsp;/&nbsp;
            {score?.toString().length === 1
              ? score?.toString().padStart(2, '0')
              : score || '00'}
          </button>
        </li>
        <li className="mr-4 mt-px font-medium hover:text-neutral-200">
          <button onClick={handleInfoToggle}>Help</button>
        </li>{' '}
        <li className="mt-px font-medium hover:text-neutral-200">
          <button onClick={handleSaveToggle}>Save</button>
        </li>{' '}
      </ul>
    </nav>
  );
}
