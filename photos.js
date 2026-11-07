/////// AJOUTER DE NOUVEAUX ALBUMS ///////
const albumsData = {
  album1: {
    title: "Talent Show 2026",
    folder: "galerie-photo/talent-show-2026",
    count: 78,
    cover: "78.jpg"
  },
  album2: {
    title: "Concert How I Metz Your Mother",
    folder: "galerie-photo/concert-bang-2026",
    count: 4,
    cover: "1.jpg"
  }
};


////// PAS TOUCHER //////

function getAlbumImages(album) {
  const images = [];

  // Chemin direct vers la couverture sans sous-dossier images/
  const coverPath = album.cover.includes('/')
    ? `${album.folder}/${album.cover}`
    : `${album.folder}/${album.cover}`;

  images.push(coverPath);

  // Génération des chemins directs : galerie-photo/nom-album/i.jpg
  for (let i = 1; i <= album.count; i++) {
    const currentPath = `${album.folder}/${i}.jpg`;
    if (currentPath !== coverPath) {
      images.push(currentPath);
    }
  }

  return images;
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('gallery-modal');
  const modalTitle = document.getElementById('gallery-modal-title');
  const modalClose = document.getElementById('gallery-modal-close');
  
  const currentImg = document.getElementById('lightbox-current-img');
  const counter = document.getElementById('lightbox-counter');
  const thumbnailsContainer = document.getElementById('lightbox-thumbnails');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentImages = [];
  let currentIndex = 0;

  function updateGalleryView(index) {
    currentIndex = index;
    if (currentImg) {
      currentImg.src = currentImages[currentIndex];
    }
    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }
    if (thumbnailsContainer) {
      const thumbs = thumbnailsContainer.querySelectorAll('img');
      thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentIndex);
      });
    }
  }

  document.querySelectorAll('.album-item').forEach(item => {
    item.addEventListener('click', () => {
      const albumKey = item.getAttribute('data-album');
      const album = albumsData[albumKey];

      if (album) {
        modalTitle.textContent = album.title;
        currentImages = getAlbumImages(album);

        if (thumbnailsContainer) {
          thumbnailsContainer.innerHTML = '';
          currentImages.forEach((src, idx) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.addEventListener('click', () => updateGalleryView(idx));
            thumbnailsContainer.appendChild(thumb);
          });
        }

        updateGalleryView(0);
        modal.style.display = 'flex';
      }
    });
  });

  if (nextBtn) nextBtn.addEventListener('click', () => updateGalleryView((currentIndex + 1) % currentImages.length));
  if (prevBtn) prevBtn.addEventListener('click', () => updateGalleryView((currentIndex - 1 + currentImages.length) % currentImages.length));
  if (modalClose) modalClose.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
});