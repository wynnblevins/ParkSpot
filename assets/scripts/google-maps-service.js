var mapObj = (function () {
    'use strict';

    var key = "AIzaSyALBb2T9zVdON6ALjVFDElA4YZMl00BcOs";
    var originParam = "?origin=";
    var keyParam = "&key=";
    var destinationParam = "&destination=";
    var baseUrl = "https://maps.googleapis.com/maps/api/directions/json";
    var url = null;

    function buildUrl(origin, destination) {
        url = baseUrl + originParam + origin + destinationParam + destination + keyParam + key;
        return url;
    }

    return {
        getDirections: function (origin, destination) {
            var myRequestUrl = buildUrl(origin, destination);
            
            var promise = $.ajax(myRequestUrl, function (response) {
                console.log(myRequestUrl);
                console.log(response);
            });

            return promise;
        }
    };
})();