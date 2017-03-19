describe('dateFromString', function() {
  describe('mm/dd/yyyy format', function() {
    it('returns no matches when provided an empty string', function() {
      FORMAT = [findMonth, findDay, findYear];
      expect(dateFromString(FORMAT, '')).toEqual([]);
    });

    it('finds fully typed dates', function() {
      // TODO
    });
  });
});
