(function () {
    'use strict';

    $(document).ready(function () {
        console.log('Parks page is loaded.');

        // ten mile radius
        parksService.search(10).then(function (response) {
            console.log(response);
        });
    });

    $(document).on('click', 'a.btn', function myHandler() {
        var $child = $(this).children();
        $child.off();
        var childText = $child.text();
        
        if (childText === 'clear') {
            $child.text('done');
        } else {
            $child.text('clear');
        }

        $child.click(myHandler);
    });
})();