'use strict';
var PageEvents = function($) {
  function success(data) {
    var imageUrl = data.images[0];
    $('#main-image').attr('src', imageUrl);
  }

  function search() {
    var criteria = window.mnemonic.convert(this.value);
    $.get('/search?q=' + criteria, success);
  }

  $('#numbers-input').on('blur', search);
};

(function(pageEvents, jQuery) {
  window.mnemonic = new Mnemonic();
  pageEvents(jQuery);
})(PageEvents, jQuery);
