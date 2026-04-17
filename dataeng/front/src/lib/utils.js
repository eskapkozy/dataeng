// Utility functions
export const utils = {
  // Common utility functions will be added here when needed
  
  // Example: format date
  formatDate: (date) => {
    return new Date(date).toLocaleDateString();
  },
  
  // Example: debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};
