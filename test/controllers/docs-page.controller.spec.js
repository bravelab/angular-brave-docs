(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.docs tests
   * @description Docs tests
   *
   */
  describe('should provide DocsPageController', function () {

    var // AuthenticationMock,
      docsPageServiceMock,
      controller;

    var $httpBackend,
      $controller,
      $rootScope,
      $scope,
      $stateParams,
      $state;

    beforeEach(function () {
      module('app.docs');
      module('app.auth');
    });

    beforeEach(inject(function ($injector) {
      $state = $injector.get('$state');
      $stateParams = $injector.get('$stateParams');
      $rootScope = $injector.get('$rootScope');
      $httpBackend = $injector.get('$httpBackend');
      $controller = $injector.get('$controller');

      $scope = $rootScope.$new();
    }));

    beforeEach(inject(function (_DocsPageServiceMock_) {

      // AuthenticationMock = _AuthenticationMock_;
      docsPageServiceMock = _DocsPageServiceMock_; // (2)

      $stateParams.slug = docsPageServiceMock.detail.slug;

      controller = $controller('DocsPageController', {
        $scope: $scope,
        $stateParams: $stateParams,
        docsPageService: docsPageServiceMock
      });

    }));

    it('should have defined controller', inject(function () {
      expect(controller).toBeDefined();
    }));

    it('should have doc in scope', inject(function () {

      $httpBackend.whenGET('/api/docs/page/' + docsPageServiceMock.detail.slug).respond(docsPageServiceMock.detail);
      $httpBackend.flush();
      $scope.$apply();

      expect(controller.doc).toEqual(docsPageServiceMock.detail);
    }));

  });

})();

