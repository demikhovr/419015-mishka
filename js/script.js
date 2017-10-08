/**
 * Открытие/закрытие меню на мобильной версии сайта
 */

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

function openMenu() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  };
};

navToggle.onclick = function() {
  openMenu();
};

/**
 * Открытие/закрытие модального окна
 */

var featured = document.querySelector('.featured__btn');
var modalCart = document.querySelector('.modal--cart');
var modalOverlay = document.querySelector('.modal-overlay');
var catalogItems = document.querySelectorAll('.catalog-item__btn');

if(modalOverlay != null) {
  modalOverlay.addEventListener('click', function (event) {
    event.preventDefault();
    modalOverlay.classList.remove('modal-overlay--show');
    modalCart.classList.remove('modal--show');
  });
};

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (modalCart.classList.contains("modal--show")) {
      modalCart.classList.remove("modal--show");
      modalOverlay.classList.remove('modal-overlay--show');
    }
  }
});

if(catalogItems != null) {
  [].forEach.call(catalogItems, function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault();
      modalCart.classList.add('modal--show');
      modalOverlay.classList.add('modal-overlay--show');
    });
  });
};

if(featured != null) {
  featured.addEventListener('click', function(event) {
    event.preventDefault();
    modalCart.classList.add('modal--show');
    modalOverlay.classList.add('modal-overlay--show');
  });
};

/**
 * Карта
 */

var map = document.querySelector(".contacts__map-pic");

map.classList.add('contacts__map-pic--hidden');

// var mapGoogle = document.querySelector(".contacts__google-maps");

// if(mapGoogle != null) {
//   alert("test");
//   map.classList.add("contacts__map-pic--hidden");
// };
