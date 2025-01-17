  const swiperElements = document.querySelectorAll('[cw-swiper="swiper"]');

  swiperElements.forEach((swiperElement) => {
    const swiper = new Swiper(swiperElement.querySelector('.swiper'), {
      loop: swiperElement.getAttribute('cw-swiper-loop') === 'true',
      direction: swiperElement.getAttribute('cw-swiper-direction') || 'horizontal',
      speed: parseInt(swiperElement.getAttribute('cw-swiper-speed')) || 300,
      initialSlide: parseInt(swiperElement.getAttribute('cw-swiper-initial-slide')) || 0,
      effect: swiperElement.getAttribute('cw-swiper-effect') || 'slide',
      grabCursor: swiperElement.getAttribute('cw-swiper-grab-cursor') === 'true',
      centeredSlides: swiperElement.getAttribute('cw-swiper-centered-slides') === 'true',
      spaceBetween: parseInt(swiperElement.getAttribute('cw-swiper-space-between')) || 20,

      autoplay: swiperElement.getAttribute('cw-swiper-autoplay') === 'true' ? {
        delay: parseInt(swiperElement.getAttribute('cw-swiper-autoplay-delay')) || 3000,
        disableOnInteraction: swiperElement.getAttribute('cw-swiper-autoplay-disable-on-interaction') === 'true'
      } : false,

      pagination: swiperElement.getAttribute('cw-swiper-pagination') === 'true' ? {
        el: swiperElement.querySelector(`.${swiperElement.getAttribute('cw-swiper-pagination-el')}`),
        clickable: swiperElement.getAttribute('cw-swiper-pagination-clickable') === 'true',
        type: swiperElement.getAttribute('cw-swiper-pagination-type') || 'bullets',
        dynamicBullets: swiperElement.getAttribute('cw-swiper-pagination-dynamic-bullets') === 'true',
        bulletClass: swiperElement.getAttribute('cw-swiper-pagination-bullet-class') || 'swiper_bullet',
        bulletActiveClass: swiperElement.getAttribute('cw-swiper-pagination-bullet-active-class') || 'swiper_bullet-active'
      } : false,

      navigation: {
        nextEl: swiperElement.querySelector(`.${swiperElement.getAttribute('cw-swiper-navigation-next-el')}`),
        prevEl: swiperElement.querySelector(`.${swiperElement.getAttribute('cw-swiper-navigation-prev-el')}`),
        disabledClass: swiperElement.getAttribute('cw-swiper-navigation-disabled-class') || 'swiper_button-disabled'
      },

      breakpoints: {
        0: {
          slidesPerView: parseInt(swiperElement.getAttribute('cw-swiper-mobile-slides-per-view')) || 1,
          spaceBetween: parseInt(swiperElement.getAttribute('cw-swiper-mobile-space-between')) || 10
        },
        767: {
          slidesPerView: parseInt(swiperElement.getAttribute('cw-swiper-tablet-slides-per-view')) || 2,
          spaceBetween: parseInt(swiperElement.getAttribute('cw-swiper-tablet-space-between')) || 15
        },
        988: {
          slidesPerView: parseInt(swiperElement.getAttribute('cw-swiper-desktop-slides-per-view')) || 3,
          spaceBetween: parseInt(swiperElement.getAttribute('cw-swiper-desktop-space-between')) || 20
        }
      },

      thumbs: swiperElement.getAttribute('cw-swiper-thumbs') ? {
        swiper: document.querySelector(`.${swiperElement.getAttribute('cw-swiper-thumbs')}`)
      } : undefined,  // Use undefined if thumbs is not provided
    });
  });
