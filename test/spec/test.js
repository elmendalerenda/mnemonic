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
  });
})();
