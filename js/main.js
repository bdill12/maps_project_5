var markersArray = [];
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
    markersArray = [{
      name: "King Taco",
      location: new google.maps.LatLng(34.146699, -118.147875),
      icon: "js/icons/restaurant_mexican.png"
    }, {
      name: "Penny's Cheesecake Factory from The Big Bang Theory",
      location: new google.maps.LatLng(34.145522, -118.150697),
      icon: "js/icons/tv.png" 
    }, {
      name: "Barney's Beanery",
      location: new google.maps.LatLng(34.146100, -118.148334),
      icon: "js/icons/bar.png"
    }, {
      name: "Crepe Studio",
      location: new google.maps.LatLng(34.146976, -118.148322),
      icon: "js/icons/icecream.png"
    }, {
      name: "Pop! Champagne Bar",
      location: new google.maps.LatLng(34.147078, -118.149716),
      icon: "js/icons/winebar.png"
    }, {
      name: "Pasadena Antique Mall",
      location: new google.maps.LatLng(34.144846, -118.143920),
      icon: "js/icons/artgallery.png"
    }, {
      name: "Paseo Colorado",
      location: new google.maps.LatLng(34.145246, -118.144314),
      icon: "js/icons/mall.png"
    }, {
      name: "Colorado Boulevard",
      location: new google.maps.LatLng(34.145700, -118.15000),
      icon: "js/icons/departmentstore.png"
    }, {
      name: "Pasadena City Hall",
      location: new google.maps.LatLng(34.147633, -118.143566),
      icon: "js/icons/tv.png"
    }, {
      name: "Memorial Park",
      location: new google.maps.LatLng(34.148336, -118.147454),
      icon: "js/icons/flowers.png"
    }, {
      name: "Pasadena Civic Auditorium",
      location: new google.maps.LatLng(34.143771, -118.144274),
      icon: "js/icons/ticket_office2.png"
    }, {
      name: "iPic Theaters",
      location: new google.maps.LatLng(34.146569, -118.151480),
      icon: "js/icons/movierental.png"
    }];
    for (var i = 0; i < markersArray.length; i++) {
        var image = markersArray[i].icon;
				var marker = new google.maps.Marker({
					position: markersArray[i].location,
					map: map,
					title: markersArray[i].name,
          icon: image
				});
      }
};
	makeMyMarkers();

var ViewModel = {
  myMarkers: ko.observableArray()
};
for (var i = 0; i < markersArray; i++) {
  ViewModel.myMarkers.push(markersArray[i]);
}

ko.applyBindings(window.ViewModel);

});