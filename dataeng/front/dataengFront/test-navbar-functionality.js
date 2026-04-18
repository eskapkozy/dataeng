// Test script pour vérifier si le navbar s'adapte correctement
// À copier-coller dans la console du navigateur

function testNavbarColors() {
  console.log('=== TEST DES COULEURS DU NAVBAR ===');
  
  // Vérifier la couleur actuelle du navbar
  const navbar = document.querySelector('.navigation');
  const navLinks = document.querySelector('.nav-links');
  
  if (navbar) {
    const computedStyle = window.getComputedStyle(navbar);
    const bgColor = computedStyle.backgroundColor;
    console.log('Couleur du navbar:', bgColor);
    
    // Vérifier si la couleur correspond à la page actuelle
    const currentPath = window.location.pathname;
    console.log('Page actuelle:', currentPath);
    
    const expectedColors = {
      '/': '#667eea',    // violet
      '/story': '#10b981', // vert
      '/members': '#f97316', // orange
      '/write': '#8b5cf6'   // violet foncé
    };
    
    const expectedColor = expectedColors[currentPath];
    console.log('Couleur attendue:', expectedColor);
    
    // Convertir RGB en hex pour comparaison
    function rgbToHex(rgb) {
      if (rgb.startsWith('#')) return rgb.toLowerCase();
      const result = rgb.match(/\d+/g);
      if (!result) return rgb;
      return '#' + result.slice(0, 3).map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    const actualHex = rgbToHex(bgColor);
    const isMatching = actualHex === expectedColor;
    
    console.log('Couleur actuelle (hex):', actualHex);
    console.log('✅ Correspondance:', isMatching ? 'OUI' : 'NON');
    
    if (!isMatching) {
      console.warn('⚠️ Le navbar ne prend pas la bonne couleur!');
    }
    
    // Vérifier le conteneur nav-links
    if (navLinks) {
      const navLinksStyle = window.getComputedStyle(navLinks);
      console.log('Background nav-links:', navLinksStyle.backgroundColor);
      console.log('Border-radius nav-links:', navLinksStyle.borderRadius);
    }
    
  } else {
    console.error('❌ Navbar non trouvé!');
  }
  
  console.log('================================');
}

// Test automatique de navigation
async function testAutomaticNavigation() {
  console.log('🚀 Test automatique de navigation...');
  
  const routes = ['/', '/story', '/members', '/write'];
  
  for (const route of routes) {
    console.log(`\n📍 Navigation vers: ${route}`);
    window.history.pushState({}, '', route);
    
    // Attendre que React mette à jour
    await new Promise(resolve => setTimeout(resolve, 500));
    
    testNavbarColors();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

console.log('🔧 Fonctions de test chargées!');
console.log('Utilisez testNavbarColors() pour tester la page actuelle');
console.log('Utilisez testAutomaticNavigation() pour tester toutes les pages');
