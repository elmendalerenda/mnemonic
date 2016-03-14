(function ($) {
  'use strict';

  function loadImage() {
    $.get('/search?q=' + this.value, function(data){
      var imageUrl = data.images[0];
      $('#main-image').attr('src', imageUrl);
    });
  }

  $('#numbers-input').on('blur', loadImage);
})(jQuery);
