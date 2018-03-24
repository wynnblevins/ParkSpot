var url = new URL(window.location);

// $("#bryan-pic").click({

// });
// $(document).on('click', '.button.pic2', function (){

// });
// $(document).on('click', '.button.pic3', function (){

// });
// $(document).on('click', '.button.pic4', function (){

// });
// $(document).on('click', '.button.pic5', function (){

// });
// $(document).on('click', '.button.pic6', function (){

// });
// $(document).on('click', '.button.pic7', function (){

// });
// $(document).on('click', '.button.pic8', function (){

// });
// $(document).on('click', '.button.pic9', function (){

// });
// $(document).on('click', '.button.pic10', function () {

// });
// console.log(url);
// function addDest(address) {

// }
$("#bryanPic").click(function (){ 
    var originText = mapService.getDirections(url.searchParams.get("origin")); 
    var destinationText = $("#bryanPic").data('address');
    console.log(originText); 
    window.location.href = "./parks.html?origin=" + originText + "&destination=" + destText;  

});
// addDest("3604 Riverchase Court");