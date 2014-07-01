

$(function(){
// attractionLong = gon.attractions.region.center.latitude
// attractionLat = gon.attractions.region.center.longitude
attractions = gon.attractions.businesses
var fetchlatitude = $('#latitude').data('locations') // data is the instance variable!!!
var fetchlongitude = $('#longitude').data('locations')
var map;
var infowindow;
function createMarkerForAttraction(attraction){
    var latLng = new google.maps.LatLng(attractionLat,attractionLong);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
    }) 
    // call mapoattractions

    //addInfoWindowForCamera(marker, camera)
  }
  // what are we actualky passing into the attaction
function mapattractions(attractions){
  // _(attactions).each(createMarkerForAttraction)
  $.each(attractions,function(i,attraction){
        createMarkerForAttraction(attraction.name)

  })
}
  
function initialize() { 
    var mapOptions = {
      zoom: 12,                     // location based on what user has typed in
      center: new google.maps.LatLng(fetchlatitude, fetchlongitude),
      mapTypeId: google.maps.MapTypeId.SATELLITE
    }
      // do i need ajax for this??? 
    // $.ajax({
    //   url: attractions,
    //   dataType: "json",
    //   success: mapattractions
    // });
  mapattractions(attractions)
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions) 
  infowindow = new google.maps.InfoWindow(); // put informaiton from api in here??? create a new function from this
   // built in service near by - calling function and request
}      // the main part for genreateing the markers 
initialize()
})