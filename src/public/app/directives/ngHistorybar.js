angular.module('apolloApp').directive('ngHistorybar', function () {
    return {
      restrict: 'A',
      template: '<div class="blue_side"> ' + 
                  '<div class="blue_side_text">Your Exploration History:</div> ' +
                    '<div class="sidebar_now"> ' +
                      '<div class="sidebar_repeat" ng-repeat="site in browseHistory.sites"> ' +
                        '<a ng-click="goToTop()" href="{{site.url}}">{{site.name}}</a> ' +
                      '</div> '+
                    '</div> '+
                '</div>'
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