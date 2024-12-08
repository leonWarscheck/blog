import { useEffect } from "react";

export const useLevelNavigationShortcut = (
  levelId,
  levels,
  levelChosenByShortcut,
  dispatch
) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (((event.metaKey || event.ctrlKey) && event.key === "ArrowUp") ||
          event.key === "k") &&
        levelId >= 2
      ) {
        const previousLevel = levelId - 1;
        dispatch(levelChosenByShortcut(previousLevel));
      } else if (
        (((event.metaKey || event.ctrlKey) && event.key === "ArrowDown") ||
          event.key === "j") &&
        levelId <= levels.length - 1
      ) {
        const nextLevel = levelId + 1;
        dispatch(levelChosenByShortcut(nextLevel));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [levelId]);
};
