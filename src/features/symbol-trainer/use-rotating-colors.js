import { useEffect, useState } from 'react';

// ! vi usefaketimers, mocking
// ! translate
/**
 * Returns color classNames in rotation at a set interval, as a visual animation
 * effect in the SymbolTrainer title in the intro section.
 * @param {string[]} colors - Array of color class names to rotate through
 * @param {number} [interval=1000] - Time in milliseconds between color changes
 * @returns {string} Current color class name
 * @example datashape of colors parameter:
 * ```js
 * const colors = ['emerald-la', 'violet-500', 'red-500', 'yellow-la']
 * ```
 */
export default function useRotatingColors(colors, interval = 1000) {
  const [color, setColor] = useState(colors[0] || '');

  useEffect(() => {
    let colorIndex = 0;
    const colorInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setColor(colors[colorIndex]);
    }, interval);

    return () => clearInterval(colorInterval);
  }, []);

  return color;
}
