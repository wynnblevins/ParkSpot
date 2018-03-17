var weatherService = (function ($) {
    'use strict';
    var apiKey = "548b7d17e7be38efc5d1ae24fffbaeb8";

    return {
        getWeatherForArea: function (areaString) {
            var url = "https://api.openweathermap.org/data/2.5/weather?q=" + 
                areaString + '&appid=' + apiKey;

            var promise = $.ajax(url, function (weatherData) {
                console.log(weatherData);
            });

            return promise;
        }
    };
})($);