/*eslint-disable*/
import { useEffect } from 'react';

// Enables Vim-style scrolling ('j' and 'k') for vertical navigation and ('h'
// and 'l') for horizontal scrolling within 'pre' elements. Disables scrolling
// when focus is on input fields specified by their IDs.

export const useVimScroll = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ids for conditional disabling the vim scroll behaviour, when
      // subscribeForm inputs are focused.
      const inputIds = ['navSubInput', 'pageSubInput', 'footSubInput'];

      // Collects `pre` elements that come into view via `observer` and
      // `handleIntersect`.
      const preElementsInView = new Set();

      function handleIntersect(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Ensures there is only the latest `pre` in view being scrolled
            // sideways.
            preElementsInView.clear();
            // Adds the latest `pre` in view.
            preElementsInView.add(entry.target);
          } else {
            preElementsInView.delete(entry.target);
          }
        });
      }

      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        threshold: 0.1,
      });
      // Activates `observer` for all `pre` elements.
      const preElements = document.querySelectorAll('pre');
      preElements.forEach(pre => observer.observe(pre));

      function handleKeydown(event) {
        const focusedElement = document.activeElement;

        if (!inputIds.includes(focusedElement.id)) {
          if (event.key === 'j') {
            window.scrollBy(0, 50);
          } else if (event.key === 'k') {
            window.scrollBy(0, -50);
            // Enables horizontal scrolling for 'pre' elements using 'h' and 'l'.
          } else if (event.key === 'l' || event.key === 'h') {
            const scrollStep = 50;
            preElementsInView.forEach(pre => {
              if (event.key === 'l') {
                pre.scrollLeft += scrollStep;
              } else if (event.key === 'h') {
                pre.scrollLeft -= scrollStep;
              }
            });
          }
        }
      }

      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
        observer.disconnect();
      };
    }
  }, []);
};
