angular.module('apolloApp').controller('modalCtrl', function($scope, $modal){
    $scope.q = 'home';

    $scope.open = function(size){

     var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    // modalInstance.result.then(function (selectedItem) {
    //   $scope.selected = selectedItem;
    // }, function () {
    //   $log.info('Modal dismissed at: ' + new Date());
    // });

  };

});

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.ok = function () {
    // $modalInstance.close($scope.selected.item);
    modalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  }; 
};