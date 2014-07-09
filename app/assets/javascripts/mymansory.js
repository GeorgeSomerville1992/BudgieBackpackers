
  var $containter = $('#container');
      $containter.imagesLoaded( function(){
          $containter.masonry({
            itemSelector: '.box',
            isAnimated: !Modernizr.csstransitions,
            isFitWidth: true
       });  
  });