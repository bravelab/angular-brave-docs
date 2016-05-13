(function () {

  'use strict';

  angular
    .module('app.docs')
    .factory('DocsPageServiceMock', ['$q', 'Doc', function ($q, Doc) {

      var mock = {
        id: '89f7191e-d455-42c6-80cd-58ed48bd54b3',
        name: 'Our Guarantee',
        slug: 'our-guarantee',
        type: 'page',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lorem lorem, viverra eu feugiat'
      };

      var factory = {
        detail: new Doc(mock)
      };

      return factory;

    }]);

})();
