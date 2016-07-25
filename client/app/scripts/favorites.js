'use strict';
var Favorites = function (customStorage) {

  var storage = customStorage || window.localStorage;

  function composeData(matchedWord, image) {
    return { "match": matchedWord, "image": image };
  }

  return {
    save: function(key, matchedWord, image) {
      storage.setItem(key, composeData(matchedWord, image));
    },

    lookup: function(key) {
      return storage.getItem(key);
    },

    remove: function(key) {
      storage.removeItem(key);
    }
  }
}
