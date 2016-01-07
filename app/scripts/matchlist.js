var MatchList = (function (sourceList) {
  var allowedConsonants = 2;

  function sourceArray () {
    return sourceList.split('\n');
  };

  function countWordConsonants (word) {
   return word.replace(/[a|e|i|o|u|*|#|\\]+/g, '').length;
  };

  function startsWithConsonant(word) {
    return word.match(/^\*[^aeiou].*/);
  };

  function permittedConsonants(word) {
    return countWordConsonants(word) == allowedConsonants;
  };

  return {
    all: function () {
      return sourceArray().filter(function(word) {
        return permittedConsonants(word) && startsWithConsonant(word);
      });
    }
  }
});
