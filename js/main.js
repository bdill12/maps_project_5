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
  //Coffee Shops
  var coffeeShops = "js/icons/coffee.png";
  //Mexican Food
  var icon4bf58dd8d48988d151941735_id = "js/icons/restaurant_mexican.png";
  //Neighborhoods
  var icon4f2a25ac4b909258e854f55f_id = "js/icons/citysquare.png";


  // Create Model to Hold Knockout Data
  var ViewModel = {
    search: ko.observable(true),
    show: ko.observable(false),
    hide: ko.observable(true),
    toggleSearch: function() {
      ViewModel.search(!ViewModel.search());
      ViewModel.show(!ViewModel.show());
      ViewModel.hide(!ViewModel.hide());
    },
    searchQuery: ko.observable(""),
    goToLocation: function(marked) {
      if (ViewModel.search()) {
        ViewModel.toggleSearch();
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
    },
    myMarkers: ko.observableArray([{
      name: "King Taco",
      location: new google.maps.LatLng(34.146699, -118.147875)
    //  icon: restaurant
    }, {
      name: "Penny's Cheesecake Factory",
      location: new google.maps.LatLng(34.145522, -118.150697)
    //  icon: tvLandmark
    }, {
      name: "Barney's Beanery",
      location: new google.maps.LatLng(34.146100, -118.148334)
    //  icon: restaurant
    }, {
      name: "Crepe Studio",
      location: new google.maps.LatLng(34.146976, -118.148322)
    //  icon: restaurant
    }, {
      name: "Pop! Champagne Bar",
      location: new google.maps.LatLng(34.147078, -118.149716)
    //  icon: restaurant
    }, {
      name: "Pasadena Antique Mall",
      location: new google.maps.LatLng(34.144846, -118.143920)
     // icon: shopping
    }, {
      name: "Paseo Colorado",
      location: new google.maps.LatLng(34.145246, -118.144314)
    //  icon: shopping
    }, {
      name: "Colorado Boulevard",
      location: new google.maps.LatLng(34.145700, -118.15000)
    //  icon: shopping
    }, {
      name: "Pasadena City Hall",
      location: new google.maps.LatLng(34.147633, -118.143566)
     // icon: tvLandmark
    }, {
      name: "Memorial Park",
      location: new google.maps.LatLng(34.148336, -118.147454)
   //   icon: outdoors
    }, {
      name: "Pasadena Civic Auditorium",
      location: new google.maps.LatLng(34.143771, -118.144274)
    //  icon: entertainment
    }, {
      name: "iPic Theaters",
      location: new google.maps.LatLng(34.146569, -118.151480)
//      icon: entertainment
    }])
  //  parseResults: function(responses) {
    //  for (var i = 0; i < responses.response.groups[0].items.length; i++) {
   //     var result = responses.response.groups[0].items[i].venue;
     //   var venue = {
       //   name: result.name,
         // location: new google.maps.LatLng(result.location.lat, result.location.lng),
//          icon: result.categories[0].name.replace(" ", ""),
  //        photoURL: result.featuredPhotos.items[0].prefix + result.featuredPhotos.items[0].suffix,
    //      photoHeight: result.featuredPhotos.items[0].height,
      //    photowidth: result.featuredPhotos.items[0].width,
        //  phone: result.contact.formattedPhone,
 //         twitter: result.contact.twitter,
        //  open: result.hours.status,
   //     open: result.hours,
     //     address1: result.location.formattedAddress[0],
       //   address2: result.location.formattedAddress[1],
         // address3: result.location.formattedAddress[2],
        //  price: result.price.message,
 //       price: result.price,
        //  rating: result.price.rating,
   //       url: result.url
     //   };
    //    if (category == "Coffee Shops") {
      //    this.venue.icon = 
  //      }
   //     ViewModel.myMarkers.push(venue);
      };
  //  }
//  };
  var makeMyMarkers = function() {
    for (var i = 0; i < ViewModel.myMarkers().length; i++) {
      var image = ViewModel.myMarkers()[i].icon;
      var marker = new google.maps.Marker({
        position: ViewModel.myMarkers()[i].location,
        map: map,
        title: ViewModel.myMarkers()[i].name,
      //  icon: image
      });
    }
  };
  map.setOptions({styles: styleArray});
  ko.applyBindings(ViewModel);
 // var clientId = 'OSDBVMKK4BLXPU14JLBUB0HVLVMNUIRHBTLRA33LUMSFH2BT';
//  var clientSecret = 'AE41EWYBOYBGY5AKSW5DBPRQW2DD5MK3Y1YLCLO3KTBQITSG';
 // var foursquareURL = 'https://api.foursquare.com/v2/venues/explore?client_id='+clientId+'&client_secret='+clientSecret+'&v=20130815&ll=34.146580,-118.147700&radius=600&limit=50&venuePhotos=1&query=' + ViewModel.searchQuery();
 // $.getJSON(foursquareURL, function(response){
 //   ViewModel.parseResults(response);
  //});
});