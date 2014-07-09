$ ->
  $container = $('#container')
  $container.imagesLoaded ->
    $container.masonry
      itemSelector: '.box',
      isAnimated: true
      isFitWidth: true
