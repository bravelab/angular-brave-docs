(function () {
  'use strict';

  angular
    .module('app.docs')
    .controller('DocsChunkController', DocsChunkController);

  DocsChunkController.$inject = ['$scope', 'DocsService'];

  /**
   *
   * @param {Object} $scope - Scope
   * @param {Object} docsService - Service
   * @constructor
   */
  function DocsChunkController($scope, docsService) {


    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf app.docs.DocsChunkController
     */
    function activate() {
      docsService.getChunk($scope.slug).then(function (doc) {
        console.log($scope.doc);
        $scope.doc = doc;
      });
    }

  }

})();
