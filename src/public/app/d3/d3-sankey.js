// var graph  = {
// "nodes":[
// {"node":0,"name":"node0"},
// {"node":1,"name":"node1"},
// {"node":2,"name":"node2"},
// {"node":3,"name":"node3"},
// {"node":4,"name":"node4"}
// ],
// "links":[
// {"source":0,"target":2,"value":2},
// {"source":1,"target":2,"value":2},
// {"source":1,"target":3,"value":2},
// {"source":0,"target":4,"value":2},
// {"source":2,"target":3,"value":2},
// {"source":2,"target":4,"value":2},
// {"source":3,"target":4,"value":4}
// ]
// };

// var graph2 = {
//   "nodes": [
//     {
//       "name": "World Health Organization",
//       "id": "O78",
//       "label": [
//         "Organization"
//       ]
//     },
//     {
//       "name": "HIV Behavioral Surveys",
//       "id": "CO10",
//       "label": [
//         "Collaborative"
//       ]
//     },
//     {
//       "name": "SAS",
//       "id": "TL60",
//       "label": [
//         "Tool"
//       ]
//     },
//     {
//       "name": "National Syndromic Surveillance Platform (BioSense)",
//       "id": "SS15",
//       "label": [
//         "SurveillanceSystem"
//       ]
//     },
//     {
//       "name": "ICD-10",
//       "id": "DSTD6",
//       "label": [
//         "DataStandard"
//       ]
//     },
//     {
//       "name": "Global Vaccine Preventable Disease Laboratory Network - Measles Surveillance",
//       "id": "CO8",
//       "label": [
//         "Collaborative"
//       ]
//     },
//     {
//       "name": "National Notifiable Diseases Surveillance System",
//       "id": "SS101",
//       "label": [
//         "SurveillanceSystem"
//       ]
//     },
//     {
//       "name": "Division of Health Informatics and Surveillance",
//       "id": "O84",
//       "label": [
//         "Organization"
//       ]
//     },
//     {
//       "name": "National Syndromic Surveillance Program (formerly BioSense)",
//       "id": "P3",
//       "label": [
//         "Program"
//       ]
//     }
//   ],
//   "links": [
//     {
//       "source": 0,
//       "target": 1,
//       "type": "PARTNER_WITH",
//       "description": "n/a"
//     },
//     {
//       "source": 1,
//       "target": 2,
//       "type": "USES",
//       "description": "n/a"
//     },
//     {
//       "source": 3,
//       "target": 2,
//       "type": "USES",
//       "description": "n/a"
//     },
//     {
//       "source": 3,
//       "target": 8,
//       "type": "IS_A_COMPONENT/PART_OF",
//       "description": "n/a"
//     },
//     {
//       "source": 1,
//       "target": 4,
//       "type": "USES",
//       "description": "n/a"
//     },
//     {
//       "source": 3,
//       "target": 4,
//       "type": "USES",
//       "description": "n/a"
//     },
//     {
//       "source": 0,
//       "target": 5,
//       "type": "PARTNER_WITH",
//       "description": "n/a"
//     },
//     {
//       "source": 5,
//       "target": 6,
//       "type": "USES",
//       "description": "n/a"
//     },
//     {
//       "source": 7,
//       "target": 6,
//       "type": "OVERSEES",
//       "description": "n/a"
//     },
//     {
//       "source": 7,
//       "target": 8,
//       "type": "OVERSEES",
//       "description": "n/a"
//     }
//   ]
// }

// var graph3 = {
// "nodes": [
//     {
//       "name": "World Health Organization",
//       "id": "O78",
//       "label": [
//         "Organization"
//       ],
//       "relationsCount": 7
//     },
//     {
//       "name": "Africa Vaccine Preventable Diseases Sentinel Surveillance Network",
//       "id": "CO1",
//       "label": [
//         "Collaborative"
//       ],
//       "relationsCount": 7
//     },
//     {
//       "name": "Biosecurity Engagement Program",
//       "id": "P2",
//       "label": [
//         "Program"
//       ],
//       "relationsCount": 6
//     },
//     {
//       "name": "Global Vaccine Preventable Disease Laboratory Network - Measles Surveillance",
//       "id": "CO8",
//       "label": [
//         "Collaborative"
//       ],
//       "relationsCount": 8
//     },
//     {
//       "name": "Global Vaccine Preventable Disease Laboratory Network - Polio Surveillance",
//       "id": "P15",
//       "label": [
//         "Program"
//       ],
//       "relationsCount": 7
//     },
//     {
//       "name": "HIV Behavioral Surveys",
//       "id": "CO10",
//       "label": [
//         "Collaborative"
//       ],
//       "relationsCount": 10
//     },
//     {
//       "name": "Iraq Injury Surveillance",
//       "id": "CO13",
//       "label": [
//         "Collaborative"
//       ],
//       "relationsCount": 6
//     },
//     {
//       "name": "Pediatric Bacterial Meningitis Surveillance Network",
//       "id": "CO18",
//       "label": [
//         "Collaborative"
//       ],
//       "relationsCount": 6
//     },
//     {
//       "name": "WHO Global Health Observatory Data Repository",
//       "id": "SS183",
//       "label": [
//         "SurveillanceSystem"
//       ],
//       "relationsCount": 2
//     }
//   ],
//   "links": [
//     {
//       "source": 0,
//       "target": 1,
//       "type": "PARTNER_WITH",
//       "description": "n/a"
//     },
//     {
//       "source": 0,
//       "target": 2,
//       "type": "MANUALLY_PROVIDES_DATA_TO",
//       "description": "n/a"
//     },
//     {
//       "source": 0,
//       "target": 3,
//       "type": "PARTNER_WITH",
//       "description": "n/a"
//     },
//     {
//       "source": 0,
//       "target": 4,
//       "type": "SHARES_DATA_WITH",
//       "description": "n/a"
//     },
//     {
//       "source": 0,
//       "target": 5,
//       "type": "SHARES_SPECIMENS/SAMPLES/KITS/ISOLATES_WITH",
//       "description": "n/a"
//     },
   
