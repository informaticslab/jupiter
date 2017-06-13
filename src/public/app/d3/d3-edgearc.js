                            // var diameter = 960,
                            //  radius = diameter / 2,
                            //  innerRadius = radius - 240;

                            var diameter = 1200,
                              radius = diameter/2,
                              innerRadius = radius - 240;

                            var clusterArc = d3.layout.cluster()
                                    .size([360, innerRadius])
                                    .sort(null)
                                    .value(function(d) { return d.size; })
                                    .sort(function(a, b) { return d3.ascending(a.key, b.key); });

                            var bundle = d3.layout.bundle();

                            var line = d3.svg.line.radial()
                                    .interpolate("bundle")
                                    .tension(.75)
                                    .radius(function(d) { return d.y; })
                                    .angle(function(d) { return d.x / 180 * Math.PI; });

                            var svgArc = d3.select(".block_edge").append("svg")
                                .attr("width", diameter)
                                .attr("height", diameter)
                                .append("g")
                                .attr("transform", "translate(" + radius + "," + radius + ")");

                            //new code for text hover
                            var filter = svgArc.append("filter")
                                        .attr( "id", "highlight") 
                                        .attr( "x", 0)
                                        .attr( "y", 0)
                                        .attr( "width", 1)
                                        .attr( "height", 1);

                            // append feFlood to filter
                            filter.append( "feFlood" )
                                  .attr( "flood-color", "#ffffff" )
                                  .attr( "flood-opacity", 1.0);

                            // append feFlood to filter
                            filter.append( "feComposite" )
                                  .attr( "in", "SourceGraphic" );

                            var arc = d3.svg.arc().outerRadius(radius-10).innerRadius(radius-50);

                            var link = svgArc.append("g").selectAll(".link"),
                                node = svgArc.append("g").selectAll(".node");
                            
                            d3.json("/api/lab/relations", function(error, relations){

                              if(relations==undefined | error)
                              { 
                                var errormsg=svgArc.append("text")
                                .text("Could not retrieve all the relations")
                                .attr("class","linkageerrormsg")
                                .attr("x",diameter/4)
                                .attr("y",diameter/4);
                              }
                              else{
                                
                                d3.json("/api/lab/nodes", function(error, classes) {
                                    if(classes == undefined | error){
                                      var errormsg=svgArc.append("text")
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

                                      var nodes = clusterArc.nodes(packageHierarchy(classes)),
                                              links = packageImports(nodes);
                                      
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

                                      var groupData = svgArc.selectAll("g.groups")
                                                        .data(nodes.filter(function(d) {  return (d.key == 'Organization' || d.key == 'SurveillanceSystem' || 
                                                                                                 d.key == 'Tool' || d.key == 'Dataset' || d.key == 'Registry' ||
                                                                                                 d.key == 'Collaborative' || d.key == 'HealthSurvey' || 
                                                                                                 d.key == 'DataStandard' || d.key == 'Program' || d.key == 'Concept' || d.key == 'DataElement'
                                                                                                ) 
                                                                                                && d.children; }))
                                                       .enter().append("group")
                                                       .attr("class", "group");

                                          link = link
                                                .data(bundle(links))
                                                .enter().append("path")
                                                .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
                                                .attr("d", line)
                                                .attr("class", function(){ return "linkLab" });

                                      var groupArc = d3.svg.arc()
                                                      // .innerRadius(radius - 260)
                                                      // .outerRadius(radius - 235)
                                                      .innerRadius(radius - 270)
                                                      .outerRadius(radius - 235)
                                                      .startAngle(function(d) { return (findStartAngle(d.__data__.children)) * Math.PI / 180;})
                                                      .endAngle(function(d) { return (findEndAngle(d.__data__.children)) * Math.PI / 180});
                                     
                                      var arc_and_text = svgArc.selectAll("g.arc")
                                        .data(groupData[0])
                                        .enter().append("svg:g")
                                        .attr("class","arc_and_text");

                                      var arc_path = arc_and_text.append("svg:path")
                                        .attr("text-anchor", "middle")
                                        .attr("d", groupArc)
                                        .attr("class", "groupArc")
                                        .attr("id", function(d, i) { return "arc" + i; })
                                        .attr("class", function(d){ if(d.__data__.key == 'Organization'){ return "arcColor_org";}
                                                                    else if(d.__data__.key == 'SurveillanceSystem'){ return "arcColor_sSystem";}
                                                                    else if(d.__data__.key == 'Tool'){ return "arcColor_tool";}
                                                                    else if(d.__data__.key == 'Dataset'){ return "arcColor_dataset";}
                                                                    else if(d.__data__.key == 'Registry'){ return "arcColor_registry";}
                                                                    else if(d.__data__.key == 'Collaborative'){ return "arcColor_collaborative";}
                                                                    else if(d.__data__.key == 'HealthSurvey'){ return "arcColor_hSurvey";}
                                                                    else if(d.__data__.key == 'DataStandard'){ return "arcColor_dStandard";}
                                                                    else if(d.__data__.key == 'Program'){ return "arcColor_program";}
                                                                    else if(d.__data__.key == 'Concept'){ return "arcColor_concept";}
                                                                    else if(d.__data__.key == 'DataElement'){ return "arcColor_dElement";}
                                                                  });

                                      var arc_text = arc_and_text.append("text")
                                        .attr("class","arc_text")
                                        .attr("dx", 10)
                                        .attr("dy",30);

                                      arc_text.append("textPath")
                                        .attr("xlink:href", function(d, i) { return "#arc" + i; })
                                        .attr("class","arc_text_path")
                                        .attr("class", "arcText")
                                        .text(function(d, i) {  if(d.__data__.key == 'SurveillanceSystem'){ return "Surveillance System";}
                                                                else if(d.__data__.key == 'Dataset'){ return "Data Set";}
                                                                else if(d.__data__.key == 'HealthSurvey'){ return "Survey";}
                                                                else if(d.__data__.key == 'DataStandard'){ return "Data Standard";}
                                                                else if(d.__data__.key == 'Concept'){ return "Concept";}
                                                                else if(d.__data__.key == 'DataElement'){ return "Element";}
                                                                else{ return d.__data__.key}
                                                             });

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
                                          imports.push({source: map[d.name], target: map[i]});
                                        }
                                    });
                                });
                                return imports;
                            }