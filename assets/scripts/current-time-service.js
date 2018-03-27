// Function to get the current time using moment()
var currentTimeService = (function () {
    'use strict';

    return {
        getCurrentTime: function () {
            return moment().valueOf();
        }
    };
})();