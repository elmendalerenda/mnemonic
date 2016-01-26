var MatchList = (function (sourceList) {
  var allowedConsonants = 2;

  function sourceArray () {
    return sourceList.split('\n');
  };

  function countWordConsonants (word) {
   return reduceToConsonants(word).length;
  };

  function startsWithConsonant(word) {
    return word.match(/^\*[^aeiou].*/);
  };

  function permittedConsonants(word) {
    return countWordConsonants(word) == allowedConsonants;
  };

  function reduceToConsonants(word) {
    return word.replace(/[a|e|i|o|u|*|#|\\]+/g, '');
  };

  return {
    all: function () {
      return sourceArray().filter(function(word) {
        return permittedConsonants(word) && startsWithConsonant(word);
      });
    },

    match: function(pattern) {
      var filtered = this.all().filter(function(word) {
        return reduceToConsonants(word) == pattern;
      });
      var result = null;
      if(filtered.length > 0) { result = filtered[0]; }

      return result;
    }
  }
});
