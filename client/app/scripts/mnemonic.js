var Mnemonic = (function (wordList, matchTable) {
  return {
    convert: function(number) {
      var consonants = matchTable.get(number);
      return wordList.match(consonants);
    }
  }
});
