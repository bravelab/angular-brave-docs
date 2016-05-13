(function () {
  'use strict';

  angular
    .module('app.docs')
    .controller('DocsPageController', DocsPageController);

  DocsPageController.$inject = ['$scope', '$stateParams', 'DocsService'];

  /**
   *
   * @param {Object} $scope - Scope
   * @param {Object} $stateParams - State
   * @param {Object} docsService - Service
   * @constructor
   */
  function DocsPageController($scope, $stateParams, docsService) {
    var vm = this;
    vm.doc = null;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf app.docs.DocsPageController
     */
    function activate() {
      docsService.getPage($stateParams.slug).then(function (doc) {
        vm.doc = doc;
      });
    }
  }

})();

