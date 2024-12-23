import { useEffect } from 'react';

// Refocusses input after it got reset from win or fail. The returned
// handleBlur function makes sure the input cannot be blurred, except for via
// the disabled prop on win and fail.
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
