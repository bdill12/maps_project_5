// Initialize the Map after DOM is loade
var map;

function createMarkers() {
    'use strict';

    var model = [{
        "project": "friends",
        "locations": [{
            "name": "Gellar House",
            "latlng": "34.148306, -118.335980",
            "desc": "Rachel and Monica get ready for the prom at Jack and Judy's house. This episode was voted the best episode leading up to the finale in 2004."
        }, {
            "name": "Walk to a Peach Pit",
            "latlng": "34.150414, -118.336944",
            "desc": "The guys walk to a hockey game, but Ross sees a peach pit on the sidewalk and remembers his first lesbian ex-wife"
        }, {
            "name": "$1000 and a Football Phone",
            "latlng": "34.150767, -118.337024",
            "desc": "Phoebe's bank accidentally gives her extra money that she wants to get rid of. She gives it to a homeless woman on Hennesy street."
        }, {
            "name": "Phoebe Runs Weird",
            "latlng": "34.148936, -118.337249",
            "desc": "Rachel is embarassed by Phoebe's crazy style of running."
        }, {
            "name": "Red Ross",
            "latlng": "34.149041, -118.336900",
            "desc": "Ross plays rugby to impress his new British girlfriend."
        }, {
            "name": "Chandler Chases Kathy",
            "latlng": "34.150562, -118.336926",
            "desc": "Chandler has a crush on Joey's girlfriend, who he chases down the street when she doesn't hear him say hello."
        }, {
            "name": "Ross gets Waterballooned",
            "latlng": "34.149554, -118.337946",
            "desc": "Ross breaks up with his much younger girlfriend, Elizabeth. He is reconsidering when she starts throwing water balloons at him from her dorm room window."
        }, {
            "name": "Stage 24",
            "latlng": "34.148928, -118.338086",
            "desc": "The Friends Stage"
        }]
    }, {
        "project": "Gilmore Girls",
        "locations": [{
            "name": "Gilmore House",
            "latlng": "34.148066, -118.335961",
            "desc": "Home of Lorelei and Rory Gilmore"
        }, {
            "name": "Stars Hollow High",
            "latlng": "34.148492, -118.336654",
            "desc": "School Rory attends for an episode or two."
        }, {
            "name": "Gazebo",
            "latlng": "34.148628, -118.336217",
            "desc": "Iconic landmark from the show."
        }, {
            "name": "Weston's Bakery",
            "latlng": "34.148453, -118.336937",
            "desc": "Town bakery"
        }, {
            "name": "Miss Patty's",
            "latlng": "34.148880, -118.336966",
            "desc": "Rory and Jess fall asleep together here and stay out all night."
        }, {
            "name": "Luke's Diner",
            "latlng": "34.149016, -118.336620",
            "desc": "Coffee, please."
        }, {
            "name": "Rory gets hit by a deer",
            "latlng": "34.149421, -118.334111",
            "desc": "No. She was hit. Not she hit."
        }, {
            "name": "Doose's Market",
            "latlng": "34.148942, -118.336260",
            "desc": "There's a good aisle inside."
        }, {
            "name": "Hewes bros service station",
            "latlng": "34.148375, -118.335722",
            "desc": "Car trouble?"
        }, {
            "name": "Bangles concert",
            "latlng": "34.149712, -118.338397",
            "desc": "The Chilton girls abandon the concert and Lorelei has to go kick some ass."
        }, {
            "name": "Luke shoves Jess in the lake",
            "latlng": "34.149515, -118.334199",
            "desc": "Exactly like it says."
        }, {
            "name": "Chilton Gates",
            "latlng": "34.149189, -118.337428",
            "desc": "Also the museum Emilt goes to on a date"
        }, {
            "name": "Rory's Study Tree",
            "latlng": "34.149074, -118.337170",
            "desc": "Peace and quiet at Yale"
        }]
    }, {
        "project": "Pretty Little Liars",
        "locations": [{
            "name": "Spencer's House",
            "latlng": "34.148066, -118.335961",
            "desc": "Home of Spencer Hastings, site of murders galore."
        }, {
            "name": "Rosewood High",
            "latlng": "34.148492, -118.336654",
            "desc": "Sit outside and stare as Mona walks in."
        }, {
            "name": "Apple Rose Grill",
            "latlng": "34.149016, -118.336620",
            "desc": "Hungry?"
        }, {
            "name": "Hanna gets hit by a car",
            "latlng": "34.149421, -118.334111",
            "desc": "And 1000 other things. They are in these woods a lot."
        }, {
            "name": "The Greenhouse Meeting with A",
            "latlng": "34.149515, -118.334199",
            "desc": "The girls trick A into meeting with them and they end up getting his/her cell phone."
        }, {
            "name": "Radley Mental Institution",
            "latlng": "34.149189, -118.337428",
            "desc": "The exterior of the mental institution that continually crops up in the main story."
        }, {
            "name": "Emily's House",
            "latlng": "34.148306, -118.335980",
            "desc": "Home of Emily Fields"
        }, {
            "name": "Rear Window Brew",
            "latlng": "34.149088, -118.336190",
            "desc": "Ezra owns it. Emily works there."
        }, {
            "name": "Church",
            "latlng": "34.148562, -118.335857",
            "desc": "Finale of season 1."
        }, {
            "name": "Police Station/City Hall",
            "latlng": "34.148694, -118.336556",
            "desc": "When are they not here?"
        }, {
            "name": "Abandoned house from season 2",
            "latlng": "34.148289, -118.336440",
            "desc": "Ali takes them in to scare them"
        }, {
            "name": "Aria's porch",
            "latlng": "34.148000, -118.336450",
            "desc": "The rest of the house is in Canada"
        }, {
            "name": "Hanna's House",
            "latlng": "34.148385, -118.333334",
            "desc": "She lives far away from anyone else"
        }, {
            "name": "Dilaurentis's House",
            "latlng": "34.149385, -118.333730",
            "desc": "Built for this production"
        }, {
            "name": "Ezra's Cabin",
            "latlng": "34.149892, -118.334014",
            "desc": "A convenient hideaway"
        }, {
            "name": "Ally's Memorial / Grave",
            "latlng": "34.148887, -118.337320",
            "desc": "Right across the street from Radley"
        }, {
            "name": "Stage 6",
            "latlng": "34.147422, -118.340785",
            "desc": "The soundstage"
        }, {
            "name": "Stages 7 and 8",
            "latlng": "34.147100, -118.340518",
            "desc": "More soundstages"
        }]
    }, {
        "project": "The Big Bang Theory",
        "locations": [{
            "name": "Stage 25",
            "latlng": "34.148416, -118.337857",
            "desc": "The soundstage"
        }, {
            "name": "Raiding Raiders of the Lost Arc",
            "latlng": "34.149561, -118.337533",
            "desc": "Sheldon and the gang stand in line to see the movie, but Sheldon ends up stealing the print and running away."
        }, {
            "name": "Apartment Exterior",
            "latlng": "34.148282, -118.336951",
            "desc": "The outside of the apartment building"
        }]
    }, {
        "project": "Bathrooms and Water",
        "locations": [{
            "name": "Museum (water, restrooms)",
            "latlng": "34.150085, -118.338774"
        }, {
            "name": "Stage 9 (bathrooms and water)",
            "latlng": "34.147714, -118.340373"
        }, {
            "name": "Audience staging (water)",
            "latlng": "34.147538, -118.335665"
        }, {
            "name": "Mill Store",
            "latlng": "34.147081, -118.339181"
        }, {
            "name": "Stage 25 (soda machine and restrooms)",
            "latlng": "34.148210, -118.337379"
        }, {
            "name": "Parking/ Costumes (restrooms, soda on west side)",
            "latlng": "34.147790, -118.334300"
        }, {
            "name": "Commisary",
            "latlng": "34.149279, -118.339227"
        }, {
            "name": "Avon Grill",
            "latlng": "34.148892, -118.335652"
        }, {
            "name": "Tan building (restroom)",
            "latlng": "34.149325, -118.334333"
        }, {
            "name": "Restrooms near Dr. Ross end",
            "latlng": "34.150420, -118.336381"
        }, {
            "name": "Post-Production (restrooms)",
            "latlng": "34.150277, -118.339229"
        }, {
            "name": "Restrooms not for guests (Ellen's talent entrance)",
            "latlng": "34.148388, -118.341738"
        }, {
            "name": "Restrooms at stage 21",
            "latlng": "34.147628, -118.338524"
        }, {
            "name": "Bridge cafe",
            "latlng": "34.147937, -118.334902"
        }]
    }];
    console.log(model[0].locations[0].name);

    var ViewModel = function() {
        // Create Observable Variables and Arrays
        var self = this;

        self.myMarkers = ko.observableArray();

        self.overlay = ko.observable(true);

                // Clear Markers from the Map
        self.clearMarkers = function() {
            for (var i = 0; i < self.myMarkers().length; i++) {
                self.myMarkers()[i].setMap(null);
            }
        };

        // Show or Hide the Overlay
        self.toggleOverlay = function() {
            self.overlay(!self.overlay());
        };

        self.gotoFriends = function() {
            self.clearMarkers();
            self.parseResults(0);
        };

        self.gotoGilmore = function() {
            self.clearMarkers();
            self.parseResults(1);
        };

        self.gotoLiars = function() {
            self.clearMarkers();
            self.parseResults(2);
        };

        self.gotoBang = function() {
            self.clearMarkers();
            self.parseResults(3);
        };

        self.gotoBathroom = function() {
            self.clearMarkers();
            self.parseResults(4);
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


        // Parse results from Foursquare API Venues Database
        self.parseResults = function(x) {
            var markers = [];
            var y = model[x].locations;
            for (var i = 0; i < model[x].locations.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(y[i].latlng),
                    map: map,
                    animation: null,
                    title: y[i].name,
                    desc: y[i].desc
                });
                markers.push(marker);
                google.maps.event.addListener(marker, 'click', self.listen);
            }
            self.myMarkers(markers);
        };

        // Close Info Window if user clicks outside it
       // $(document).mouseup(function(e) {
         //   var myWindow = $('#infowindow');
           // if (!myWindow.is(e.target) && myWindow.has(e.target).length === 0) {
             //   self.infoClose();
            //}
       // });

    };
    ko.applyBindings(new ViewModel());
}

//Initialize
$(function initialize() {
    'use strict';

    var warnerBros = new google.maps.LatLng(34.148955, -118.337912);

    // Set Map Options
    var mapOptions = {
        center: warnerBros,
        zoom: 17,
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
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            color: "#791214"
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
    map.setOptions({
        styles: styleArray
    });

    createMarkers();
});
