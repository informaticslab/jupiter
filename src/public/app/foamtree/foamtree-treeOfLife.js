
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
          collabObj.groups = [];
          
          var dataStandardObj = {};
          dataStandardObj.label = "DataStandard";
          dataStandardObj.weight = 0;
          dataStandardObj.groups = [];

          var dataSetObj = {};
          dataSetObj.label = "Dataset";
          dataSetObj.weight = 0;
          dataSetObj.groups = [];

          var hSurveyObj = {};
          hSurveyObj.label = "HealthSurvey";
          hSurveyObj.weight = 0;
          hSurveyObj.groups = [];

          var orgObj = {};
          orgObj.label = "Organization";
          orgObj.weight = 0;
          orgObj.groups = [];

          var programObj = {};
          programObj.label = "Program";
          programObj.weight = 0;
          programObj.groups = [];

          var registryObj = {};
          registryObj.label = "Registry";
          registryObj.weight = 0;
          registryObj.groups = [];

          var surSysObj = {};
          surSysObj.label = "SurveillanceSystem"; 
          surSysObj.weight = 0;
          surSysObj.groups = [];

          var toolObj = {};
          toolObj.label = "Tool"; 
          toolObj.weight = 0;
          toolObj.groups = [];

          nodes.forEach(function(node){    
            if( node.labels[0] == "Collaborative"){

              collabObj.weight ++;
              var tmpObj = {};
              tmpObj.label = node.name;
              // tmpObj.group = "Collaborative";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              collabObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "DataStandard"){
              
              dataStandardObj.weight ++;

              var tmpObj = {};
              tmpObj.label = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              dataStandardObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Dataset"){

              dataSetObj.weight ++;

              var tmpObj = {};
              tmpObj.label = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              dataSetObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "HealthSurvey"){
              
              hSurveyObj.weight ++;

              var tmpObj = {};
              tmpObj.label = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              hSurveyObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Organization"){
              
              orgObj.weight ++;

              var tmpObj = {};
              tmpObj.label = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              orgObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Program"){
              
              programObj.weight ++;

              var tmpObj = {};
              tmpObj.label = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              programObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Registry"){
              
              registryObj.weight ++;

              var tmpObj = {};
              tmpObj.label = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              registryObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "SurveillanceSystem"){
              
              surSysObj.weight++;

              var tmpObj = {};
              tmpObj.label = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              surSysObj.groups.push(tmpObj);
            }
            else if( node.labels[0] == "Tool"){
              
              toolObj.weight ++;

              var tmpObj = {};
              tmpObj.label = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.weight = tmpArr.length;
              
              toolObj.groups.push(tmpObj);
            }

            document.getElementById('loadingImg').style.display = 'none';
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

          console.log("The groups object is: "+JSON.stringify(groups));
          
          treemapObj.label = "cisp";
          treemapObj.groups = groups;   

          var foamtree = new CarrotSearchFoamTree({
            id: "visualization",
            dataObject: treemapObj
          }); 

        } // end else

    });
  }

});

function nodeColor(group){
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