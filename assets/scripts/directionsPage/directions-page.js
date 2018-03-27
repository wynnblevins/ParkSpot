// Function to get directions from the Google Directions API
(function (mapService, currentTimeService, timersFactory, firebase) {
    'use strict';
    
    var currentTimeouts = [];

    // Get the park name, origin and destination from the url
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

    // Click handler to set up a time stamp for the park when it is clicked
    $(document).on('click', 'a.btn', function () {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var parkName = url.searchParams.get('parkName');
        var oneHour = 3600 * 1000; // 3600 seconds converted to milliseconds (3600 seconds == 1 hour)

        console.log('inside click handler');

        // set the value of the park reservation 
        firebase.database().ref('parks/' + parkName).set({
            timeStamp: currentTimeService.getCurrentTime(),
            available: false 
        });

        // after timer expires, make park reservation spot 
        timersFactory.createTimer(function () {
            firebase.database().ref('parks/' + parkName).set({
                timeStamp: 0,
                available: true    
            });    
        }, oneHour);     
        
        location.replace(document.referrer);
    });

})(mapService, currentTimeService, timersFactory, firebase);
