$(document).ready(function () {
    $('.parallax').parallax();
});

$(document).ready(function () {
    $('select').material_select();
});

$(document).ready(function () {
    'use strict';

    var $originTextBox = $('#icon_telephone1');
   // var $directionsWrapper = $('#directionsWrapper'); 
    
    $('#directionsButton').click(function () {
        var originText = $originTextBox.val();
        
        window.location.href = "./parks.html?origin=" + originText;        
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