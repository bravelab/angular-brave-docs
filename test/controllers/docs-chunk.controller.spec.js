(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.docs tests
   * @description Docs tests
   *
   */
  describe('should provide DocsChunkController', function () {

    var // AuthenticationMock,
      docsServiceMock,
      controller;

    var $httpBackend,
      $controller,
      $rootScope,
      $scope;

    beforeEach(function () {
      module('app.docs');
      module('app.auth');
    });

    beforeEach(inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $httpBackend = $injector.get('$httpBackend');
      $controller = $injector.get('$controller');

      $scope = $rootScope.$new();
    }));

    beforeEach(inject(function (_DocsServiceMock_) {

      // AuthenticationMock = _AuthenticationMock_;
      docsServiceMock = _DocsServiceMock_; // (2)

      $scope.slug = docsServiceMock.chunk.detail.slug;

      controller = $controller('DocsChunkController', {
        $scope: $scope,
        docsService: docsServiceMock
      });

    }));

    it('should have defined controller', inject(function () {
      expect(controller).toBeDefined();
    }));

    // it('should have doc in scope', inject(function () {
    //  $httpBackend.whenGET('/api/docs/chunk/' + docsServiceMock.chunk.detail.slug).respond(docsServiceMock.chunk.detail);
    //  $httpBackend.flush();
    //  $scope.$apply();
    //
    //  expect($scope.doc).toEqual(docsServiceMock.chunk.detail);
    // }));

  });

})();

