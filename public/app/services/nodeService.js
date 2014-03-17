angular.module('app').factory('nodeService', function() {

    var getAll = function() {
        return [{
            id: 1,
            name: 'Autism'
        }, {
            id: 2,
            name: 'Tuberculosis'
        }];
    };

    var get = function(id) {
        return {
            id: 1,
            name: 'Autism'
        };
    };

    return {
        'getAll': getAll,
        'get': get
    };
});