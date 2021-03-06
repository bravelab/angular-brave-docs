(function () {
  'use strict';

  angular
    .module('app.docs')
    .factory('DocsService', DocsService);

  DocsService.$inject = ['$http', '$q', 'BraveDocs', 'DocTransformer', 'DocListTransformer'];

  /**
   *
   * @param {object} $http - Http object
   * @param {object} $q - Query object
   * @param {object} braveDocs - app config object provider
   * @param {object} docTransformer - doc transformer object
   * @param {object} docListTransformer - doc list transformer object
   * @returns {{get: app.docs.get, getAll: app.docs.getAll}} - Service Factory
   * @constructor
   */
  function DocsService($http, $q, braveDocs, docTransformer, docListTransformer) {

    var cache = {};

    var apiUrl = braveDocs.getApiUrl();

    /**
     * @name Docs
     * @desc The Factory to be returned
     */
    var factory = {
      get: get,
      getAll: getAll,
      getPage: getPage,
      getChunk: getChunk
    };

    return factory;

    /**
     * @name get
     * @desc Get single doc
     * @param {string} id The id of th doc
     * @returns {Promise} - Promise an object
     * @memberOf app.docs
     */
    function get(id) {
      var deferred = $q.defer();

      if (typeof cache[id] !== 'undefined') {
        deferred.resolve(cache[id]);
      } else {
        $http({
          method: 'GET',
          url: apiUrl + '/docs/' + id + '/',
          transformResponse: docTransformer
        })
          .then(function (data) {
            cache[id] = data.data;
            deferred.resolve(cache[id]);
          }, function (data) {
            deferred.reject(data);
          });
      }

      return deferred.promise;
    }

    /**
     * @name get
     * @desc Get single doc by type and slug params
     * @param {string} type Document type
     * @param {string} slug Document symbol
     * @returns {Promise} - Promise an object
     * @memberOf app.docs
     */
    function getByType(type, slug) {
      var deferred = $q.defer();
      var id = type + '-' + slug;

      if (typeof cache[id] !== 'undefined') {
        deferred.resolve(cache[id]);
      } else {
        $http({
          method: 'GET',
          url: apiUrl + '/docs/' + type + '/' + slug,
          transformResponse: docTransformer
        })
          .then(function (data) {
            cache[id] = data.data;
            deferred.resolve(cache[id]);
          }, function (data) {
            deferred.reject(data);
          });
      }

      return deferred.promise;
    }

    /**
     * @name getAll
     * @desc Gets all docs
     * @returns {Promise} - Promise an object
     * @memberOf app.docs
     */
    function getAll() {
      return $http({
        method: 'GET',
        url: apiUrl + '/docs',
        transformResponse: docListTransformer
      })
        .then(function (data) {
          return data;
        });
    }
    /**
     * @name get
     * @desc Get page by slug
     * @param {string} slug Document symbol
     * @returns {Promise} - Promise an object
     * @memberOf app.docs
     */
    function getPage(slug) {
      return getByType('page', slug);
    }

    /**
     * @name get
     * @desc Get page by slug
     * @param {string} slug Document symbol
     * @returns {Promise} - Promise an object
     * @memberOf app.docs
     */
    function getChunk(slug) {
      return getByType('chunk', slug);
    }


  }
})();
