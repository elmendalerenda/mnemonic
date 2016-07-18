'use strict';
var PageEvents = function($) {
  function renderImages(data) {
//TOTEST
    var imageUrls = data.images;
    var grid = qs('#image-grid');
    grid.innerHTML = '';

    imageUrls.forEach(function(imageUrl) {
      var all_rows = qsa('.images-row');
      var last_image_row = all_rows[all_rows.length - 1];

      if(!last_image_row || last_image_row.childElementCount == 3) {
        last_image_row = document.createElement('div');
        last_image_row.className = 'row images-row viewport-height';
        grid.appendChild(last_image_row);
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
    });
  }

  function displayResultWord(word) {
    var label = qs('#result-word small');
    if(!label) return;
    label.innerHTML = word;
  }

  function search() {
    var inputValue = qs('#numbers-input').value;
    if (!inputValue) return;

    var criteria = window.mnemonic.convert(inputValue);
    displayResultWord(criteria);
    $.get('/search?q=' + criteria, renderImages);
  }

  $on(qs('#numbers-input'), 'blur', search);
  $on(qs('#search-button'), 'click', search);
};

(function(pageEvents, jQuery) {
  window.mnemonic = new Mnemonic();
  pageEvents(jQuery);
})(PageEvents, jQuery);
