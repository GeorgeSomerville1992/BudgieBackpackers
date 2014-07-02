

$(function(){
  if(gon.attractions){
    attractions = gon.attractions.businesses
    // attractionLong = gon.attractions.region.center.latitude
    // attractionLat = gon.attractions.region.center.longitude

    $.each(attractions, function(i, attraction){
       
    attractionratings = '<li>' + 'attraction rating' + attraction.rating + '</li>' + '</br>'
                + '<li>' + 'attraction name' + attraction.name + '</li>' + '</br>'
                // + '<li>' + 'attraction picture' + '<img src='+attraction.image_url+'>'+ '</li>' + '</br>'
                + '<li>' + 'attraction deal' + attraction.deals + '</li>' + '</br>'
        $('#attractionResults').append(attractionratings)
    })
    attactiondeals = gon.attractions.businesses.deals
    $.each(attractions,function(i, attractiondeals){
      attractiondeals = 
                + '<li>' + ' ' + attractiondeals.title + '</li>' + '</br>'
                // + '<li>' + ' ' + '<img src='+attractiondeals.image_url +'>' + '</li>' + '</br>'
                + '<li>' + ' ' + attractiondeals.time_start + '</li>' + '</br>'
                + '<li>' + ' ' + attractiondeals.url + '</li>' + '</br>'
        $('#attractionDeals').append(attractiondeals)        
    }) 
}
// specfiy these thr RIGHT WAY ROUND.......!!!!!
attractionLong = gon.attractions.region.center.longitude
attractionLat = gon.attractions.region.center.latitude
attractions = gon.attractions.businesses
var fetchlatitude = $('#latitude').data('attractions') // data is the instance variable!!!
var fetchlongitude = $('#longitude').data('attractions')
var map;
var infowindow;
var latLng
function createMarkerForAttraction(){
    var latLng = new google.maps.LatLng(attractionLat,attractionLong);
    var marker = new google.maps.Marker({
      position: latLng,
      map: window.map,
      title:"here"  
      // do not know why i need the below
      // attraction_id: attraction.id
    }) 
    // call mapoattractions
    // marker.setMap(window.map);
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
  window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions) 
  mapattractions(attractions)
  infowindow = new google.maps.InfoWindow(); // put informaiton from api in here??? create a new function from this
   // built in service near by - calling function and request
}      // the main part for genreateing the markers 
initialize()
})