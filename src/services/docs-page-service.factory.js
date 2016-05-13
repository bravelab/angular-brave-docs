(function () {
  'use strict';

  angular
    .module('app.docs')
    .factory('DocsPageService', DocsPageService);

  DocsPageService.$inject = ['$http', '$q', 'BraveDocs', 'DocTransformer'];

  /**
   *
   * @param {object} $http - Http object
   * @param {object} $q - Query object
   * @param {object} braveDocs - app config object provider
   * @param {object} docTransformer - doc transformer object
   * @returns {{get: app.docs.get, getAll: app.docs.getAll}} - Service Factory
   * @constructor
   */
  function DocsPageService($http, $q, braveDocs, docTransformer) {

    var cache = {};

    var apiUrl = braveDocs.getApiUrl();

    /**
     * @name Docs
     * @desc The Factory to be returned
     */
    var factory = {
      get: get
    };

    return factory;

    /**
     * @name get
     * @desc Get single doc
     * @param {string} slug The slug of th doc
     * @returns {Promise} - Promise an object
     * @memberOf app.docs
     */
    function get(slug) {
      var deferred = $q.defer();

      if (typeof cache[slug] !== 'undefined') {
        deferred.resolve(cache[slug]);
      } else {
        $http({
          method: 'GET',
          url: apiUrl + '/docs/page/' + slug,
          transformResponse: docTransformer
        })
          .then(function (data) {
            cache[slug] = data.data;
            deferred.resolve(cache[slug]);
          }, function (data) {
            deferred.reject(data);
          });
      }

      return deferred.promise;
    }
  }
})();
