(function (parksService) {
    'use strict';
    
    $(document).ready(function () {
        // pass a value for a radius around richmond to search for parks, in this case 10 miles
        mapService.getDirections(originText).then(function (response) {
            // putting directions in a variable called directions for the sake of readability
            var directions = response.routes[0].legs[0].steps;
        });
    });
})(parksService);
