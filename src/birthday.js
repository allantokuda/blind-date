finders = {
  dd: {
    key: 'day',
    find: function(str, i) {
      return findNumberInString(str, 2, 1, 31); // TODO: limit to 28 for February, etc.
    }
  },

  mm: {
    key: 'month',
    find: function(str, i) {
      return findNumberInString(str, 2, 1, 12);
    }
  },

  yyyy: {
    key: 'year',
    find: function(str, i) {
      return findNumberInString(str, 4, 1918, 2017);
    }
  }
}


datesFromString = function(format, str) {
  if (format.length == 0) return [];

  var dates = [];

  var thisFormat      = format[0];
  var remainderFormat = format.slice(1);
  var key = finders[thisFormat].key;

  finders[thisFormat].find(str).forEach(function(partResult) {
    var remainderString = str.slice(partResult.length);

    datesFromString(remainderFormat, remainderString).forEach(function(date) {
      date[key] = partResult.value;
      dates.push(date);
    });

    if (dates.length == 0) {
      var date = {}
      date[key] = partResult.value;
      dates.push(date);
    }
  });

  var bestDates = [];

  var maxKeys = 0;
  dates.forEach(function(date) {
    numKeys = Object.keys(date).length;
    if (numKeys > maxKeys) {
      maxKeys = numKeys;
    }
  });
  dates.forEach(function(date) {
    numKeys = Object.keys(date).length;
    if (numKeys == maxKeys) {
      bestDates.push(date);
    }
  });

  return bestDates;
}


/* Find all integers that can be extracted start at the beginning of `searchString`, within the given number of digits and min/max range. */
findNumberInString = function(searchString, numDigits, min = 1, max = Infinity) {
  results = [];
  for(length=1; length<=numDigits; length++) {
    testString = searchString.substr(0, length);
    num = parseInt(testString, 10);
    if (num >= min && num <= max) {
      results.push({
        value: num,
        length: length
      });
    }
  }
  return results;
}


