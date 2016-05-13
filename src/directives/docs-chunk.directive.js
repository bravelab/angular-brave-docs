(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.docs]
   * @description Config provider for app.docs
   */
  angular
    .module('app.docs')
    .directive('braveDocsChunk', function () {
      return {
        restrict: 'E',
        template: '<div ng-bind-html="doc.content"></div>',
        scope: {
          slug: '@slug'
        },
        controller: 'DocsChunkController',
        link: function ($scope, $element, $attrs) {
          $scope.slug = $attrs.slug;
        }
      };
    });

}());
