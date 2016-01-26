var ConsonantsTable = (function (customTable) {
  var table = { "0": "r", "1": "t", "2": "n", "3" : "m", "4": "c", "5": "l", "6": "s", "7": "j", "8": "g", "9": "b" };

  return {
    get: function(number) {
      var asString = number.toString();
      var result = ''
      for(var i = 0; i < asString.length; i++) {
        result = result + table[asString.charAt(i)]
      }
      return result;
    }
  }
});

