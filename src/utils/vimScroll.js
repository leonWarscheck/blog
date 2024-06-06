  if (typeof window !== "undefined") {
document.addEventListener('DOMContentLoaded', (event) => {
    const inputIds = ["navSubInput", "pageSubInput", "footSubInput"];
    const preElementsInView = new Set();
  
    // Callback function for the Intersection Observer
    function handleIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          preElementsInView.add(entry.target);
        } else {
          preElementsInView.delete(entry.target);
        }
      });
    }
  
    // Create the Intersection Observer
    const observer = new IntersectionObserver(handleIntersect, {
      root: null, // Use the viewport as the root
      threshold: 0.1 // Adjust the threshold as needed
    });
  
    // Observe all <pre> elements
    const preElements = document.querySelectorAll("pre");
    preElements.forEach((pre) => observer.observe(pre));
  
    document.addEventListener("keydown", function (event) {
      const focusedElement = document.activeElement; // Get the currently focused element
  
      if (!inputIds.includes(focusedElement.id)) {
        if (event.key === "j") {
          window.scrollBy(0, 50); // Scroll down by 50 pixels
        } else if (event.key === "k") {
          window.scrollBy(0, -50); // Scroll up by 50 pixels
        } else if (event.key === "l" || event.key === "h") {
          const scrollStep = 50; // Adjust the scroll amount as needed
          preElementsInView.forEach((pre) => {
            if (event.key === "l") {
              pre.scrollLeft += scrollStep; // Scroll right
            } else if (event.key === "h") {
              pre.scrollLeft -= scrollStep; // Scroll left
            }
          });
        }
      }
    });
 }); 
}
