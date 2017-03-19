finders = {
  dd: {
    key: 'day',
    find: function(str, i) {
      return [str.substr(i, 2), i + 2];
    }
  },

  mm: {
    key: 'month',
    find: function(str, i) {
      return [str.substr(i, 2), i + 2];
    }
  },

  yyyy: {
    key: 'year',
    find: function(str, i) {
      return [str.substr(i, 4), i + 4];
    }
  }
}

dateFromString = function(format, str) {
  i = 0;
  result = {};
  format.forEach(function(part) {
    if (i < str.length) {
      f = finders[part];
      [value, i] = f.find(str, i);
      result[f.key] = value;
    }
  });
  return result;
}

