$(function(){  
  if (gon.hostels){
    hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
    hostellatitude = hostels.latitude
    hostellongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude
    hostelId = hostels.hotelId
    // for(i=0; i<20; i++){
      // this will go in a window from google
    $.each(hostels, function(i, hostel){ // hidden form?  put this inside one then user submit - will this data be able to show???
    searchresult = '<li>' + 'hotel name' + hostel.name + ' '  + 'hostellowrate' + ' ' + 
    ' ' + hostel.lowRate + ' ' + 'hostelhighrate' + ' ' + hostel.highRate + 'hostel.lattude' +
    + hostel.latitude + '</li>' + $("input").attr("type", "button").click(function(){
                                  console.log('clicked')
                                  // some ajax call - to shift data back into rails
                                  $.ajax({
                                    type:post,
                                    url:"/hostels",
                                    //data: hostelId
                                    dataType:json // or script???

      })
    })

    $('#hostelResults').append(searchresult)
    }) // then how do get it in rails params? 
      // or i could put the whole thing in rails - but that wont work with google maps?
      // we just need the list actually so maybe it will
      // string intreplate in rails
      // but then displaying data inside the markers as well as the list to save may look at bit shit???

var fetchLatitude = $('#latitude').data('hostels') // data is the instance variable!!!
var fetchLongitude = $('#longitude').data('hostels')
var map;
var infowindow;
var hotelRed = new google.maps.MarkerImage('/assets/hotel_0star_red.png');

hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
hostelLatitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.latitude
hostelLongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude
hostelLowrate = gon.hostels.HotelListResponse.HotelList.HotelSummary.lowRate
//
function createMarkerForhostel(hostel){
    var latLng = new google.maps.LatLng(hostel.latitude,hostel.longitude);
    var marker = new google.maps.Marker({
      // if hostel low rate - ....then display yello or red or green!!!
      
      position: latLng,
      map: window.map,
      title: "hi",
      icon: hotelRed
      // wtf is this???
      //camera_id: camera.id
    }) 
    // call mapoattractions
    //addInfoWindowForCamera(marker, camera)
  }
  // what are we actualky passing into the attaction
function maphostels(hostels){
  // _(attactions).each(createMarkerForAttraction)
  $.each(hostels,function(i,hostel){
        createMarkerForhostel(hostel)
        // add a specfic id to this marker
  })    //iterate through this marker 
}       // then pass this marker back to the server end instead of the hotel marker itself. 
function initialize() { 
    var mapOptions = {
      zoom: 12,                     // hostel based on what user has typed in
      center: new google.maps.LatLng(fetchLatitude, fetchLongitude),
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }
      // do i need ajax for this??? 
    // $.ajax({
    //   url: attractions,
    //   dataType: "json",
    //   success: mapattractions
    // });
  window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions) 
  maphostels(hostels)
  
  infowindow = new google.maps.InfoWindow(); // put informaiton from api in here??? create a new function from this
   // built in service near by - calling function and request
}   
}

google.maps.event.addDomListener(window, "load", initialize);
})


