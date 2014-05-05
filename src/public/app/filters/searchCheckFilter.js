angular.module('apolloApp').filter('searchCheckFilter', function() {
   return function( items, types) {
    var filtered = [];

    angular.forEach(items, function(item) {
      if (types.Program== false && types.SurveillanceSystem == false && types.Registry == false 
        && types.Tool == false && types.Dataset == false && types.DataStandard == false && types.Collaborative == false 
        && types.HealthSurvey == false && types.Organization == false && types.Tag == false) 
        {
          filtered.push(item);
        }
        //if all items are unchecked, no filter.
      else if(types.Program== true && item.labels  == 'Program'){
          filtered.push(item);
        }
      else if(types.SurveillanceSystem == true && item.labels == 'SurveillanceSystem'){
          filtered.push(item);
        }
      else if(types.Registry == true && item.labels == 'Registry'){
          filtered.push(item);
        }
      else if(types.Tool == true && item.labels == 'Tool'){
          filtered.push(item);
        }
      else if(types.Dataset == true && item.labels == 'Dataset'){
          filtered.push(item);
        }
      else if(types.DataStandard == true && item.labels == 'DataStandard'){
          filtered.push(item);
        }
      else if(types.Collaborative == true && item.labels == 'Collaborative'){
          filtered.push(item);
        }
      else if(types.HealthSurvey == true && item.labels == 'HealthSurvey'){
          filtered.push(item);
        }
      else if(types.Organization == true && item.labels == 'Organization'){
          filtered.push(item);
        }
      else if(types.Tag == true && item.labels == 'Tag'){
          filtered.push(item);
        }
    });
    return filtered;
  };
});