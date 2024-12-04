import levels from "../../data/levels.json";
import { useEffect } from "react";

export const useLevelNavigation = (levelId, levelLength, levelIdChanged) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (((event.metaKey || event.ctrlKey) && event.key === "ArrowUp") ||
          event.key === "j") &&
        levelId >= 2
      ) {
        const previousLevel = levelId - 1;
        console.log(previousLevel);
        levelIdChanged(previousLevel);
      } else if (
        (((event.metaKey || event.ctrlKey) && event.key === "ArrowDown") ||
          event.key === "k") &&
        levelId <= levelLength - 2
      ) {
        const nextLevel = levelId + 1;
        console.log(nextLevel);
        levelIdChanged(nextLevel);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [levelId]); // todo: trigger handleInitialize Saga from useEffect for localSync and otherwise use reducerstate and only push to local 
};
