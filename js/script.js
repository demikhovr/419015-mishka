function openMenu(){navMain.classList.contains("main-nav--closed")?(navMain.classList.remove("main-nav--closed"),navMain.classList.add("main-nav--opened")):(navMain.classList.add("main-nav--closed"),navMain.classList.remove("main-nav--opened"))}function initMap(){var e=new google.maps.Map(document.querySelector(".contacts__google-maps"),{center:{lat:59.938549,lng:30.322993},zoom:17,styles:[{featureType:"all",elementType:"all",stylers:[{hue:"#a600ff"}]},{featureType:"all",elementType:"geometry.fill",stylers:[{hue:"#00ff53"}]},{featureType:"all",elementType:"labels",stylers:[{weight:"0.01"},{hue:"#0087ff"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{hue:"#ff7800"}]}]});new google.maps.Marker({position:{lat:59.938549,lng:30.322993},map:e,title:"Мишка",icon:"img/icon-map-pin.svg"})}var navMain=document.querySelector(".main-nav"),navToggle=document.querySelector(".main-nav__toggle");navMain.classList.remove("main-nav--nojs"),navToggle.onclick=function(){openMenu()};var featured=document.querySelector(".featured__btn"),modalCart=document.querySelector(".modal--cart"),modalOverlay=document.querySelector(".modal-overlay"),catalogItems=document.querySelectorAll(".catalog-item__btn");null!=modalOverlay&&modalOverlay.addEventListener("click",function(e){e.preventDefault(),modalOverlay.classList.remove("modal-overlay--show"),modalCart.classList.remove("modal--show")}),window.addEventListener("keydown",function(e){27===e.keyCode&&modalCart.classList.contains("modal--show")&&(modalCart.classList.remove("modal--show"),modalOverlay.classList.remove("modal-overlay--show"))}),null!=catalogItems&&[].forEach.call(catalogItems,function(e){e.addEventListener("click",function(e){e.preventDefault(),modalCart.classList.add("modal--show"),modalOverlay.classList.add("modal-overlay--show")})}),null!=featured&&featured.addEventListener("click",function(e){e.preventDefault(),modalCart.classList.add("modal--show"),modalOverlay.classList.add("modal-overlay--show")});var slider=document.querySelector(".reviews");if(null!=slider){var sliderList=slider.querySelector(".reviews__list"),sliderItems=slider.querySelectorAll(".reviews__item"),prevBtn=slider.querySelector(".reviews__toggle--prev"),nextBtn=slider.querySelector(".reviews__toggle--next"),slideWidth=100,slideCount=1,slideTotal=3,position=0;prevBtn.addEventListener("click",function(){position=Math.min(position+slideWidth*slideCount,0),sliderList.style.transform="translateX("+position+"%)",3==++slideTotal?prevBtn.disabled=!0:(nextBtn.disabled=!1,prevBtn.disabled=!1)}),nextBtn.addEventListener("click",function(){position=Math.max(position-slideWidth*slideCount,-slideWidth*(sliderItems.length-slideCount)),sliderList.style.transform="translateX("+position+"%)",1==--slideTotal?nextBtn.disabled=!0:(nextBtn.disabled=!1,prevBtn.disabled=!1)})}var map=document.querySelector(".contacts__google-maps");