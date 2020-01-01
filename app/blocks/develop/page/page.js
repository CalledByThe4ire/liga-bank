/* global document */

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page');
  page.classList.remove('page_no_js');
  page.classList.add('page_js');
});
