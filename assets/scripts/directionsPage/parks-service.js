var parksService = (function () {
    'use strict';

    var map;
    var service;
    var infowindow;

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
            }
        }
    }

    return {
        search: function (radius) {
            var richmondLatitude = 37.5407;
            var richmondLongitude = -77.436; 
            var richmond = new google.maps.LatLng(richmondLatitude, richmondLongitude);

            var $map = $('#map');
            map = new google.maps.Map($map, {
                center: richmond,
                zoom: 15
            });
  
            // request for parks in a ten mile radius of the lat and lng specified above
            var request = {
                location: richmond,
                radius: new String(radius),  
                query: 'parks' 
            };
  
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);  
        }      
    }
})();