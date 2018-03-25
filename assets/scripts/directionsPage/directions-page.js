(function (mapService, currentTimeService, timersFactory, firebase) {
    'use strict';
    
    var currentTimeouts = [];

    $(document).ready(function () {
        var $directionsContainer = $('#directionsContainer');
        var url_string = window.location.href;
        var url = new URL(url_string);
        var origin = url.searchParams.get("origin");
        var destination = url.searchParams.get("destination");
        var parkName = url.searchParams.get('parkName');
        
        function init() {
            // pass a value for a radius around richmond to search for parks, in this case 10 miles
            mapService.getDirections(origin, destination).then(function (response) {
                // putting directions in a variable called directions for the sake of readability
                var directions = response.routes[0].legs[0].steps;
                
                for (var i = 0; i < directions.length; i++) {
                    $('<p>' + directions[i].html_instructions + '</p>').appendTo($directionsContainer);
                }
            });
        }

        init();
    });

    $(document).on('click', 'a.btn', function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var parkName = url.searchParams.get('parkName');
        var oneHour = 10000; // 3600 seconds in one hour

        // set the value of the park reservation 
        firebase.database().ref('parks/' + parkName).set({
            timeStamp: currentTimeService.getCurrentTime(),
            available: false 
        });
        
        // after timer expires, make park reservation spot 
        timersFactory.createTimer(oneHour, function () {
            firebase.database().ref('parks/' + parkName).set({
                timeStamp: 0,
                available: true    
            });    
        });        
        
        
    });
})(mapService, currentTimeService, timersFactory, firebase);
