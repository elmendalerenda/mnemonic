'use strict';
var PageEvents = function($) {
  function renderImages(data) {
    //TOTEST
    var imageUrls = data.images;
    var grid = qs('#image-grid');

    clearGrid();

    imageUrls.forEach(function(imageUrl) {
      var new_row = document.createElement('div');
      new_row.style.display = 'none';
      new_row.className = 'grid-item col-xs-4 col-md-4';

      var new_thumb = document.createElement('a');
      new_thumb.className = 'thumbnail';

      var new_image = document.createElement('img');
      new_image.className = 'img-responsive';
      new_image.src = imageUrl;

      new_row.appendChild(new_thumb);
      new_thumb.appendChild(new_image);
      grid.appendChild(new_row);
    });

    resetLayout();
  }

  function clearGrid() {
    window.$grid.remove(qsa('.grid-item'));
    window.$grid.layout();
  }

  function resetLayout() {
    $('#image-grid').imagesLoaded( function() {
      window.$grid.appended(qsa('.grid-item'));
      $('.grid-item').show();
      window.$grid.layout();
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

(function(pageEvents, jQuery, gridLayout) {
  window.mnemonic = new Mnemonic();
  pageEvents(jQuery);

  window.$grid = new gridLayout('#image-grid', {
    itemSelector: '.grid-item'
  });

})(PageEvents, jQuery, Masonry);
