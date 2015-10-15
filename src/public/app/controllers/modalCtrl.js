angular.module('jupiterApp').controller('modalCtrl', function($scope, $modal){
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

  };

});

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.ok = function () {
    modalInstance.dismiss('cancel');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  }; 
};