var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

var featured = document.querySelector('.featured__btn');
var modalCart = document.querySelector('.modal--cart');
var modalOverlay = document.querySelector('.modal-overlay');


featured.addEventListener('click', function(event) {
  event.preventDefault();
  modalCart.classList.add('modal--show');
  modalOverlay.classList.add('modal-overlay--show');
});

modalOverlay.addEventListener('click', function (event) {
  event.preventDefault();
  modalOverlay.classList.remove('modal-overlay--show');
  modalCart.classList.remove('modal--show');
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (modalCart.classList.contains("modal--show")) {
      modalCart.classList.remove("modal--show");
      modalOverlay.classList.remove('modal-overlay--show');
    }
  }
});
