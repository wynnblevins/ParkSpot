// api_key=AIzaSyCXL4u3hi_MnkgjpFEfkJAC5XlJ25Tx-gE
function getGoogle() {
    var queryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=3604+Riverchase+Court,+Richmond,VA&destination=University+of+Richmond&key=AIzaSyCXL4u3hi_MnkgjpFEfkJAC5XlJ25Tx-gE"
    $.ajax( {
        url: queryURL,
        method: "GET"
      }).then(function(response) { 
          var directions = response.data;
          console.log(directions);
});
}

getGoogle();