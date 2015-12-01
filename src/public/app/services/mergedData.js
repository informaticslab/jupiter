angular.module('jupiterApp').service('mergedData', function() {
  var dataMerge = {
    'mergedDatasets'  :{} ,
    'mergedCols'      :[],
    'mergedList'      :[],
    'mergedValueSets' :{},
    'previousLoc'     :''

  };
    

  var setMergedDataset = function(newData,setid) {
      dataMerge.mergedDatasets[setid] = newData;
  };

  var getMergedDataset = function(setid){
      return dataMerge.mergedDatasets[setid];
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

  var setValueSets = function(list) {
      dataMerge.mergedValueSets = list;
  };

  var getValueSets= function(){
      return dataMerge.mergedValueSets;
  };
  var setPreviousLoc = function(location) {
      dataMerge.previousLoc = location;
  };

  var getPreviousLoc= function(){
      return dataMerge.previousLoc;
  };
  return {
    getMergedDataset: getMergedDataset,
    setMergedDataset: setMergedDataset,
    setMergedCols : setMergedCols,
    getMergedCols : getMergedCols,
    setMergedList : setMergedList,
    getMergedList : getMergedList,
    setValueSets : setValueSets,
    getValueSets : getValueSets,
    setPreviousLoc : setPreviousLoc,
    getPreviousLoc : getPreviousLoc
  };

});