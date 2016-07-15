'use strict';
var PageEvents = function($) {
  function renderImages(data) {
//TOTEST
    var imageUrl = data.images[0];
    var all_rows = qsa('.images-row');
    var last_image_row = all_rows[all_rows.length - 1];

    if(last_image_row.childElementCount == 3) {
      var container = qs('.container');
      var inputrow = qs('#input-row');
      last_image_row = document.createElement('div');
      last_image_row.className = 'row images-row';
      container.insertBefore(last_image_row, inputrow);
    }

    var new_row = document.createElement('div');
    new_row.className = 'col-md-4 col-xs-4';

    var new_thumb = document.createElement('a');
    new_thumb.className = 'thumbnail';

    var new_image = document.createElement('img');
    new_image.className = 'img-responsive';
    new_image.src = imageUrl;

    new_row.appendChild(new_thumb);
    new_thumb.appendChild(new_image);
    last_image_row.appendChild(new_row);
  }

  function search() {
    if (!this.value) return;

    var criteria = window.mnemonic.convert(this.value);
    $.get('/search?q=' + criteria, renderImages);
  }

  $on(qs('#numbers-input'), 'blur', search);
};

(function(pageEvents, jQuery) {
  window.mnemonic = new Mnemonic();
  pageEvents(jQuery);
})(PageEvents, jQuery);
