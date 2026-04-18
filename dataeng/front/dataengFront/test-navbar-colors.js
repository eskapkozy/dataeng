// Simple test script to verify navbar color functionality
// This can be run in the browser console to test the dynamic colors

const testNavbarColors = () => {
  const routes = ['/', '/story', '/members', '/write', '/login', '/get-started'];
  const expectedColors = {
    '/': { container: '#3b82f6', linkBg: 'rgba(59, 130, 246, 0.1)' },
    '/story': { container: '#10b981', linkBg: 'rgba(16, 185, 129, 0.1)' },
    '/members': { container: '#f97316', linkBg: 'rgba(249, 115, 22, 0.1)' },
    '/write': { container: '#8b5cf6', linkBg: 'rgba(139, 92, 246, 0.1)' },
    '/login': { container: '#6b7280', linkBg: 'rgba(107, 114, 128, 0.1)' },
    '/get-started': { container: '#ec4899', linkBg: 'rgba(236, 72, 153, 0.1)' }
  };

  console.log('Testing navbar colors...');
  
  routes.forEach(route => {
    const nav = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (nav) {
      const bgColor = window.getComputedStyle(nav).backgroundColor;
      console.log(`Route: ${route}`);
      console.log(`Container color: ${bgColor}`);
      
      if (navLinks.length > 0) {
        const linkBg = window.getComputedStyle(navLinks[0]).backgroundColor;
        console.log(`Link background: ${linkBg}`);
      }
      console.log('---');
    }
  });
};

// Auto-test function that navigates through routes
const autoTestRoutes = async () => {
  const routes = ['/', '/story', '/members', '/write'];
  
  for (const route of routes) {
    window.history.pushState({}, '', route);
    await new Promise(resolve => setTimeout(resolve, 500));
    testNavbarColors();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

console.log('Navbar color test functions loaded. Run testNavbarColors() or autoTestRoutes() to test.');
