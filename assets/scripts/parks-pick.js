var url = new URL(window.location);

// $(document).on('click', '.button.pic1', addDest(destination));
// $(document).on('click', '.button.pic2', addDest(destination));
// $(document).on('click', '.button.pic3', addDest(destination));
// $(document).on('click', '.button.pic4', addDest(destination));
// $(document).on('click', '.button.pic5', addDest(destination));
// $(document).on('click', '.button.pic6', addDest(destination));
// $(document).on('click', '.button.pic7', addDest(destination));
// $(document).on('click', '.button.pic8', addDest(destination));
// $(document).on('click', '.button.pic9', addDest(destination));
// $(document).on('click', '.button.pic10', addDest(destination));
// console.log(url);
// function addDest(address) {

// }
$("#testButton").click(function (){
    // var destText = address; 
    var originText = mapService.getDirections(url.searchParams.get("origin")); 
    console.log(originText); 
    window.location.href = "./parks.html?origin=" + originText + "&destination=" + destText;  

});
// addDest("3604 Riverchase Court");