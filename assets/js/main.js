/**
* Template Name: Arsha
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Service page section visibility
   * control based on service category selected
   */
  window.addEventListener('load', function() {
    // Get button elements by ID
    var btnAftsl = document.getElementById('btnAftsl');
    var btnIrr = document.getElementById('btnIrr');
    var btnIdm = document.getElementById('btnIdm');

    // Get sections by ID
    var aftsl_serv = document.getElementById('aftsl_serv');
    var irr_serv = document.getElementById('irr_serv');
    var ins_serv = document.getElementById('ins_serv');

    // Attach a click event listener to the btnAftsl button
    btnAftsl.addEventListener('click', function() {
    btnAftsl.style.fontWeight='bold';
    btnIrr.style.fontWeight='normal';
    btnIdm.style.fontWeight='normal';

    aftsl_serv.classList.remove('d-none');
    aftsl_serv.classList.add('d-block');

    irr_serv.classList.remove('d-block');
    irr_serv.classList.add('d-none');

    ins_serv.classList.remove('d-block');
    ins_serv.classList.add('d-none');    
    });

    // Attach a click event listener to the btnIrr button
    btnIrr.addEventListener('click', function() {
    btnIrr.style.fontWeight='bold';
    btnAftsl.style.fontWeight='normal';
    btnIdm.style.fontWeight='normal';

    irr_serv.classList.remove('d-none');
    irr_serv.classList.add('d-block');

    aftsl_serv.classList.remove('d-block');
    aftsl_serv.classList.add('d-none');

    ins_serv.classList.remove('d-block');
    ins_serv.classList.add('d-none');    
  });

    // Attach a click event listener to the btnIdm button
    btnIdm.addEventListener('click', function() {
    btnIdm.style.fontWeight='bold';
    btnAftsl.style.fontWeight='normal';
    btnIrr.style.fontWeight='normal';

    ins_serv.classList.remove('d-none');
    ins_serv.classList.add('d-block');

    aftsl_serv.classList.remove('d-block');
    aftsl_serv.classList.add('d-none');

    irr_serv.classList.remove('d-block');
    irr_serv.classList.add('d-none');    
    });
  });

  /**
   * Product page products section visibility
   * control based on product category selected
   */
  window.addEventListener('load', function() {
    // Get button elements by ID
    var btnWP = document.getElementById('btnWP');
    var btnRGS = document.getElementById('btnRGS');
    var btnGen = document.getElementById('btnGen');

    // Get sections by ID
    var wp_shop = document.getElementById('wp_shop');
    var wp_top_items = document.getElementById('wp_top_items');
    var rgs_shop = document.getElementById('rgs_shop');
    var rgs_top_items = document.getElementById('rgs_top_items');
    var gen_shop = document.getElementById('gen_shop');
    var gen_top_items = document.getElementById('gen_top_items');
    
    // Attach a click event listener to the btnWP button
    btnWP.addEventListener('click', function() {
      btnWP.style.fontWeight='bold';
      btnRGS.style.fontWeight='normal';
      btnGen.style.fontWeight='normal';

      wp_shop.classList.remove('d-none');
      wp_shop.classList.add('d-block');
      wp_top_items.classList.remove('d-none');
      wp_top_items.classList.add('d-block');

      rgs_shop.classList.remove('d-block');
      rgs_shop.classList.add('d-none');
      rgs_top_items.classList.remove('d-block');
      rgs_top_items.classList.add('d-none');

      gen_shop.classList.remove('d-block');
      gen_shop.classList.add('d-none');
      gen_top_items.classList.remove('d-block');
      gen_top_items.classList.add('d-none');
    });

    // Attach a click event listener to the btnRGS button
    btnRGS.addEventListener('click', function() {
      btnRGS.style.fontWeight='bold';
      btnWP.style.fontWeight='normal';
      btnGen.style.fontWeight='normal';

      rgs_shop.classList.remove('d-none');
      rgs_shop.classList.add('d-block');
      rgs_top_items.classList.remove('d-none');
      rgs_top_items.classList.add('d-block');

      wp_shop.classList.remove('d-block');
      wp_shop.classList.add('d-none');
      wp_top_items.classList.remove('d-block');
      wp_top_items.classList.add('d-none');

      gen_shop.classList.remove('d-block');
      gen_shop.classList.add('d-none');
      gen_top_items.classList.remove('d-block');
      gen_top_items.classList.add('d-none');
    });

    // Attach a click event listener to the btnGen button
    btnGen.addEventListener('click', function() {
      btnGen.style.fontWeight='bold';
      btnRGS.style.fontWeight='normal';
      btnWP.style.fontWeight='normal';

      gen_shop.classList.remove('d-none');
      gen_shop.classList.add('d-block');
      gen_top_items.classList.remove('d-none');
      gen_top_items.classList.add('d-block');

      rgs_shop.classList.remove('d-block');
      rgs_shop.classList.add('d-none');
      rgs_top_items.classList.remove('d-block');
      rgs_top_items.classList.add('d-none');

      wp_shop.classList.remove('d-block');
      wp_shop.classList.add('d-none');
      wp_top_items.classList.remove('d-block');
      wp_top_items.classList.add('d-none');      
    });
  });

})()