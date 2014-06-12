angular.module('apolloApp').directive('ngHistorybar', function () {
    return {
      restrict: 'A',
      template: '<div ng-repeat="site in browseHistory.sites">' +
                  '<a ng-click="goToTop()" href="{{site.url}}">' +
                      '{{site.name}}'+
                  '</a' +
                '</div>',
      link: function (scope, elem, attrs) {
        //console.log("Recognized the historybar directive usage");
      }
    }
});