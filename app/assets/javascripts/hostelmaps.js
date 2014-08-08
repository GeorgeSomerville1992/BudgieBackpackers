$(function(){  
  
    if (gon.hostels){
      hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
      hostellatitude = hostels.latitude

      hostellongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude
      hostelLowrate = gon.hostels.HotelListResponse.HotelList.HotelSummary.lowRate
      hostelTemplate = _.template($('#hostel-show-template').text())
      hostelDetailedTemplate = _.template($('#hostel-show-detailed-template').text())
      $.each(hostels, function(i, hostel){
        hostel.proximityDistance = Math.round(hostel.proximityDistance*10)/10
        arrayIndex = i.toString()

        if (typeof hostel.tripAdvisorRatingUrl == "undefined") {
          hostel.tripAdvisorRatingUrl = "not applicable"
        }
        if (typeof hostel.tripAdvisorReviewCount == "undefined") {
          hostel.tripAdvisorReviewCount = "not applicable"
        }



        if (typeof hostel.postalCode == "undefined") {
          hostel.postalCode = "not applicable"
        }
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
      $.each(attractions_foursquare_items, function(i, item){ 
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
var fetchLatitude = $('#latitude').data('hostels') 
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
      // '<p>' + attractionDetails.likes.summary + '</p>'+
      '<p>' + "Avarage Rating:"+ attractionDetails.rating +  '</p>' +
      '<a id="directionsattractions" class="button tiny">Calculate Directions</a>' + '</div>'
        var thisMarker = this;

        infowindow.setContent(contentStringAttraction);
        infowindow.open(window.mapAttraction,this);
        $('a#directionsattractions').on('click', function(ev){
          ev.preventDefault();
          
            directRouteAttraction(thisMarker.position);
          
        })     
    })
  }
  function maphostels(hostels){
    $.each(hostels,function(i,hostel){
        createMarkerForhostel(hostel, hostelLowrate)
    })     
  }       
  function mapattractions(attractions_foursquare){
    
    $.each(attractions_foursquare[0]['items'], function(i,attraction){
        var locationLat = attraction['venue']['location']['lat']
        var locationLong = attraction['venue']['location']['lng']
        var categoryName = attraction['venue']['categories']['0']['name']
        var attractionDetails = attraction['venue']
        createMarkerForAttraction(attraction, categoryName,locationLat, locationLong,attractionDetails)
    }) 
  }
  function initialize() { 
     directionsDisplay = new google.maps.DirectionsRenderer();
      var mapOptions = {
        zoom: 12,                     // hostel based on what user has typed in
        center: new google.maps.LatLng(fetchLatitude, fetchLongitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    map_container = document.getElementById('map-canvas')
      if(map_container != undefined){
        window.map = new google.maps.Map(map_container, mapOptions) 
        maphostels(hostels) 
      }
    map_container_attraction = document.getElementById('map-attraction-canvas')
      if(map_container_attraction != undefined){
        window.mapAttraction = new google.maps.Map(map_container_attraction, mapOptions) 
        mapattractions(attractions_foursquare)
      }
    directionsDisplay.setMap(window.map)
    infowindow = new google.maps.InfoWindow();
  }   
 google.maps.event.addDomListener(window, "load", initialize)
})


