'use strict';
var Favorites = function () {

  function highlightImg(img){
    var imgParent = img.parentNode;
    imgParent.classList.add('selected-wrapper');
    var icon = document.createElement('span');
    icon.className = 'fav-icon glyphicon glyphicon-heart';
    imgParent.appendChild(icon);
  };

  [].slice.call(qsa('.thumbnail img')).forEach(function(th){
    $on(th, 'click', function(ev){
      var img = ev.target;
      highlightImg(img);
    });
  })
}
