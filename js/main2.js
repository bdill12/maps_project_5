$(function() {
	'use strict';
	var model = {
	myMarkers: ko.observableArray([{
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
    }])};
});