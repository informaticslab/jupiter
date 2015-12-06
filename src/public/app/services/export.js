angular.module('jupiterApp').factory('dataExport', function() {
	var csv = function(exportData) {

	}

	var xml = function(exportData){
		// To Do
	}
	var json = function(exportData){
		// To Do
	}

	return {
		'csv' : csv,
		'xml' : xml,
		'json' : json
	}
}