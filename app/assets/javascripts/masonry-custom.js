$(function() {
  var $container;
  $container = $('#container');
  return $container.imagesLoaded(function() {
    return $container.masonry({
      itemSelector: '.box',
      isAnimated: true,
      isFitWidth: true,
      columnWidth: 1
    });
  });
});




