var margin = {top: 0, right: 20, bottom: 20, left: 20},
    // width = 1200 - margin.left - margin.right,
    // width = $('#blocktree').width() - margin.left - margin.right -160,
    width = $('#blocktree').outerWidth() - margin.left - margin.right -200,
    height = 600 - margin.top - margin.bottom;

// console.log("The width is :: "+$(".block_tree").outerWidth());
console.log("The width is :: "+$("#blocktree").outerWidth());

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.size; });

var div = d3.select(".block_tree").append("treemap")
    .style("position", "relative")
    // .style("width", (width + margin.left + margin.right) + "px")
    .style("width", width + "px")
    .style("display", "block")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("right", margin.right + "px")
    .style("top", margin.top + "px");

var mousemove = function(d) {
  var xPosition = d3.event.pageX + 5;
  var yPosition = d3.event.pageY + 5;

  d3.select("#tooltip")
    .style("left", xPosition + "px")
    .style("top", yPosition + "px");
  d3.select("#tooltip #name")
    .text(d.name);
  d3.select("#tooltip #type")
    .text(d.group);
  d3.select("#tooltip #relations")
    .text(d.size);
  d3.select("#tooltip").classed("hidden", false);
};

var mouseout = function() {
  d3.select("#tooltip");
  d3.select("#tooltip #name")
    .text("Name");
  d3.select("#tooltip #relations")
    .text("Number of relations");
  d3.select("#tooltip").classed("hidden", false);
};


d3.json("/apollo/api/lab/relations", function(error, relations){

  var treemapObj = {};
  var children=[];

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
          collabObj.name = "Collaborative";
          collabObj.group = "Collaborative";
          collabObj.children = [];
          
          var dataStandardObj = {};
          dataStandardObj.name = "DataStandard";
          dataStandardObj.group = "DataStandard";
          dataStandardObj.children = [];

          var dataSetObj = {};
          dataSetObj.name = "Dataset";
          dataSetObj.group = "Dataset";
          dataSetObj.children = [];

          var hSurveyObj = {};
          hSurveyObj.name = "HealthSurvey";
          hSurveyObj.group = "HealthSurvey";
          hSurveyObj.children = [];

          var orgObj = {};
          orgObj.name = "Organization";
          orgObj.group = "Organization";
          orgObj.children = [];

          var programObj = {};
          programObj.name = "Program";
          programObj.group = "Program";
          programObj.children = [];

          var registryObj = {};
          registryObj.name = "Registry";
          registryObj.group = "Registry";
          registryObj.children = [];

          var surSysObj = {};
          surSysObj.name = "SurveillanceSystem"; 
          surSysObj.group = "SurveillanceSystem"; 
          surSysObj.children = [];

          var toolObj = {};
          toolObj.name = "Tool"; 
          toolObj.group = "Tool";
          toolObj.children = [];

          nodes.forEach(function(node){    
            if( node.labels[0] == "Collaborative"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "Collaborative";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              collabObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "DataStandard"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "DataStandard";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              dataStandardObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Dataset"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "Dataset";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              dataSetObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "HealthSurvey"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "HealthSurvey";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              hSurveyObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Organization"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "Organization";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              orgObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Program"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "Program";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              programObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Registry"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "Registry";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              registryObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "SurveillanceSystem"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "SurveillanceSystem";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              surSysObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Tool"){
              var tmpObj = {};
              tmpObj.name = node.name;
              tmpObj.group = "Tool";
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              toolObj.children.push(tmpObj);
            }
            document.getElementById('loadingImg').style.display = 'none';
          });

          children.push(collabObj);
          children.push(dataStandardObj);
          children.push(dataSetObj);
          children.push(hSurveyObj);
          children.push(orgObj);
          children.push(programObj);
          children.push(registryObj);
          children.push(surSysObj);
          children.push(toolObj);

          treemapObj.name = "cisp";
          treemapObj.children = children;

          var node = div.datum(treemapObj).selectAll(".node")
                        .data(treemap.nodes)
                        .enter().append("div")
                        .attr("class", "nodeTree")
                        .call(position)
                        .style("background", function(d) { return d.children ? nodeColor(d.group) : null; })
                        .text(function(d) { return d.children ? null : d.name; })
                        .on("mousemove", mousemove)
                        .on("mouseout", mouseout);

          node
              .data(treemap.value(value).nodes)
              .transition()
              .duration(1500)
              .call(position);
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

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}