/* global Swiper */

document.addEventListener(`DOMContentLoaded`, () => {
  const swiperContainer = document.querySelector(
    `#slider .swiper-container`
  );

  if (swiperContainer) {
    const swiper = new Swiper(swiperContainer, {
      noSwiping: true,
      autoHeight: true,
      // autoplay: {
      //   delay: 4000
      // },
      pagination: {
        el: `.swiper-pagination`,
        type: `bullets`,
        clickable: `true`,
      },
      breakpoints: {
        1023: {
          autoplay: {
            delay: 3000
          },
          noSwiping: false,
        }
      }
    });
  }
});
