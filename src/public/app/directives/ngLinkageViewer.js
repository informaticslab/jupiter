angular.module('jupiterApp')
	.directive('ngLinkageViewer', [

		function() {
			return {
				link: function(scope, element, attrs) {

					$(document).ready(function() {

						scope.checkModel = {
							Organization: true,
							Program: true,
							SurveillanceSystem: true,
							Tool: true,
							Registry: true,
							HealthSurvey: true,
							Collaborative: true,
							Dataset: true,
							DataStandard: true,
							Tag: true
						};

						scope.showLinkageLoading = true;
						scope.disableHideLines = false;

						scope.showOrganization = false;
						scope.showProgram = false;
						scope.showSurveillanceSystem = false;
						scope.showTool = false;
						scope.showRegistry = false;
						scope.showHealthSurvey = false;
						scope.showCollaborative = false;
						scope.showDataset = false;
						scope.showDataStandard = false;
						scope.showTag = false;

						scope.countOrganization = 0;
						scope.countProgram = 0;
						scope.countSurveillanceSystem = 0;
						scope.countTool = 0;
						scope.countRegistry = 0;
						scope.countHealthSurvey = 0;
						scope.countCollaborative = 0;
						scope.countDataset = 0;
						scope.countDataStandard = 0;
						scope.countTag = 0;


						var url = $(location).attr('href');
						var split = url.split('/');
						var id = split[split.length - 1];

						//var nodename=

						var rootnodelabel = "";


						d3.json("/api/node/viewer/" + id, function(error, json) {

							scope.showLinkageLoading = false;
							scope.$apply();

							var togglehidelinks = true;
							var togglefixnodes = true;
							//var w = 1000,
							var w = $("div.block_linkage").width();
							var h = 400;
							var r = 10;
							var rcent = 15; //radius of node circle




							var svg = d3.select(".block_linkage").append("svg:svg")
								.attr("width", w)
								.attr("height", h);


							d3.select(window).on('resize', svgresize);

							if (json == undefined | error) {

								

								var nodename = "";
								d3.text("/api/node/name/" + id, function(error, data) {

									nodename = data;

									if (nodename == "Not Found") {
										var msg = "Activity not found. ID: " + id;
										var xcoord = (w / 2) - (msg.length * 9 / 2);

										var errormsg = svg.append("text")
											.text(msg)
											.attr("class", "linkageerrormsg")
											.attr("x", xcoord)
											.attr("y", h / 3);

									} else {
										var msg = nodename + " has no relationships with other entities.";
										var xcoord = (w / 2) - (msg.length * 9 / 2);

										var errormsg = svg.append("text")
											.text(msg)
											.attr("class", "linkageerrormsg")
											.attr("x", xcoord)
											.attr("y", h / 3);


									}


								});

							} else {

							scope.showLinkageLoading = false;

							var circlecount=json.nodes.length;
							//console.log("circle count",circlecount);

							if(circlecount<20)
							{
								h=600;
							}
							else if(circlecount<30)
							{
								h=700;
							}
							else if(circlecount<60)
							{
								h=900;
							}
							else if(circlecount<80)
							{
								h=1000;
							}
							else
							{
								h=1100;
							}


								svg.attr("width", w)
									.attr("height", h);
								//var h= $("div.block_linkage").outerHeight();

								var force = d3.layout.force()
									.nodes(json.nodes)
									.links(json.links)
									.size([w, h])
									.linkDistance(200)
									.charge(-1850)
									.friction(.85)
									.on("tick", tick)
									.start();

								//console.log($("div.block_linkage").outerWidth(),$("div.block_linkage").outerHeight());



								d3.select("#btn_lv_reset").on("click", clickreset);
								d3.select("#btn_lv_lock").on("click", locknodes);
								d3.select("#btn_lv_hide").on("click", hidelinks);

								d3.select("#btn_lv_activity").on("click", clusterlayout);


								var drag = force.drag()
									.on("dragstart", dragstart);


								var path = svg.append("svg:g")
									.selectAll("path")
									.data(json.links)
									.enter().append("svg:path")
									.attr("id", function(d) {
										return d.source.index + "_" + d.target.index;
									})
									.attr("pseudo_id", function(d) {
										return d.source.label + "_" + d.target.label;
									})
									//.attr("class", "link")
									.attr("class", function(d) {
										return "link " + d.source.label + " " + d.target.label;
									});



								var circle = svg.append("svg:g")
									.selectAll("circle")
									.data(json.nodes)
									.enter().append("svg:circle")
									.attr("r", function(d) {
										if (d.index == 0) return rcent;
										else return r;
									})
									.attr("class", function(d) {
										//console.log(d.label);
										var labelname = "show" + d.label;

										var countlabel = "count" + d.label;



										if (d.id == id) {
											rootnodelabel = d.label;

										} else {
											scope[labelname] = true;
											scope[countlabel]++;
											scope.$apply();
										}

										return "node " + d.label;
									})
									.on("dblclick", dblclick)
									.call(force.drag);

								var text = svg.append("svg:g")
									.selectAll("g")
									.data(json.nodes)
									.enter().append("svg:g");

								// A copy of the text with a thick white stroke for legibility.
								/*text.append("svg:text")
							.attr("x", 8)
							.attr("y", ".31em")
							.attr("class", "shadow")
							.text(function(d) { return d.name; });*/

								text.append("a").attr("xlink:href", function(d) {
									return "/#/linkage/" + d.id;
								})
									.append("svg:text")
									.attr("class", function(d) {
										return "nodetext " + d.label;
									})
									.attr("x", 25)
									.attr("y", ".31em")
									.text(function(d) {
										if(d.id==id)
										{
											var childnodecount=circlecount-1;
											return d.name + " (" + d.label + ") ("+childnodecount+")";
										}
										else
										{
											return d.name + " (" + d.label + ") ("+d.relationsCount+")";
										}
										
									})
									.style("font-weight", function(d) {
										if (d.index == 0) {
											return "bold";
										} else return "normal";
									});

								//For tooltip
								var div = d3.select("body").append("div")
									.attr("class", "tooltip")
									.style("opacity", 0);



								var path_label = svg.append("svg:g").selectAll(".path_label")
									.data(json.links)
									.enter()
									.append("svg:text")
									.attr("class", "path_label")
									.attr("pseudo_id", function(d) {
										return d.source.label + "_" + d.target.label;
									})
									.attr("class", function(d) {
										return "path_label " + d.source.label + " " + d.target.label;
									});

								path_label.append("svg:textPath")
								.attr("class","testpath")
									.attr("startOffset", "50%")
									.attr("text-anchor", "middle")
									.attr("xlink:href", function(d) {
										return "#" + d.source.index + "_" + d.target.index;
									})
									.style("font-family", "Arial")
									.text(function(d) {
										return d.type;

									})
									.attr("pseudo_id", function(d) {
										return d.source.label + "_" + d.target.label;
									})
									.on("click", function(d) {
										div.transition()
											.duration(200)
											.style("opacity", .9);
										div.html(d.description)
											.style("left", (d3.event.pageX) + "px")
											.style("top", (d3.event.pageY - 28) + "px");
									})
									.on("mouseout", function(d) {
										div.transition()
											.duration(500)
											.style("opacity", 0);
									});

									//for smoother node entry
									svg.style("opacity", 1e-6)
									  .transition()
									    .duration(1000)
									    .style("opacity", 1);
							} //else if undefined or error


							function tick() {

								w = $("svg").outerWidth();
								h = $("svg").outerHeight();


								//console.log($("svg").outerWidth());


								circle.attr("cx", function(d) {
									return d.x = Math.max(rcent + 2, Math.min(w - rcent - 2, d.x));
								})
									.attr("cy", function(d) {
										return d.y = Math.max(rcent + 2, Math.min(h - rcent - 2, d.y));
									});

								path.attr("d", function(d) {
									var dx = d.target.x - d.source.x,
										dy = d.target.y - d.source.y,
										dr = Math.sqrt(dx * dx + dy * dy),
										theta = Math.atan2(dy, dx) + Math.PI / 100, //orientation of the arrow
										d90 = Math.PI / 2,
										dtxs = d.target.x - 10 * Math.cos(theta), //distance of arrow from the node
										dtys = d.target.y - 10 * Math.sin(theta);
									//return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0 1," + d.target.x + "," + d.target.y + "A" + dr + "," + dr + " 0 0 0," + d.source.x + "," + d.source.y + "M" + dtxs + "," + dtys +  "l" + (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "L" + (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "z";
									return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y + "M" + dtxs + "," + dtys + "l" + (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "L" + (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "z";
									//return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y +"m0,-5l10,0l0,5z";
									//return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y + "A" + dr + "," + dr + " 0 0 0," + d.source.x + "," + d.source.y + "M" + dtxs + "," + dtys +  "l" + (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "L" + (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "z";
								})
									.style("fill", "#8D8D91");

							var labeloverlaparr=[];
							var i=0;
							var offset=false;
							var offsetstep=0;


								d3.selectAll(".testpath")
								.text(function (d){
									var relationship_label=d.type;
									relationship_label=relationship_label.replace(/_/g, ' ');
									relationship_label=relationship_label.toLowerCase();
									relationship_label=relationship_label.replace(/\w\S*/, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

									if (d.target.x < d.source.x) {

										
										if(d.source.id==id)
										{
											return "\u27F5"+relationship_label+"\u27F5";
										}
										else
										{
											return "\u27F5"+relationship_label+"\u27F5";
										}
									} else {
										//return 'rotate(0)';
										
										if(d.source.id==id)
										{
											return "\u27F6"+relationship_label+"\u27F6";
										}
										else
										{
											return "\u27F6"+relationship_label+"\u27F6";
										}
									}
								})
								.html(function (d){
									var relationship_label=d.type;
									relationship_label=relationship_label.replace(/_/g, ' ');
									relationship_label=relationship_label.toLowerCase();
									relationship_label=relationship_label.replace(/\w\S*/, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

									if (d.target.x < d.source.x) {

										
										if(d.source.id==id)
										{
											return "&#8592;"+relationship_label+"&#8592;";
										}
										else
										{
											return "&#8592;"+relationship_label+"&#8592;";
										}
									} else {
										//return 'rotate(0)';
										
										if(d.source.id==id)
										{
											return "&#8594;"+relationship_label+"&#8594;";
										}
										else
										{
											return "&#8594;"+relationship_label+"&#8594;";
										}
									}
								});

								var offsettracker=[];
								
								path_label
								.attr('transform', function(d) {
								//return 'translate(' + d.source.x + ',' + d.source.y + );



								//console.log("***********************");
								var tokens = d.source.x+"-"+d.source.y+"-"+d.target.x+"-"+d.target.y;
								var tokent = d.target.x+"-"+d.target.y+"-"+d.source.x+"-"+d.source.y;
								//token ="ss";
								var found1 = jQuery.inArray(tokens, labeloverlaparr);
								var found2 = jQuery.inArray(tokent, labeloverlaparr);

								var nonrootid;
								
								if(d.source.id==id)
								{
									nonrootid=d.target.id;
								}
								else
								{
									nonrootid=d.source.id;
								}

								

								if(found1<0 & found2<0)
								{
									labeloverlaparr[i]=d.source.x+"-"+d.source.y+"-"+d.target.x+"-"+d.target.y;
									
									i++;
								}
								else
								{
									

									offset=true;
									offsetstep++;

									offsettracker.push(nonrootid);
								
									
									//console.log(offsetstep);
								}


								var num = 0;
									
									offsettracker.forEach(function(d,i){
										if(d == nonrootid)
									        num++;
									});
								//console.log(nonrootid,num);
								offsetstep=num;



								if (d.target.x < d.source.x) {

									midx = (d.source.x + d.target.x) / 2;
									midy = (d.source.y + d.target.y) / 2;
									//return 'rotate(180 ' + midx + ' ' + midy + ') ';


									if (offset) {
										offset = false;

										return 'translate(0,' + (10 * offsetstep) + ') rotate(180 ' + midx + ' ' + midy + ') ';
									} else
										return 'rotate(180 ' + midx + ' ' + midy + ') ';
								} else {
									//return 'rotate(0)';
									if (offset) {
										offset = false;

										return 'translate(0,' + (10*offsetstep) + ') rotate(0)';
									} else
										return 'rotate(0)';
								}

								});

								text.attr("transform", function(d) {
									return "translate(" + d.x + "," + d.y + ")";
								});
								force.size([w, h]);
							}

							function dblclick(d) {
								d.fixed = false;
								d3.select(this).classed("fixed", false);
							}


							function locknodes(lock) {

								if (lock == "lock") {
									d3.selectAll("circle").classed("fixed", true);
									d3.select("#btn_lv_lock").classed("active", true);
									i = 0;
									for (n in json.nodes) {
										//alert(n.id);
										json.nodes[i].fixed = true;
										i++;

									}

									togglefixnodes = false;

								} else {

									if (togglefixnodes) {

										d3.selectAll("circle").classed("fixed", true);
										d3.select("#btn_lv_lock").classed("active", true);
										i = 0;
										for (n in json.nodes) {
											//alert(n.id);
											json.nodes[i].fixed = true;
											i++;

										}

										togglefixnodes = false;
									} else {

										d3.selectAll("circle").classed("fixed", false);
										d3.select("#btn_lv_lock").classed("active", false);
										i = 0;
										for (n in json.nodes) {
											//alert(n.id);
											json.nodes[i].fixed = false;
											i++;

										}
										//force.start();
										togglefixnodes = true;

									}
								}

							}



							function clickreset(d) {

								d3.selectAll("circle").classed("fixed", false);
								togglefixnodes = true;
								d3.select("#btn_lv_lock").classed("active", false);

								i = 0;
								for (n in json.nodes) {
									//alert(n.id);
									json.nodes[i].fixed = false;
									i++;

								}

								d3.selectAll("circle").attr("visibility", "visible");
								d3.selectAll("path").attr("visibility", "visible");
								d3.selectAll("text").attr("visibility", "visible");
								d3.select("#btn_lv_hide").classed("active", false);
								togglehidelinks = true;


								scope.checkModel = {
									Organization: true,
									Program: true,
									SurveillanceSystem: true,
									Tool: true,
									Registry: true,
									HealthSurvey: true,
									Collaborative: true,
									Dataset: true,
									DataStandard: true,
									Tag: true
								};

								scope.disableHideLines = false;
								scope.$apply();



								force.start();

							}

							function hidelinks(x) {

								if (x == "hide") {
									d3.selectAll("path").attr("visibility", "hidden");
									d3.selectAll("text.path_label").attr("visibility", "hidden");
									d3.select("#btn_lv_hide").classed("active", true);

									togglehidelinks = false;

								} else if (x == "show") {
									d3.selectAll("path").attr("visibility", "visible");
									d3.selectAll("text.path_label").attr("visibility", "visible");
									//d3.select("#btn_lv_hide").classed("active", true);

									//togglehidelinks = false;

								} else {
									if (togglehidelinks) {
										d3.selectAll("path").attr("visibility", "hidden");
										d3.selectAll("text.path_label").attr("visibility", "hidden");
										d3.select("#btn_lv_hide").classed("active", true);

										togglehidelinks = false;
									} else {
										d3.selectAll("path").attr("visibility", "visible");
										d3.selectAll("text.path_label").attr("visibility", "visible");
										d3.select("#btn_lv_hide").classed("active", false);
										togglehidelinks = true;
									}

								}



							}

							function svgresize() {
								//alert("aa");

								w = $("div.block_linkage").width();
								//h= $("div.block_linkage").outerHeight();

								d3.select("svg").attr("width", w).attr("height", h);
								if(force)
								{
									force.size([w, h]);
									force.start();
								}
			

							}

							scope.hidenodes = function(nodetype, flg) {

								//scope.checkModel[nodetype]=!scope.checkModel[nodetype];
								//chmod=(scope.checkModel);
								//console.log(nodetype,flg,scope.checkModel);
								var allunchecked = false;
								var firstuncheck = 0;

								angular.forEach(scope.checkModel, function(value, key) {


									if (!value) {
										allunchecked = true;
										firstuncheck++;
										//console.log(value);
									}


								});

								//console.log(firstuncheck);

								if (firstuncheck == 1 && !scope.disableHideLines) {
									hidelinks("show");
									//console.log("first show");
								}

								if (allunchecked) {
									scope.disableHideLines = true;

								} else {
									scope.disableHideLines = false;
									d3.select("#btn_lv_hide").classed("active", false);
									togglehidelinks = true;
								}

								var showflg;

								if (flg == true) {
									showflg = 'visible';
								} else {
									showflg = 'hidden';
								}

								d3.selectAll("circle.node." + nodetype)
									.attr("visibility", function(d) {

										if (d.id != id) {
											return showflg;
										}


									});

								d3.selectAll("text.nodetext." + nodetype)
									.attr("visibility", function(d) {

										if (d.id != id) {
											return showflg;
										}


									});


								d3.selectAll("path.link[pseudo_id=\"" + rootnodelabel + "_" + nodetype + "\"]")
									.attr("visibility", showflg);

								d3.selectAll("path.link[pseudo_id=\"" + nodetype + "_" + rootnodelabel + "\"]")
									.attr("visibility", showflg);


								d3.selectAll("text[pseudo_id='" + nodetype + "_" + rootnodelabel + "']")
									.attr("visibility", showflg);

								d3.selectAll("text[pseudo_id='" + rootnodelabel + "_" + nodetype + "']")
									.attr("visibility", showflg);

								//console.log(scope.checkModel);

								//attr("visibility", "hidden");

							}



							function clusterlayout() {

								//console.log("cluster layout");
								force.stop();

								circle.sort(function(a, b) {
									return d3.ascending(a.label, b.label);
								});
								text.sort(function(a, b) {
									return d3.ascending(a.label, b.label);
								});

								sw = $("svg").outerWidth();
								sh = $("svg").outerHeight();


								var n = circle[0].length; // number of child nodes

								var step = 2 * Math.PI / n;
								var h = sw / 2;
								var k = sh / 2;


								var r = 220;

								if (n > 40) {
									r = 300;
								}

								if (n > 80) {
									r = 350;
								}
								var pos = [];


								for (var theta = 0; theta < 2 * Math.PI; theta += step) {
									var x = h + r * Math.cos(theta);
									var y = k - r * Math.sin(theta); //note 2.
									pos.push([x, y]);
								}

								//console.log(pos);


								circle.transition()
									.duration(1000)
									.delay(function(d, i) {
										return i * 5;
									})
									.attr("cx", function(d, i) {
										d.px = pos[i][0];;
										return d.x = pos[i][0];
									})
									.attr("cy", function(d, i) {
										d.py = pos[i][1];
										return d.y = pos[i][1];
									});


								text.transition()
									.duration(1000)
									.delay(function(d, i) {
										return i * 5;
									})
									.attr("transform", function(d, i) {
										return "translate(" + pos[i][0] + "," + pos[i][1] + ")";
									});

								path.transition()
									.duration(1000)
									.delay(function(d, i) {
										return i * 5;
									})
									.attr("d", function(d) {

										circle.each(function(d1, i1) {

											if (d.target.id == d1.id & d.target.index == d1.index) {

												d.target.x = d1.x;
												d.target.y = d1.y;

											} else if (d.source.id == d1.id & d.source.index == d1.index) {
												d.source.x = d1.x;
												d.source.y = d1.y;
											} else {

											}
										});


										var dx = d.target.x - d.source.x,
											dy = d.target.y - d.source.y,
											dr = Math.sqrt(dx * dx + dy * dy),
											theta = Math.atan2(dy, dx) + Math.PI / 100, //orientation of the arrow
											d90 = Math.PI / 2,
											dtxs = d.target.x - 10 * Math.cos(theta), //distance of arrow from the node
											dtys = d.target.y - 10 * Math.sin(theta);
										return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y + "M" + dtxs + "," + dtys + "l" + (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "L" + (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "z";
									});

								//Set values to 0,0 since these are relative postions. Any value greater than 0,0 will offset the path label by a and y values.
								path_label
									.transition()
									.delay(000)
									.duration(10)
									.attr('transform', function(d) {
									})
									.transition()
									.delay(960)
									.each("end", function(){
										tick();
									});

								//.style("fill", "#8D8D91");


								d3.selectAll(".path_label").transition()
							    .attr("transform","translate(0,0) rotate(0)")
							    .duration(000)
							    .delay(0)
  								; 

  								d3.selectAll(".path_label").transition()
							    .attr("transform",function(d){

							    	if (d.target.x < d.source.x) {

									midx = (d.source.x + d.target.x) / 2;
									midy = (d.source.y + d.target.y) / 2;
									//console.log("true",d,d.source.name);
									return 'rotate(180 ' + midx + ' ' + midy + ') ';
									//return ' rotate(180)';
								} 
								else {

										//console.log("false",d,d.source.name);
										return ' rotate(0)';
								}
							    })
							    .duration(000)
							    .delay(1000)
  								; 
								//hidelinks("hide");
								locknodes("lock");



							}


							function linkmouseover(d) {

								alert(d3.select(this).attr("testattr"));

							}

							function dragstart(d) {
								d3.select(this).classed("fixed", true);
								//d3.select(this).attr("class","node fixed");
								d.fixed = true;
							}

						});

					});
				},//link
				template: '<img class="img-responsive linkage_empty" id="defaultimg" src="img/ajax-loader.gif" ng-show="showLinkageLoading"/>'
			}
		}
	]);