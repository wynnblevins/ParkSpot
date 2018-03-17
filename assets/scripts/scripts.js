'use strict';

function onSiteLoad() {
    weatherService.getWeatherForArea('Richmond').then(function (weatherData) {
        console.log(weatherData);
    });

    mapObj.getDirections('Richmond,VA', 'Williamsburg,VA').then(function (response) {
        console.log(response);
    });
}

onSiteLoad();