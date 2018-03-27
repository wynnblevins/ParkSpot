// Function to change the URL from from parks.html to directions.html, keep origin and name, and add destination and park name
(function (firebase, currentTimeService) {
    'use strict';
    // globals

    var parks = null;
    var $clickedElement = null;

    $('.directionsButton').click(function (e) {
        e.preventDefault();
        
        var currentLocation = window.location.href; 
        // Reverse the URL in order to split off origin and name
        var locationReverse = currentLocation.split("").reverse();
        var origin = locationReverse.splice(0, locationReverse.indexOf('?')).reverse().join("");
        
        var directionsHtml = "directions.html?";
        var destinationParam = '&destination=' + $(this).data('address');
        var parkParam = '&parkName=' + $(this).data('park');
        
        // Take off parks.html
        locationReverse.splice(0, locationReverse.indexOf('/'));
        var newURL = locationReverse.reverse().join("");
        
        // Create the new URL with directions.html , origin, name, destination and park name
        window.location.href = newURL + directionsHtml + origin + destinationParam + parkParam;
    });
    
    // Function to load park name and current time into firebase
    function updateDb($child) {
        var parkName = $child.dataset.park || '';
        var time = currentTimeService.getCurrentTime();

        console.log($child);
        
        firebase.database().ref('parks/' + parkName).set({
            timeStamp: time,
            available: false
        });
    }

    // Function to compare current time with the timestamp
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

    // Function to get park reservations and show which parks are reserved.
    function loadParks() {
        // get existing parks reservations in firebase
        firebase.database().ref('parks/').once('value').then(function (snapshot) {
            parks = snapshot.val();
            for (var park in parks) {
                var currentPark = parks[park];
                if (!currentPark.available) {
                    $('div.card-action.park-name.' + park)
                        .append('<img class="right" src="assets/images/reserved-resized.png" alt="reserved"/>');
                }
            }
        }); 
    }

    // Function to update a park if someone checks in
    function parkClickHandler($child, $clickedElement) {    
        var childText = $child.text();
        updateDb($clickedElement[0]);
    }
    
    $(document).ready(function () {
        // get origin value from url
        var origin = url.searchParams.get("origin");
        
        loadParks();
    });

    // Click handler to get the park and deliver it to the parkClickHandler function
    $(document).on('click', 'a.btn', function handler() {
        var $child = $(this).children();
        $clickedElement = $(this); 
            
        $child.off();

        parkClickHandler($child, $clickedElement);

        $child.click(handler);
    });
})(firebase, currentTimeService);