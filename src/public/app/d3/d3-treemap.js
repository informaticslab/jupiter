var margin = {top: 20, right: 0, bottom: 0, left: 0},
    // width = 960 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;
    width = 1280 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var color = d3.scale.category20c();

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.size; });

var div = d3.select(".block_tree").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

var mousemove = function(d) {
  console.log("Mouse moved");
  var xPosition = d3.event.pageX + 5;
  var yPosition = d3.event.pageY + 5;

  d3.select("#tooltip")
    .style("left", xPosition + "px")
    .style("top", yPosition + "px");
  d3.select("#tooltip #name")
    .text(d.name);
  d3.select("#tooltip #relations")
    .text(d.size);
  d3.select("#tooltip").classed("hidden", false);
};

var mouseout = function() {
  d3.select("#tooltip").classed("hidden", true);
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
          collabObj.children = [];
          
          var dataStandardObj = {};
          dataStandardObj.name = "DataStandard"
          dataStandardObj.children = [];

          var dataSetObj = {};
          dataSetObj.name = "Dataset";
          dataSetObj.children = [];

          var hSurveyObj = {};
          hSurveyObj.name = "HealthSurvey";
          hSurveyObj.children = [];

          var orgObj = {};
          orgObj.name = "Organization";
          orgObj.children = [];

          var programObj = {};
          programObj.name = "Program";
          programObj.children = [];

          var registryObj = {};
          registryObj.name = "Registry";
          registryObj.children = [];

          var surSysObj = {};
          surSysObj.name = "SurveillanceSystem"; 
          surSysObj.children = [];

          var toolObj = {};
          toolObj.name = "Tool"; 
          toolObj.children = [];

          nodes.forEach(function(node){    
            if( node.labels[0] == "Collaborative"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              collabObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "DataStandard"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              dataStandardObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Dataset"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              dataSetObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "HealthSurvey"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              hSurveyObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Organization"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              orgObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Program"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              programObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Registry"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              registryObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "SurveillanceSystem"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              surSysObj.children.push(tmpObj);
            }
            else if( node.labels[0] == "Tool"){
              var tmpObj = {};
              tmpObj.name = node.name;
              var tmpArr = _.where(relations, {p: node.id});
              tmpObj.size = tmpArr.length;
              
              toolObj.children.push(tmpObj);
            }
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
                        .style("background", function(d) { return d.children ? color(d.name) : null; })
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


function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}