(function () {
  'use strict';

  var assert = chai.assert;
  var expect = chai.expect;
  var should = chai.should();

  describe('Given a stream with words', function () {
    it('discard words without exactly 2 consonants', function () {
      var sourceList = "*dejo#\n*delga#\n*delia#"

      var matchList = new MatchList(sourceList);
      expect(matchList.all()).to.have.members(["dejo" ,"delia"]);
});

    it('discard words that starts with vowel', function () {
      var sourceList = "*a\\gora#\n*a\\guila#\n*a\\l#\n*dejo#\n*delga#\n*delia#"

      var matchList = new MatchList(sourceList);
      expect(matchList.all()).to.have.members(["dejo" ,"delia"]);
    });

    it('returns a word given a pair of consonants', function() {
      var sourceList = "*a\\gora#\n*a\\guila#\n*a\\l#\n*dejo#\n*delga#\n*delia#"

      var matchList = new MatchList(sourceList);
      expect(matchList.match('dj')).to.be.equal("dejo");
      expect(matchList.match('dl')).to.be.equal("delia");
      expect(matchList.match('ff')).to.be.null;
    });
  });

  describe('Given a two-digits number', function() {
    it('returns a pair of consonants', function() {
      var result = new ConsonantsTable().get('32');

      expect(result).to.be.equal('mn');
    });

    it('returns a word that matches 2 consonants', function() {
      var mnemonic = new Mnemonic("*mano#\n*gato#");

      expect(mnemonic.convert('32')).to.be.equal('mano');
      expect(mnemonic.convert('81')).to.be.equal('gato');
    });
  });

  describe('on input', function() {
    var server;
    var dispatch = function(el, eventName) { el.dispatchEvent(new Event(eventName)); }
    var setSearch = function(criteria) { $('#numbers-input').val(criteria); }
    var container = function() { return $('#test-container'); }();
    var addImageGrid = function() { $("<div class='images-row'></div>").appendTo(container); }
    var attachPageEvents = function() { PageEvents(jQuery); };

    beforeEach(function() {
      container.html('');
      $("<div id='numbers-input'></div>").appendTo(container);
    });

    before(function() {
      server = sinon.fakeServer.create();
      server.respondImmediately = true;

      window.mnemonic = new Mnemonic("*man#\n*gato#");
    });

    after(function() {
      server.restore();
    });

    it('search an image on input blur', function() {
      addImageGrid();
      attachPageEvents();

      server.respondWith("GET", "/search?q=man",
        [200, { "Content-Type": "application/json" },
        '{ "images": ["wadus.jpg"] }']);

      setSearch('32');
      dispatch(qs('#numbers-input'), 'blur');

      expect($('.img-responsive').attr('src')).to.be.equal('wadus.jpg');
    });

    it('search an image on button click', function() {
      $("<div id='search-button'></div>").appendTo(container);
      addImageGrid();
      attachPageEvents();

      server.respondWith("GET", "/search?q=man",
        [200, { "Content-Type": "application/json" },
        '{ "images": ["wadus.jpg"] }']);

      setSearch('32');
      dispatch(qs('#search-button'), 'click');

      expect($('.img-responsive').attr('src')).to.be.equal('wadus.jpg');
    });

    it('does not seach on empty input', function() {
      attachPageEvents();
      var requestsBeforeInput = server.requests.length;

      setSearch(null);
      dispatch(qs('#numbers-input'), 'blur');

      expect(server.requests.length).to.be.equal(requestsBeforeInput);
    });

    it('displays the resulting word', function() {
      $("<div id='result-word'><small></small></div>").appendTo(container);
      attachPageEvents();

      setSearch('32');
      dispatch(qs('#numbers-input'), 'blur');

      expect($('#result-word small').html()).to.be.equal('man');
    });

    it('converts a number to a word used as criteria', function() {
      attachPageEvents();
      var xhr = sinon.useFakeXMLHttpRequest();
      var requests = [];
      xhr.onCreate = function (req) { requests.push(req); };

      setSearch('32');
      dispatch(qs('#numbers-input'), 'blur');

      expect(requests[0].url).to.be.equal('/search?q=man');
      xhr.restore();
    });
  });
})();
