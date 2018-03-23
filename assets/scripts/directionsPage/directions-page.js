(function (mapService) {
    'use strict';

    $(document).ready(function () {
        var url_string = window.location.href; //window.location.href
        var url = new URL(url_string);
        var origin = url.searchParams.get("origin");
        var destination = url.searchParams.get("destination");
        
        function init() {
            // pass a value for a radius around richmond to search for parks, in this case 10 miles
            mapService.getDirections(origin, destination).then(function (response) {
                // putting directions in a variable called directions for the sake of readability
                var directions = response.routes[0].legs[0].steps;
                console.log(directions);
            });
        }

        init();
    });
})(mapService);
