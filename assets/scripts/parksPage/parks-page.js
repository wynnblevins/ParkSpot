(function () {
    'use strict';

    function updateDb($child) {
        var parkName = $child.dataset.park || '';
        var time = moment();
        console.log($child);
        
        firebase.database().ref('parks/' + parkName).set({
            timeStamp: time.valueOf()

        });
    }

    $(document).ready(function () {
        console.log('Parks page is loaded.');

        // get existing parks reservations in firebase
        firebase.database().ref('parks/').once('value').then(function (snapshot) {
            console.log(snapshot.val());
        });

        // TODO later maybe if we continue:
        // search for ten parks in a ten mile radius
        // parksService.search(10).then(function (response) {
        //     console.log(response);
        // });
    });

    $(document).on('click', 'a.btn', function myHandler() {
        var $child = $(this).children();
        var $clickedElement = $(this); 
        
        $child.off();
        var childText = $child.text();
        
        if (childText === 'clear') {
            $child.text('done');
            updateDb($clickedElement[0]);
        } else {
            $child.text('clear');
            updateDb($clickedElement[0]);
        }

        $child.click(myHandler);
    });
})();