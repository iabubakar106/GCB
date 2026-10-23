// Shared interactions for every GCB page.
function hidePageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  loader.classList.add('is-hidden');
  loader.setAttribute('aria-hidden', 'true');
}

// Clear a transition overlay when the browser restores a cached page.
window.addEventListener('pageshow', hidePageLoader);
window.addEventListener('pagehide', hidePageLoader);

document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('menu-btn');
  const sidebar = document.getElementById('mySidebar');
  const overlay = document.getElementById('overlay');
  const loader = document.getElementById('page-loader');
  const scrollTopLink = document.querySelector('.gcb-scroll-top');

  function closeMenu() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove('w3-show');
    overlay.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  }

  if (menuButton && sidebar && overlay) {
    menuButton.addEventListener('click', function () {
      const isOpen = sidebar.classList.toggle('w3-show');
      overlay.classList.toggle('is-visible', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
    overlay.addEventListener('click', closeMenu);
    sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  sidebar && sidebar.querySelectorAll('a[href]').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });

  const mvvTabs = Array.from(document.querySelectorAll('.gcb-mvv-tab'));
  mvvTabs.forEach((tab, index) => {
    tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
    tab.addEventListener('keydown', function (event) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % mvvTabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + mvvTabs.length) % mvvTabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = mvvTabs.length - 1;
      const nextTab = mvvTabs[nextIndex];
      nextTab.focus();
      openCity(nextTab.getAttribute('aria-controls'));
    });
  });

  // Show a lightweight page transition indicator for same-site navigation.
  if (loader) {
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname.endsWith('.html') && url.pathname !== window.location.pathname) {
        link.addEventListener('click', function () {
          loader.classList.remove('is-hidden');
          loader.setAttribute('aria-hidden', 'false');
        });
      }
    });
    window.addEventListener('load', function () {
      window.setTimeout(hidePageLoader, 180);
    });
    // Also hide it if this script runs after the load event.
    if (document.readyState === 'complete') window.setTimeout(hidePageLoader, 180);
  }

  if (scrollTopLink) {
    const updateScrollTopVisibility = function () {
      const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      scrollTopLink.classList.toggle('is-visible', pageBottom);
      scrollTopLink.setAttribute('aria-hidden', String(!pageBottom));
      scrollTopLink.tabIndex = pageBottom ? 0 : -1;
    };
    window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
    window.addEventListener('resize', updateScrollTopVisibility);
    window.addEventListener('load', updateScrollTopVisibility);
    updateScrollTopVisibility();
  }
});

function toggleAccordion(id) {
  document.querySelectorAll('#services > div.w3-hide.w3-show').forEach(section => {
    if (section.id !== id) section.classList.remove('w3-show');
  });
  const element = document.getElementById(id);
  if (element) element.classList.toggle('w3-show');
}

// Auto-advancing carousels; gracefully skip when a page has no matching slides.
function startCarousel(className, interval) {
  const slides = Array.from(document.getElementsByClassName(className));
  if (!slides.length) return;
  let index = 0;
  slides.forEach((slide, i) => { slide.style.display = i === 0 ? 'block' : 'none'; });
  window.setInterval(function () {
    slides[index].style.display = 'none';
    index = (index + 1) % slides.length;
    slides[index].style.display = 'block';
  }, interval);
}
document.addEventListener('DOMContentLoaded', function () {
  startCarousel('mySlides', 4500);
  const homeCarousel = document.querySelector('.gcb-home-slideshow');
  if (homeCarousel) {
    const slides = Array.from(homeCarousel.querySelectorAll('.gcb-home-slide'));
    const dots = Array.from(homeCarousel.querySelectorAll('.gcb-home-slide-dot'));
    if (slides.length) {
      let index = 0;
      let timer;
      const showHomeSlide = function (nextIndex) {
        index = (nextIndex + slides.length) % slides.length;
        slides.forEach((slide, i) => {
          slide.style.display = i === index ? 'block' : 'none';
          slide.setAttribute('aria-hidden', String(i !== index));
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === index);
          dot.setAttribute('aria-pressed', String(i === index));
        });
      };
      const restartHomeTimer = function () {
        window.clearInterval(timer);
        timer = window.setInterval(() => showHomeSlide(index + 1), 6500);
      };
      dots.forEach((dot, i) => dot.addEventListener('click', function () {
        showHomeSlide(i);
        restartHomeTimer();
      }));
      showHomeSlide(0);
      restartHomeTimer();
    }
  }
  const staffCarousel = document.querySelector('.gcb-staff-carousel');
  if (staffCarousel) {
    const slides = Array.from(staffCarousel.querySelectorAll('.headSlides'));
    const dots = Array.from(staffCarousel.querySelectorAll('.gcb-staff-dot'));
    if (slides.length) {
      let index = 0;
      let timer;
      const showSlide = function (nextIndex) {
        index = (nextIndex + slides.length) % slides.length;
        slides.forEach((slide, i) => {
          slide.style.display = i === index ? 'grid' : 'none';
          slide.setAttribute('aria-hidden', String(i !== index));
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === index);
          dot.setAttribute('aria-pressed', String(i === index));
        });
      };
      const startTimer = function () {
        window.clearInterval(timer);
        timer = window.setInterval(() => showSlide(index + 1), 6000);
      };
      dots.forEach((dot, i) => dot.addEventListener('click', function () {
        showSlide(i);
        startTimer();
      }));
      showSlide(0);
      startTimer();
    }
  }
});

function myFunction() {
  const element = document.getElementById('Drop');
  if (element) {
    const isOpen = element.classList.toggle('w3-show');
    element.previousElementSibling.setAttribute('aria-expanded', String(isOpen));
  }
}
function myFunction1() {
  const element = document.getElementById('Drop1');
  if (element) {
    const isOpen = element.classList.toggle('w3-show');
    element.previousElementSibling.setAttribute('aria-expanded', String(isOpen));
  }
}
function openCity(cityName) {
  document.querySelectorAll('.gcb-mvv-section .motto').forEach(section => {
    section.style.display = section.id === cityName ? 'block' : 'none';
  });
  document.querySelectorAll('.gcb-mvv-tab').forEach(tab => {
    const isSelected = tab.getAttribute('aria-controls') === cityName;
    tab.setAttribute('aria-selected', String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    tab.classList.toggle('is-active', isSelected);
  });
}
function myFunction2() {
  const element = document.getElementById('Drop2');
  if (element) element.classList.toggle('w3-show');
}
