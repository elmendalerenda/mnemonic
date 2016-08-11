class Word2Num
  class InvalidWord < StandardError; end
  LITERALS = { 'uno' => 1, 'dos' => 2, 'tres' => 3, 'cuatro' => 4, 'cinco' => 5, 'seis' => 6, 'siete' => 7, 'ocho' => 8, 'nueve' => 9, 'diez' => 10, 'once' => 11, 'doce' => 12, 'trece' => 13, 'catorce' => 14, 'quince' => 15, 'veinte' => 20, 'treinta' => 30, 'cuarenta' => 40, 'cincuenta' => 50, 'sesenta' => 60, 'setenta' => 70, 'ochenta' => 80, 'noventa' => 90 }

  def self.translate(word)
    nums = word.scan(/\w+/).map{ |w| LITERALS[w] }.compact

    raise InvalidWord.new(word) if nums.empty?
    nums.reduce(:+)
  end
end
