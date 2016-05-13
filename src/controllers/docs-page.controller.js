(function () {
  'use strict';

  angular
    .module('app.docs')
    .controller('DocsPageController', DocsPageController);

  DocsPageController.$inject = ['$scope', '$stateParams', 'DocsPageService'];

  /**
   *
   * @param {Object} $scope - Scope
   * @param {Object} $stateParams - State
   * @param {Object} docsPageService - Service
   * @constructor
   */
  function DocsPageController($scope, $stateParams, docsPageService) {
    var vm = this;
    vm.doc = null;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf app.docs.DocsPageController
     */
    function activate() {
      docsPageService.get($stateParams.slug).then(function (doc) {
        vm.doc = doc;
      });
    }
  }

})();

