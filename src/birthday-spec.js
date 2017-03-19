describe('datesFromString', function() {
  describe('mm/dd/yyyy format', function() {
    beforeEach(function() {
      FORMAT = ['mm', 'dd', 'yyyy'];
    });

    it('returns no matches when provided an empty string', function() {
      results = datesFromString(FORMAT, '');
      expect(results.length).toEqual(0);
    });

    it('finds fully typed dates without separators', function() {
      results = datesFromString(FORMAT, '08131984');
      expect(results.length).toEqual(1);
      expect(results[0]).toEqual({ month: 8, day: 13, year: 1984 });
    });

    it('finds dates when missing zeros', function() {
      results = datesFromString(FORMAT, '871984');
      expect(results.length).toEqual(1);
      expect(results[0]).toEqual({ month: 8, day: 7, year: 1984 });
    });

    it('finds multiple results when ambiguous', function() {
      results = datesFromString(FORMAT, '1111984');
      expect(results.length).toEqual(2);
      expect(results[0]).toEqual({ month: 1, day: 11, year: 1984 });
      expect(results[1]).toEqual({ month: 11, day: 1, year: 1984 });
    });

    it('interprets two-digit years', function() {
      results = datesFromString(FORMAT, '7984');
      expect(results.length).toEqual(1);
      expect(results[0]).toEqual({ month: 7, day: 9, year: 1984 });
    });

    it('interprets two-digit years with ambiguous months', function() {
      results = datesFromString(FORMAT, '10184');
      expect(results.length).toEqual(2);
      expect(results[0]).toEqual({ month: 1, day: 1, year: 1984 });
      expect(results[1]).toEqual({ month: 10, day: 1, year: 1984 });
    });

    it('rejects dates that have valid formatting but are not real due to calendar rules including leap years', function() {
      results = datesFromString(FORMAT, '2291999');
      expect(results.length).toEqual(0);

      results = datesFromString(FORMAT, '2292000');
      expect(results.length).toEqual(1);

      results = datesFromString(FORMAT, '2292001');
      expect(results.length).toEqual(0);

      results = datesFromString(FORMAT, '9302002');
      expect(results.length).toEqual(1);

      results = datesFromString(FORMAT, '9312002');
      expect(results.length).toEqual(0);

      results = datesFromString(FORMAT, '10312003');
      expect(results.length).toEqual(1);
    });
  });

  describe('findNumberInString', function() {
    beforeEach(function() {
      /* map() wrapper for testing*/
      resultValues = function(str, i, digits, min, max) {
        return findNumberInString(str, i, digits, min, max).map(function(result) { return result.value });
      }
    });

    it('finds numbers in a string and the character length occupied by the found numbers', function() {
      expect(findNumberInString('0123456789', 4)).toEqual([
        { value: 1, length: 2 },
        { value: 12, length: 3 },
        { value: 123, length: 4 }
      ]);
    });

    it('filters results based on a max value', function() {
      expect(resultValues('010000', 2, 1, 31)).toEqual([1]);
      expect(resultValues('300000', 2, 1, 31)).toEqual([3, 30]);
      expect(resultValues('310000', 2, 1, 31)).toEqual([3, 31]);
      expect(resultValues('320000', 2, 1, 31)).toEqual([3]);
      expect(resultValues('410000', 2, 1, 31)).toEqual([4]);

      expect(resultValues('191700', 4, 1918, 2017)).toEqual([]);
      expect(resultValues('191800', 4, 1918, 2017)).toEqual([1918]);
      expect(resultValues('199800', 4, 1918, 2017)).toEqual([1998]);
      expect(resultValues('201700', 4, 1918, 2017)).toEqual([2017]);
      expect(resultValues('201800', 4, 1918, 2017)).toEqual([]);
    });
  });

});
