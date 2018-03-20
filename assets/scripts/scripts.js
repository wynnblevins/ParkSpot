$(document).ready(function () {
    'use strict';

    var $destinationTextBox = $('#destinationTextBox');
    var $originTextBox = $('#originTextBox');
    var $directionsWrapper = $('#directionsWrapper'); 

    $('#directionsButton').click(function () {
        var originText = $originTextBox[0].value;
        var destinationText = $destinationTextBox[0].value;
        
        mapService.getDirections(originText, destinationText).then(function (response) {
            // putting directions in a variable called directions for the sake of readability
            var directions = response.routes[0].legs[0].steps;
            
            // remove any current directions from the screen
            $directionsWrapper.empty();
            
            // loop through directions response and append to screen 
            for (var i = 0; i < directions.length; i++) {
                $directionsWrapper.append('<p>' + directions[i].html_instructions + '</p>');
            }
        });
    });
    
    function onSiteLoad() {
        weatherService.getWeatherForArea('Richmond').then(function (weatherData) {
            console.log(weatherData);
        });    
    }

    onSiteLoad();
});