/*eslint-disable*/

// Enables Vim-style scrolling ('j' and 'k') for vertical navigation and ('h'
// and 'l') for horizontal scrolling within 'pre' elements. Disables scrolling
// when focus is on input fields specified by their IDs. 

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', event => {
    // Ids for conditional disabling the vim scroll behaviour, when
    // subscribeForm inputs are focused.
    const inputIds = ['navSubInput', 'pageSubInput', 'footSubInput'];

    // Collects `pre` elements that come into view via `observer` and
    // `handleIntersect`.
    const preElementsInView = new Set();

    function handleIntersect(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          preElementsInView.add(entry.target);
          console.log('Added to view:', entry.target);
        } else {
          preElementsInView.delete(entry.target);
          console.log('Removed from view:', entry.target);
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

    document.addEventListener('keydown', function (event) {
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
    });
  });
}
