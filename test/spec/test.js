var MatchList = (function (sourceList) {
  return {
    all: function () {
      return [];
    }
  }
});

(function () {
  'use strict';

  var assert = chai.assert;
  var expect = chai.expect;
  var should = chai.should();

  describe('Given a stream with words', function () {
    it('discard words without exactly 2 consonants', function () {
      var sourceList = "*a\gape#\n*a\gata#\n*a\gil#\n*a\gilmente#\n*a\gora#\n*a\guila#\n*a\l#";

      var matchList = new MatchList(sourceList);
      assert.equal(matchList.all(), "*a\gape#\n*a\gata#\n*a\gil#\n*a\gora#\n*a\guila#")
    });
  });
})();
