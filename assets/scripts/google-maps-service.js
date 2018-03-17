<<<<<<< HEAD
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
=======
var api_key = "AIzaSyCXL4u3hi_MnkgjpFEfkJAC5XlJ25Tx-gE";
>>>>>>> 84ade1eb75946f725ef6a51a1a0c429a7349716c
