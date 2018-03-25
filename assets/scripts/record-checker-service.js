var recordCheckerService = (function () {
    'use strict';
    return {
        dataRecordIsExpired: function(recordIsAvailable, timeStamp) {
            if (recordIsAvailable && !timeStamp) {
                return true;
            }

            return false;
        }    
    }
     
})();