$(document).ready(function () {
    $('.parallax').parallax();
});

$(document).ready(function () {
    $('select').material_select();
});

$(document).ready(function () {
    'use strict';

    // Get the origin and the name from the index.html file
    var $destinationTextBox = $('#destinationTextBox');
    var $originTextBox = $('#icon_telephone1');
    var $directionsWrapper = $('#directionsWrapper'); 
    var oneHour = 60 * 1000 * 5;

    $('button#white-font').click(function () {
        console.log($('#icon_telephone1'));
        var origin = $('#icon_telephone1').val();
        var name = $('#icon_prefix').val(); 

        // Remove index.html from the URL and add origin and name
        var parksHtml = "parks.html?origin=" + origin;
        var reversedUrl = window.location.href.split("").reverse().join(""); 
        var urlPieces = reversedUrl.split("");
        var pageReversed = urlPieces.splice(0, urlPieces.indexOf('/'));
        var page = pageReversed.reverse();
        var pageStr = page.join("");
        var baseUrl = urlPieces.reverse().join("");
        
        var nameParam = '&name=' + name;
        var path = baseUrl + parksHtml + nameParam;
        
        console.log(path);
        
        // New URL with parks.html and origin and name
        window.location.href = path;  
    });

    function getRecord(recordName) {
        return firebase.database().ref('parks/' + recordName).once('value');
    }

    // Function to get remaining time in the hour for a check-in
    function getRemainingTimeInHourForRecord(recordVal, recordName) {
        var dbRecord = null;
        var currentTime = currentTimeService.getCurrentTime();
        var elapsedTime = currentTime - recordVal.timeStamp;
        var remainingTime = (5 * 60 * 1000) - elapsedTime;
        return remainingTime; 
        
    }

    // Firebase config information
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

        // get rid of stale park reservations (if any)
        dataFreshener();
    }

    // Function runs on app load to make sure data isnt "stale"
    function dataFreshener() {
        firebase.database().ref('parks/').once('value').then(function (snapshot) {
            var parks = snapshot.val();
            var currTime = currentTimeService.getCurrentTime();
            // loop through all parks
            for (var park in parks) {
                console.log(parks);
                // if data is stale aka more than an hour old
                if ((parks[park].timeStamp + oneHour) <= currTime) {
                    // reset our record
                    firebase.database().ref('parks/' + park).set({
                        timeStamp: 0,
                        available: true    
                    });                    
                } else {
                    var remainingTime = getRemainingTimeInHourForRecord(parks[park], park);
                    
                    // restart our timer with however much time is left in the hour reservation
                    timersFactory.createTimer(remainingTime, 
                        function () {
                        firebase.database().ref('parks/' + park).set({
                            timeStamp: remainingTime,
                            available: false    
                        });    
                    });
                }
            }
        });
    }

    function onSiteLoad() {
        initFirebase();
        
        // Weather API takes a zip code
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