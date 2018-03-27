// Function to determine if a park is available because an hour has passed
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