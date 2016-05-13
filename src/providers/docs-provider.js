(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.docs]
   * @description Config provider for app.docs
   */
  angular
    .module('app.docs')
    .provider('BraveDocs', function () {

      this.apiUrl = '/api';
      this.templates = {
        index: 'templates/docs.html',
        list: 'templates/docs-list.html',
        detail: 'templates/docs-detail.html',
        page: 'templates/docs-page.html'
      };

      this.$get = function () {
        var apiUrl = this.apiUrl;
        var templates = this.templates;

        return {
          getApiUrl: function () {
            return apiUrl;
          },
          getTemplates: function () {
            return templates;
          }
        };
      };

      this.setApiUrl = function (apiUrl) {
        this.apiUrl = apiUrl;
      };

      this.setTemplates = function (templates) {
        this.templates = templates;
      };

    });

})();


