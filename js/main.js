// Initialize the Map after DOM is loaded.
$(function initialize() {
  'use strict';
  var oldTownPasadena = new google.maps.LatLng(34.146580, -118.147700);

  // Set Map Options
  var mapOptions = {
    center: oldTownPasadena,
    zoom: 16,
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE
    },
    draggable: true
  };
  // Create Map Object
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  var $canvas = $('#map-canvas');
  $canvas.bind('touchmove', function(e) {
    e.preventDefault();
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    map.scrollBy(0, (touch.pageY - touch.pageX));
    console.log(touch.pageY + ' ' + touch.pageX);
  });

  //Style the Map's color, and labels with styleArray
  var styleArray = [{
    featureType: "all",
    stylers: [{
      saturation: -80
    }]
  }, {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{
      hue: "#00ffee"
    }, {
      saturation: 50
    }]
  }, {
    featureType: "road",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  }, {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  }];
  //Cache Icon Variables
  var restaurant = "js/icons/restaurant.png";
  var shopping = "js/icons/mall.png";
  var outdoors = "js/icons/amphitheater-2.png";
  var entertainment = "js/icons/movierental.png";
  var tvLandmark = "js/icons/star-3.png";

  // Create Model to Hold Knockout Data
  var ViewModel = {
    myMarkers: ko.observableArray([{
      name: "King Taco",
      location: new google.maps.LatLng(34.146699, -118.147875),
      icon: restaurant
    }, {
      name: "Penny's Cheesecake Factory",
      location: new google.maps.LatLng(34.145522, -118.150697),
      icon: tvLandmark
    }, {
      name: "Barney's Beanery",
      location: new google.maps.LatLng(34.146100, -118.148334),
      icon: restaurant
    }, {
      name: "Crepe Studio",
      location: new google.maps.LatLng(34.146976, -118.148322),
      icon: restaurant
    }, {
      name: "Pop! Champagne Bar",
      location: new google.maps.LatLng(34.147078, -118.149716),
      icon: restaurant
    }, {
      name: "Pasadena Antique Mall",
      location: new google.maps.LatLng(34.144846, -118.143920),
      icon: shopping
    }, {
      name: "Paseo Colorado",
      location: new google.maps.LatLng(34.145246, -118.144314),
      icon: shopping
    }, {
      name: "Colorado Boulevard",
      location: new google.maps.LatLng(34.145700, -118.15000),
      icon: shopping
    }, {
      name: "Pasadena City Hall",
      location: new google.maps.LatLng(34.147633, -118.143566),
      icon: tvLandmark
    }, {
      name: "Memorial Park",
      location: new google.maps.LatLng(34.148336, -118.147454),
      icon: outdoors
    }, {
      name: "Pasadena Civic Auditorium",
      location: new google.maps.LatLng(34.143771, -118.144274),
      icon: entertainment
    }, {
      name: "iPic Theaters",
      location: new google.maps.LatLng(34.146569, -118.151480),
      icon: entertainment
    }]),
    search: ko.observable(true),
    show: ko.observable(false),
    hide: ko.observable(true),
    toggleSearch: function() {
      viewModel.search(!viewModel.search());
      viewModel.show(!viewModel.show());
      viewModel.hide(!viewModel.hide());
    },
    searchQuery: ko.observable(""),
    goToLocation: function(marked) {
      if (viewModel.search()) {
        viewModel.toggleSearch();
      }
      setTimeout(function() {
        map.setZoom(16);
      }, 250);
      setTimeout(function() {
        map.panTo(marked.location);
      }, 500);
      setTimeout(function() {
        map.setZoom(19);
      }, 750);
    }
  };
  var makeMyMarkers = function() {
    for (var i = 0; i < viewModel.myMarkers().length; i++) {
      var image = viewModel.myMarkers()[i].icon;
      var marker = new google.maps.Marker({
        position: viewModel.myMarkers()[i].location,
        map: map,
        title: viewModel.myMarkers()[i].name,
        icon: image
      });
    }
    map.setOptions({
      styles: styleArray
    });
    ko.applyBindings(viewModel);
    var oauth = OAuth({
    consumer: {
        public: 'gWgPHhf_cUVygsDdtxhxBA',
        secret: 'LyiUUi2Kl4123DYz5YqXt3jb4sY'
    },
    signature_method: 'HMAC-SHA1'
});
var yelpURL = 'http://api.yelp.com/v2/search?term=' + viewModel.searchQuery() + '&limit=20&radius_filter=600&ll=34.146580,-118.147700';
var request_data = {
    url: yelpURL,
    method: 'POST',
    data: {
        status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
    }
};
var token = {
    public: 'rE0G5zUpsVWJ8e5UU4adj5H_H7mxZfDz',
    secret: 'X2AkFXAyJ7gn64rib2FD4cCYQYU'
};

$.ajax({
    url: request_data.url,
    type: request_data.method,
    data: request_data.data,
    headers: oauth.toHeader(oauth.authorize(request_data, token))
}).done(function(data) {
    console.log(data);
});
}();
});