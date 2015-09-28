angular.module('jupiterApp').directive('ngTopnavbar', function () {
    return {
      restrict: 'A',
      template: '<ul class="nav nav-pills"> ' +
                  '<li><a href="#/quickGuide/">Quick Guide</a></li> ' +
                  '<li class="active"><a href="#/browse/">Browse</a></li> ' +
                  '<li><a href="#/search/">Search</a></li> ' +
                  '<li><a href="#/advancedSearch/">Relationship Explorer</a></li> ' +
                  '<li><a href="" class="inactive">Favorites</a></li> ' +
                  '<li><a href="#/inTheLab/">In the Lab</a></li> ' +
                '</ul>'
      // '<div ng-repeat="site in browseHistory.sites">' +
      //             '<a ng-click="goToTop()" href="{{site.url}}">' +
      //                 '{{site.name}}'+
      //             '</a' +
      //           '</div>'
                ,
      link: function (scope, elem, attrs) {
        //console.log("Recognized the historybar directive usage");
      }
    }
});