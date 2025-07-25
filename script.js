// === SLIDER SETUP ===
function setupSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  let slides = slider.querySelectorAll('.slide');
  const navPrev = document.querySelector(`.prev-button[data-target="${sliderId}"]`);
  const navNext = document.querySelector(`.next-button[data-target="${sliderId}"]`);

  let currentIndex = 0;

  function scrollToIndex(index) {
    if (index < 0 || index >= slides.length) return;

    const targetSlide = slides[index];
    const isMobile = window.innerWidth <= 600;

    slider.scrollTo({
      [isMobile ? 'top' : 'left']: isMobile ? targetSlide.offsetTop : targetSlide.offsetLeft,
      behavior: 'smooth'
    });

    currentIndex = index;
  }

  function next() {
    scrollToIndex((currentIndex + 1) % slides.length);
  }

  function prev() {
    scrollToIndex((currentIndex - 1 + slides.length) % slides.length);
  }

  if (navNext) navNext.addEventListener('click', next);
  if (navPrev) navPrev.addEventListener('click', prev);
}

// === PAGE INITIALIZATION ===
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('imageSlider')) {
    setupSlider('imageSlider');
  }
  if (document.getElementById('desmosSlider')) {
    setupSlider('desmosSlider');
  }

  const toggleCheckbox = document.getElementById('darkModeToggle');
  if (toggleCheckbox) {
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark');
      toggleCheckbox.checked = true;
    }

    toggleCheckbox.addEventListener('change', () => {
      const enabled = toggleCheckbox.checked;
      document.body.classList.toggle('dark', enabled);
      localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');

      document.querySelectorAll('.desmos-button').forEach(button => {
        button.classList.toggle('dark', enabled);
      });
    });
  }

  const openSidebarBtn = document.getElementById('openSidebar');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  const sidebarLinks = document.querySelectorAll('.sidebar a');

  if (openSidebarBtn && closeSidebarBtn) {
    openSidebarBtn.addEventListener('click', () => {
      document.body.classList.add('sidebar-open');
    });

    closeSidebarBtn.addEventListener('click', () => {
      document.body.classList.remove('sidebar-open');
    });

    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('sidebar-open');
      });
    });
  }

  const typewriterText = document.getElementById('typewriter-text');
  if (typewriterText) {
    const path = window.location.pathname;
    let text = "Creative Portfolio";
    if (path.includes("desmos")) {
      text = "Desmos Works";
    } else if (path.includes("welcome")) {
      text = "Welcome";
    }
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typewriterText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    typeWriter();
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Shadowbox logic
const modal = document.getElementById("shadowboxModal");
const modalImg = document.getElementById("shadowboxImage");
const captionText = document.getElementById("shadowboxCaption");
const closeBtn = document.getElementById("closeShadowbox");

document.querySelectorAll('.image-wrapper img').forEach(img => {
  img.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = "block";
    modalImg.src = this.src;
    const overlay = this.nextElementSibling;
    captionText.innerHTML = overlay?.querySelector('.title')?.innerText || '';
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
}

