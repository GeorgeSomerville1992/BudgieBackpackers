$(function(){  
  
    if (gon.hostels){
      hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
      // roomdetails = hostels.RoomRateDetailsList.RoomRateDetails.ValueAdds
      // console.log(roomdetails)
      hostellatitude = hostels.latitude
      hostellongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude
      console.log(hostels)
      console.log(hostellatitude)
       //var hostelId = gon.hostels.HotelListResponse.HotelList.HotelSummary[i].hotelId
      hostelLowrate = gon.hostels.HotelListResponse.HotelList.HotelSummary.lowRate
      
      //distance_miles = gon.hostel_attractions.businesses.distance * 0.00062137
      // hostelProximityRound = gon.hostels.HotelListResponse.HotelList.HotelSummary.proximityDistance * 1000
      // for(i=0; i<20; i++){
        // this will go in a window from google
      // render into erb.....
      hostelTemplate = _.template($('#hostel-show-template').text())
      hostelDetailedTemplate = _.template($('#hostel-show-detailed-template').text())

      

      $.each(hostels, function(i, hostel){ // hidden form?  put this inside one then user submit - will this data be able to show???
        hostel.proximityDistance = Math.round(hostel.proximityDistance*10)/10
        arrayIndex = i.toString()
        // var tripAdvisorUrl = hostel[i].tripAdvisorRatingUrl

        if (typeof hostel.tripAdvisorRatingUrl == "undefined") {
          hostel.tripAdvisorRatingUrl = "not applicable"
        }
        if (typeof hostel.tripAdvisorReviewCount == "undefined") {
          hostel.tripAdvisorReviewCount = "not applicable"
        }



        if (typeof hostel.postalCode == "undefined") {
          hostel.postalCode = "not applicable"
        }

        // if (typeof hostel.RoomRateDetailsList.RoomRateDetails.ValueAdds.ValueAdd.description == "undefined") {
        //   hostel.RoomRateDetailsList.RoomRateDetails.ValueAdds.ValueAdd.description = "Nothing cool about this hotel!"
        // }
        //<%= RoomRateDetailsList.RoomRateDetails.ValueAdds['ValueAdd'].description %>


        





        $('#hostelResults').append(hostelTemplate(hostel,i))

        // how would you render erb into a string????? 
        console.log(hostel.postalCode)
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
       

    }
    if (gon.hostel_price_sort){
      hostels_prices = gon.hostel_price_sort.HotelListResponse.HotelList.HotelSummary
      hostelOffers = hostels_prices.slice(0,4)
      hostelOfferTemplate = _.template($('#hostel-show-cheapest-hotels').text())
      $.each(hostelOffers, function(i, hostel){

        if (typeof hostel.postalCode == "undefined") {
          hostel.postalCode = "not applicable"
        }
        
        $('#hotelOfferResults').append(hostelOfferTemplate(hostel))

        

      })


    }

    if (gon.hostel_attraction_foursquare){

      attractions_foursquare = gon.hostel_attraction_foursquare.groups
      attractions_foursquare_items = attractions_foursquare[0].items 
      attractions_foursquare_template = _.template($('#attraction-foursquare-template').text())
      attractions_foursquare_venues = attractions_foursquare[0]['items']
     console.log(attractions_foursquare_items)
      
      a = attractions_foursquare[0].items
      // debugger
      $.each(attractions_foursquare_items, function(i, item){ // hidden form?  put this inside one then user submit - will this data be able to show???
        // console.log(item.venue)
        // if (typeof item.venue.price.currency == "undefined") {
        //   item.venue.price.currency = "not applicable"
        // }
        // if (typeof item.price.message == "undefined") {
        //   item.price.message = "not applicable"
        // }
        /// <img src="<%= tips[0].user.photo.prefix %>60x60<%= tips[0].user.photo.suffix %>" 
        // :plain
        //   <img src="<%= ['tips'][0].user.photo.prefix %>60x60<%= ['tips'][0].user.photo.suffix %>"
        //console.log(item.tips['0'].user.photo.prefix )
        if (typeof item.venue.rating == "undefined") {
          item.venue.rating = "not applicable"
        }
        if (typeof item.venue.ratingSignals == "undefined") {
          item.venue.ratingSignals = "not applicable"
        }

        if (typeof item.venue.price == "undefined") {
          item.venue.price = "not applicable"
        }
        // <%= hours.status %> 
        if (typeof item.venue.hours == "undefined") {
          item.venue.hours = "unavailable"
        }


        $('#showfoursquaredata').append(attractions_foursquare_template(item.venue))
        
      })

      


      for(var i = 0; i < a.length; i ++) { 
        
        $('#showfoursquaredata').append(a[i].venue.name)
        
      }

    }

    if (gon.hostel_attraction_foursquare_topPics){

      attractions_topPics = gon.hostel_attraction_foursquare_topPics.groups  
      attractions_topPics_items = attractions_topPics[0].items
      attractions_topPics_items_first = attractions_topPics_items.slice(0,1)
      attractions_foursquare_topPics_template = _.template($('#attraction-foursquare-topPics-template').text())
      attractions_foursquare_topPics_odd_venues = attractions_topPics_items.slice(1,2)
      attractions_foursquare_topPics_template_odd = _.template($('#attraction-foursquare-topPics-template-odd').text())  
      attractions_foursquare_topPics_third_venues = attractions_topPics_items.slice(2,3)
      attractions_foursquare_topPics_template_third = _.template($('#attraction-foursquare-topPics-template-third').text())
      $.each(attractions_topPics_items_first , function(i, item){
        console.log(item.venue['photos']['groups'][0]['items'][0].prefix)
        if (typeof item.venue.contact.phone == "undefined") {
          item.venue.contact.phone = "not available"
        }
         if (typeof item.venue.contact.twitter == "undefined") {
          item.venue.contact.twitter = "not available"
        }
         if (typeof item.venue.contact.facebook== "undefined") {
          item.venue.contact.facebook = "not available"
        }
        if (typeof item.venue.url== "undefined") {
          item.venue.url = "not available"
        }
        // <%= tips[0].url %>
        if (typeof item.tips[0].url == "undefined") {
          item.tips[0].url = "Sorry, link to this article is not available"
        }



        $('#showfoursquaretopPicdata').append(attractions_foursquare_topPics_template(item))
         
      })

      $.each(attractions_foursquare_topPics_odd_venues, function(i,item){
        if (typeof item.venue.contact.phone == "undefined") {
          item.venue.contact.phone = "not available"
        }
         if (typeof item.venue.contact.twitter == "undefined") {
          item.venue.contact.twitter = "not available"
        }
         if (typeof item.venue.contact.facebook== "undefined") {
          item.venue.contact.facebook = "not available"
        }
        if (typeof item.venue.url== "undefined") {
          item.venue.url = "not available"
        }
        if (typeof item.tips[0].url == "undefined") {
          item.tips[0].url = "Sorry, link to this article is not available"
        }
        $('#showfoursquare-toppics-template-odd').append(attractions_foursquare_topPics_template_odd(item))
      })

      $.each(attractions_foursquare_topPics_third_venues, function(i,item){
        if (typeof item.venue.contact.phone == "undefined") {
          item.venue.contact.phone = "not available"
        }
         if (typeof item.venue.contact.twitter == "undefined") {
          item.venue.contact.twitter = "not available"
        }
         if (typeof item.venue.contact.facebook== "undefined") {
          item.venue.contact.facebook = "not available"
        }
        if (typeof item.venue.url== "undefined") {
          item.venue.url = "not available"
        }
        if (typeof item.tips[0].url == "undefined") {
          item.tips[0].url = "Sorry, link to this article is not available"
        }
        $('#showfoursquare-toppics-template-third').append(attractions_foursquare_topPics_template_third(item))
      })





    }



    //   for(var i = 0; i < a.length; i ++) { 

    //     $('#test').append(a[i].venue.name)

    //   }


    // }
   
    // $('#hostelResults').append(searchresult)
   // then how do get it in rails params? 
      // or i could put the whole thing in rails - but that wont work with google maps?
      // we just need the list actually so maybe it will
      // string intreplate in rails
      // but then displaying data inside the markers as well as the list to save may look at bit shit???

var fetchLatitude = $('#latitude').data('hostels') // data is the instance variable!!!
var fetchLongitude = $('#longitude').data('hostels')
var map;
var map_container;
var infowindow;
var directionsDisplay;
var directionsDisplayAttraction;
var directionsRenderer = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var directionsRendererAttraction = new google.maps.DirectionsRenderer();
var directionsServiceAttraction = new google.maps.DirectionsService();
var hotelRed = new google.maps.MarkerImage('/assets/hotel_0star_red.png');
var hotelGreen = new google.maps.MarkerImage('/assets/hotel_0star_green.png')
var hotelYellow = new google.maps.MarkerImage('/assets/hotel_0star_yellow.png')
var hotelOrange = new google.maps.MarkerImage('/assets/hotel_0star_orange.png')
var bar = new google.maps.MarkerImage('/assets/winebar.png')
var restaurant = new google.maps.MarkerImage('/assets/restaurant.png')
var coffee = new google.maps.MarkerImage('/assets/coffee.png')
var general = new google.maps.MarkerImage('/assets/panoramicview.png')
var beer = new google.maps.MarkerImage('/assets/beer.png')
// var fetchHostelAttraction = $('#hotel_attraction').data('hostels')
  
//   $('.showyelp').click(function() {
//     var url = "http://api.yelp.com/" +
//             "business_review_search?"+
//             "&term=" + fetchHostelAttraction + 
//             "&lat=" + fetchLatitude +
//             "&long=" + fetchLongitude +
//             "&ywsid=" + "tEgG-fgQ2KUyHahOv7gWBQ"
//     $.ajax({
//       type: 'GET',
//       url: url,
//         dataType: 'json',
//         success:function(){
//             displayYelpURL();
//       }
//       })
//   });
//     function displayYelpURL() {
//         //return encodeURI(url);
//        console.log("done")
//     }
    
  

//hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
//hostelLatitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.latitude
//hostelLongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude
//var hostelLowrate = gon.hostels.HotelListResponse.HotelList.HotelSummary.lowRate
//

// function addInfoWindowForHostel(marker, hostel){
//   google.maps.event.addListener(marker, 'click', function(){
//     console.log("i have just been clicked")
//     if(infowindow != undefined) infowindow.close()
//       infowindow = new google.maps.InfoWindow({
//         content: "<p> i have just been clicked! </p> "

//     })
//     map.setCenter(new google.maps.LatLng((marker.position.lat()), marker.position.lng()));
//     map.setZoom(18);
//     infowindow.open(map, marker);


//   })
// }  

// function initializemapDragHostels(mapcenter){
//   var mapOptions = {
//       zoom: 12,                     // hostel based on what user has typed in
//       center: mapcenter,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//   }
//   map_container = document.getElementById('map-canvas')
//     if(map_container != undefined){
//       window.map = new google.maps.Map(map_container, mapOptions) 
//       maphostels(hostels)
//       // gon.hostels is was messing everything up
//       //infowindow = new google.maps.InfoWindow(); 
//   }

// }


// function calcRoute(marker,hostel) {
//   var end = new google.maps.LatLng(hostel.latitude,hostel.longitude);
//   var start = $("#address").data('hostels');
//   console.log(end)
//   var request = {
//       origin:start,
//       destination:end,
//       travelMode: google.maps.TravelMode.DRIVING
//   };
//   directionsService.route(request, function(response, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(response);
//     }
//   });
// }
function directRoute(position) {
  var start = $("#address").data('hostels');
  console.log(start)
  directionsRenderer.setMap();
  var directionsRequest = {
    origin: start,
    destination: position,
    travelMode: google.maps.DirectionsTravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC
  };
   directionsService.route(directionsRequest,function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setMap(window.map)
        directionsDisplay.setDirections(response);
        directionsDisplay.setPanel(document.getElementById('directions-panel-front'));
        directions = directionsDisplay.setDirections(response);
        $('#directions').click();
        // console.log(directions);
        //directionsRenderer.setDirections(response)
        //directionsRenderer.setPanel(document.getElementById('directions-panel'));
        //$('#directions').click();
    }
    else
      $("#error").append("Unable to retrieve your route<br />");
      }
    );

}
function createMarkerForhostel(hostel, lowrate){
    var latLng = new google.maps.LatLng(hostel.latitude,hostel.longitude);
    var lowRate = lowrate;
    var contentString = '<div id="markerinfowindow">' + '<h3>' + hostel.name + '</h3>' +
                    '<p>' + 'Rate:' + ' ' + '<b>' + hostel.lowRate + '</b>' + '</p>' +
                    '<p>' + 'Address:' + ' ' + hostel.address1 + '</p>' +
                    '<p>' + 'Postcode:' + ' ' + hostel.postalCode + '</p>' +
                    '<img width=100px, height=100px, src= http://images.travelnow.com/'+ hostel.thumbNailUrl + '>' + '<br/>' +
                    '<a id="directions" class="button tiny">Calculate Directions</a>' + '</div>'
    // var contentString =
    //   '<h3>' + hostel.name + '</h3>' +
    //   '<p>' + 'Price:' + ' ' + '<b>' + hostel.lowRate + '</b>' + '</p>' +
    //   '<p>' + 'Address:' + ' ' + hostel.address1 + '</p>' +
    //   '<p>' + 'Postcode:' + ' ' + hostel.postalCode + '</p>' +
    //   '<img src= http://images.travelnow.com/'+ hostel.thumbNailUrl + '>' +
    //   '<a id="directions" class="button tiny">Calculate Directions</a>'
    
    if(hostel.lowRate <= 40){
      var marker = new google.maps.Marker({
        position: latLng,
        map: window.map,
        title: "hi",
        icon: hotelGreen,
        animation: google.maps.Animation.DROP
      });
         google.maps.event.addListener(marker, 'click', function(){
          console.log("hello")
          var thisMarker = this;
          console.log(thisMarker)
          infowindow.setContent(contentString);
          infowindow.open(window.map,this);
          $('a#directions').on('click', function(ev){
            ev.preventDefault();
              directRoute(thisMarker.position);
              infowindow.close(); 
          })
        })
    }else if(hostel.lowRate <= 50){
      var marker = new google.maps.Marker({
      position: latLng,
      map: window.map,
      title: "hi",
      icon: hotelYellow,
      animation: google.maps.Animation.DROP
      });
        google.maps.event.addListener(marker, 'click', function(){
          console.log("hello")
          var thisMarker = this;
          console.log(thisMarker)
          infowindow.setContent(contentString);
          infowindow.open(window.map,this);
          $('a#directions').on('click', function(ev){
            ev.preventDefault();
              directRoute(thisMarker.position); 
              infowindow.close(); 
          })
        })
    }else if(hostel.lowRate <= 70){
      var marker = new google.maps.Marker({
      position: latLng,
      map: window.map,
      title: "hi",
      icon: hotelOrange,
      animation: google.maps.Animation.DROP
      });
        google.maps.event.addListener(marker, 'click', function(){
          console.log("hello")
          var thisMarker = this;
          console.log(thisMarker)
          infowindow.setContent(contentString);
          infowindow.open(window.map,this);
          $('a#directions').on('click', function(ev){
            ev.preventDefault();
              directRoute(thisMarker.position);
              infowindow.close(); 
          })
        })
     }else if(hostel.lowRate <= 90){
      var marker = new google.maps.Marker({
      position: latLng,
      map: window.map,
      title: "hi",
      icon: hotelRed,
      animation: google.maps.Animation.DROP
      });
       google.maps.event.addListener(marker, 'click', function(){
        console.log("hello")
        var thisMarker = this;
        console.log(thisMarker)
         
        infowindow.setContent(this.info);
        infowindow.open(window.map,this);
        $('a#directions').on('click', function(ev){
          ev.preventDefault();
            directRoute(thisMarker.position);
             infowindow.close(); 
        })
      })
    };     
  

    //dragNewHostels(mapcenter)
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
    

    // google.maps.event.addListener(marker, 'click', function(){
    //   console.log("hello")
    //     var contentString = '<h3>' + hostel.name + '</h3>' +
    //                 '<p>' + 'Price:' + ' ' + '<b>' + hostel.lowRate + '</b>' + '</p>' +
    //                 '<p>' + 'Address:' + ' ' + hostel.address1 + '</p>' +
    //                 '<p>' + 'Postcode:' + ' ' + hostel.postalCode + '</p>' +
    //                 '<img src= http://images.travelnow.com/'+ hostel.thumbNailUrl + '>' +
    //                 '<a id="directions" class="button tiny">Calculate Directions</a>'
    //     var thisMarker = this;
    //     console.log(thisMarker)
    //     infowindow.setContent(contentString);
    //     infowindow.open(window.map,this);
    //     $('a#directions').on('click', function(ev){
    //       ev.preventDefault();
          
    //         directRoute(thisMarker.position);
          
    //     })
    //   if(infowindow != undefined) infowindow.close()
    //   infowindow = new google.maps.InfoWindow({
    //     content: "hello"
    //   })
    //   // map_container.setCenter(new google.maps.LatLng((marker.position.lat()), marker.position.lng())); 
    //   // map_container.setZoom(18);
     
    //  })
      // wtf is this???
      //camera_id: camera.i

    //calcRoute(marker,hostel)
    // console.log(mapcenter.B)
    // call mapoattractions
    //addInfoWindowForHostel(marker, hostel)
    
    // console.log(mapcenter)
    // google.maps.event.addListener(window.map, 'dragend',function() { 
    // var newCoords = window.map.getCenter(mapcenter);
    //   console.log(newCoords)

    //   var mapOptions = {
    //     zoom: 12,                     // hostel based on what user has typed in
    //     center: new google.maps.LatLng(newCoords.k, newCoords.B),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }



    //   map_container = document.getElementById('map-canvas')
    //   if(map_container != undefined){
    //     window.map = new google.maps.Map(map_container, mapOptions) 
    //     var mapcenter = window.map.getCenter();
    //     console.log(mapcenter)
    //     maphostels(hostels,mapcenter)
    //     // gon.hostels is was messing everything up
    //     //infowindow = new google.maps.InfoWindow(); 
    //   }

    // // maphostels(hostel,mapcenter)
      
    // });
}
  function directRouteAttraction(position) {
  var start = $("#address").data('hostels');
  console.log(start)
  directionsRenderer.setMap();
  var directionsRequest = {
    origin: start,
    destination: position,
    travelMode: google.maps.DirectionsTravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC
  };
  console.log("this is working")
   directionsService.route(directionsRequest,function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setMap(window.mapAttraction)
        directionsDisplay.setDirections(response);
        directions = directionsDisplay.setDirections(response);
        console.log(directions)
        //directionsRenderer.setDirections(response)
        //directionsRenderer.setPanel(document.getElementById('directions-panel'));
        //$('#directions').click();
    }
    else
      $("#error").append("Unable to retrieve your route<br />");
      }
    );

}
  function createMarkerForAttraction(attraction, attraction_catagory, locationLat, locationLong,attractionDetails){
    var attractionCatagory = attraction_catagory
    var latLng = new google.maps.LatLng(locationLat,locationLong);  
    //console.log(attractionCatagory)
    
     // if(attractionCatagory == "Bar"){
     //  var marker = new google.maps.Marker({
     //    position: latLng,
     //    map: window.mapAttraction,
     //    title: "hi",
     //    icon: bar
     //  })
      if(attractionCatagory == "Bar"){
      var marker = new google.maps.Marker({
        position: latLng,
        map: window.mapAttraction,
        title: "hi",
        icon: bar
      
      })
    } else if(attractionCatagory == "Cafe"){
        var marker = new google.maps.Marker({
          position: latLng,
          map: window.mapAttraction,
          title: "hi",
          icon: restaurant 
        })
      }else if(attractionCatagory == "Pub"){
      var marker = new google.maps.Marker({
        position: latLng,
        map: window.mapAttraction,
        title: "hi",
        icon: beer
      
        })
      }else 
    
      var marker = new google.maps.Marker({
        position: latLng,
        map: window.mapAttraction,
        title:"Hello World!",
        icon: general 
      });

      google.maps.event.addListener(marker, 'click', function(){
      console.log(attractions_foursquare_items)

      var contentStringAttraction = '<div id="attractioninfowindow">' +
      '<h3>' + attractionDetails.name + '</h3>' +
      '<p>' + '<b>' + attractionDetails.location.address + '</b>' + '</p>'+
      '<p>' + attractionDetails.hereNow.summary + '</p>'+
      '<p>' + attractionDetails.likes.summary + '</p>'+
      '<p>' + "Avarage Rating:"+ attractionDetails.rating +  '</p>' +
      '<a id="directionsattractions" class="button tiny">Calculate Directions</a>' + '</div>'

      // '<p>' + hostel.address1 + '</p>' +
      // '<p>' + hostel.postalCode + '</p>' +
      // '<img src= http://images.travelnow.com/'+ hostel.thumbNailUrl + '>'
        var thisMarker = this;

        infowindow.setContent(contentStringAttraction);
        infowindow.open(window.mapAttraction,this);
        $('a#directionsattractions').on('click', function(ev){
          ev.preventDefault();
          
            directRouteAttraction(thisMarker.position);
          
        })

      // if(infowindow != undefined) infowindow.close()
      // infowindow = new google.maps.InfoWindow({
      //   content: "hello"
      // })
      // map_container.setCenter(new google.maps.LatLng((marker.position.lat()), marker.position.lng())); 
      // map_container.setZoom(18);
     
    })


    //   google.maps.event.addListener(window.mapAttraction, 'dragend',function() { 
    //     var newCoordsAttraction = window.mapAttraction.getCenter();
        

    //     var mapOptions = {
    //       zoom: 12,                     // hostel based on what user has typed in
    //       center: new google.maps.LatLng(newCoordsAttraction.k, newCoordsAttraction.B),
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }
    //     map_container_attraction = document.getElementById('map-attraction-canvas')
    //     if(map_container_attraction != undefined){
    //     window.mapAttraction = new google.maps.Map(map_container_attraction, mapOptions) 
    //     var clientId = "PJOVUMNXMNMSCGSYVETRKZ23WN2LUR31M0AD04AMKTJAKI5I"
    //     var clientSecret = "3GG355R0B5D4KMH1J1UIUFXH2ZZCFH4ISOW5WTNYV11JJTDV"
    //     var api_Version = '20120610'
    //     var query = $("#hotel_attraction").data('hostels');
    //     var requestUrl = 'https://api.foursquare.com/v2/venues/explore?ll='+ newCoordsAttraction.k+','+newCoordsAttraction.B +'&query='+ query + '&price=1&venuePhotos=true&client_id='+ clientId + '&client_secret='+ clientSecret+'&v='+ api_Version
    //     //console.log(requestUrl)
    //     //attractions_foursquare = 
    //     //https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD
    //     $.ajax({
    //       url: requestUrl,
    //       dataType: "json",
    //       complete: showAttractionAjax
    //     });
    //     function showAttractionAjax(response){
    //       raw_data = response.responseText
          
    //       var format = JSON.parse(raw_data);
    //       var groups = format.response['groups']
    //       //console.log(groups)
    //       attractions_foursquare = groups
    //       mapattractions(attractions_foursquare)

    //     }
    //     // gon.hostels is was messing everything up
    //     //infowindow = new google.maps.InfoWindow(); 
    //   }

    // // maphostels(hostel,mapcenter)
      
    // });




  }




  // what are we actualky passing into the attaction
  function maphostels(hostels){
    // _(attactions).each(createMarkerForAttraction)
    $.each(hostels,function(i,hostel){
      // console.log(mapcenter)
        //var hostelLowrate = gon.hostels.HotelListResponse.HotelList.HotelSummary[i].lowRate
        createMarkerForhostel(hostel, hostelLowrate)
          // add a specfic id to this marker
    })    //iterate through this marker 
  }       // then pass this marker back to the server end instead of the hotel marker itself. 
  function mapattractions(attractions_foursquare){
    
    $.each(attractions_foursquare[0]['items'], function(i,attraction){

        // console.log(attraction);
        // console.log(attraction['venue']);
        // console.log(attraction['venue']['categories']);
        // console.log(attraction['venue']['categories']['0']);
        var locationLat = attraction['venue']['location']['lat']
        var locationLong = attraction['venue']['location']['lng']
        var categoryName = attraction['venue']['categories']['0']['name']
        var attractionDetails = attraction['venue']
        // venue location - lat
        //attractions_foursquare_items[0]['venue']['categories'][0]['name']
        // var attraction_catagory = attractions_foursquare_items.categories[i].name

        //var attractionname = attractions.name
        createMarkerForAttraction(attraction, categoryName,locationLat, locationLong,attractionDetails)
          // add a specfic id to this marker
    }) 
  }
  function initialize() { 
     directionsDisplay = new google.maps.DirectionsRenderer();
      var mapOptions = {
        zoom: 12,                     // hostel based on what user has typed in
        center: new google.maps.LatLng(fetchLatitude, fetchLongitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // google.maps.event.addListener(map, 'dragend', getPinsToMapBound);
        // do i need ajax for this??? 
      // $.ajax({
      //   url: attractions,
      //   dataType: "json",
      //   success: mapattractions
      // });
    map_container = document.getElementById('map-canvas')
      if(map_container != undefined){
        window.map = new google.maps.Map(map_container, mapOptions) 
        //var mapcenter = window.map.getCenter();
        // console.log(mapcenter)
        maphostels(hostels)
        // gon.hostels is was messing everything up
        //infowindow = new google.maps.InfoWindow(); 
      }
    map_container_attraction = document.getElementById('map-attraction-canvas')
      if(map_container_attraction != undefined){
        window.mapAttraction = new google.maps.Map(map_container_attraction, mapOptions) 
        mapattractions(attractions_foursquare)
        // gon.hostels is was messing everything up
        //infowindow = new google.maps.InfoWindow(); 
      }
    directionsDisplay.setMap(window.map)
    



    //window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions) 
    //maphostels(hostels)
    
    infowindow = new google.maps.InfoWindow(); // put informaiton from api in here??? create a new function from this
     // built in service near by - calling function and request
  }   





 google.maps.event.addDomListener(window, "load", initialize)
})
// <img src="http://images.travelnow.com//hotels/5000000/4650000/4646600/4646581/4646581_50_t.jpg/">

// <img src="http://images.travelnow.com//hotels/3000000/2690000/2688900/2688875/2688875_30_t.jpg">


