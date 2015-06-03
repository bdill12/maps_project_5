// Initialize the Map after DOM is loade
var map;
function createMarkers() {
    'use strict';
    var i, prefix, result, tips, marker;
    var Model = {
        limit: 50,
        radius: 600,
        latitude: 34.146580,
        longitude: -118.147700,
        clientId: 'OSDBVMKK4BLXPU14JLBUB0HVLVMNUIRHBTLRA33LUMSFH2BT',
        clientSecret: 'AE41EWYBOYBGY5AKSW5DBPRQW2DD5MK3Y1YLCLO3KTBQITSG'
    };

    var ViewModel = function() {
        // Create Observable Variables and Arrays
        var self = this;
        self.searchQuery = ko.observable("");

        self.myMarkers = ko.observableArray();

        self.searchView = ko.observable(true);
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

        // Close the Info Window, Stop the Animation, Scroll the Window Up for next Display
        self.infoClose = function() {
            if (self.bouncer() !== undefined) {
                self.bouncer().setAnimation(null);
            }
            $("#infowindow").scrollTop(0);
            self.infoView(false);
        };

        // Show or Hide the List View
        self.toggleSearch = function() {
            self.searchView(!self.searchView());
            self.show(!self.show());
            self.hide(!self.hide());
        };

        // Show or Hide Help View
        self.toggleHelp = function() {
            self.helpView(!self.helpView());
        };

        // Center Map on chosen Venue by panning and zooming. open info Window
        self.goToLocation = function(marked) {
            if (self.searchView()) {
                self.toggleSearch();
            }
            setTimeout(function() {
                map.panTo(marked.position);
            }, 250);
            setTimeout(function() {
                map.setZoom(19);
            }, 500);
            marked.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                self.infoWindow(marked);
            }, 750);
        };

        // Callback function for Maps Event Listeners, Activates Animation and calls infowindow and location
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
                var markers = [];
                for (var i = 0; i < responses.response.groups[0].items.length; i++) {
                    var prefix = responses.response.groups[0].items[i];
                    var result = prefix.venue;
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
                        category: result.categories[0].name
                    });
                    marker.search = marker.title + marker.phone + marker.twitter + marker.address1 + marker.category;
                    if (prefix.tips !== undefined) {
                        tips = prefix.tips[0];
                        marker.tipText = tips.text;
                        marker.tipName = tips.user.firstName;
                        marker.tipPhoto = tips.user.photo.prefix + "64" + tips.user.photo.suffix;
                        marker.search = marker.search + marker.tipText;
                    }
                    markers.push(marker);
                    google.maps.event.addListener(marker, 'click', self.listen);
                }
                self.myMarkers(markers);
            }

        };

        // Filter Venues 
        self.filteredItems = ko.computed(function() {
            var filter = self.searchQuery().toLowerCase();
            if (!filter) {
                return self.myMarkers();
            } else {
                return ko.utils.arrayFilter(self.myMarkers(), function(item) {
                	if (item.search.toLowerCase().indexOf(filter) !== -1) {
                        item.setMap(map);
                        return item;
                    } else {
                    item.setMap(null);
                }
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
            for (var i = 0; i < self.myMarkers().length; i++) {
                self.myMarkers()[i].setMap(null);
            }
        };

        // Search the Foursquare Venues database for results
        self.foursquareSearch = function() {
            self.apology(false);
            self.clearMarkers();
            self.myMarkers([]);
            var foursquareURL =
                'https://api.foursquare.com/v2/venues/explore?client_id=' + Model.clientId +
                '&client_secret=' + Model.clientSecret + '&v=20130815&ll=' + Model.latitude +
                ',' + Model.longitude + '&radius=' + Model.radius + '&limit=' + Model.limit +
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

        // Remove Markers from Map
        self.removeMarkers = function() {
        	for (var m = 0; m < self.myMarkers(); m++) {
        		self.myMarkers()[m].map(null);
        	}
        };


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
}

//Initialize
$(function initialize(){
    'use strict';
    //Load CSS
    var cssLinks = ["https://cdnjs.cloudflare.com/ajax/libs/sanitize.css/2.0.0/sanitize.min.css",
    "http://fonts.googleapis.com/css?family=Raleway|Merriweather+Sans&effect=wallpaper",
    "css/main.css"];
    var ref = document.getElementsByTagName('script')[0];
    for (var z = 0; z < cssLinks.length; z++) {
        var ss = "ss" + z;
        ss = document.createElement('link');
        ss.rel = "stylesheet";
        ss.href = cssLinks[z];
        ss.media = "all";
        ref.parentNode.insertBefore(ss, ref);
    }

    var oldTownPasadena = new google.maps.LatLng(34.145815, -118.150425);

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
    map = new google.maps.Map(document.getElementById('map-canvas'),
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

    // Apply Styles
    map.setOptions({styles: styleArray});

    // 
    createMarkers();
});
