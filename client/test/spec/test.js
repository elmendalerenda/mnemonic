(function () {
  'use strict';

  var assert = chai.assert;
  var expect = chai.expect;
  var should = chai.should();

  beforeEach(function() {
    window.localStorage.clear();
  });

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

    it('returns the word matching a pair of consonants', function() {
      var sourceList = "*a\\gora#\n*a\\guila#\n*a\\l#\n*dejo#\n*delga#\n*delia#"

      var matchList = new MatchList(sourceList);
      expect(matchList.match('dj')).to.be.equal("dejo");
      expect(matchList.match('dl')).to.be.equal("delia");
      expect(matchList.match('ff')).to.be.null;
    });

    it('returns an arbitrary word given a pair of consonants, given more than one match', function() {
      var sourceList = "*dejo#\n*dije#\n"

      var matchList = new MatchList(sourceList);
      expect(matchList.match('dj',
          { "randomGenerator": function(){ return 1;} })
      ).to.be.equal("dije");
    });

    it('returns words with accent', function() {
      var sourceList = "*de\\jo#\n"

      var matchList = new MatchList(sourceList);
      expect(matchList.match('dj')).to.be.equal("déjo");
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
    var trigger = function(el, eventName) { el.dispatchEvent(new Event(eventName)); }
    var setSearch = function(criteria) { $(inputBox()).val(criteria); }
    var container = function() { return $('#test-container'); }();
    var inputBox = function() { return qs('#numbers-input'); };
    var serverSuccess = function(image) {
      server.respondWith("GET", "/search?q=man",
        [200, { "Content-Type": "application/json" },
        '{ "images": ["' + image + '"] }']);
    };
    var attachPageEvents = function() { PageEvents(jQuery); };
    var search = function(criteria) {
      setSearch(criteria);
      trigger(inputBox(), 'blur');
    };


    beforeEach(function() {
      container.html('');
      $("<div id='numbers-input'></div>").appendTo(container);
      $("<div id='image-grid'></div>").appendTo(container);
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
      attachPageEvents();
      serverSuccess('wadus.jpg');

      setSearch('32');
      trigger(inputBox(), 'blur');

      expect($('img').attr('src')).to.be.equal('wadus.jpg');
    });

    it('search an image on button click', function() {
      $("<div id='search-button'></div>").appendTo(container);
      attachPageEvents();
      serverSuccess('wadus.jpg');

      setSearch('32');
      trigger(qs('#search-button'), 'click');

      expect($('img').attr('src')).to.be.equal('wadus.jpg');
    });

    it('does not seach on empty input', function() {
      attachPageEvents();
      var requestsBeforeInput = server.requests.length;

      setSearch(null);
      trigger(inputBox(), 'blur');

      expect(server.requests.length).to.be.equal(requestsBeforeInput);
    });

    it('displays the resulting word', function() {
      $("<div id='result-word'><small></small></div>").appendTo(container);
      attachPageEvents();

      search('32');

      expect($('#result-word small').html()).to.be.equal('man');
    });

    it('displays the spinner when waiting for server response', function() {
      $("<div id='grid-spinner'></div>").appendTo(container);
      attachPageEvents();
      server = sinon.fakeServer.create();

      search('32');

      expect($('#grid-spinner').attr('style')).to.be.equal('display: block;');
    });

    it('converts a number to a word used as criteria', function() {
      attachPageEvents();
      var xhr = sinon.useFakeXMLHttpRequest();
      var requests = [];
      xhr.onCreate = function (req) { requests.push(req); };

      search('32');

      expect(requests[0].url).to.be.equal('/search?q=man');
      xhr.restore();
    });
  });

  describe('Store images in favorite', function () {
    var favorites;
    var storage;

    beforeEach(function(){
      storage = {
        'setItem': function(){},
        'removeItem': function(){},
        'getItem': function(){ return JSON.stringify({ 'key' : 'anyresult'});}
      };
      favorites = new FavoritesStorage(storage);
    });

    it('saves a match and image', function() {
      var spy = sinon.spy(storage, "setItem");

      favorites.save('32', 'man', 'http://wadus.com');

      expect(spy.withArgs('32', JSON.stringify({ "match": "man", "image": "http://wadus.com"})).calledOnce).to.be.true;
    });

    it('gets the information from number', function() {
      var spy = sinon.spy(storage, 'getItem');

      var result = favorites.lookup('32');

      expect(spy.withArgs('32').calledOnce).to.be.true;
      expect(result['key']).to.be.equal('anyresult');
    });

    it('removes a number from the favorites', function() {
      var spy = sinon.spy(storage, 'removeItem');

      favorites.remove('32');

      expect(spy.withArgs('32').calledOnce).to.be.true;
    });
  });

  describe('Favorites', function(){
    var container = function() { return $('#test-container'); }();
    var trigger = function(el, eventName) { el.dispatchEvent(new Event(eventName)); }
    var isFav = function(el) { return el.classList.contains('selected-wrapper'); }
    beforeEach(function() {
      container.html('');
    });

    describe('select favorite', function(){
      it('highlights img', function(){
        $("<div class='thumbnail'><img /></div>").appendTo(container);
        Favorites();

        trigger(qs('.thumbnail img'), 'click');

        expect(isFav(qs('.thumbnail'))).to.be.true
        var iconClasses = qs('.thumbnail span').classList;
        expect(iconClasses.contains('fav-icon')).to.be.true
        expect(iconClasses.contains('glyphicon')).to.be.true
        expect(iconClasses.contains('glyphicon-heart')).to.be.true
      });

      it('cleans the previous selected fav', function(){
        $("<div class='thumbnail old selected-wrapper'><img/><span class='fav-icon'></span></div>").appendTo(container);
        $("<div class='thumbnail new'><img /></div>").appendTo(container);
        Favorites();

        trigger(qs('.thumbnail.new img'), 'click');

        expect(isFav(qs('.old'))).to.be.false
        expect(qs('.old .fav-icon')).to.be.null
      });
    });

    describe('deselect favorite', function(){
      it('removes the highlight', function(){
        $("<div class='thumbnail selected-wrapper'><img/><span class='fav-icon'></span></div>").appendTo(container);
        Favorites();

        trigger(qs('.thumbnail img'), 'click');

        expect(isFav(qs('.thumbnail'))).to.be.false
        expect(qs('.fav-icon')).to.be.null
      });
    });
  });
})();
