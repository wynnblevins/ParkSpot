(function (firebase, currentTimeService) {
    'use strict';
    // globals

    var parks = null;
    var $clickedElement = null;

    $('.directionsButton').click(function (e) {
        e.preventDefault();
        var currentLocation = window.location.href; 
        var locationReverse = currentLocation.split("").reverse();
        var origin = locationReverse.splice(0, locationReverse.indexOf('?')).reverse().join("");
        
        var directionsHtml = "directions.html?";
        var destinationParam = '&destination=' + $(this).data('address');
        var parkParam = '&parkName=' + $(this).data('park');
        
        locationReverse.splice(0, locationReverse.indexOf('/'));
        var newURL = locationReverse.reverse().join("");
        
        window.location.href = newURL + directionsHtml + origin + destinationParam + parkParam;
    });
    
    function updateDb($child) {
        var parkName = $child.dataset.park || '';
        var time = currentTimeService.getCurrentTime();

        console.log($child);
        
        firebase.database().ref('parks/' + parkName).set({
            timeStamp: time,
            available: false
        });
    }

    var parkAvailable = function (park) {
        var buffer = 45 * 1000;
        var sum = park.timeStamp + buffer;
        var currentTime = currentTimeService.getCurrentTime();
        
        if (sum < currentTime) {
            // switch button icon back to checkmark   
            return true;
        }

        return false;
    }

    function loadParks() {
        // get existing parks reservations in firebase
        firebase.database().ref('parks/').once('value').then(function (snapshot) {
            parks = snapshot.val();
            console.log(parks);
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

        $child.click(handler);
    });
})(firebase, currentTimeService);