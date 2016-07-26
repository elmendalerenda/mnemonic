'use strict';
var Favorites = function () {

  var imgWrapperClass = 'selected-wrapper';
  var iconClass = 'fav-icon';

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

  function attachClickToImages(){
    [].slice.call(qsa('.thumbnail img')).forEach(function(th){
      $on(th, 'click', function(ev){
        var fav = !isFav(ev.target);
        clean();
        if(fav) { highlightImg(ev.target); }
      });
    });
  }

  attachClickToImages();
}
