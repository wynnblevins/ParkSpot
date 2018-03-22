(function (mapService) {
    'use strict';
    
    $(document).ready(function () {
        console.log(window.location.href);
        var reversedPath = window.location.href.split("").reverse().join(""); 
        var firstSlashNdx = reversedPath.indexOf('/');
        reversedDirections.splice(firstSlashNdx);
        var path = reversedPath.split("").reverse().join("");
        
        // pass a value for a radius around richmond to search for parks, in this case 10 miles
        mapService.getDirections(originText).then(function (response) {
            // putting directions in a variable called directions for the sake of readability
            var directions = response.routes[0].legs[0].steps;
            console.log(directions);
        });
    });
})(mapService);
