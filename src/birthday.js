finders = {
  dd: {
    key: 'day',
    find: function(str, i) {
      return findNumberInString(str, 1, 2, 1, 31);
    }
  },

  mm: {
    key: 'month',
    find: function(str, i) {
      return findNumberInString(str, 1, 2, 1, 12);
    }
  },

  yyyy: {
    key: 'year',
    find: function(str, i) {
      if (str.length == 2) {
        twoDigitOld = findNumberInString(str, 2, 2, 18, 99).map(function(number) { number.value += 1900; return number; });
        twoDigitNew = findNumberInString(str, 2, 2,  0, 17).map(function(number) { number.value += 2000; return number; });
        return twoDigitOld.concat(twoDigitNew);
      } else {
        return findNumberInString(str, 4, 4, 1900, 2017);
      }
    }
  }
};


datesFromString = function(format, str) {
  if (format.length == 0) return [];

  var dates = [];

  var thisFormat      = format[0];
  var remainderFormat = format.slice(1);
  var key = finders[thisFormat].key;

  finders[thisFormat].find(str).forEach(function(partResult) {
    var remainderString = str.slice(partResult.length);

    additions = false;
    datesFromString(remainderFormat, remainderString).forEach(function(date) {
      date[key] = partResult.value;
      dates.push(date);
      additions = true;
    });

    if (additions == false) {
      var date = {}
      date[key] = partResult.value;
      dates.push(date);
    }
  });

  return dates.filter(function(date) {
    return isValidDate(date) && isReasonable(date, str);
  });
}

isValidDate = function(date) {
  if (date.day && date.month) {
    return date.day <= daysInMonth(date);
  } else {
    return true;
  }
}

isReasonable = function(date, str) {
  // Once the user types 6 digits they should have started typing the year.
  // At 5 digits it's still ambiguous and nothing should be ruled out yet.
  return !(str.length >= 6 && date.year === undefined);
}

daysInMonth = function(date) {
  if ([4,6,9,11].indexOf(date.month) != -1) {
    return 30;
  } else if (date.month == 2) {
    if (isLeapYear(date.year)) {
      return 29;
    } else {
      return 28;
    }
  } else {
    return 31;
  }
}

isLeapYear = function(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}


/* Find all integers that can be extracted start at the beginning of `searchString`, within the given number of digits and min/max range. */
findNumberInString = function(searchString, minDigits, maxDigits, min = 1, max = Infinity) {
  results = [];
  for(length=minDigits; length<=maxDigits; length++) {
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


