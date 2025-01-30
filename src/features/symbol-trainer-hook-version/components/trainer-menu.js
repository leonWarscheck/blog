export default function MenuTrainer({ setSection, section, levelId, scores }) {
  const score = scores?.[levelId];

  const handleTrainerSectionClick = () => {
    setSection('trainerSection');
  };

  const handleLevelSectionToggle = () => {
    if (section === 'levelSection') {
      setSection('trainerSection');
    } else {
      setSection('levelSection');
    }
  };
  const handleHelpSectionToggle = () => {
    if (section === 'helpSection') {
      setSection('trainerSection');
    } else {
      setSection('helpSection');
    }
  };
  const handleSaveSectionToggle = () => {
    if (section === 'saveSection') {
      setSection('trainerSection');
    } else {
      setSection('saveSection');
    }
  };

  return (
    <nav
      aria-label="trainer-menu"
      className="mx-auto mb-2 flex w-full max-w-2xl px-4 text-neutral-500"
    >
      <ul className="flex w-full">
        <li className="text- 2xl font-semibold hover:text-neutral-200">
          <button onClick={handleTrainerSectionClick}>SymbolTrainer</button>
        </li>{' '}
        <li className="ml-auto mr-4 mt-px font-medium hover:text-neutral-200">
          <button onClick={handleLevelSectionToggle}>
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
          <button onClick={handleHelpSectionToggle}>Help</button>
        </li>{' '}
        <li className="mt-px font-medium hover:text-neutral-200">
          <button onClick={handleSaveSectionToggle}>Save</button>
        </li>{' '}
      </ul>
    </nav>
  );
}
