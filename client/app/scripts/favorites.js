'use strict';
var Favorites = function (storage, numberSelector, wordSelector) {

  var imgWrapperClass = 'selected-wrapper';
  var iconClass = 'fav-icon';

  function attachClickToImages(){
    [].slice.call(qsa('img.result')).forEach(function(img){
      $on(img, 'click', onFav);
    });
  }

  function onFav(ev){
    var fav = !isFav(ev.target);
    clean();
    if(fav) {
      save(ev.target.src);
      highlightImg(ev.target);
    }
    else {
      remove();
    }
  }

  function save(imageUrl){
    if(!numberSelector || !wordSelector){ return; }

    storage.save(number(), qs(wordSelector).innerHTML, imageUrl);
  }

  function remove() {
    if(!numberSelector){ return; }

    storage.remove(number());
  }

  function highlightImg(img){
    var imgParent = img.parentNode;
    imgParent.classList.add(imgWrapperClass);
    var icon = document.createElement('span');
    icon.className = iconClass + ' glyphicon glyphicon-heart';
    imgParent.appendChild(icon);
  };

  function clean(){
    [].slice.call(qsa('.' + imgWrapperClass)).forEach(function(el){
      el.classList.remove(imgWrapperClass);
      var icon = qs('.' + iconClass, el);
      el.removeChild(icon);
    });
  }

  function isFav(img) {
    return img.parentNode.classList.contains(imgWrapperClass);
  }

  function number() {
    return qs(numberSelector).value;
  }

  attachClickToImages();
}
