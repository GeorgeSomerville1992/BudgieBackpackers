$(function(){ 
  var map;
  var infowindow;
  if (gon.hostels){
    hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
    hostellatitude = hostels.latitude
    hostellongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude
     //var hostelId = gon.hostels.HotelListResponse.HotelList.HotelSummary[i].hotelId
    hostelLowrate = gon.hostels.HotelListResponse.HotelList.HotelSummary.lowRate
    // for(i=0; i<20; i++){
      // this will go in a window from google
    // render into erb.....
    hostelTemplate = _.template($('#hostel-show-template').text())
    hostelDetailedTemplate = _.template($('#hostel-show-detailed-template').text())
    $.each(hostels, function(i, hostel){ // hidden form?  put this inside one then user submit - will this data be able to show???
      
      $('#hostelResults').append(hostelTemplate(hostel))
    })




    $('.hostel-info-button').on("click", function(hostelId){
      //console.log("clicked hostel info button with hotelId: " + $(this).data("hotelId"))
      hotelId = $(this).attr('data-hotelid');
      console.log(hotelId);

      $.ajax({
        url: "/hostels#show",
        type: "GET",
        data: hotelId, // admit sucessucion get 
        dataType: "json",
        success:function(){
          displayDetailedResults();
        }
      })
    })
    displayDetailedResults = function(){
      $.each(hostels, function(i, hostel){
        var hostelId = gon.hostels.HotelListResponse.HotelList.HotelSummary[i].hotelId
        console.log('ajax success')
        $('#hostelDetailedResults').append(hostelDetailedTemplate(hostel))
      })
    }
    // searchresult = '<li>' + 'hotel name' + hostel.name + ' '  + 'hostellowrate' + ' ' + 
    // ' ' + hostel.lowRate + ' ' + 'hostelhighrate' + ' ' + hostel.highRate + 'hostel.lattude' +
    // + hostel.latitude + '</li>' + $("input").attr("type", "button").click(function(){
    //                               console.log('clicked')
    //                               // some ajax call - to shift data back into rails
    //                               $.ajax({
    //                                 type:post,
    //                                 url:"/hostels",
    //                                 //data: hostelId
    //                                 dataType:json // or script???
  }
      //})
    

    // $('#hostelResults').append(searchresult)
   // then how do get it in rails params? 
      // or i could put the whole thing in rails - but that wont work with google maps?
      // we just need the list actually so maybe it will
      // string intreplate in rails
      // but then displaying data inside the markers as well as the list to save may look at bit shit???

var fetchLatitude = $('#latitude').data('hostels') // data is the instance variable!!!
var fetchLongitude = $('#longitude').data('hostels')

var hotelRed = new google.maps.MarkerImage('/assets/hotel_0star_red.png');
var hotelGreen = new google.maps.MarkerImage('/assets/hotel_0star_green.png')
var hotelYellow = new google.maps.MarkerImage('/assets/hotel_0star_yellow.png')
var hotelOrange = new google.maps.MarkerImage('/assets/hotel_0star_orange.png')

// function addInfoWindowForHostel(marker, hostels){
//     google.maps.event.addListener(marker, 'click', function(){
//       console.log("value of infowindow", infowindow)
//       if(infowindow != undefined) infowindow.close()
//       infowindow = new google.maps.InfoWindow({
//         content: '<p>' + hostel.name + '</p>'
//       })

      
//       map.setCenter(new google.maps.LatLng((marker.position.lat()), marker.position.lng())); 
//       map.setZoom(18);
//       marker.infowindow.open(map, marker);
//     })
//   }


  function createMarkerForhostel(hostel, lowrate){
      var latLng = new google.maps.LatLng(hostel.latitude,hostel.longitude);
      var lowRate = lowrate;
      console.log(lowRate);
      if(hostel.lowRate <= 40){
        var marker = new google.maps.Marker({
          position: latLng,
          map: window.map,
          title: "hi",
          icon: hotelGreen
        })
      }else if(hostel.lowRate <= 50){
        var marker = new google.maps.Marker({
        position: latLng,
        map: window.map,
        title: "hi",
        icon: hotelYellow
        })
      }else if(hostel.lowRate <= 70){
        var marker = new google.maps.Marker({
        position: latLng,
        map: window.map,
        title: "hi",
        icon: hotelOrange
        })
       }else if(hostel.lowRate <= 90){
        var marker = new google.maps.Marker({
        position: latLng,
        map: window.map,
        title: "hi",
        icon: hotelRed
        })
      }  
     //addInfoWindowForHostel(marker, hostel)   
    };  
    // var marker = new google.maps.Marker({
    //   // if hostel low rate - ....then display yello or red or green!!!
    //   if(hostelLowrate <= 50){
    //   position: latLng,
    //   map: window.map,
    //   title: "hi",
    //   icon: hotelgreen
    // } else if (hostelLowrate >= 70){
    //   position: latLng,
    //   map: window.map,
    //   title: "hi",
    //   icon: hotelRed

    // }

      // wtf is this???
      //camera_id: camera.i
  
    // call mapoattractions
    

  // what are we actualky passing into the attaction
  function maphostels(hostels){
    // _(attactions).each(createMarkerForAttraction)
    $.each(hostels,function(i,hostel){

        var hotel = gon.hostels.HotelListResponse.HotelList.HotelSummary[i]
        if(hotel != undefined)
          var hostelLowrate = hotel.lowRate
        else
          var hostelLowrate = 0
        createMarkerForhostel(hostel, hostelLowrate)
          // add a specfic id to this marker
    })    //iterate through this marker 
  }       // then pass this marker back to the server end instead of the hotel marker itself. 
  function initialize() { 
      var mapOptions = {
        zoom: 12,                     // hostel based on what user has typed in
        center: new google.maps.LatLng(fetchLatitude, fetchLongitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
        // do i need ajax for this??? 
      // $.ajax({
      //   url: attractions,
      //   dataType: "json",
      //   success: mapattractions
      // });
      
      map_container = document.getElementById('map-canvas')
      if(map_container != undefined){
        window.map = new google.maps.Map(map_container, mapOptions) 
        maphostels(gon.hostels)
        
        //infowindow = new google.maps.InfoWindow(); 
      }
      // var contentString = '<p>' + hostels.name + '</p>';
      // if(contentString != undefined){


      // }
      // put informaiton from api in here??? create a new function from this
      // built in service near by - calling function and request
      
  }   

 google.maps.event.addDomListener(window, "load", initialize)
 });


