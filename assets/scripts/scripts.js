'use strict';

function onSiteLoad() {
    weatherService.getWeatherForArea('Richmond').then(function (weatherData) {
        console.log(weatherData);
    });
}

onSiteLoad();