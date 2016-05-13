(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.docs tests
   * @description Docs tests
   *
   */
  describe('should provide docsService', function () {

    var docsService;

    beforeEach(function () {
      module('app.docs');
      module('app.auth');
    });

    beforeEach(inject(function (_DocsService_) {
      docsService = _DocsService_; // (2)
    }));

    it('should have getAll function', function () {
      expect(angular.isFunction(docsService.getAll)).toBe(true);
    });

    it('should have get function', function () {
      expect(angular.isFunction(docsService.get)).toBe(true);
    });

    it('should have getPage function', function () {
      expect(angular.isFunction(docsService.getPage)).toBe(true);
    });

    it('should have getChunk function', function () {
      expect(angular.isFunction(docsService.getChunk)).toBe(true);
    });

  });

})();
