angular.module('app').factory('nodeService',  function($http) {

    var get = function(id) {
         //call [localhost:port]/api/node/:id with your id, get a JSON block to display and make purty
        var promise = $http.get('/api/node/'+id).success(function(data){
            console.log(data);
            return data;
        }).error(function(data){
            //console.error(data)
        });
       
        return promise;
    };

    return {
        'get': get
    };
});