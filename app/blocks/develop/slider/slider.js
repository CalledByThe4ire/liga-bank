/* global Swiper */
/* eslint-disable no-unused-vars */

document.addEventListener(`DOMContentLoaded`, () => {
  const mainSlider = new Swiper(`.about`, {
    loop: true,
    speed: 500,
    spaceBetween: 30,
    noSwiping: false,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: `.swiper-pagination`,
      type: `bullets`,
      clickable: `false`
    },
    breakpoints: {
      1024: {
        noSwiping: true,
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`,
          clickable: true
        },
        autoplay: {
          delay: 4000
        }
      }
    }
  });
});
