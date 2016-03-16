(function () {
  'use strict';

  var assert = chai.assert;
  var expect = chai.expect;
  var should = chai.should();

  describe('Given a stream with words', function () {
    it('discard words without exactly 2 consonants', function () {
      var sourceList = "*dejo#\n*delga#\n*delia#"

      var matchList = new MatchList(sourceList);
      expect(matchList.all()).to.have.members(["*dejo#" ,"*delia#"]);
    });

    it('discard words that starts with vowel', function () {
      var sourceList = "*a\\gora#\n*a\\guila#\n*a\\l#\n*dejo#\n*delga#\n*delia#"

      var matchList = new MatchList(sourceList);
      expect(matchList.all()).to.have.members(["*dejo#" ,"*delia#"]);
    });

    it('returns a word given a pair of consonants', function() {
      var sourceList = "*a\\gora#\n*a\\guila#\n*a\\l#\n*dejo#\n*delga#\n*delia#"

      var matchList = new MatchList(sourceList);
      expect(matchList.match('dj')).to.be.equal("*dejo#");
      expect(matchList.match('dl')).to.be.equal("*delia#");
      expect(matchList.match('ff')).to.be.null;
    });
  });

  describe('Given a two-digits number', function() {
    it('returns a pair of consonants', function() {
      var result = new ConsonantsTable().get('32');

      expect(result).to.be.equal('mn');
    });

    it('returns a word that matches 2 consonants', function() {
      var sourceList = new MatchList("*mano#\n*gato#");
      var table = new ConsonantsTable();

      expect(new Mnemonic(sourceList, table).convert('32')).to.be.equal('*mano#');
      expect(new Mnemonic(sourceList, table).convert('81')).to.be.equal('*gato#');
    });
  });

  xdescribe('on input', function() {
    it('search an image', function() {
      // $("<input id='numbers-input' value='any criteria'></input>").appendTo('body')

      // spyOn(jQuery, 'get');

      // PageEvents(jQuery);

      // $('#numbers-input').trigger("blur");

      // expect(jQuery.get.calls.count()).to.be.equal(1)
      // expect(jQuery.get.calls.mostRecent().args[0]).to.be.equal('/search?q=any criteria')
    });
  });
})();
