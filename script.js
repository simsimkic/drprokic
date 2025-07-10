console.log("JS radi");

document.addEventListener("DOMContentLoaded", function () {
  // Toggle meni za mobilnu navigaciju
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Hover efekat za ikonice
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    const originalSrc = icon.getAttribute('src');
    const hoverSrc = icon.getAttribute('data-hover');

    if (hoverSrc) {
      icon.addEventListener('mouseenter', () => {
        icon.setAttribute('src', hoverSrc);
      });

      icon.addEventListener('mouseleave', () => {
        icon.setAttribute('src', originalSrc);
      });
    }
  });

  

  // Accordion funkcionalnost
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      item.classList.toggle("active");
      header.classList.toggle("active");
    });
  });

  // --- GALERIJA SA SLIDE POMERANJEM TRACKE ---

  const track = document.getElementById('galleryTrack');
  const slides = track ? Array.from(track.children) : [];
  const prevButton = document.getElementById('galleryPrev');
  const nextButton = document.getElementById('galleryNext');
  const dotsContainer = document.getElementById('galleryDots');

  let currentIndex = 0;

  function updateSlidePosition() {
    if (!track || slides.length === 0) return;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const offset = -slideWidth * currentIndex;
    track.style.transform = `translateX(${offset}px)`;
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.toggle('active', i === currentIndex);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlidePosition();
        updateDots();
      });
      dotsContainer.appendChild(dot);
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (slides.length === 0) return;
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlidePosition();
      updateDots();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (slides.length === 0) return;
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlidePosition();
      updateDots();
    });
  }

  updateSlidePosition();
  updateDots();

  window.addEventListener('resize', () => {
    updateSlidePosition();
  });

  // --- CAROUSEL GOOGLE REVIEW KARTICA ---

  let carouselIndex = 0;

  function moveCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.review-card');
    const container = document.querySelector('.carousel-wrapper');

    if (!track || cards.length === 0 || !container) return;

    const visibleWidth = container.offsetWidth;
    const cardWidth = cards[0].offsetWidth + 16; // + gap
    const visibleCards = Math.floor(visibleWidth / cardWidth);
    const maxIndex = Math.ceil(cards.length / visibleCards) - 1;

    carouselIndex += direction;
    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;

    const offset = carouselIndex * cardWidth * visibleCards;
    track.style.transform = `translateX(-${offset}px)`;
  }

  const carouselLeft = document.querySelector('.carousel-arrow.left');
  const carouselRight = document.querySelector('.carousel-arrow.right');

  if (carouselLeft) {
    carouselLeft.addEventListener('click', () => moveCarousel(-1));
  }

  if (carouselRight) {
    carouselRight.addEventListener('click', () => moveCarousel(1));
  }
});



