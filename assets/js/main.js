/**
* Template Name: FolioOne
* Template URL: https://bootstrapmade.com/folioone-bootstrap-portfolio-website-template/
* Updated: Aug 23 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    document.querySelector('.navmenu').classList.toggle('active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  document.addEventListener('click', (e) => {
    const navmenu = document.querySelector('.navmenu');
    if (navmenu && e.target !== navmenu && !navmenu.contains(e.target) && e.target !== mobileNavToggleBtn && !mobileNavToggleBtn.contains(e.target)) {
      if (document.body.classList.contains('mobile-nav-active')) {
        mobileNavToogle();
      }
    }
  });

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 500);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Keep the circular homepage portrait video playing when the tab resumes.
   */
  const avatarVideo = document.querySelector('#hero-avatar-video');

  if (avatarVideo) {
    function keepAvatarVideoPlaying() {
      const playRequest = avatarVideo.play();
      if (playRequest && typeof playRequest.catch === 'function') {
        playRequest.catch(() => {});
      }
    }

    keepAvatarVideoPlaying();
    avatarVideo.addEventListener('canplay', keepAvatarVideoPlaying, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) keepAvatarVideoPlaying();
    });

    const heroMuteToggle = document.querySelector('#hero-mute-toggle');
    if (heroMuteToggle) {
      heroMuteToggle.addEventListener('click', () => {
        avatarVideo.muted = !avatarVideo.muted;
        if (avatarVideo.muted) {
          heroMuteToggle.classList.add('is-muted');
          heroMuteToggle.classList.remove('is-unmuted');
          heroMuteToggle.setAttribute('aria-label', 'Unmute video');
          heroMuteToggle.innerHTML = '<i class="bi bi-volume-mute"></i>';
        } else {
          heroMuteToggle.classList.remove('is-muted');
          heroMuteToggle.classList.add('is-unmuted');
          heroMuteToggle.setAttribute('aria-label', 'Mute video');
          heroMuteToggle.innerHTML = '<i class="bi bi-volume-up"></i>';
        }
      });
    }
  }

  const aboutVideo = document.querySelector('.about-video');
  const aboutMuteToggle = document.querySelector('#about-mute-toggle');
  if (aboutVideo && aboutMuteToggle) {
    aboutMuteToggle.addEventListener('click', () => {
      aboutVideo.muted = !aboutVideo.muted;
      if (aboutVideo.muted) {
        aboutMuteToggle.classList.add('is-muted');
        aboutMuteToggle.classList.remove('is-unmuted');
        aboutMuteToggle.setAttribute('aria-label', 'Unmute video');
        aboutMuteToggle.innerHTML = '<i class="bi bi-volume-mute"></i>';
      } else {
        aboutMuteToggle.classList.remove('is-muted');
        aboutMuteToggle.classList.add('is-unmuted');
        aboutMuteToggle.setAttribute('aria-label', 'Mute video');
        aboutMuteToggle.innerHTML = '<i class="bi bi-volume-up"></i>';
      }
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();
