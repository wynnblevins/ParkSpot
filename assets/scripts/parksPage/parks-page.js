(function () {
    'use strict';

    // globals
    var parks = null;
    var $clickedElement = null;

    $('.directionsButton').click(function (e) {
        e.preventDefault();
        console.log(window.location.href);
        var currentLocation = window.location.href; 
        var locationReverse = currentLocation.split("").reverse();
        var origin = locationReverse.splice(0, locationReverse.indexOf('?')).reverse().join("");
        console.log(origin);
        console.log($(this).data('address'));

        var directionsHtml = "directions.html?";
        var destinationParam = '&destination=' + $(this).data('address');
        
        locationReverse.splice(0, locationReverse.indexOf('/'));
        console.log(locationReverse.reverse().join(""));
        var newURL = locationReverse.join("");
        // var page = pageReversed.reverse();
        // var pageStr = page.join("");
        // var baseUrl = urlPieces.reverse().join("");
        
        window.location.href = newURL + directionsHtml + origin + destinationParam;
    });
    
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
        // get origin value from url
        var origin = url.searchParams.get("origin");
        
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