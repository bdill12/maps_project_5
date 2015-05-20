// Initialize the Map after DOM is loaded.
$(function initialize() {
	'use strict';
	var mapOptions = {
		center: new google.maps.LatLng(34.146580, -118.147700),
        zoom: 16,
        mapTypeControl: true,
        mapTypeControlOptions: {
        	position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    };
    console.log('mapOptions set...');
    var map = new google.maps.Map(document.getElementById('map-canvas'),
    	mapOptions);
    console.log('map object created...');
});

