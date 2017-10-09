/**
 * Карта
 */

var map = document.querySelector('.contacts__map-pic');
var mapGoogle = document.getElementById('map');

map.classList.add('contacts__map-pic--hidden');

mapGoogle.classList.add('contacts__google-maps');

// var mapGoogle = document.querySelector(".contacts__google-maps");

// if(mapGoogle != null) {
//   alert("test");
//   map.classList.add("contacts__map-pic--hidden");
// };

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.938549, lng: 30.322993},
    zoom: 17,
    styles: [
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {
              "hue": "#a600ff"
          }
      ]
    },
    {
      "featureType": "all",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "hue": "#00ff53"
          }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels",
      "stylers": [
          {
              "weight": "0.01"
          },
          {
              "hue": "#0087ff"
          }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "hue": "#ff7800"
          }
        ]
      }
    ]
  });

  var marker = new google.maps.Marker({
    position: {lat: 59.938549, lng: 30.322993},
    map: map,
    title: 'Мишка',
    icon: 'img/icon-map-pin.svg'
  });
};
