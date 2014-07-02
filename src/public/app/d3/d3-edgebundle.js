														// var diameter = 960,
														// 	radius = diameter / 2,
														// 	innerRadius = radius - 240;

														var diameter = 1200,
															radius = diameter/2,
															innerRadius = radius - 240;

														var cluster = d3.layout.cluster()
																		.size([360, innerRadius])
																		.sort(null)
																		.value(function(d) { return d.size; });

														var bundle = d3.layout.bundle();

														var line = d3.svg.line.radial()
																		.interpolate("bundle")
																		.tension(.75)
																		.radius(function(d) { return d.y; })
																		.angle(function(d) { return d.x / 180 * Math.PI; });

														var svg = d3.select(".block_edge").append("svg")
																.attr("width", diameter)
																.attr("height", diameter)
																.append("g")
																.attr("transform", "translate(" + radius + "," + radius + ")");

														//new code for text hover
							                            var filter = svg.append("filter")
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

														var link = svg.append("g").selectAll(".link"),
																		node = svg.append("g").selectAll(".node");

														d3.json("/apollo/api/lab/relations", function(error, relations){

															if(relations==undefined | error)
															{	
																var errormsg=svg.append("text")
																.text("Could not retrieve all the relations")
																.attr("class","linkageerrormsg")
																.attr("x",w/4)
																.attr("y",h/4);
															}
															else{
																// d3.json("/apollo/api/lab/nodes", function(error, classes) {
																d3.json("/apollo/api/lab/nodes", function(error, classes) {
																		if(classes == undefined | error){
																			var errormsg=svg.append("text")
																			.text("Could not retrieve all the nodes")
																			.attr("class","linkageerrormsg")
																			.attr("x",w/4)
																			.attr("y",h/4);
																		}
																		else{

																			classes.forEach(function(node){

										                                        var tmpArr = _.where(relations, {p: node.id});
										                                        tmpArr.forEach(function (d){
										                                            node.imports.push('root!'.concat(d.cname));
										                                        });

									                                          	node.name = 'root!'.concat(node.name);
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