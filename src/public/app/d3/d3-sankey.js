var graph  = {
"nodes":[
{"node":0,"name":"node0"},
{"node":1,"name":"node1"},
{"node":2,"name":"node2"},
{"node":3,"name":"node3"},
{"node":4,"name":"node4"}
],
"links":[
{"source":0,"target":2,"value":2},
{"source":1,"target":2,"value":2},
{"source":1,"target":3,"value":2},
{"source":0,"target":4,"value":2},
{"source":2,"target":3,"value":2},
{"source":2,"target":4,"value":2},
{"source":3,"target":4,"value":4}
]
};


var units = "Widgets";

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20();


var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width, height]);

var path = sankey.link();

// var bundle = d3.layout.bundle();

// var line = d3.svg.line.radial()
//         .interpolate("bundle")
//         .tension(.75)
//         .radius(function(d) { return d.y; })
//         .angle(function(d) { return d.x / 180 * Math.PI; });


// var cluster = d3.layout.cluster()
//                                    // .size([360, innerRadius])
//                                     .sort(null)
//                                     //.value(function(d) { return d.size; })
//                                     .sort(function(a, b) { return d3.ascending(a.key, b.key); });


// var link = svgSankey.append("g").selectAll(".link"),
//     node = svgSankey.append("g").selectAll(".node");
                            
                            d3.json("/api/lab/relations", function(error, relations){

                              if(relations==undefined | error)
                              { 
                                var errormsg=svg.append("text")
                                .text("Could not retrieve all the relations")
                                .attr("class","linkageerrormsg")
                                .attr("x",diameter/4)
                                .attr("y",diameter/4);
                              }
                              else{
                                console.log('relation ',relations); 
                                d3.json("/api/lab/nodes", function(error, classes) {
                                    if(classes == undefined | error){
                                      var errormsg=svg.append("text")
                                      .text("Could not retrieve all the nodes")
                                      .attr("class","linkageerrormsg")
                                      .attr("x",diameter/4)
                                      .attr("y",diameter/4);
                                    }
                                    else{ 
                                         classes.forEach(function(node){
                                          var tmpArr = _.where(relations, {p: node.id});
                                          tmpArr.forEach(function (d){
                                             node.imports.push('root!'.concat(d.clabel).concat('!').concat(d.cname));
                                          });

                                          node.name = 'root!'.concat( node.labels[0]).concat('!').concat(node.name);
                                      });
                                      console.log('classes ', classes);
                                      var depth2Nodes = [];
                                      classes.forEach(function(node) {
                                        if (node.labels[0] == "Organization") {
                                          depth2Nodes.push(node);
                                        }
                                      });
                                     console.log('dept2 nodes ', depth2Nodes);
                                     // var nodes =[];
                                     // var links = [];
                                     // classes.forEach(function(node){
                                     //    if (node.labels[0] == 'Organization') {
                                     //      nodes.push(node);
                                     //      node.imports.forEach(function(child) {
                                     //         links.push({source: node, target: {, value:2});
                                     //      })
                                     //    } 
                                     // }) 
                                      // var nodes = 
                                      //         links = packageImports(nodes);
                                      // console.log('nodes ', nodes);
                                      // console.log('links ', links);
                                     
                                     
                                     console.log('graph nodes ', graph.nodes);
                                     sankey.nodes(graph.nodes)
                                         .links(graph.links)
                                         .layout(32);
                                      
                                      // add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
        return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
      return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
      this.parentNode.appendChild(this); })
      .on("drag", dragmove));

// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
      return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { 
      return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
      return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");


                              function dragmove(d) {
                                    d3.select(this).attr("transform", 
                                        "translate(" + (
                                            d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
                                        )
                                        + "," + (
                                            d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                                        ) + ")");
                                    sankey.relayout();
                                    link.attr("d", path);
                              }
// the function for moving the nodes
  

                                      // node = node
                                      //         .data(nodes.filter(function(n) { return !n.children; }))
                                      //         .enter().append("text")
                                      //         .attr("class", "nodeLab")
                                      //         .attr("dy", ".31em")
                                      //         .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
                                      //         .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
                                      //         .text(function(d) { return d.key; })
                                      //         .on("mouseover", mouseovered)
                                      //         .on("mouseout", mouseouted);

                                      // var groupData = svgSankey.selectAll("g.groups")
                                      //                   .data(nodes.filter(function(d) {  return (d.key == 'Organization' || d.key == 'SurveillanceSystem' || 
                                      //                                                            d.key == 'Tool' || d.key == 'Dataset' || d.key == 'Registry' ||
                                      //                                                            d.key == 'Collaborative' || d.key == 'HealthSurvey' || 
                                      //                                                            d.key == 'DataStandard' || d.key == 'Program'
                                      //                                                           ) 
                                      //                                                           && d.children; }))
                                      //                  .enter().append("group")
                                      //                  .attr("class", "group");

                                      //     link = link
                                      //           .data(bundle(links))
                                      //           .enter().append("path")
                                      //           .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
                                      //           .attr("d", line)
                                      //           .attr("class", function(){ return "linkLab" });

                                    

                                      // var groupArc = d3.svg.arc()
                                      //                 // .innerRadius(radius - 260)
                                      //                 // .outerRadius(radius - 235)
                                      //                 .innerRadius(radius - 270)
                                      //                 .outerRadius(radius - 235)
                                      //                 .startAngle(function(d) { return (findStartAngle(d.__data__.children)) * Math.PI / 180;})
                                      //                 .endAngle(function(d) { return (findEndAngle(d.__data__.children)) * Math.PI / 180});
                                     
                                      // var arc_and_text = svgSankey.selectAll("g.arc")
                                      //   .data(groupData[0])
                                      //   .enter().append("svg:g")
                                      //   .attr("class","arc_and_text");

                                      // var arc_path = arc_and_text.append("svg:path")
                                      //   .attr("text-anchor", "middle")
                                      //   .attr("d", groupArc)
                                      //   .attr("class", "groupArc")
                                      //   .attr("id", function(d, i) { return "arc" + i; })
                                      //   .attr("class", function(d){ if(d.__data__.key == 'Organization'){ return "arcColor_org";}
                                      //                               else if(d.__data__.key == 'SurveillanceSystem'){ return "arcColor_sSystem";}
                                      //                               else if(d.__data__.key == 'Tool'){ return "arcColor_tool";}
                                      //                               else if(d.__data__.key == 'Dataset'){ return "arcColor_dataset";}
                                      //                               else if(d.__data__.key == 'Registry'){ return "arcColor_registry";}
                                      //                               else if(d.__data__.key == 'Collaborative'){ return "arcColor_collaborative";}
                                      //                               else if(d.__data__.key == 'HealthSurvey'){ return "arcColor_hSurvey";}
                                      //                               else if(d.__data__.key == 'DataStandard'){ return "arcColor_dStandard";}
                                      //                               else if(d.__data__.key == 'Program'){ return "arcColor_program";}
                                      //                             });

                                      // var arc_text = arc_and_text.append("text")
                                      //   .attr("class","arc_text")
                                      //   .attr("dx", 10)
                                      //   .attr("dy",30);

                                      // arc_text.append("textPath")
                                      //   .attr("xlink:href", function(d, i) { return "#arc" + i; })
                                      //   .attr("class","arc_text_path")
                                      //   .attr("class", "arcText")
                                      //   .text(function(d, i) {  if(d.__data__.key == 'SurveillanceSystem'){ return "Surveillance System";}
                                      //                           else if(d.__data__.key == 'Dataset'){ return "Data Set";}
                                      //                           else if(d.__data__.key == 'HealthSurvey'){ return "Survey";}
                                      //                           else if(d.__data__.key == 'DataStandard'){ return "Data Standard";}
                                      //                           else{ return d.__data__.key}
                                      //                        });

                                        document.getElementById('loadingImg').style.display = 'none';
                                    }
                                });
                              }
                            });


                            function mouseovered(d) {
                                node
                                        .each(function(n) { n.target = n.source = false; });

                                link
                                        .classed("linkLab--target", function(l) { if (l.target === d) return l.source.source = true; })
                                        .classed("linkLab--source", function(l) { if (l.source === d) return l.target.target = true; })
                                        .filter(function(l) { return l.target === d || l.source === d; })
                                        .each(function() { this.parentNode.appendChild(this); });

                                node
                                        .classed("nodeLab--target", function(n) { return n.target; })
                                        .classed("nodeLab--source", function(n) { return n.source; });
                            }

                            function mouseouted(d) {
                                link
                                        .classed("linkLab--target", false)
                                        .classed("linkLab--source", false);

                                node
                                        .classed("nodeLab--target", false)
                                        .classed("nodeLab--source", false);
                            }

                            function findStartAngle(children) {
                                var min = children[0].x;
                                children.forEach(function(d) {
                                   if (d.x < min)
                                       min = d.x;
                                });
                                return min;
                            }

                            function findEndAngle(children) {
                                var max = children[0].x;
                                children.forEach(function(d) {
                                   if (d.x > max)
                                       max = d.x;
                                });
                                return max;
                            }

                          //  d3.select(self.frameElement).style("height", diameter + "px");

                            // Lazily construct the package hierarchy from class names.
                            function packageHierarchy(classes) {
                                var map = {};

                                function find(name, data) {
                                    var node = map[name], i;
                                    if (!node) {
                                        node = map[name] = data || {name: name, children: []};
                                        
                                        if (name.length){
                                          node.parent = find(name.substring(0, i = name.lastIndexOf("!")));
                                          node.parent.children.push(node);
                                          node.key = name.substring(i+1);
                                          node.sourceLinks = [];
                                          node.targetLinks = [];
                                        }
                                    }
                                    return node;
                                }

                                classes.forEach(function(d) {
                                    find(d.name, d);
                                });

                                return map[""];
                            }

                            // Return a list of imports for the given array of nodes.
                            function packageImports(nodes) {

                                var map = {},
                                        imports = [];

                                // Compute a map from name to node.
                                nodes.forEach(function(d) {
                                    
                                    if(d != null){
                                      map[d.name] = d;
                                    }
                                });

                                // For each import, construct a link from the source to target node.
                                nodes.forEach(function(d) {

                                    if (d.imports) {
                                     d.imports.forEach(function(i) {
                                        if(i != null  && map[i] != null){
                                          imports.push({source: map[d.name], target: map[i], value: 2});
                                        }
                                    });
                                   }
                                });
                                return imports;
                            }