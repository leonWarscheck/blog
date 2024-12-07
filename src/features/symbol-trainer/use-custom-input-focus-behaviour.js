import { useEffect } from "react";

export const useCustomInputFocusBehaviour = (inputRef, isWin, isFail) => {
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isWin, isFail]);

  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return [handleBlur];
};
