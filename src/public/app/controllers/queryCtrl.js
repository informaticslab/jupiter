angular.module('jupiterApp').controller('queryCtrl', ['$filter','$scope', '$location', '$resource', '$http', '$routeParams', 'nodeAttributeDictionary',
	function($filter,$scope, $location, $resource, $http, $routeParams, nodeAttributeDictionary) {

		$scope.reltypes = "";
		$scope.chkrels = {};
		$scope.chkactvs = {};

		$scope.showActlistLoading=true;
		$scope.alert_acttextbox_show=false;

		$scope.advsattpopulated="";
		$scope.adhocparams="";

		$scope.q_actname = false;
		$scope.q_acttypes = false;
		$scope.q_results = true;
		$scope.nextrelbtndisabled = true;
		$scope.nextactbtndisabled = true;
		$scope.dissearchbtn = true;
		$scope.actnamestatus = false;
		$scope.textboxcount = [];
		var tbxcount = 0;
		$scope.txtboxcount = [];
		$scope.txtboxval = {};
		$scope.txtboxval[0] = "";
		$scope.txtboxcount.push({
			"tcount": tbxcount
		});

		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 10;
		$scope.itemsPerPage = 10;
		$scope.tabs = {};

		$scope.isCollapsed = true;
		$scope.disadvbtn = true;
		var nodeidtracker = {};

		$scope.lengthdirrel = 0;
		$scope.lengthindirrel = 0;
		$scope.lengthrel = 0;

		$scope.checkModel = {
			direct: false,
			indirect: false
		};

		$scope.chkmangedonly = false;


		$scope.advs = {};

		$scope.actAttributes = {};
		for (x in nodeAttributeDictionary) {
			$scope.actAttributes[x] = [];
			for (y in nodeAttributeDictionary[x].attributeGroups) {
				for (z in nodeAttributeDictionary[x].attributeGroups[y].attributes) {
					$scope.actAttributes[x].push("" + z + "");
				}
			} 
		}



		$scope.itemSelected = function($item, $model, $label, id) {

			$scope.nodeId = $item.id;
			nodeidtracker[id] = $item.id;
			$scope.q_actname = true;
			$scope.checksearchbtnstatus();
		};

		$scope.adhocAttrSelected = function($item, $model, $label, id) {

			$scope.nodeId = $item.id;
			nodeidtracker[id] = $item.id;
			$scope.q_actname = true;
			$scope.checksearchbtnstatus();
			
		};

		var relationships = $resource('/api/relationships/all', {});

		var rels = relationships.query({}, function(result) {
			$scope.showActlistLoading=false;
			if (!result.nullset) {
				$scope.reltypes = result;
				result.forEach(function(d) {
					$scope.chkrels[d.relname] = false;
				});
			}

		});

		var nodetypes = $resource('/api/activitytypes/all', {});

		var nt = nodetypes.query({}, function(result) {
			if (!result.nullset) {
				$scope.activitytypes = result;
				result.forEach(function(d) {
					$scope.chkactvs[d.nodetypes] = false;
				});

			}

		});



		$scope.setactivitytypestatus = function() {
			$scope.q_acttypes = false;
			$scope.tabs = {};
			for (var key in $scope.chkactvs) {
				if ($scope.chkactvs[key]) {
					$scope.q_acttypes = true;
					$scope.disadvbtn = false;
					$scope.tabs[key] = true;

				}
			}

			if (!$scope.q_acttypes)
				$scope.isCollapsed = true;
			$scope.checksearchbtnstatus();

			$scope.tabsselected=$scope.chkactvs;

		}



		$scope.checksearchbtnstatus = function() {
			if ($scope.q_actname && $scope.q_acttypes) {
				$scope.dissearchbtn = false;

			} else {
				$scope.dissearchbtn = true;
			}

		}

		$scope.addtxtbox = function() {
			tbxcount = tbxcount + 1;
			$scope.txtboxcount.push({
				"tcount": tbxcount
			});

		}

		$scope.removetxtbox = function(id) {
			$scope.txtboxcount.forEach(function(d, i) {
				if (d.tcount == id)
					$scope.txtboxcount.splice(i, 1);
			});

		}

		$scope.closealert = function(id) {

			$scope.alert_acttextbox_show=false;
		}


		$scope.getrelatedactivitytypes = function() {

			if ($scope.txtboxval[0]==undefined || $scope.txtboxval[0] == "") {
				$scope.alert_acttextbox_show=true;
			} else {
				
				$scope.alert_acttextbox_show=false;
				var nodeid = $scope.nodeId;
				var ndtypes = "";
				var retypes = "";
				var ndnames = "";



				for (var key in $scope.chkactvs) {
					if ($scope.chkactvs[key]) {
						ndtypes = ndtypes + "'" + key + "',";
					}
				}
				ndtypes = ndtypes.replace(/(^,)|(,$)/g, "");

				var ndids = "";
				$scope.txtboxcount.forEach(function(d, i) {



					var ndid = nodeidtracker["stxt_" + d.tcount];

					if (ndid.trim() == "") {

					} else {
						ndids = ndids + "'" + ndid + "',";
					}


				});

				ndids = ndids.replace(/(^,)|(,$)/g, "");

				var adsstring = "";
				for (key in $scope.advs) {
					var acttype = key.split("_")[0];
					var acttypechecked = false;

					for (var key1 in $scope.tabs) {
						if (acttype == key1) {
							var acttypechecked = true;
							break;

						}
					}
					if ($scope.advs[key].trim() != "" && acttypechecked) {
						var attname = key.split("_");
						adsstring = adsstring + attname[1] + '=' + $scope.advs[key].toLowerCase() + ",";

					}
				}
				adsstring = adsstring.replace(/(,$)/g, "");
				if (adsstring.trim() == "") {
					adsstring = "NA";
				}

				if ($scope.chkmangedonly) {
					adsstring = adsstring + "+MO";
				} else {
					adsstring == adsstring + "+NO";
				}

				$scope.adhocparams = ndids + "+" + ndtypes + "+" + adsstring;
				var queryresults = $resource('/api/adhoc/relatednoodetypes/' + $scope.adhocparams, {});

				var q = queryresults.query({}, function(result) {
					if (!result.nullset) {
						$scope.q_results = false;

						$scope.adhocresults = result;
						$scope.adhocresultsactve = $scope.adhocresults;
						$scope.totalItems = $scope.adhocresultsactve.length;
						$scope.lengthrel = $scope.adhocresults.length;
						$scope.currentPage = 1;
						$scope.pageChanged();
						$scope.adhocresultsdirect = [];
						$scope.adhocresultsindirect = [];
						for (i = 0; i < result.length; i++) {
							if ($scope.adhocresults[i].pathlinks.length == 1)
								$scope.adhocresultsdirect.push($scope.adhocresults[i]);
							else
								$scope.adhocresultsindirect.push($scope.adhocresults[i]);
						}
						$scope.lengthdirrel = $scope.adhocresultsdirect.length;
						$scope.lengthindirrel = $scope.adhocresultsindirect.length;
   

					}
					$scope.isCollapsed = true;
				});
			} //else


		}


		$scope.showdirect = function() {
			$scope.adhocresultsactve = [];
			$scope.adhocresultsactve = $scope.adhocresultsdirect;
			$scope.totalItems = $scope.adhocresultsactve.length;

			$scope.currentPage = 1;
			$scope.pageChanged();
		}


		$scope.showindirect = function() {
			$scope.adhocresultsactve = [];
			$scope.adhocresultsactve = $scope.adhocresultsindirect;
			$scope.totalItems = $scope.adhocresultsactve.length;

			$scope.currentPage = 1;
			$scope.pageChanged();
		}

		$scope.pageChanged = function() {
			$scope.totalItems = $scope.adhocresultsactve.length;
			$scope.adhocresultspag = [];

			for (i = ($scope.currentPage - 1) * 10;
				(i < (($scope.currentPage - 1) * 10) + $scope.itemsPerPage) && (i < $scope.totalItems); i++) {
				$scope.adhocresultspag.push($scope.adhocresultsactve[i]);
			}

		};

		$scope.filterresults = function() {
			if ($scope.checkModel.direct && $scope.checkModel.indirect) {
				$scope.adhocresultsactve = $scope.adhocresults;
			} else if ($scope.checkModel.direct && !$scope.checkModel.indirect) {
				$scope.adhocresultsactve = $scope.adhocresultsdirect;
			} else if (!$scope.checkModel.direct && $scope.checkModel.indirect) {
				$scope.adhocresultsactve = $scope.adhocresultsindirect;
			} else {
				$scope.adhocresultsactve = $scope.adhocresults;
			}
			$scope.currentPage = 1;
			$scope.pageChanged();

		};


		$scope.getAttributeValues = function(likeval, attr) {

			var attrarr = attr.split("_");

			var val = attrarr[1] + "+" + attrarr[0] + "+" + likeval;
			return $http.get('/api/attributes/getValues/' + val).then(function(res) {
				var nodes = [];
				angular.forEach(res.data, function(item) {
					nodes.push(item);
				});
				return nodes;
			});
		};

		$scope.exportadhocresults= function()
        {
            window.location =  '/api/export/adhoccsv/' + $scope.adhocparams;
        };


        $scope.$watch('advs', function(newVal, oldVal){

        	var attrdisplaystring="";
		    for(attr in $scope.advs)
		    {
		    	if($scope.tabsselected[attr.split("_")[0]] && $scope.advs[attr].trim()!="")
		    	{
		    		attrdisplaystring=attrdisplaystring+$filter('unCamelCase')(attr.split("_")[1])+" ("+$filter('unCamelCase')(attr.split("_")[0])+"): '"+$scope.advs[attr]+"', ";

		    	}
		    	
		    }
		    attrdisplaystring = attrdisplaystring.trim(" ").replace(/(^,)|(,$)/g, "");
		    $scope.attrdisplaystring=attrdisplaystring;

		}, true);

		$scope.$watch('tabsselected', function(newVal, oldVal){

        	var attrdisplaystring="";
		    for(attr in $scope.advs)
		    {
		    	if($scope.tabsselected[attr.split("_")[0]] && $scope.advs[attr].trim()!="")
		    	{
		    		attrdisplaystring=attrdisplaystring+$filter('unCamelCase')(attr.split("_")[1])+" ("+$filter('unCamelCase')(attr.split("_")[0])+"): '"+$scope.advs[attr]+"', ";

		    	}
		    	
		    }
		    attrdisplaystring = attrdisplaystring.trim(" ").replace(/(^,)|(,$)/g, "");
		    $scope.attrdisplaystring=attrdisplaystring;

		}, true);

	}
]); //angular