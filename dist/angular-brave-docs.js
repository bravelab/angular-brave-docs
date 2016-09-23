(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [app.docs]
   * @description Docs module for SmartAdmin
   */
  angular
    .module('app.docs', ['ui.router', 'app.auth'])
    .value('version', '0.0.8');

})();

(function () {
  'use strict';


  /**
   * @ngdoc routes
   * @name app [app.docs]
   * @description Routes configuration app.docs
   * @see http://stackoverflow.com/questions/15286588/how-to-inject-dependency-into-module-configconfigfn-in-angular
   */
  angular
    .module('app.docs')
    .config(routes);

  routes.$inject = ['$stateProvider', 'BraveDocsProvider'];

  /*
   * @name routes
   * @desc Define valid application routes.
   */
  function routes($stateProvider, braveDocsProvider) {

    $stateProvider.state('app.docs', {
      url: '/docs',
      views: {
        'content@app': {
          templateUrl: function () {
            return braveDocsProvider.templates['index'];
          },
          controller: 'DocsController',
          controllerAs: 'vm'
        }
      }
    });

    $stateProvider.state('app.docs.list', {
      parent: 'app.docs',
      url: '/all',
      templateUrl: function () {
        return braveDocsProvider.templates['list'];
      },
      controller: 'DocsListController',
      controllerAs: 'vm'
    });

    $stateProvider.state('app.docs.page', {
      parent: 'app.docs',
      url: '/page/:slug',
      templateUrl: function () {
        return braveDocsProvider.templates['page'];
      },
      controller: 'DocsPageController',
      controllerAs: 'vm'
    });

    $stateProvider.state('app.docs.detail', {
      parent: 'app.docs',
      url: '/:id/:slug',
      templateUrl: function () {
        return braveDocsProvider.templates['detail'];
      },
      controller: 'DocsDetailController',
      controllerAs: 'vm'
    });


  }

})();

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
        $scope.doc = doc;
      });
    }

  }

})();

(function () {
  'use strict';

  angular
    .module('app.docs')
    .controller('DocsDetailController', DocsDetailController);

  DocsDetailController.$inject = ['$scope', '$stateParams', 'DocsService'];

  /**
   *
   * @param {Object} $scope - Scope
   * @param {Object} $stateParams - State
   * @param {Object} docsService - Service
   * @constructor
   */
  function DocsDetailController($scope, $stateParams, docsService) {
    var vm = this;
    vm.doc = null;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf app.docs.DocsDetailController
     */
    function activate() {
      docsService.get($stateParams.id).then(function (doc) {
        vm.doc = doc;
      });
    }
  }

})();

(function () {
  'use strict';

  angular
    .module('app.docs')
    .controller('DocsListController', DocsListController);

  DocsListController.$inject = ['$scope'];

  /**
   *
   * @param {Object} $scope - Scope
   * @constructor
     */
  function DocsListController($scope) {
    var vm = this;

    vm.docs = $scope.docs;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf app.docs.DocsListController
     */
    function activate() {
      $scope.$watch('docs', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          vm.docs = newValue;
        }
      });
    }
  }

})();

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


(function () {
  'use strict';

  angular
    .module('app.docs')
    .controller('DocsController', DocsController);

  DocsController.$inject = ['$scope', '$state', 'DocsService'];

  /**
   *
   * @param {Object} $scope - Scope
   * @param {Object} $state - State
   * @param {Object} docsService - Docs service
     * @constructor
     */
  function DocsController($scope, $state, docsService) {

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf app.docs.DocsController
     */
    function activate() {

      // authService.getToken().then(tokenSuccessFn);

      /**
       * @name tokenSuccessFn
       * @param {string} token - Auth token
       * @desc Calls docsService.getAll()
       */
      // function tokenSuccessFn(token) {
      docsService.getAll().then(docSuccessFn, docErrorFn);
      // }

      /**
       * @name docsSuccessFn
       * @param {object} data - Response data
       * @desc Update `docs` on viewmodel
       */
      function docSuccessFn(data) {
        $scope.docs = data.data;
        // $state.transitionTo('app.docs.list');
      }

      /**
       * @name docErrorFn
       * @desc Redirect to index and show error Snackbar
       */
      function docErrorFn() {
        $state.transitionTo('app.docs');
      }
    }
  }

})();

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

/**
 * Doc
 * @namespace app.docs
 */
(function () {
  'use strict';

  angular
    .module('app.docs')
    .factory('Doc', Doc);

  Doc.$inject = [];

  function Doc() {

    var factory = function (data) {
      this.id = data.id;
      this.type = data.type;
      this.name = data.name;
      this.slug = data.slug;
      this.content = data.content;
    };

    return factory;
  }

}());

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



(function () {

  'use strict';

  angular
    .module('app.docs')
    .factory('DocsServiceMock', ['$q', 'Doc', function ($q, Doc) {

      var doc = {
        id: '89f7191e-d455-42c6-80cd-58ed48bd54b3',
        name: 'Doc',
        slug: 'doc',
        type: 'doc',
        content: 'some doc'
      };

      var page = {
        id: '89f7191e-d455-42c6-80cd-58ed48bd54b3',
        name: 'Some page',
        slug: 'some-page',
        type: 'page',
        content: 'some page'
      };

      var chunk = {
        id: '89f7191e-d455-42c6-80cd-58ed48bd54b3',
        name: 'Some chunk',
        slug: 'some-chunk',
        type: 'chunk',
        content: 'some chunk'
      };

      var prepare = function (mock) {
        return {
          detail: new Doc(mock),
          list: {
            data: [
              new Doc(mock)
            ],
            meta: {
              totalAmount: 1
            }
          }
        };
      };

      var factory = {
        doc: prepare(doc),
        page: prepare(page),
        chunk: prepare(chunk)
      };

      return factory;

    }]);

})();

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

/**
 * DocListTransformer
 * @namespace app.docs
 */
(function () {
  'use strict';

  angular
    .module('app.docs')
    .factory('DocListTransformer', DocListTransformer);

  DocListTransformer.$inject = ['Doc'];

  function DocListTransformer(Doc) {
    return function (response) {
      var result = (typeof response === 'string') ? angular.fromJson(response) : response;
      var data = [];
      if (result.data.length) {
        data = _.map(result.data, function (item) {
          return new Doc(item);
        });
      }
      return data;
    };
  }

}());

/**
 * DocTransformer
 * @namespace app.docs
 */
(function () {
  'use strict';

  angular
    .module('app.docs')
    .factory('DocTransformer', DocTransformer);

  DocTransformer.$inject = ['Doc'];

  function DocTransformer(Doc) {
    return function (response) {
      var object = (typeof response === 'string') ? angular.fromJson(response) : response;
      return new Doc(object);
    };
  }

}());
