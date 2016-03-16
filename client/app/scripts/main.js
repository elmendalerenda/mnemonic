var PageEvents = function($) {
  'use strict';

  function success(data) {
     var imageUrl = data.images[0];
     $('#main-image').attr('src', imageUrl);
  }

  function search() {
    $.get('/search?q=' + this.value, success);
  }

  $('#numbers-input').on('blur', search);
};

(function(pageEvents, jQuery) {
  pageEvents(jQuery);
})(PageEvents, jQuery);
