var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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

// d3.json("img/flare.json", function(error, root) {
//   var node = div.datum(root).selectAll(".node")
//       .data(treemap.nodes)
//     .enter().append("div")
//       .attr("class", "nodeTree")
//       .call(position)
//       .style("background", function(d) { return d.children ? color(d.name) : null; })
//       .text(function(d) { return d.children ? null : d.name; });

//   d3.selectAll("input").on("change", function change() {
//     var value = this.value === "count"
//         ? function() { return 1; }
//         : function(d) { return d.size; };

//     node
//         .data(treemap.value(value).nodes)
//       .transition()
//         .duration(1500)
//         .call(position);
//   });
// });

d3.json("/apollo/api/lab/relations", function(error, relations){

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

          //Format all the nodes and relations
          nodes.forEach(function(node){

              
              if( node.labels[0] == "Collaborative"){
                // console.log("Collaborative");
              }
              else if( node.labels[0] == "DataStandard"){
                // console.log("DataStandard");
              }
              else if( node.labels[0] == "Dataset"){
                // console.log("Dataset");
              }
              else if( node.labels[0] == "HealthSurvey"){
                // console.log("HealthSurvey");
              }
              else if( node.labels[0] == "Organization"){
                // console.log("Organization");
              }
              else if( node.labels[0] == "Program"){
                // console.log("Program");
              }
              else if( node.labels[0] == "Registry"){
                // console.log("Registry");
              }
              else if( node.labels[0] == "SurveillanceSystem"){
                // console.log("SurveillanceSystem");
              }
              else if( node.labels[0] == "Tool"){
                // console.log("Tool");
              }

              var tmpArr = _.where(relations, {p: node.id});
              tmpArr.forEach(function (d){
                 node.imports.push(d.cname);
              });

          });
          
          // console.log("The final result set is :"+JSON.stringify(nodes));

        }
    });
  }

});


function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}