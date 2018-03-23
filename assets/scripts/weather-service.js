var weatherService = (function ($) {
    'use strict';
    var apiKey = "548b7d17e7be38efc5d1ae24fffbaeb8";

    return {
        getCurrentWeatherForArea: function (zipCode) {
            var url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

            var promise = $.ajax(url, function (weatherData) {
                promise.resolve(weatherData);
            });

            return promise;
        },

        getForecastForArea: function (zipCode) {
            var url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${apiKey}`;

            var promise = $.ajax(url, function (weatherData) {
                promise.resolve(weatherData);
            });

            return promise;
        }
    };
})($);