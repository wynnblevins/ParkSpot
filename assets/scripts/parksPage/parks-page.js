(function () {
    'use strict';

    // globals
    var parks = null;
    var $clickedElement = null;

    function getCurrentTime() {
        return moment().valueOf();    
    }

    function updateDb($child) {
        var parkName = $child.dataset.park || '';
        var time = getCurrentTime();
        console.log($child);
        
        firebase.database().ref('parks/' + parkName).set({
            timeStamp: time
        });
    }

    function parkAvailable(park) {
        var buffer = 2 * 60 * 1000;
        var sum = park.timeStamp + buffer;
        var currentTime = getCurrentTime();
        
        if (sum < currentTime) {
            // switch button icon back to checkmark   
            return true;
        }

        return false;
    }

    function flipButtonIcon($clickedElement) {
        if ($clickedElement[0].firstElementChild.firstChild.textContent === 'done') {
            $clickedElement[0].firstElementChild.firstChild.textContent = 'clear';
        } else if ($clickedElement[0].firstElementChild.firstChild.textContent === 'clear') {
            $clickedElement[0].firstElementChild.firstChild.textContent = 'done';
        }
    }

    function loadParks() {
        // get existing parks reservations in firebase
        firebase.database().ref('parks/').once('value').then(function (snapshot) {
            parks = snapshot.val();
        });
    }

    function parkClickHandler($child, $clickedElement) {    
        var childText = $child.text();
        updateDb($clickedElement[0]);
    }
    
    $(document).ready(function () {
        loadParks();
    });

    $(document).on('click', 'a.btn', function handler() {
        var $child = $(this).children();
        $clickedElement = $(this); 
            
        $child.off();

        parkClickHandler($child, $clickedElement);
        flipButtonIcon($clickedElement);

        $child.click(handler);
    });

    // every ten seconds, check park availability
    setInterval(function () {
        for (var park in parks) {
            // for each park check if clicked button
            if (parkAvailable(parks[park])) {
                   
            } 
        }
    }, 10 * 1000);
})();