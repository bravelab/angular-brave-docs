(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.docs]
   * @description Docs module for SmartAdmin
   */
  angular
    .module('app.docs', ['ui.router', 'app.auth'])
    .value('version', '0.0.7');

})();
