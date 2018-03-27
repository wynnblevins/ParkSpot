var currentTimeService = (function () {
    'use strict';

    return {
        getCurrentTime: function () {
            return moment().valueOf();
        }
    };
})();