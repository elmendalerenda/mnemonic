'use strict';
var FavoritesStorage = function (customStorage) {

  var storage = customStorage || window.localStorage;

  function composeData(matchedWord, image) {
    return JSON.stringify({ "match": matchedWord, "image": image });
  }

  return {
    save: function(key, matchedWord, image) {
      storage.setItem(key, composeData(matchedWord, image));
    },

    lookup: function(key) {
      return JSON.parse(storage.getItem(key));
    },

    remove: function(key) {
      storage.removeItem(key);
    }
  }
}
