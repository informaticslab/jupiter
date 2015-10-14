angular.module('jupiterApp').controller('adminCRRapidEntryCtrl', ['$scope', '$http','$filter','$location','nodeAttributeDictionary','nodeRelationshipDictionary','nodeTypeDictionary', 'ngIdentity',
    function($scope,$http,$filter,$location,nodeAttributeDictionary,nodeRelationshipDictionary,nodeTypeDictionary,ngIdentity) {




    //.fromNewNode=false;
    //$scope.relCheckBox.toNewNode=false;

    //console.log(nodeRelationshipDictionary.RelationshipTypes);
    $scope.relValues=nodeRelationshipDictionary.RelationshipTypes;
    $scope.nodeTypeValues=nodeTypeDictionary.NodeTypes;
    
    $scope.identity = ngIdentity;
    $scope.colHeaders = [];
    $scope.nodetypeselect = 'DataElement';
    $scope.oneDataElement = {};
    $scope.showAddDataElement=false;

    $scope.isActive = function(route) {
        return route === $location.path();
    }

    function fetchDataElements(){
                $http.get('/api/node/dataElements/' + $scope.dataElementSelectedId).then(function(res) {
                $scope.dataElementsArray=res.data;

                //$scope.relarray=[];
                console.log(res.data);
                var i=1;
                $scope.dataElementsArray.forEach(function(d){
                    console.log(d);
                });
                $scope.colHeaders=Object.keys($scope.dataElementsArray[0]);
                if ($scope.dataElementsArray.length == 1 && $scope.dataElementsArray[0].id === '') {
                    $scope.dataElementsArray = [];
                }
                $scope.showAddDataElement=true;


            });
    }


    $scope.saveDataElementsServer=function(){
            var datapacket={};
            datapacket.dsetid=$scope.dataElementSelectedId;
            datapacket.dearray=$scope.dataElementsArray;
            $http.post('/api/node/save/saveDE/', datapacket).
                //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
              success(function(data, status, headers, config) { 
                console.log(data);
              }).error(function(data, status) {
                console.log(data);
            });


    };


     $scope.saveDataElmRow =function(index){
            var datapacket={};
            datapacket.dsetid=$scope.dataElementSelectedId;
            datapacket.deObject=$scope.dataElementsArray[index];
            console.log(datapacket);
            $http.post('/api/node/save/saveDE/', datapacket).
                //$http({method: 'Post', url: '/api/mongo/postcr', data: {greeting: 'hi'}}).
              success(function(data, status, headers, config) { 
                console.log(data);
                $scope.dataElementsArray[index].changed = false;
                alert('Data Element saved');
              }).error(function(data, status) {
                console.log(data);
                alert('Save failed');
            });


    };

    $scope.setDataElement=function($item){
        //console.log("start",$item.id, $scope.node);
        $scope.dataElementSelectedId=$item.id;
        $scope.dataElementSelectedName=$item.displayname;

        console.log($scope.dataElementSelectedId,$scope.dataElementSelectedName);
        fetchDataElements();

        //checkNewRel();
    };

    $scope.addDataElement = function() {
       
        if (Object.keys($scope.oneDataElement).length > 0) {
            $scope.oneDataElement["id"]=null;
            $scope.oneDataElement["cid"]=null;
            $scope.oneDataElement['changed'] = true;
            $scope.dataElementsArray.push($scope.oneDataElement);
            $scope.oneDataElement= {};
        }
        console.log($scope.dataElementsArray);
    }
    $scope.deleteDataElmRow = function(index) {

        $scope.dataElementsArray.splice(index,1);
        console.log($scope.dataElementsArray);

    }

    $scope.deFieldChanged = function(row,fldIdx)
    {
        //field=true;
     if (!isNaN(row)) {
        $scope.dataElementsArray[row]['changed'] = true;
     }
     else {
        $scope.oneDataElement['changed'] = true;
      
    }
  //    console.log("changed=true");
    }


 $scope.setDataElement=function($item){
        //console.log("start",$item.id, $scope.node);
        $scope.dataElementSelectedId=$item.id;
        $scope.dataElementSelectedName=$item.displayname;

        console.log($scope.dataElementSelectedId,$scope.dataElementSelectedName);
        fetchDataElements();

        //checkNewRel();
    };

$scope.setConcept = function($item, $model, $label,index) {
    //console.log($item);
    $scope.dataElementsArray[index].cui = $item.cui;
}

}]);
