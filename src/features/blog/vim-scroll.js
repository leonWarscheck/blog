/*eslint-disable*/
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', event => {
    const inputIds = ['navSubInput', 'pageSubInput', 'footSubInput'];
    const preElementsInView = new Set();

    function handleIntersect(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
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

    const preElements = document.querySelectorAll('pre');
    preElements.forEach(pre => observer.observe(pre));

    document.addEventListener('keydown', function (event) {
      const focusedElement = document.activeElement;

      if (!inputIds.includes(focusedElement.id)) {
        if (event.key === 'j') {
          window.scrollBy(0, 50);
        } else if (event.key === 'k') {
          window.scrollBy(0, -50);
          // TODO: fix or delete sideways scroll
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
