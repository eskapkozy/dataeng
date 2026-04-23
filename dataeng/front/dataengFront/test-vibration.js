// Script de test pour vérifier la vibration de l'indicateur
console.log('Test de vibration de l\'indicateur...');

// Simuler le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const indicator = document.querySelector('.map-transition-indicator');
    console.log('Indicateur trouvé:', !!indicator);
    
    if (indicator) {
      console.log('Classes appliquées:', indicator.className);
      console.log('Position left:', indicator.style.left);
      console.log('Position top:', indicator.style.top);
      console.log('Transform:', indicator.style.transform);
      
      // Vérifier si la classe massive-vibrating est présente
      const hasMassiveVibration = indicator.classList.contains('massive-vibrating');
      console.log('A la classe massive-vibrating:', hasMassiveVibration);
      
      // Vérifier si la classe active est présente
      const hasActive = indicator.classList.contains('active');
      console.log('A la classe active:', hasActive);
      
      // Vérifier si la classe brazzaville est présente
      const hasBrazzaville = indicator.classList.contains('brazzaville');
      console.log('A la classe brazzaville:', hasBrazzaville);
    }
  }, 2000);
});
