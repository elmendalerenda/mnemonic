(function () {
  'use strict';

  var assert = chai.assert;
  var expect = chai.expect;
  var should = chai.should();

  describe('Given a stream with words', function () {
    it('discard words without exactly 2 consonants', function () {
      var sourceList = "*a\\gape#\n*a\\gata#\n*a\\gil#\n*a\\gilmente#\n*a\\gora#\n*a\\guila#\n*a\\l#";

      var matchList = new MatchList(sourceList);
      expect(matchList.all()).to.have.members(["*a\\gape#","*a\\gata#","*a\\gil#","*a\\gora#","*a\\guila#"]);
    });
  });
})();
