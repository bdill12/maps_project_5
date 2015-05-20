// Initialize the Map after DOM is loaded.
$(function initialize() {
  'use strict';
  // Set Map Options
  var mapOptions = {
    center: new google.maps.LatLng(34.146580, -118.147700),
    zoom: 16,
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  };

  // Create Map Object
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

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

  // Implement Style
  map.setOptions({
    styles: styleArray
  });

  //Create Markers
  var makeMyMarkers = function() {
    var markersArray = [{
      name: "King Taco",
      location: new google.maps.LatLng(34.146699, -118.147875)
    }, {
      name: "Penny's Cheesecake Factory from The Big Bang Theory",
      location: new google.maps.LatLng(34.145522, -118.150697)
    }, {
      name: "Barney's Beanery",
      location: new google.maps.LatLng(34.146100, -118.148334)
    }, {
      name: "Crepe Studio",
      location: new google.maps.LatLng(34.146976, -118.148322)
    }, {
      name: "Pop! Champagne and Dessert Bar",
      location: new google.maps.LatLng(34.147078, -118.149716)
    }, {
      name: "Pasadena Antique Mall",
      location: new google.maps.LatLng(34.144846, -118.143920)
    }, {
      name: "Paseo Colorado",
      location: new google.maps.LatLng(34.145246, -118.144314)
    }, {
      name: "Colorado Boulevard",
      location: new google.maps.LatLng(34.145522, -118.150697)
    }, {
      name: "Pasadena City Hall, AKA Pawnee City Hall",
      location: new google.maps.LatLng(34.147633, -118.143566)
    }, {
      name: "Memorial Park",
      location: new google.maps.LatLng(34.148336, -118.147454)
    }, {
      name: "Pasadena Civic Auditorium",
      location: new google.maps.LatLng(34.143771, -118.144274)
    }, {
      name: "iPic Theaters",
      location: new google.maps.LatLng(34.146569, -118.151480)
    }];
    for (var i = 0; i < markersArray.length; i++) {
      var marker = new google.maps.Marker({
        position: markersArray[i].location,
        map: map,
        title: markersArray[i].name
      });
    }
  }
	makeMyMarkers();

});
