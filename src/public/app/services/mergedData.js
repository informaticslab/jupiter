angular.module('jupiterApp').service('mergedData', function() {
  var dataMerge = {
    'mergedDatasets'  : [],
    'mergedCols'      :[],
    'mergedList'      :[],

  };
    

  var setMergedDataset = function(newData) {
      dataMerge.mergedDatasets = newData;
  };

  var getMergedDataset = function(){
      return dataMerge.mergedDatasets;
  };

  var setMergedCols = function(cols) {
      dataMerge.mergedCols = cols;
  };

  var getMergedCols= function(){
      return dataMerge.mergedCols;
  };
  var setMergedList = function(list) {
      dataMerge.mergedList = list;
  };

  var getMergedList= function(){
      return dataMerge.mergedList;
  };
  return {
    getMergedDataset: getMergedDataset,
    setMergedDataset: setMergedDataset,
    setMergedCols : setMergedCols,
    getMergedCols : getMergedCols,
    setMergedList : setMergedList,
    getMergedList : getMergedList
  };

});