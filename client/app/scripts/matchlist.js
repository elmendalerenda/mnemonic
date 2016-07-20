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


  function FilteredWords(list, opts) {
    var random = function(max) {
      var options  = opts || {};
      var randomGenerator = options['randomGenerator'] || Math.random;
      return Math.floor(randomGenerator() * max);
    }

    var addAccents = function(word) {
      var accentTable = { 'a\\': 'á', 'e\\': 'é', 'i\\': 'í', 'o\\': 'ó', 'u\\': 'ú' };
      var resultWord = word;

      for (var el in accentTable) {
        if(!accentTable.hasOwnProperty(el)) continue;
        resultWord = resultWord.replace(el, accentTable[el]);
      }

      return resultWord;
    }

    this.fetch = function(){
      if(list.length == 0) { return null; }

      var result = list[random(list.length - 1)];
      return addAccents(result);
    }
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

      return new FilteredWords(filtered, options).fetch();
    }
  };
};
