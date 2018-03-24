$(document).ready(function () {
    $('.parallax').parallax();
});

$(document).ready(function () {
    $('select').material_select();
});

$(document).ready(function () {
    'use strict';

    var $destinationTextBox = $('#destinationTextBox');
    var $originTextBox = $('#icon_telephone1');
    var $directionsWrapper = $('#directionsWrapper'); 

    $('button#white-font').click(function () {
        console.log($('#icon_telephone1'));
        var test = $('#icon_telephone1').val();
        console.log(test);
        
        var parksHtml = "parks.html?origin=";
        var reversedUrl = window.location.href.split("").reverse().join(""); 
        var urlPieces = reversedUrl.split("");
        var pageReversed = urlPieces.splice(0, urlPieces.indexOf('/'));
        var page = pageReversed.reverse();
        var pageStr = page.join("");
        var baseUrl = urlPieces.reverse().join("");
        window.location.href = baseUrl + parksHtml + $('#icon_telephone1').val(); 
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
            console.log(weatherData);
            var dayForecast = weatherData.list[0];
            
            // Get temperature and convert to Fahrenheit
            var tempK = dayForecast.main.temp;
            var tempF = Math.round(((tempK-273.15)*1.8+32));
            console.log("Temp: " + tempF);
            $('#temp-place').text(tempF + '\xB0' +'F');

            // Get icon and convert it to an actual icon
            var icon = dayForecast.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            $('#weather-icon').attr('src', iconurl);

            // Get wind information
            var wind = dayForecast.wind.speed;
            $('#wind-place').text("Wind: " + wind + " knots");
        });
    }

    onSiteLoad();
});