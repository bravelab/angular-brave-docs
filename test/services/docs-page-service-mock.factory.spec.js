(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.docs tests
   * @description docsServiceMock tests
   *
   */
  describe('should provide docsPageServiceMock', function () {

    var docsPageServiceMock;

    beforeEach(function () {
      module('app.docs');
      module('app.auth');
    });

    beforeEach(inject(function (_DocsPageServiceMock_) {
      docsPageServiceMock = _DocsPageServiceMock_; // (2)
    }));

    it('should have detail object', function () {
      expect(docsPageServiceMock.detail).toBeDefined();
    });

    it('should defined object keys', function () {
      expect(docsPageServiceMock.detail.id).toBeDefined();
      expect(docsPageServiceMock.detail.name).toBeDefined();
      expect(docsPageServiceMock.detail.slug).toBeDefined();
      expect(docsPageServiceMock.detail.type).toBeDefined();
      expect(docsPageServiceMock.detail.content).toBeDefined();
    });

  });

})();
