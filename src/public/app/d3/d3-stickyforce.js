var nodeColors = {
  Program : '#2dcc70', 
  Organization : '#3598db',
  SurveillanceSystem: '#f1c40f',
  Tool : '#e77e23',
  Registry : '#95a5a5',
  Collaborative : '#16a086',
  HealthSurvey : '#d64032',
  Dataset : '#9b58b5',
  DataStandard : '#92af08'
}


var width = 1200
    height = 600

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .size([width, height])
    .charge(-1900)
    .linkDistance(60)
    .friction(.85)
    .on("tick", tick);

 var drag = force.drag()
     .on("dragstart", dragstart);

 d3.json("/api/node/searchByType/Organization", function(error, json) {
   if (error) throw error;
   document.getElementById('loadingImg').style.display = 'none';
  force
      .nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

    node.append("circle")
      .attr("r", 20)
      .style("fill", function(d) {
         return d.color = d3.rgb(nodeColors[d.label[0]]);})
      .style("stroke", function(d) { 
        return d3.rgb(d.color).darker(2); })
      
  node.append("text")
      // .attr("dx", 12)
      // .attr("dy", ".35em")

      //.attr("dx", function(d){return -10})
      .style("text-anchor", "middle")
      .text(function(d) { return d.id });

  node.append("title")
      .text(function(d) { return d.label[0] +' : '+d.name; });


  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});

 function tick() {
   link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

   node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

 function dblclick(d) {
   d3.select(this).classed("fixed", d.fixed = false);
 }

 function dragstart(d) {
   d3.select(this).classed("fixed", d.fixed = true);
 }

function svgresize() {
                //alert("aa");

                w = $("#chart").width();
                //h= $("div.block_linkage").outerHeight();

                d3.select("svg").attr("width", w).attr("height", h);
                if(force)
                {
                  force.size([w, h]);
                  force.start();
                }
      

              }

