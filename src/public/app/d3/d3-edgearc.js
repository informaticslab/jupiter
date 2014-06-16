                            // var diameter = 960,
                            //  radius = diameter / 2,
                            //  innerRadius = radius - 240;

                            var diameter = 1200,
                              radius = diameter/2,
                              innerRadius = radius - 240;

                            var cluster = d3.layout.cluster()
                                    .size([360, innerRadius])
                                    .sort(null)
                                    .value(function(d) { return d.size; })
                                    .sort(function(a, b) { return d3.ascending(a.key, b.key); });

                            var bundle = d3.layout.bundle();

                            var line = d3.svg.line.radial()
                                    .interpolate("bundle")
                                    .tension(.85)
                                    .radius(function(d) { return d.y; })
                                    .angle(function(d) { return d.x / 180 * Math.PI; });

                            var svg = d3.select(".block_edge").append("svg")
                                .attr("width", diameter)
                                .attr("height", diameter)
                                .append("g")
                                .attr("transform", "translate(" + radius + "," + radius + ")");

                            var link = svg.append("g").selectAll(".link"),
                                node = svg.append("g").selectAll(".node");
                           
                            var arc = d3.svg.arc().outerRadius(radius-10).innerRadius(radius-50);

                            d3.json("/apollo/api/lab/relations", function(error, relations){

                              if(relations==undefined | error)
                              { 
                                var errormsg=svg.append("text")
                                .text("Could not retrieve all the relations")
                                .attr("class","linkageerrormsg")
                                .attr("x",diameter/4)
                                .attr("y",diameter/4);
                              }
                              else{
                                
                                d3.json("/apollo/api/lab/nodes", function(error, classes) {
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

                                      var nodes = cluster.nodes(packageHierarchy(classes)),
                                              links = packageImports(nodes);
                                      
                                      link = link
                                              .data(bundle(links))
                                              .enter().append("path")
                                              .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
                                              .attr("class", "linkLab")
                                              .attr("d", line);

                                      node = node
                                              .data(nodes.filter(function(n) { return !n.children; }))
                                              .enter().append("text")
                                              .attr("class", "nodeLab")
                                              .attr("dy", ".31em")
                                              .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
                                              .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
                                              .text(function(d) { return d.key; })
                                              .on("mouseover", mouseovered)
                                              .on("mouseout", mouseouted);

                                      var groupData = svg.selectAll("g.groups")
                                                        .data(nodes.filter(function(d) {  return (d.key == 'Organization' || d.key == 'SurveillanceSystem' || 
                                                                                                 d.key == 'Tool' || d.key == 'Dataset' || d.key == 'Registry' ||
                                                                                                 d.key == 'Collaborative' || d.key == 'HealthSurvey' || 
                                                                                                 d.key == 'DataStandard' || d.key == 'Program'
                                                                                                ) 
                                                                                                && d.children; }))
                                                       .enter().append("group")
                                                       .attr("class", "group"); 

                                      var groupArc = d3.svg.arc()
                                                      .innerRadius(radius - 260)
                                                      .outerRadius(radius - 240)
                                                      .startAngle(function(d) { return (findStartAngle(d.__data__.children)) * Math.PI / 180;})
                                                      .endAngle(function(d) { return (findEndAngle(d.__data__.children)) * Math.PI / 180});
                                                      
                                      svg.selectAll("g.arc")
                                      .data(groupData[0])
                                      .enter().append("svg:path")
                                      .attr("d", groupArc)
                                      .attr("class", "groupArc")
                                      .style("fill", "#1f77b4")
                                      .style("fill-opacity", 0.8);
                                     
                                      var arc_and_text = svg.selectAll("g.arc")
                                        .data(groupData[0])
                                        .enter().append("svg:g")
                                        .attr("class","arc_and_text");

                                      var arc_path = arc_and_text.append("svg:path")
                                        .attr("d", groupArc)
                                        .attr("class", "groupArc")
                                        .attr("id", function(d, i) { return "arc" + i; })
                                        .style("fill", "#1f77b4")
                                        .style("fill-opacity", 0.5);


                                      var arc_text = arc_and_text.append("text")
                                        .attr("class","arc_text")
                                        .attr("x", 3)
                                        .attr("dy", 15);

                                      arc_text.append("textPath")
                                        .attr("xlink:href", function(d, i) { return "#arc" + i; })
                                        .attr("class","arc_text_path")
                                        .style("fill","#ffffff")
                                        .text(function(d, i) { return d.__data__.key; });

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

                            d3.select(self.frameElement).style("height", diameter + "px");

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

                                    if (d.imports) d.imports.forEach(function(i) {
                                        if(i != null){
                                          //- console.log("packageImports :: the name of d is: "+d.name);
                                          //- console.log("packageImports :: the value of i is: "+i);
                                          imports.push({source: map[d.name], target: map[i]});
                                        }
                                    });
                                });
                                return imports;
                            }