require 'minitest/autorun'
require './lib/word2num'

class Word2NumTest < Minitest::Test
  def test_static
    assert_equal(1, Word2Num.translate('uno'))
    assert_equal(14, Word2Num.translate('catorce'))
    assert_equal(30, Word2Num.translate('treinta'))
  end

  def test_composed
    assert_equal(88, Word2Num.translate('ochenta y ocho'))
    assert_equal(95, Word2Num.translate('noventa y cinco'))
  end

  def test_error
    assert_raises(Word2Num::InvalidWord) {
      Word2Num.translate('hola caracola')
    }
  end
end
