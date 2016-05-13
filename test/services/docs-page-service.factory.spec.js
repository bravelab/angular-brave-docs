(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.docs tests
   * @description Docs tests
   *
   */
  describe('should provide docsPageService', function () {

    var docsPageService;

    beforeEach(function () {
      module('app.docs');
      module('app.auth');
    });

    beforeEach(inject(function (_DocsPageService_) {
      docsPageService = _DocsPageService_; // (2)
    }));

    it('should have get function', function () {
      expect(angular.isFunction(docsPageService.get)).toBe(true);
    });

  });

})();
