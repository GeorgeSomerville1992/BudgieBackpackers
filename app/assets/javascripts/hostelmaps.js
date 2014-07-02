$(function(){  
  if (gon.hostels){
    hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
    hostellatitude = hostels.latitude
    hostellongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude
    // for(i=0; i<20; i++){
    $.each(hostels, function(i, hostel){
    searchresult = '<li>' + 'hotel name' + hostel.name + ' '  + 'hostellowrate' + ' ' + 
    ' ' + hostel.lowRate + ' ' + 'hostelhighrate' + ' ' + hostel.highRate + 'hostel.lattude' +
    + hostel.latitude + '</li>' 

    $('#hostelResults').append(searchresult)
    })


var fetchlatitude = $('#latitude').data('hostels') // data is the instance variable!!!
var fetchlongitude = $('#longitude').data('hostels')
var map;
var infowindow;

hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
hostellatitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.latitude
hostellongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude


function createMarkerForhostel(hostel){
    var latLng = new google.maps.LatLng(hostel.latitude,hostel.longitude);
    var marker = new google.maps.Marker({
      position: latLng,
      map: window.map,
      title: "hi"
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

  })
}
function initialize() { 
    var mapOptions = {
      zoom: 12,                     // hostel based on what user has typed in
      center: new google.maps.LatLng(fetchlatitude, fetchlongitude),
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

initialize()
})