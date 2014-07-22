
d3.json("/apollo/api/lab/relations", function(error, relations){

  var treemapObj = {};
  var groups=[];

  if(relations==undefined | error)
  { 
    console.log("Could not retrieve all the relations");
  }
  else{
    
    d3.json("/apollo/api/lab/nodes", function(error, nodes) {
        if(nodes == undefined | error){
          console.log("Could not retrieve all the nodes");
        }
        else{ 
          //Format all the nodes and relations into the datamodel for the tree algorithm
          var collabObj = {};
          collabObj.label = "Collaborative";
          collabObj.weight = 0;
          collabObj.color = groupColor(collabObj.label);
          collabObj.groups = [];
          
          var dataStandardObj = {};
          dataStandardObj.label = "DataStandard";
          dataStandardObj.weight = 0;
          dataStandardObj.color = groupColor(dataStandardObj.label);
          dataStandardObj.groups = [];

          var dataSetObj = {};
          dataSetObj.label = "Dataset";
          dataSetObj.weight = 0;
          dataSetObj.color = groupColor(dataSetObj.label);
          dataSetObj.groups = [];

          var hSurveyObj = {};
          hSurveyObj.label = "HealthSurvey";
          hSurveyObj.weight = 0;
          hSurveyObj.color = groupColor(hSurveyObj.label);
          hSurveyObj.groups = [];

          var orgObj = {};
          orgObj.label = "Organization";
          orgObj.weight = 0;
          orgObj.color = groupColor(orgObj.label);
          orgObj.groups = [];

          var programObj = {};
          programObj.label = "Program";
          programObj.weight = 0;
          programObj.color = groupColor(programObj.label);
          programObj.groups = [];

          var registryObj = {};
          registryObj.label = "Registry";
          registryObj.weight = 0;
          registryObj.color = groupColor(registryObj.label);
          registryObj.groups = [];

          var surSysObj = {};
          surSysObj.label = "SurveillanceSystem"; 
          surSysObj.weight = 0;
          surSysObj.color = groupColor(surSysObj.label);
          surSysObj.groups = [];

          var toolObj = {};
          toolObj.label = "Tool"; 
          toolObj.weight = 0;
          toolObj.color = groupColor(toolObj.label);
          toolObj.groups = [];

          nodes.forEach(function(node){    
            if( node.labels[0] == "Collaborative"){

              collabObj.weight ++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });
              
              collabObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "DataStandard"){
              
              dataStandardObj.weight ++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });
              
              dataStandardObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Dataset"){

              dataSetObj.weight ++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });

              dataSetObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "HealthSurvey"){
              
              hSurveyObj.weight ++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });
              
              hSurveyObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Organization"){
              
              orgObj.weight ++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });
              
              orgObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Program"){
              
              programObj.weight ++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });
              
              programObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Registry"){
              
              registryObj.weight ++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });
              
              registryObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "SurveillanceSystem"){
              
              surSysObj.weight++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });
              
              surSysObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Tool"){
              
              toolObj.weight ++;
              var tmpArr = _.where(relations, {p: node.id});
              
              var tmpObj = {};
              tmpObj.weight = tmpArr.length;
              tmpObj.label = node.name + ' ('+tmpObj.weight+')';
              tmpObj.color = groupColor(node.labels[0]);

              tmpObj.groups = [];
              tmpArr.forEach(function(d){
                var relName = {};
                relName.label = d.cname;
                tmpObj.groups.push(relName);
              });
              
              toolObj.groups.push(tmpObj);
            }

          });

          groups.push(collabObj);
          groups.push(dataStandardObj);
          groups.push(dataSetObj);
          groups.push(hSurveyObj);
          groups.push(orgObj);
          groups.push(programObj);
          groups.push(registryObj);
          groups.push(surSysObj);
          groups.push(toolObj);
 
          treemapObj.label = "cisp";
          treemapObj.groups = groups;

          document.getElementById('loadingImg').style.display = 'none';   

          var foamtree = new CarrotSearchFoamTree({
            id: "visualization",
            dataObject: treemapObj,
            groupColorDecorator: function (opts, params, vars) {
              vars.groupColor = params.group.color;
              // vars.labelColor = "auto";
            },
            
            initializer: "fisheye",
            relaxationVisible: true,
            // fadeDuration: 1000,
            groupGrowingDuration: 500,
            groupGrowingDrag: 0.1,
            rolloutDuration: 2000,
            
          });

        } // end else

    });
  }

});

function groupColor(group){
  if(group == "Collaborative"){
    return "#16a086";
  }
  else if(group == "DataStandard"){
    return "#93ae24";
  }
  else if(group == "Dataset"){
    return "#acacac";
  }
  else if(group == "HealthSurvey"){
    return "#d44138";
  }
  else if(group == "Organization"){
    return "#3598db";
  }
  else if(group == "Program"){
    return "#2dcc70";
  }
  else if(group == "Registry"){
    return "#6b8787";
  }
  else if(group == "SurveillanceSystem"){
    return "#edc00a";
  }
  else if(group == "Tool"){
    return "#e57e31";
  }
}