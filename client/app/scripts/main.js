'use strict';
var PageEvents = function($) {
  var LoadingSpinner = function() {
    var nullSpinner = function(){ return document.createElement('div'); }
    var el = qs('#grid-spinner') || nullSpinner();

    this.show = function() { el.style.display = 'block'; }
    this.hide = function() { el.style.display = 'none'; }
  }

  function renderImages(data) {
    var imageUrls = data.images;
    var grid = qs('#image-grid');

    imageUrls.forEach(function(imageUrl) {
      var item = document.createElement('div');
      item.style.display = 'none';
      item.className = 'grid-item col-xs-4 col-md-4';

      var thumb = document.createElement('a');
      thumb.className = 'thumbnail';

      var img = document.createElement('img');
      img.className = 'img-responsive';
      img.src = imageUrl;

      item.appendChild(thumb);
      thumb.appendChild(img);
      grid.appendChild(item);
    });

    resetLayout();
    instrumentFavorites();
    Favorites();
  }

  function clearGrid() {
    new LoadingSpinner().show();
    window.grid.remove(qsa('.grid-item'));
    window.grid.layout();
  }

  function resetLayout() {
    function onLoadedImages(el, fn){
      var imagesLoadedPresent = !!$(el).imagesLoaded;

      if(imagesLoadedPresent){ $(el).imagesLoaded(fn); }
      else { fn(); }
    }

    onLoadedImages('#image-grid', function() {
      window.grid.appended(qsa('.grid-item'));
      $('.grid-item').show();
      window.grid.layout();
      new LoadingSpinner().hide();
    });
  }

  function displayResultWord(word) {
    var label = qs('#result-word small');
    if(!label) return;
    label.innerHTML = word;
  }

  function prepareForResults(word){
    displayResultWord(word);
    clearGrid();
  }

  function search() {
    var inputValue = qs('#numbers-input').value;
    if (!inputValue) return;

    // var cached = favorites.lookup(inputValue);
    // if(cached) {
    //   prepareForResults(cached['match']);
    //   renderImages({ images: [cached['image']]})
    // }
    // else {
      var criteria = window.mnemonic.convert(inputValue);
      prepareForResults(criteria);
      $.get('/search?q=' + criteria, renderImages);
    // }
  }

  $on(qs('#numbers-input'), 'blur', search);
  $on(qs('#search-button'), 'click', search);

  var favorites = new FavoritesStorage();

  function instrumentFavorites() {
    [].slice.call(qsa('.thumbnail')).forEach(function(th){
      $on(th, 'click', function(el){

        if([].slice.call(el.target.parentNode.classList).includes('selected-wrapper')) {
          // favorites.remove(qs('#numbers-input').value);
          // el.target.parentNode.classList.remove('selected-wrapper');
          // el.target.parentNode.removeChild(qs('.fav-icon',th));
        }
        else {
          var url = el.target.src;
          favorites.save(qs('#numbers-input').value, qs('#result-word small').innerHTML, url);
        }
      })
    });
  }

  Recorder('#record-button', '#stop-button');
};

(function(pageEvents, jQuery, gridLayout) {
  window.mnemonic = new Mnemonic();
  pageEvents(jQuery);

  window.grid = new gridLayout('#image-grid', {
    itemSelector: '.grid-item'
  });

})(PageEvents, jQuery, Masonry);
