'use strict';
var PageEvents = function($) {
  function success(data) {
    var imageUrl = data.images[0];
    $('#main-image').attr('src', imageUrl);
  }

  function search() {
    var criteria = window.mnemonicEngine.convert(this.value);
    $.get('/search?q=' + criteria, success);
  }

  $('#numbers-input').on('blur', search);
};

var MnemonicEngine = function(customWordList) {
  var consonantsTable = new ConsonantsTable();
  var engine;

  function build(wordList){
    var words = new MatchList(wordList);
    engine = new Mnemonic(words, consonantsTable);
  }

  if(customWordList){
    build(customWordList);
  }
  else {
    $.get('/app/scripts/spanish.lex', build);
  }

  return {
    convert: function(value) {
      return engine.convert(value);
    }
  };
};

(function(pageEvents, MnemonicEngine, jQuery) {
  window.mnemonicEngine = MnemonicEngine();
  pageEvents(jQuery);
})(PageEvents, MnemonicEngine, jQuery);
