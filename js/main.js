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
  map.setOptions({styles: styleArray});

});
