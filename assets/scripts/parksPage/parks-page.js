(function () {
    'use strict';

    $(document).ready(function () {
        console.log('Parks page is loaded.');

        // ten mile radius
        parksService.search(10).then(function (response) {
            console.log(response);
        });
    });
})();