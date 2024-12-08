import { useEffect } from "react";

export function useTrainerColorSetter(
  scores,
  levelId,
  trainerState,
  setTrainerColorClasses
) {
  useEffect(() => {
    const score = scores?.[levelId];
    const trainerColor =
      score >= 60
        ? "neutral-200"
        : score >= 50
        ? "emerald-la"
        : score >= 40
        ? "yellow-la"
        : score >= 30
        ? "violet-500"
        : score >= 20
        ? "red-500 "
        : "neutral-200";
    if (trainerState !== "fail") {
      if (trainerState === "win") {
        setTrainerColorClasses("text-" + trainerColor);
      } else {
        setTrainerColorClasses(
          "text-" + trainerColor + " caret-" + trainerColor
        );
      }
    } else if (trainerState === "fail") {
      setTrainerColorClasses("text-neutral-400");
    }
  }, [scores?.[levelId], trainerState]);
}
