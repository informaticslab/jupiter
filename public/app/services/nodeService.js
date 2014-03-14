angular.module('app').
    factory('nodeService', function() {
        return {
            getNodes:function(){
                return [{
                    id:1,
                    name:'Autism'                  
                },
                { 
                   id:2,
                   name:'Tuberculosis'
                }];
            }
        };
    });

