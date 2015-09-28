angular.module('jupiterApp').filter('searchCheckFilter', function() {
   return function( items, types) {
    var filtered = [];
    
    angular.forEach(items, function(item) {
      if (!types.Program && !types.SurveillanceSystem && !types.Registry  
        && !types.Tool  && !types.Dataset && !types.DataStandard && !types.Collaborative
        && !types.HealthSurvey && !types.Organization && !types.Tag 
        && !types.FutureDev  && !types.UnderDev && !types.PartOperational
        && !types.FullOperational && !types.Retired && !types.NotAvailable)
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
      else if(types.FutureDev == true && item.status == 'Planned for Future Development'){
          filtered.push(item);
        }
      else if(types.UnderDev == true && item.status == 'Under Development, but not yet Operational'){
          filtered.push(item);
        }
      else if(types.PartOperational == true && item.status == 'Partially Operational and Implemented'){
          filtered.push(item);
        }
      else if(types.FullOperational == true && item.status == 'Fully Operational and Implemented'){
          filtered.push(item);
        }
      else if(types.Retired == true && item.status == 'Retired'){
          filtered.push(item);
        }
      else if(types.NotAvailable == true && item.status == 'Not Available'){
          filtered.push(item);
        }
    });
    
    return filtered;
  };
});