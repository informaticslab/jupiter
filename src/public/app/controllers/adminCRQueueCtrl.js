angular.module('jupiterApp').controller('adminCRQueueCtrl', ['$scope', '$modal', '$location', '$http', 'nodeAttributeDictionary', 'ngIdentity',
  function($scope, $modal, $location, $http, nodeAttributeDictionary, ngIdentity) {

    var checkcounter = 0;
    var cacheRenew = new Date().getTime();
    $http.get('/api/node/all' + '?' + cacheRenew).then(function(res) {
      $scope.nodeNameallArray = res.data;
      checkcounter++;
      if (checkcounter == 2) {
        getSimilarities();
      }
    });



    $scope.open = function(docid) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'sm',
        resolve: {
          doc_id: function() {
            return docid;
          }
        }
      });

      modalInstance.result.then(function(docid) {
        $scope.deleteCR(docid);
      }, function() {});
    };

    $scope.crStatusModel = 'PENDING';
    $scope.userFilter = "";
    $scope.usersu = false;



    $scope.isActive = function(route) {
      return route === $location.path();
    }


    $scope.init = function() {

      if ($scope.identity.currentUser.roles.levelTwo) {
        $scope.usersu = true;
      } else {
        $scope.usersu = false;
      }

      $scope.mongoDocumentsAll = [];
      $scope.crtSelect = "";
      $scope.crtOpen = false;
      $scope.crFilterModel = '';

      $scope.sortval = "CR_DATE_CREATED";

      $scope.crAddCount = 0;
      $scope.crDeleteCount = 0;
      $scope.crUpdateCount = 0;
      $scope.hover = false;
      $scope.reverse = true;
      var cacheRenew = new Date().getTime();
      $http.get('/api/mongo/all' + '?' + cacheRenew).then(function(res) {
        $scope.mongoDocumentsAll = res.data;

        for (var i = 0; i < $scope.mongoDocumentsAll.length; i++) {
          if ($scope.mongoDocumentsAll[i].CR_REQUEST_TYPE == "ADD" && $scope.mongoDocumentsAll[i].CR_STATUS == "PENDING") {
            $scope.crAddCount++;
          } else if ($scope.mongoDocumentsAll[i].CR_REQUEST_TYPE == "DELETE" && $scope.mongoDocumentsAll[i].CR_STATUS == "PENDING") {
            $scope.crDeleteCount++;
          } else if ($scope.mongoDocumentsAll[i].CR_REQUEST_TYPE == "UPDATE" && $scope.mongoDocumentsAll[i].CR_STATUS == "PENDING") {
            $scope.crUpdateCount++;
          }
        }

        checkcounter++;
        if (checkcounter == 2) {
          getSimilarities();
        }


      });


    }


    $scope.init();

    var getSimilarities = function() {

      for (cr in $scope.mongoDocumentsAll) {

        var crnodename = $scope.mongoDocumentsAll[cr].name;
        var crnodeid = $scope.mongoDocumentsAll[cr].id;
        if (crnodeid == undefined || crnodeid == null || crnodeid == "") {
          crnodeid = "TBD";
        }

        var similarNodes = [];
        for (n in $scope.nodeNameallArray) {
          var neonodename = $scope.nodeNameallArray[n].name;

          var neonodeid = $scope.nodeNameallArray[n].id;
          if (neonodeid == crnodeid) {

          } else {
            if (neonodename != null) {
              if (crnodename.toLowerCase() == neonodename.toLowerCase()) {
                similarNodes.push({
                  neonodename: neonodename,
                  neonodeid: neonodeid,
                  level: 1
                });
              }
              var crnodename1 = crnodename.replace(/the|\sa\s|\s/gi, function myFunction(x) {
                return "";
              });
              var neonodename1 = neonodename.replace(/the|\sa\s|\s/gi, function myFunction(x) {
                return "";
              });
              if (crnodename1.toLowerCase() == neonodename1.toLowerCase()) {
                var found = false;
                for (i = 0; i < similarNodes.length; i++) {
                  if (similarNodes[i].neonodeid == neonodeid) {
                    found = true;
                  }
                }
                if (!found) {
                  similarNodes.push({
                    neonodename: neonodename,
                    neonodeid: neonodeid,
                    level: 2
                  });
                } else {}

              }

              var crnodename2 = crnodename1.replace(/system|program|registry|survey|tool|data|dataset|standard|collaborative|element/gi, function myFunction(x) {
                return "";
              });
              var neonodename2 = neonodename1.replace(/system|program|registry|survey|tool|data|dataset|standard|collaborative|element/gi, function myFunction(x) {
                return "";
              });
              if (crnodename2.toLowerCase() == neonodename2.toLowerCase()) {
                var found = false;
                for (i = 0; i < similarNodes.length; i++) {
                  if (similarNodes[i].neonodeid == neonodeid) {
                    found = true;
                  }
                }
                if (!found) {
                  similarNodes.push({
                    neonodename: neonodename,
                    neonodeid: neonodeid,
                    level: 2
                  });
                } else {}

              }
            }

          }



        }

        var similarNodesString = "Similar to: ";
        for (i = 0; i < similarNodes.length; i++) {
          similarNodesString = similarNodesString + ", " + similarNodes[i].neonodename + " (" + similarNodes[i].neonodeid + ")";
        }
        if (similarNodesString == "Similar to: ") {
          similarNodesString = "Similar to none";
        }
        similarNodesString = similarNodesString.replace("Similar to: , ", "Similar to: ");
        $scope.mongoDocumentsAll[cr].similarities = similarNodesString;
      }
    }

    $scope.deleteCR = function(id) {
      mongoid = {
        mongoid: id
      };
      mongoid.adminUserId = $scope.identity.currentUser._id;
      mongoid.adminUserDisplayName = $scope.identity.currentUser.displayName;

      $http.post('/api/mongo/deletecr', mongoid).
      success(function(data, status, headers, config) {
        if (checkcounter == 2) {
          checkcounter--;
        }
        $scope.init();
      }).error(function(data, status) {

      });

    };


  }
]);

angular.module('jupiterApp').controller('ModalInstanceCtrl', function($scope, $modalInstance, doc_id) {

  $scope.ok = function() {
    $scope.$close(doc_id);
  };

  $scope.cancel = function() {
    $scope.$dismiss();
  };
});