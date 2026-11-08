document.addEventListener('DOMContentLoaded', () => {

  // Récupération des éléments à animer
  const rotatingElements = document.querySelectorAll('.rotate-on-scroll');
  const reverseRotatingElements = document.querySelectorAll('.rotate-reverse');
  const parallaxLeftElements = document.querySelectorAll('.translate-left');

  function handleScrollAnimations() {
    const scrollPosition = window.scrollY;

    // 1. Rotation horaire (ex: Soleil, Étoiles)
    rotatingElements.forEach(el => {
      // Ajustez le facteur (0.2) pour faire tourner plus ou moins vite
      const rotationAngle = scrollPosition * 0.2; 
      el.style.transform = `rotate(${rotationAngle}deg)`;
    });

    // 2. Rotation anti-horaire (ex: Volutes ou Ornements)
    reverseRotatingElements.forEach(el => {
      const rotationAngle = scrollPosition * -0.15;
      el.style.transform = `rotate(${rotationAngle}deg)`;
    });

    // 3. Effet Parallaxe / Déplacement latéral (ex: Nuages)
    parallaxLeftElements.forEach(el => {
      const translateX = scrollPosition * 0.15;
      el.style.transform = `translateX(${translateX}px)`;
    });
  }

  // Écouteur de l'événement scroll
  window.addEventListener('scroll', handleScrollAnimations, { passive: true });
});