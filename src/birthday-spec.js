describe('dateFromString', function() {
  describe('mm/dd/yyyy format', function() {
    beforeEach(function() {
      FORMAT = ['mm', 'dd', 'yyyy'];
    });

    it('returns no matches when provided an empty string', function() {
      expect(dateFromString(FORMAT, '')).toEqual({});
    });

    it('finds fully typed dates without separators', function() {
      expect(dateFromString(FORMAT, '08131984')).toEqual({ month: '08', day: '13', year: '1984' });
    });
  });
});
