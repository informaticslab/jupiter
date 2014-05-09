angular.module('apolloApp').filter('attributeDescription', function() {
    var attrIndex = {
        'webResource': {
            'index': 0,
            'description': 'Where a user can find out more information about this resource'
        },
        'operationalStatus': {
            'index': 1,
            'description': 'Status of the system'
        }
    };
    return function(input) {
        if (attrIndex[input]) {
            return attrIndex[input].description;
        }
        else{
            return null;
        }
    };
});