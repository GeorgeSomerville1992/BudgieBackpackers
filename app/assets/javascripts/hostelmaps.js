$(function(){  
    if (gon.hostels){
      hostels = gon.hostels.HotelListResponse.HotelList.HotelSummary
      hostellatitude = hostels.latitude
      hostellongitude = gon.hostels.HotelListResponse.HotelList.HotelSummary.longitude
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

        $('#hotelOfferResults').append(hostelOfferTemplate(hostel))

      })


    }

    if (gon.hostel_attraction_foursquare){

      attractions_foursquare = gon.hostel_attraction_foursquare.groups
      attractions_foursquare_items = attractions_foursquare[0].items 
      attractions_foursquare_template = _.template($('#attraction-foursquare-template').text())
      attractions_foursquare_venues = attractions_foursquare[0]['items']
     
      
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
        if (typeof item.venue.rating == "undefined") {
          item.venue.rating = "not applicable"
        }
        if (typeof item.venue.ratingSignals == "undefined") {
          item.venue.ratingSignals = "not applicable"
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
        $('#showfoursquaretopPicdata').append(attractions_foursquare_topPics_template(item))
      })

      $.each(attractions_foursquare_topPics_odd_venues, function(i,item){

        $('#showfoursquare-toppics-template-odd').append(attractions_foursquare_topPics_template_odd(item))
      })

      $.each(attractions_foursquare_topPics_third_venues, function(i,item){

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
var infowindow;
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
    //addInfoWindowForCamera(marker, camera)
  }

  function createMarkerForAttraction(attraction, attraction_catagory, locationLat, locationLong){
    var attractionCatagory = attraction_catagory
    var latLng = new google.maps.LatLng(locationLat,locationLong);  
    console.log(attractionCatagory)
    
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





  }




  // what are we actualky passing into the attaction
  function maphostels(hostels){
    // _(attactions).each(createMarkerForAttraction)
    $.each(hostels,function(i,hostel){

        var hostelLowrate = gon.hostels.HotelListResponse.HotelList.HotelSummary[i].lowRate
        createMarkerForhostel(hostel, hostelLowrate)
          // add a specfic id to this marker
    })    //iterate through this marker 
  }       // then pass this marker back to the server end instead of the hotel marker itself. 
  function mapattractions(attractions_foursquare){
    $.each(attractions_foursquare[0]['items'], function(i,attraction){

        console.log(attraction);
        console.log(attraction['venue']);
        console.log(attraction['venue']['categories']);
        console.log(attraction['venue']['categories']['0']);
        var locationLat = attraction['venue']['location']['lat']
        var locationLong = attraction['venue']['location']['lng']
        var categoryName = attraction['venue']['categories']['0']['name']
        // venue location - lat
        //attractions_foursquare_items[0]['venue']['categories'][0]['name']
        // var attraction_catagory = attractions_foursquare_items.categories[i].name

        //var attractionname = attractions.name
        createMarkerForAttraction(attraction, categoryName,locationLat, locationLong)
          // add a specfic id to this marker
    }) 
  }
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


    //window.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions) 
    //maphostels(hostels)
    
    infowindow = new google.maps.InfoWindow(); // put informaiton from api in here??? create a new function from this
     // built in service near by - calling function and request
  }   


 google.maps.event.addDomListener(window, "load", initialize)
})


