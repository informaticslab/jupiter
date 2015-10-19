angular.module('jupiterApp').filter('excludeOptions', function() {
  return function(items, excludedItem) {
    var filtered = [];

    angular.forEach(items, function(item) {
      if (item != excludedItem) {
          filtered.push(item);
      }
    })
    return filtered;
  }
})