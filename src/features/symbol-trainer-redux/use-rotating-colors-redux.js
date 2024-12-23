import { useEffect, useState } from 'react';

// Returns color classNames in rotation at a set interval, as a visual animation
// effect in the SymbolTrainer title in the intro section.
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
