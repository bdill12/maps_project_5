// Initialize the Map after DOM is loaded.
$(function initialize() {
	'use strict';
	var oldTownPasadena = new google.maps.LatLng(34.145815, -118.150425);
	var i, prefix, result, tips, marker;

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
		stylers: [{
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
	map.setOptions({
		styles: styleArray
	});

	var ViewModel = function() {
		// Create Observable Variables and Arrays, Cache Id and Secret
		var self = this;
		self.limit = ko.observable(50);
		self.radius = ko.observable(600);
		self.latitude = ko.observable(34.146580);
		self.longitude = ko.observable(-118.147700);
		self.clientId = 'OSDBVMKK4BLXPU14JLBUB0HVLVMNUIRHBTLRA33LUMSFH2BT';
		self.clientSecret = 'AE41EWYBOYBGY5AKSW5DBPRQW2DD5MK3Y1YLCLO3KTBQITSG';
		self.searchQuery = ko.observable("");

		self.myMarkers = ko.observableArray();
		self.someMarkers = ko.observableArray();

		self.search = ko.observable(true);
		self.show = ko.observable(false);
		self.hide = ko.observable(true);
		self.apology = ko.observable(false);
		self.helpView = ko.observable(false);
		self.infoView = ko.observable(false);
		self.needReset = ko.observable(false);

		self.infoTitle = ko.observable();
		self.infoId = ko.observable();
		self.infoTweet = ko.observable();
		self.infoTwitter = ko.observable();
		self.infoTwitterURL = ko.observable();
		self.infoPhone = ko.observable();
		self.infoURL = ko.observable();
		self.infoImage = ko.observable();
		self.infoAddress1 = ko.observable();
		self.infoAddress2 = ko.observable();
		self.infoAddress3 = ko.observable();
		self.infoPhoto = ko.observable();
		self.tipText = ko.observable();
		self.tipName = ko.observable();
		self.tipPhoto = ko.observable();
		self.bouncer = ko.observable();


		// Assign the Correct Values to each Variable and open Info Window
		self.infoWindow = function(clicked) {
			self.bouncer(clicked);
			self.infoTitle(clicked.title);
			self.infoId(clicked.id);
			self.infoTweet(clicked.tweet);
			self.infoTwitter(clicked.twitter);
			self.infoTwitterURL(clicked.twitterURL);
			self.infoPhone(clicked.phone);
			self.infoURL(clicked.url);
			self.infoImage(clicked.photoURL);
			self.infoAddress1(clicked.address1);
			self.infoAddress2(clicked.address2);
			self.infoAddress3(clicked.address3);
			self.infoPhoto(clicked.photo);
			self.tipText(clicked.tipText);
			self.tipName(clicked.tipName);
			self.tipPhoto(clicked.tipPhoto);
			self.infoView(true);
		};

		// Close the Info Window
		self.infoClose = function() {
			if (self.bouncer() !== undefined) {
				self.bouncer().setAnimation(null);
			}
			$("#infowindow").scrollTop(0);
			self.infoView(false);
		};

		// Show or Hide the List View
		self.toggleSearch = function() {
			self.search(!self.search());
			self.show(!self.show());
			self.hide(!self.hide());
		};

		// Show or Hide Help View
		self.toggleHelp = function() {
			self.helpView(!self.helpView());
		};

		// Center Map on chosen location
		self.goToLocation = function(marked) {
			if (self.search()) {
				self.toggleSearch();
			}
			setTimeout(function() {
				map.panTo(marked.position);
			}, 500);
			setTimeout(function() {
				map.setZoom(19);
			}, 750);
			marked.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function() {
				self.infoWindow(marked);
			}, 1000);
		};


		// Callback function for Maps Event Listeners
		self.listen = function() {
			if (self.bouncer() !== undefined) {
				self.bouncer().setAnimation(null);
			}
			if (this.getAnimation() !== null) {
				this.setAnimation(null);
			} else {
				this.setAnimation(google.maps.Animation.BOUNCE);
			}
			self.infoWindow(this);
			self.goToLocation(this);
		};

		// Show Text for No Search Results if None Exist
		self.showApology = function() {
			setTimeout(function() {
				if (self.filteredItems().length === 0) {
					self.apology(true);
				} else {
					self.apology(false);
				}
			}, 200);
		};

		// Parse results from Foursquare API Venues Database
		self.parseResults = function(responses) {
			if (responses.response.totalResults === 0) {
				self.needReset(true);
				return false;
			} else {
				for (i = 0; i < responses.response.groups[0].items.length; i++) {
					prefix = responses.response.groups[0].items[i];
					result = prefix.venue;
					tips = prefix.tips[0];
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(result.location.lat, result.location
							.lng),
						map: map,
						animation: null,
						title: result.name,
						id: "http://foursquare.com/v/" + result.id,
						icon: result.categories[0].icon.prefix + "bg_44" + result.categories[
							0]
							.icon.suffix,
						phone: result.contact.formattedPhone,
						tweet: result.contact.twitter,
						twitter: "@" + result.contact.twitter,
						twitterURL: "https://twitter.com/" + result.contact.twitter,
						address1: result.location.formattedAddress[0],
						address2: result.location.formattedAddress[1],
						address3: result.location.formattedAddress[2],
						photo: result.photos.groups[0].items[0].prefix + "800x200" + result.photos
							.groups[0].items[0].suffix,
						url: result.url,
						tipText: tips.text,
						tipName: tips.user.firstName,
						tipPhoto: tips.user.photo.prefix + "64" + tips.user.photo.suffix,
						category: result.categories[0].name
					});
					marker.search = marker.title + marker.phone + marker.twitter + marker.address1 +
						marker.tipText + marker.category;
					self.myMarkers.push(marker);
					google.maps.event.addListener(marker, 'click', self.listen);
				}
			}

		};

		// Filter Venues 
		self.filteredItems = ko.computed(function() {
			var filter = self.searchQuery().toLowerCase();
			if (!filter) {
				return self.myMarkers();
			} else {
				return ko.utils.arrayFilter(self.myMarkers(), function(item) {
					return item.search.toLowerCase().indexOf(filter) !== -1;
				}, self);
			}

		});

		// Reset to Original Venues
		self.clearSearch = function() {
			self.searchQuery("");
			self.foursquareSearch();
			self.needReset(false);
		};

		// Clear Markers from the Map
		self.clearMarkers = function() {
			for (i = 0; i < self.myMarkers().length; i++) {
				self.myMarkers()[i].setMap(null);
			}
		};

		// Search the Foursquare Venues database for results
		self.foursquareSearch = function() {
			self.apology(false);
			self.clearMarkers();
			self.myMarkers([]);
			var foursquareURL =
				'https://api.foursquare.com/v2/venues/explore?client_id=' + self.clientId +
				'&client_secret=' + self.clientSecret + '&v=20130815&ll=' + self.latitude() +
				',' + self.longitude() + '&radius=' + self.radius() + '&limit=' + self.limit() +
				'&venuePhotos=1' + "&query='" + self.searchQuery() + "'";
			$.getJSON(foursquareURL, function(response) {
				self.parseResults(response);
				self.filteredItems();
				self.showApology();
			});
		};

		// Close Info Window if user clicks outside it
		$(document).mouseup(function(e) {
			var myWindow = $('#infowindow');
			if (!myWindow.is(e.target) && myWindow.has(e.target).length === 0) {
				self.infoClose();
			}
		});

		// Search on Return / Enter
		self.ifEnter = function(data, event) {
			if (event.which === 13) {
				self.foursquareSearch();
				self.searchQuery("");
			} else if (event.which === 8 || event.which === 46) {
				self.showApology();
			}
			self.showApology();
			return true;
		};

		self.foursquareSearch();
	};
	ko.applyBindings(new ViewModel());
});