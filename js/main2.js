

$(function() {
	'use strict';
  //Google Maps
  var mapOptions = {
    center: new google.maps.LatLng(34.146580, -118.147700),
    zoom: 16,
    mapTypeControl: true,
    mapTypeControlOptions: {
    position: google.maps.ControlPosition.LEFT_BOTTOM
  }
};

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

  var myMarkers = ko.observableArray([{
      name: "King Taco",
      location: new google.maps.LatLng(34.146699, -118.147875),
      icon: "js/icons/fastfood.png"
    }, {
      name: "Penny's Cheesecake Factory from The Big Bang Theory",
      location: new google.maps.LatLng(34.145522, -118.150697),
      icon: "js/icons/star-3.png"
    }, {
      name: "Barney's Beanery",
      location: new google.maps.LatLng(34.146100, -118.148334),
      icon: "js/icons/fastfood.png"
    }, {
      name: "Crepe Studio",
      location: new google.maps.LatLng(34.146976, -118.148322),
      icon: "js/icons/fastfood.png"
    }, {
      name: "Pop! Champagne Bar",
      location: new google.maps.LatLng(34.147078, -118.149716),
      icon: "js/icons/fastfood.png"
    }, {
      name: "Pasadena Antique Mall",
      location: new google.maps.LatLng(34.144846, -118.143920),
      icon: "js/icons/fastfood.png"
    }, {
      name: "Paseo Colorado",
      location: new google.maps.LatLng(34.145246, -118.144314),
      icon: "js/icons/fastfood.png"
    }, {
      name: "Colorado Boulevard",
      location: new google.maps.LatLng(34.145700, -118.15000),
      icon: "js/icons/fastfood.png"
    }, {
      name: "Pasadena City Hall",
      location: new google.maps.LatLng(34.147633, -118.143566),
      icon: "js/icons/star-3.png"
    }, {
      name: "Memorial Park",
      location: new google.maps.LatLng(34.148336, -118.147454),
      icon: "js/icons/flowers.png"
    }, {
      name: "Pasadena Civic Auditorium",
      location: new google.maps.LatLng(34.143771, -118.144274),
      icon: "js/icons/movierental.png"
    }, {
      name: "iPic Theaters",
      location: new google.maps.LatLng(34.146569, -118.151480),
      icon: "js/icons/movierental.png"
    }]);
//Create New Map Object
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
//Implement styleArray
  map.setOptions({styles: styleArray});

// Create Markers
  var makeMyMarkers = function() {
    console.log(myMarkers());
      for (var i = 0; i < myMarkers().length; i++) {
        var image = myMarkers()[i].icon;
        var marker = new google.maps.Marker({
          position: myMarkers()[i].location,
          map: map,
          title: myMarkers()[i].name,
          icon: image
        });
    }
  };
  makeMyMarkers();
});
