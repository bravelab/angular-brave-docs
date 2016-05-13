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
