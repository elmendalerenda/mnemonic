var MatchList = (function (sourceList) {
  var allowedConsonants = 2;

  function sourceArray () {
    return sourceList.split('\n');
  };

  function countWordConsonants (word) {
   return word.replace(/[a|e|i|o|u|*|#|\\]+/g, '').length;
  };

  return {
    all: function () {
      return sourceArray().filter(function(el) {
        return countWordConsonants(el) == allowedConsonants;
      });
    }
  }
});
