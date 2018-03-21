(function (parksService) {
    'use strict';
    
    $(document).ready(function () {
        // pass a value for a radius around richmond to search for parks, in this case 10 miles
        var radius = 10;
        parksService.search(radius);
    });
})(parksService);
