var Words;
var PageEvents = function($) {
  'use strict';
  function success(data) {
     var imageUrl = data.images[0];
     $('#main-image').attr('src', imageUrl);
  }

  function search() {
    var table = new ConsonantsTable();
    var criteria = new Mnemonic(window.Words, table).convert(this.value)

    $.get('/search?q=' + criteria, success);
  }

  $.get('/app/scripts/spanish.lex', function(data) {
    window.Words = new MatchList(data);
  });

  $('#numbers-input').on('blur', search);
};

(function(pageEvents, jQuery) {
  pageEvents(jQuery);
})(PageEvents, jQuery);
