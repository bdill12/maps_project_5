$(function(){
    function ViewModel() {
    'use strict';
    self.poiMarkers = [];
    self.filteredMarkers = ko.observableArray();
    self.warnerBros = new google.maps.LatLng(34.148955, -118.337912);
    self.searchQuery = ko.observable("");

    // Set Map Options
    self.mapOptions = {
        center: self.warnerBros,
        zoom: 17,
        draggable: true
    };

    // Create Map Object
    self.map = new google.maps.Map(document.getElementById('map-canvas'), self.mapOptions);

    // Apply Styles
    self.map.setOptions({
        styles: self.styleArray
    });


    self.markers = function(variable) {
        var point = pointsOfInterest;
        var marker;
        for (var i = 0; i < point.length; i++) {
            marker = new google.maps.Marker({
                position: point[i].poiLat,
                map: self.map,
                title: point[i].poiName,
                desc: point[i].poiDesc,
                search: point[i].poiSearch
            });
            self.filteredMarkers.push(marker);
        }
    }();
    self.sortThem = function(event) {
        console.log(event);
        self.searchQuery(this.poiName);
    };

    // Filter Venues
        self.filteredMarkers = ko.computed(function() {
            self.searchQuery = ko.observable("");
            var filter = self.searchQuery().toLowerCase();
            if (!filter) {
                return self.poiMarkers;
            } else {
                return ko.utils.arrayFilter(self.filteredMarkers, function(item)
                {for (var i = 0; i < pointsOfInterest.length; i++){
                    if (pointsOfInterest[i].poiSearch.toLowerCase().indexOf(filter) !== -1) {
                        item.setMap(map);
                        return item;
                    } else {
                    item.setMap(null);
                }
                }
            }, self);
            }

        });


}
ko.applyBindings(new ViewModel());
});