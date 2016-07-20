'use strict';
var MatchList = function (sourceList) {
  var allowedConsonants = 2;

  function sourceArray () {
    return sourceList.replace(/[*|#]/g, '').split('\n');
  }

  function reduceToConsonants(word) {
    return word.replace(/[a|e|i|o|u|\\]+/g, '');
  }

  function countWordConsonants (word) {
   return reduceToConsonants(word).length;
  }

  function startsWithConsonant(word) {
    return word.match(/^[^aeiou].*/);
  }

  function permittedConsonants(word) {
    return countWordConsonants(word) === allowedConsonants;
  }

  function random(max, opts) {
    opts = opts || {};
    var randomGenerator = opts["randomGenerator"] || Math.random;
    return Math.floor(randomGenerator() * max);
  }

  return {
    all: function () {
      return sourceArray().filter(function(word) {
        return permittedConsonants(word) && startsWithConsonant(word);
      });
    },

    match: function(pattern, options) {
      var filtered = this.all().filter(function(word) {
        return reduceToConsonants(word) === pattern;
      });
      var result = null;

      if(filtered.length > 0) {
        result = filtered[random(filtered.length - 1, options)];
      }

      return result;
    }
  };
};
