$(document).ready(function () {
    $('.parallax').parallax();
});

$(document).ready(function () {
    $('select').material_select();
});

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
            
            console.log(directions);
        });
    });

    function initFirebase() {
        var config = {
            apiKey: "AIzaSyCMPdLIcBLfUwyI7Gtk-iWVlk-nv4TcbDI",
            authDomain: "parkspot-1521304310258.firebaseapp.com",
            databaseURL: "https://parkspot-1521304310258.firebaseio.com",
            projectId: "parkspot-1521304310258",
            storageBucket: "parkspot-1521304310258.appspot.com",
            messagingSenderId: "887475150409"
        };
        firebase.initializeApp(config);
    }

    function onSiteLoad() {
        initFirebase();
        
        // takes a zip code
        weatherService.getForecastForArea(23238).then(function (weatherData) {
            console.log('Inside promise resolution.');
            console.log(weatherData.list);
        });
    }

    onSiteLoad();
});