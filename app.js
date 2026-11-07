/* ==========================================================================
   INTERACTIVITÉ DU SITE BDA & EFFET CANVA ÉTOILES SOURIS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. ARRIÈRE-PLAN CANVAS : ÉTOILES SUIVANT LA SOURIS
     ------------------------------------------------------------------------ */
  let canvas = document.getElementById('cursor-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'cursor-canvas';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';

  const sparkImg = new Image();
  sparkImg.src = './images/stars_cursor.png';

  const particles = [];

  class SparkParticle {
    constructor(x, y) {
      this.x = x + (Math.random() - 0.5) * 24;
      this.y = y + (Math.random() - 0.5) * 24;
      this.size = Math.random() * 24 + 8;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5 - 0.3;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.08;
      this.alpha = 1;
      this.decay = Math.random() * 0.025 + 0.015;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.spin;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0 || !sparkImg.complete) return;

      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.globalCompositeOperation = 'source-over';

      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      ctx.drawImage(
        sparkImg,
        -this.size / 2,
        -this.size / 2,
        this.size,
        this.size
      );

      ctx.restore();
    }
  }

  window.addEventListener('mousemove', (e) => {
    const spawnCount = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < spawnCount; i++) {
      particles.push(new SparkParticle(e.clientX, e.clientY));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();


  /* ------------------------------------------------------------------------
     2. GESTION DU MENU BURGER MOBILE (Correction du déclencheur)
     ------------------------------------------------------------------------ */
  const burgerMenu = document.getElementById('burger-menu');
  const navContainer = document.getElementById('nav-container');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (burgerMenu && navContainer) {
    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      navContainer.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navContainer.classList.remove('open');
      });
    });
  }

});