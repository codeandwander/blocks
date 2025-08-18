const swiperElements = document.querySelectorAll('[blx-swiper="swiper"]');
  swiperElements.forEach((swiperElement) => {
    const swiper = new Swiper(swiperElement.querySelector('.swiper'), {
      loop: swiperElement.getAttribute('blx-swiper-loop') === 'true',
      direction: swiperElement.getAttribute('blx-swiper-direction') || 'horizontal',
      speed: parseInt(swiperElement.getAttribute('blx-swiper-speed')) || 300,
      initialSlide: parseInt(swiperElement.getAttribute('blx-swiper-initial-slide')) || 0,
      effect: swiperElement.getAttribute('blx-swiper-effect') || 'slide',
      grabCursor: swiperElement.getAttribute('blx-swiper-grab-cursor') === 'true',
      centeredSlides: swiperElement.getAttribute('blx-swiper-centered-slides') === 'true',
      spaceBetween: parseInt(swiperElement.getAttribute('blx-swiper-space-between')) || 20,
      autoplay: swiperElement.getAttribute('blx-swiper-autoplay') === 'true' ? {
        delay: parseInt(swiperElement.getAttribute('blx-swiper-autoplay-delay')) || 3000,
        disableOnInteraction: swiperElement.getAttribute('blx-swiper-autoplay-disable-on-interaction') === 'true'
      } : false,
      pagination: swiperElement.getAttribute('blx-swiper-pagination') === 'true' ? {
        el: swiperElement.querySelector(`.${swiperElement.getAttribute('blx-swiper-pagination-el')}`),
        clickable: swiperElement.getAttribute('blx-swiper-pagination-clickable') === 'true',
        type: swiperElement.getAttribute('blx-swiper-pagination-type') || 'bullets',
        dynamicBullets: swiperElement.getAttribute('blx-swiper-pagination-dynamic-bullets') === 'true',
        bulletClass: swiperElement.getAttribute('blx-swiper-pagination-bullet-class') || 'swiper_bullet',
        bulletActiveClass: swiperElement.getAttribute('blx-swiper-pagination-bullet-active-class') || 'swiper_bullet-active'
      } : false,
      navigation: {
        nextEl: swiperElement.querySelector(`.${swiperElement.getAttribute('blx-swiper-navigation-next-el')}`),
        prevEl: swiperElement.querySelector(`.${swiperElement.getAttribute('blx-swiper-navigation-prev-el')}`),
        disabledClass: swiperElement.getAttribute('blx-swiper-navigation-disabled-class') || 'swiper_button-disabled'
      },
      breakpoints: {
        0: {
          slidesPerView: parseInt(swiperElement.getAttribute('blx-swiper-mobile-slides-per-view')) || 1,
          spaceBetween: parseInt(swiperElement.getAttribute('blx-swiper-mobile-space-between')) || 10
        },
        767: {
          slidesPerView: parseInt(swiperElement.getAttribute('blx-swiper-tablet-slides-per-view')) || 2,
          spaceBetween: parseInt(swiperElement.getAttribute('blx-swiper-tablet-space-between')) || 15
        },
        988: {
          slidesPerView: parseInt(swiperElement.getAttribute('blx-swiper-desktop-slides-per-view')) || 3,
          spaceBetween: parseInt(swiperElement.getAttribute('blx-swiper-desktop-space-between')) || 20
        }
      },
      thumbs: swiperElement.getAttribute('blx-swiper-thumbs') ? {
        swiper: document.querySelector(`.${swiperElement.getAttribute('blx-swiper-thumbs')}`)
      } : undefined,  // Use undefined if thumbs is not provided
    });
  });
