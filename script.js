// Simple lightbox for gallery images
const lightbox = document.getElementById('lightbox');
const galleryImages = document.querySelectorAll('.gallery img');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightbox.querySelector('img').src = img.src;
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// Animate sections on scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');

  function animateSections() {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if(sectionTop < triggerBottom){
        section.classList.add('animate');
      }
    });
  }

  window.addEventListener('scroll', animateSections);
  animateSections(); // Trigger on page load
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const images = [
    'screenshots/screenshot1.png',
    'screenshots/screenshot2.png',
    'screenshots/screenshot3.png',
    'screenshots/screenshot4.png',
    'screenshots/screenshot5.png',
    'screenshots/screenshot6.png',
    'screenshots/screenshot7.png'
  ];

  let currentIndex = parseInt(localStorage.getItem('lastHeaderImage')) || 0;

  // Create two layers for crossfade
  const slide1 = document.createElement('div');
  const slide2 = document.createElement('div');
  slide1.classList.add('header-slide');
  slide2.classList.add('header-slide');
  header.prepend(slide2);
  header.prepend(slide1);

  // Initialize
  let topSlide = slide1;
  let bottomSlide = slide2;
  topSlide.style.backgroundImage = `url('${images[currentIndex]}')`;
  topSlide.style.opacity = 1;
  topSlide.style.transform = 'scale(1.0)';

  setInterval(() => {
    // Swap slides
    const nextIndex = (currentIndex + 1) % images.length;
    bottomSlide.style.backgroundImage = `url('${images[nextIndex]}')`;
    bottomSlide.style.opacity = 1;
    bottomSlide.style.transform = 'scale(1.0)'; // reset scale

    // Animate top slide fading out and zooming
    topSlide.style.opacity = 0;
    topSlide.style.transform = 'scale(1.1)'; // slow zoom out

    // Swap layers
    [topSlide, bottomSlide] = [bottomSlide, topSlide];

    currentIndex = nextIndex;
    localStorage.setItem('lastHeaderImage', currentIndex);
  }, 5000);
});
