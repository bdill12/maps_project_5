// Initialize the Map after DOM is loaded.
$(function initialize() {
  'use strict';
  var oldTownPasadena = new google.maps.LatLng(34.146580, -118.147700);

  // Set Map Options
  var mapOptions = {
    center: oldTownPasadena,
    zoom: 17,
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

  //Style the Map
  var styleArray = [{
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [{
      color: "#7f8c8d"
    }]
  }, {
    featureType: "poi",
    elementType: "geometry",
    stylers:[{
      color: "#2c3e50"
    }]

  }, {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{
      color: "#2ecc71"
    }]
  }, {
    featureType: "poi.medical",
    elementType: "geometry",
    stylers: [{
      color: "#c0392b"
    }]
  }, {
    featureType: "road",
    elementType: "geometry",
    stylers: [{
      color: "#c0392b"
    }, {
      saturation: -50
    }]
  }, {
    featureType: "road",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  }, {
    featureType: "poi",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  }];
  map.setOptions({styles: styleArray});

  var model = {
    clientId: 'OSDBVMKK4BLXPU14JLBUB0HVLVMNUIRHBTLRA33LUMSFH2BT',
    clientSecret: 'AE41EWYBOYBGY5AKSW5DBPRQW2DD5MK3Y1YLCLO3KTBQITSG',
    limit: 25,
    radius: 600,
    latitude: 34.146580,
    longitude: -118.147700
  };


  // Create Model to Hold Knockout Data
  var ViewModel = function() {
    var self = this;
    self.searchQuery = ko.observable("");
    self.foursquareURL = 'https://api.foursquare.com/v2/venues/explore?client_id='+model.clientId+'&client_secret='+model.clientSecret+'&v=20130815&ll='+model.latitude+','+model.longitude+'&radius='+model.radius+'&limit='+model.limit+'&venuePhotos=1';
    self.myMarkers = ko.observableArray();
    self.search = ko.observable(true);
    self.show = ko.observable(false);
    self.hide = ko.observable(true);
    self.viewInfo = ko.observable(false);
    self.infoTitle = ko.observable();
    self.infoTwitter = ko.observable();
    self.infoPhone = ko.observable();
    self.infoURL = ko.observable();
    self.infoImage = ko.observable();
    self.infoAddress1 = ko.observable();
    self.infoAddress2 = ko.observable();
    self.infoAddress3 = ko.observable();
    self.infoTips = ko.observableArray();

    // Assign the Correct Values to each Variable and open Info Window
    self.infoWindow = function(clicked) {
      self.infoTitle(clicked.title);
      self.infoTwitter(clicked.twitter);
      self.infoPhone(clicked.phone);
      self.infoURL(clicked.url);
      self.infoImage(clicked.photoURL);
      self.infoAddress1(clicked.address1);
      self.infoAddress2(clicked.address2);
      self.infoAddress3(clicked.address3);
      self.infoTips(clicked.tips);
      self.viewInfo(true);
    };

    // Close the Info Window
    self.infoClose = function() {
      self.viewInfo(false);
    };

    // Show or Hide the List View
    self.toggleSearch = function() {
      self.search(!self.search());
      self.show(!self.show());
      self.hide(!self.hide());
    };

    // Move Map to center on chosen location
    self.goToLocation= function(marked) {
      if (self.search()) {
        self.toggleSearch();
      }
      setTimeout(function() {
        map.panTo(marked.position);
      }, 500);
      setTimeout(function() {
        map.setZoom(19);
      }, 750);
    };

    // Parse results from Foursquare API Venues Database
    self.parseResults = function(responses) {
      for (var i = 0; i < responses.response.groups[0].items.length; i++) {
        var prefix = responses.response.groups[0].items[i];
        var result = prefix.venue;
        var myTips = [];
          for (var t = 0; t < prefix.tips.length; t++) {
            myTips.push({
              tipText: prefix.tips[t].text,
              tipName: prefix.tips[t].user.firstName,
              tipURL: prefix.tips[t].canonicalUrl,
              tipPhoto: prefix.tips[t].user.photo.prefix + "44" + prefix.tips[t].user.photo.suffix
            });
          }
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(result.location.lat, result.location.lng),
          map: map,
          title: result.name,
          icon: result.categories[0].icon.prefix + "bg_44" + result.categories[0].icon.suffix,
          phone: result.contact.formattedPhone,
          twitter: result.contact.twitter,
          address1: result.location.formattedAddress[0],
          address2: result.location.formattedAddress[1],
          address3: result.location.formattedAddress[2],
          url: result.url,
          tips: myTips
        })
        self.myMarkers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
          self.goToLocation(this);
          self.infoWindow(this);
        });
      }
    };

  // Search the Foursquare Venues database for results
  self.foursquareSearch = function() {
    var fourSearch = self.foursquareURL + "&query='" + self.searchQuery() + "'";
    $.getJSON(fourSearch, function(response) {
      self.parseResults(response);
    });
  };

  // Close Info Window if user clicks outside it
  $(document).mouseup(function(e) {
    var myWindow = $('#infowindow'); 
    if (!myWindow.is(e.target)
      && myWindow.has(e.target).length === 0) {
        self.infoClose();
    }
  });

  // Search
  $('#searchInput').keypress(function(event) {
    if (event.which == 13) {
      for (var r = 0; r < self.myMarkers().length; r++) {
        self.myMarkers()[r].setMap(null)
      }
      self.myMarkers([]);
      self.foursquareSearch();
    }
  })

  self.foursquareSearch();
};
ko.applyBindings(new ViewModel());
});