//     {
//       "source": 0,
//       "target": 6,
//       "type": "PARTNER_WITH",
//       "description": "n/a"
//     },
//     {
//       "source": 0,
//       "target": 7,
//       "type": "PARTNER_WITH",
//       "description": "Both the Headquarters and the African Regional Office"
//     },
//     {
//       "source": 0,
//       "target": 8,
//       "type": "OVERSEES",
//       "description": "n/a"
//     }
//   ]
// }

showSanKey('O84','O84');  // default nodeid to IIU
$("#viewSankey").click(function() {

            var leftnodeid = $('#nodeAId').val();
            var rightnodeid = $('#nodeBId').val();
            if (leftnodeid == '' | leftnodeid == undefined) {
              leftnodeid = rightnodeid;
            }
            if (rightnodeid == '' | rightnodeid == undefined) {
              rightnodeid = leftnodeid;
            }
            //console.log(leftnodeid);
            if (leftnodeid == "" | rightnodeid == "" | leftnodeid == undefined | rightnodeid == undefined) {
              alert('Please enter left node, right node and select the number of hops.');

            } else {

              showSanKey(leftnodeid,rightnodeid);

            }



          }); //button click



function showSanKey(nodeA,nodeB) {

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

//getStyle();

var units = "Widgets";

var margin = {top: 25, right: 10, bottom: 10, left: 10},
    width = 1000 - margin.left - margin.right,
    height = 1500 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20();

var svg = d3.select("svg").remove();
    svg = d3.select("#chart").append("svg")
    //.attr( "preserveAspectRatio", "xMinYMid meet" )
    .attr("width",width+margin.left+margin.right)
    .attr("height",height+margin.bottom+margin.top)
    //.attr("viewBox", "0 0 1800 1300")
    //.attr("style", "width: 100%; padding-bottom: 99.99%; height: 1px;")
var rootGraphic = svg
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var sankey = d3.sankey()
    .nodeWidth(8)
    .nodePadding(4)
    .size([width, height]);

var path = sankey.link();

         jsonret = d3.json("/api/node/getSankeyNodes/"+nodeA+"/"+nodeB, function(error, json) {
         //jsonret = d3.json("/api/node/advancedSearch/O78-P3-4", function(error, json) {
            //console.log(json);
            //json = graph3;
            if (error) {
                step4status = -1;
            } else {
                //json.links.forEach(function(link) {
                   //link.value = ;
                   // if (link.source == 1) {
                   //    link.source = 0;
                   //    link.target = 1;
                   // }

               // })
               
                step4len = json.nodes.length;
                document.getElementById('loadingImg').style.display = 'none';
                sankey.nodes(json.nodes)
                      .links(json.links)
                      .layout(32);

                var link = svg.append("g").selectAll(".link")
                              .data(json.links)
                              .enter().append("path")
                              .attr("class", "sankeyLink")
                              .attr("d", path)
                              .style("stroke-width", 2)
                              .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
        return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(json.nodes)
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
         return d.color = d3.rgb(nodeColors[d.label[0]]);})
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
// function getStyle() {
//     for (var i=0; i<document.styleSheets.length; i++) {
//        if (document.styleSheets[i].title === 'd3') {
//           break;
//        }
//     }
//     var classes = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
//     for (var x = 0; x < classes.length; x++) {
       
//         if (classes[x].selectorText.indexOf('circle.node') != -1) {
//               nodeColors[classes[x].selectorText] = classes[x].style.fill;
//         }
//     }
//     //console.log(nodeColors);
// }
}