var Mnemonic = (function (matchTable, MatchList) {
  'use strict';
  var wordList;

  var r = new XMLHttpRequest();
  r.open('GET', '/scripts/spanish.lex', true);
  r.onreadystatechange = function () {
    if (r.readyState !== 4 || r.status !== 200) return;
    wordList = new MatchList(r.responseText);
  };
  r.send();

  return function(sourceList){
    wordList = new MatchList(sourceList);
    return {
      convert: function(number) {
        var consonants = matchTable.get(number);
        return wordList.match(consonants);
      }
    };
  };
})(new ConsonantsTable(), MatchList);
