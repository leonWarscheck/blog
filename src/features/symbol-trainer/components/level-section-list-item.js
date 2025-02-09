import { forwardRef } from 'react';

const LevelSectionListItem = forwardRef(
  ({ listItemLevel, highScores, onLevelClick }, ref) => {
    const listItemLevelId = listItemLevel.id;
    const listItemLevelAttributes = `(${listItemLevel.case}, ${listItemLevel.string.length}${listItemLevel.reverse ? ', r' : ''} )`;
    const listItemLevelString = listItemLevel.string;
    const listItemLevelScore = highScores?.[listItemLevelId];

    const formattedListItemLevelScore =
      listItemLevelScore?.toString().length === 1
        ? listItemLevelScore.toString().padStart(2, '0')
        : listItemLevelScore || '00';

    function getListItemScoreColor(score) {
      if (score >= 60) return 'text-neutral-400';
      if (score >= 50) return 'text-emerald-la';
      if (score >= 40) return 'text-yellow-la';
      if (score >= 30) return 'text-violet-500';
      if (score >= 20) return 'text-red-500';
      return 'text-neutral-500';
    }
    const listItemScoreColor = getListItemScoreColor(listItemLevelScore);

    return (
      <li ref={ref} className="flex w-full">
        <button
          className={`group my-2 flex w-full cursor-pointer hover:text-neutral-400 ${listItemScoreColor}`}
          onClick={onLevelClick}
        >
          <h3 className="font-bold">
            <span>Level {listItemLevelId} </span>
          </h3>
          <h4 className="ml-auto flex grow">
            <span className="ml-2">{listItemLevelAttributes}</span>
            <span className="ml-auto tracking-wide">{listItemLevelString}</span>
            <span className="ml-8">WPM</span>
            <span className="ml-4 min-w-8 text-right font-semibold">
              {formattedListItemLevelScore}
            </span>
          </h4>
        </button>
      </li>
    );
  },
);

export default LevelSectionListItem;
