// Timers for the 1 hour check-in
var timersFactory = (function (currentTimeService) {
    'use strict'; 

    return {
        createTimer: function (seconds, onTimeout) {
            return setTimeout(function () {
                onTimeout();
            }, seconds * 1000);
        },

        createInterval: function (seconds, onInterval) {
            return setInterval(function () {
                onInterval();
            }, seconds * 1000);
        }
    };
})(currentTimeService);