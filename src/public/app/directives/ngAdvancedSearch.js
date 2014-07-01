angular.module('apolloApp')
	.directive('ngAdvancedSearch', [

			function() {
				return {
					link: function(scope, element, attrs) {

						$(".btn.btn-default.pull-left.link_buttone").click(function() {

							var leftnodeid = $('#nodeAId').val();
							var rightnodeid = $('#nodeBId').val();


							hops = "";

							$('input[name=hop]:checked').each(function() {

								hops = hops + $(this).val() + ",";

							});


							hops = hops.trim();
							var lastIndex = hops.lastIndexOf(",")
							hops = hops.substring(0, lastIndex);


							if (leftnodeid == "" | rightnodeid == "" | hops == "" | leftnodeid == undefined | rightnodeid == undefined | hops == undefined | hops == 0) {
								alert('Please enter left node, right node and select the number of hops.');

							} else {

								window.open("#/advancedSearch/" + leftnodeid + "-" + rightnodeid + "-" + hops, "_self", "", false);
								hops = "";
							}



						});


						$(document).ready(function() {


							scope.checkModel = {
								Organization:true,
								Program:true,
								SurveillanceSystem:true,
								Tool:true,
								Registry:true,
								HealthSurvey:true,
								Collaborative:true,
								Dataset:true,
								DataStandard:true,
								Tag:true
							};

							scope.disableHideLines=false;

							scope.showOrganization=false;
							scope.showProgram=false;
							scope.showSurveillanceSystem=false;
							scope.showTool=false;
							scope.showRegistry=false;
							scope.showHealthSurvey=false;
							scope.showCollaborative=false;
							scope.showDataset=false;
							scope.showDataStandard=false;
							scope.showTag=false;

							var rootnodelabell="";
							var rootnodelabelr="";


							var url = $(location).attr('href');
							var split = url.split('/');
							var id = split[split.length - 1];


							//console.log(".."+id+"..");

							//d3.json("/apollo/api/node/viewer/" + id, function(error, json) {
							var leftnodeid = id.split("-")[0];
							var rightnodeid = id.split("-")[1];
							var hop = id.split("-")[2];


							//var hoparray=hop.split(",");

							//console.log(leftnodeid,rightnodeid);

							if (id == "" | id == "-") {

							} else {



								jsonret = d3.json("/apollo/api/node/advancedSearch/" + leftnodeid + "-" + rightnodeid + "-" + hop, function(error, json) {


									//console.log("json",json,error.status);

									var togglehidelinks = true;
									var togglefixnodes = true;
									//var w = 1000,
									var w = $("div.block_linkage").width();
									var h = 900;
									var r = 10;
									var rcent = 15; //radius of node circle

									var svg = d3.select(".block_linkage").append("svg:svg")
										.attr("width", w)
										.attr("height", h);

									var hoparr = hop.split(",");
									for (var i = 0; i < hoparr.length; i++) {
										$('#hop' + hoparr[i]).prop('checked', true);

									}

									//$('#hop'+hop).prop('checked', true);


									if (error) {

										if (error.status == 413) {

											var msg = "Due to the large number of relationships we recommend reducing the number of hops.";
											var xcoord = (w / 2) - (msg.length * 9 / 2);

											var errortext = svg
												.append("svg:text")
												.attr("class", "linkageerrormsg")
												.attr("x", xcoord)
												.attr("y", h / 6)
												.text(msg);




										} else {

											var msg = "No relationships found.";
											var xcoord = (w / 2) - (msg.length * 9 / 2);

											var errortext = svg
												.append("svg:text")
												.attr("class", "linkageerrormsg")
												.attr("x", xcoord)
												.attr("y", h / 6)
												.text(msg);



										}

									} else if (json == undefined) {

										var msg = "No relationships found.";
										var xcoord = (w / 2) - (msg.length * 9 / 2);

										var errortext = svg
											.append("svg:text")
											.attr("class", "linkageerrormsg")
											.attr("x", xcoord)
											.attr("y", h / 6)
											.text(msg);




									} else {





										var force = d3.layout.force()
											.nodes(json.nodes)
											.links(json.links)
											.size([w, h])
											.linkDistance(200)
											.charge(-5000)
											.on("tick", tick)
											.start();


										d3.select(window).on('resize', svgresize);


										d3.select(".btn.btn-default.pull-left.link_button1").on("click", clickreset);
										d3.select(".btn.btn-default.pull-left.link_button5").on("click", locknodes);
										d3.select(".btn.btn-default.pull-left.link_button4").on("click", hidelinks);



										d3.select(".btn.btn-default.link_button6").on("click", clusterlayout);


										var drag = force.drag()
											.on("dragstart", dragstart);


										var path = svg.append("svg:g")
											.selectAll("path")
											.data(json.links)
											.enter().append("svg:path")
											.attr("id", function(d) {
												return d.source.index + "_" + d.target.index;
											})
											.attr("pseudo_label", function(d) {
												return d.source.label + "_" + d.target.label;
											})
											.attr("pseudo_id", function(d) {
												return d.source.id + "_" + d.target.id;
											})
											.attr("class", "link");



										var circle = svg.append("svg:g")
											.selectAll("circle")
											.data(json.nodes)
											.enter().append("svg:circle")
											.attr("r", function(d) {
												if (d.id == leftnodeid || d.id == rightnodeid) return rcent;
												else return r;
											})
											.attr("class", function(d) {

												var labelname="show"+d.label;
												if(d.id == leftnodeid)
												{
													rootnodelabell=d.label;

												}
												else if(d.id == rightnodeid)
												{
													rootnodelabelr=d.label;

												}
												else
												{
													scope[labelname]=true;
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


										text.append("a").attr("xlink:href", function(d) {
											return "/apollo/#/linkage/" + d.id;
										})
											.append("svg:text")
											.attr("x", 25)
											.attr("y", ".31em")
											.text(function(d) {
												return d.name + " (" + d.label + ")";
											})
								.attr("class", function(d) {
									return "nodetext " + d.label;
								})
											.style("font-weight", function(d) {
												if (d.id == leftnodeid || d.id == rightnodeid) {
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
											.attr("pseudo_label", function(d) {
												return d.source.label + "_" + d.target.label;
											})
											.attr("pseudo_id", function(d) {
												return d.source.id + "_" + d.target.id;
											});

										path_label.append("svg:textPath")
											.attr("startOffset", "50%")
											.attr("text-anchor", "middle")
											.attr("xlink:href", function(d) {
												return "#" + d.source.index + "_" + d.target.index;
											})
											.style("font-family", "Arial")
											.text(function(d) {
												return d.type;
											})
											.attr("pseudo_label", function(d) {
												return d.source.label + "_" + d.target.label;
											})
											.attr("pseudo_id", function(d) {
												return d.source.id + "_" + d.target.id;
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
										//.on("mouseover", linkmouseover);

										clickreset();





									} //else json undefined



									function tick() {

										w = $("svg").outerWidth();
										h = $("svg").outerHeight();



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
										path_label.attr('transform', function(d) {


											//console.log(labeloverlaparr);
											var tokens = d.source.x+"-"+d.source.y+"-"+d.target.x+"-"+d.target.y;
											var tokent = d.target.x+"-"+d.target.y+"-"+d.target.x+"-"+d.target.y;
											//token ="ss";
											var found1 = jQuery.inArray(tokens, labeloverlaparr);
											var found2 = jQuery.inArray(tokent, labeloverlaparr);
											
											if(found1<0 & found2<0)
											{
												labeloverlaparr[i]=d.source.x+"-"+d.source.y+"-"+d.target.x+"-"+d.target.y;
												//labeloverlaparr[i]=d.source.y;
												//console.log(labeloverlaparr);
												i++;
											}
											else
											{
												offset=true;
											}
												
											
											//console.log(offset);
											//return 'translate(' + d.source.x + ',' + d.source.y + );
											if (d.target.x < d.source.x) {
												midx = (d.source.x + d.target.x) / 2;
												midy = (d.source.y + d.target.y) / 2;
												if(offset)
												{
													offset=false;
													return 'translate(0,10) rotate(180 ' + midx + ' ' + midy + ') ';
												}
												else
													return 'rotate(180 ' + midx + ' ' + midy + ') ';
											} else {
												if(offset)
												{
													offset=false;
													return 'translate(0,10) rotate(0)';
												}
												else
													return 'rotate(0)';
											}

											
										});

										text.attr("transform", function(d) {
											return "translate(" + d.x + "," + d.y + ")";
										});
										force.size([w, h]);
										//force.start();
										//console.log(w,h);
									}

									function dblclick(d) {
										d.fixed = false;
										d3.select(this).classed("fixed", false);
									}


									function locknodes(lock) {

										if (lock == "lock") {
											d3.selectAll("circle").classed("fixed", true);
											d3.select(".btn.btn-default.pull-left.link_button5").classed("active", true);
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
												d3.select(".btn.btn-default.pull-left.link_button5").classed("active", true);
												i = 0;
												for (n in json.nodes) {
													//alert(n.id);
													json.nodes[i].fixed = true;
													i++;

												}

												togglefixnodes = false;
											} else {

												d3.selectAll("circle").classed("fixed", false);
												d3.select(".btn.btn-default.pull-left.link_button5").classed("active", false);
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
										//togglefixnodes=true;
										d3.select("#btn_as_lock").classed("active", false);

										//i=0;
										json.nodes.forEach(function(d, i) {

											d.fixed = false;
											if (d.id == leftnodeid | d.id == rightnodeid) {
												d.fixed = true;
											}

											if (d.id == leftnodeid) {
												d.px = 300;
												d.x = 300;

												d.py = h / 3;
												d.y = h / 3;
											}

											if (d.id == rightnodeid) {
												d.px = w - 300;
												d.x = w - 300;

												d.py = h / 1.5;
												d.y = h / 1.5;
											}

											//i++;
											//console.log(d);

										});

										d3.selectAll("circle").attr("visibility", "visible");
										d3.selectAll("path").attr("visibility", "visible");
										d3.selectAll("text.path_label").attr("visibility", "visible");
										d3.select("#btv_as_hide").classed("active", false);
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
											d3.select(".btn.btn-default.pull-left.link_button4").classed("active", true);

											togglehidelinks = false;

										} else {
											if (togglehidelinks) {
												d3.selectAll("path").attr("visibility", "hidden");
												d3.selectAll("text.path_label").attr("visibility", "hidden");
												d3.select(".btn.btn-default.pull-left.link_button4").classed("active", true);

												togglehidelinks = false;
											} else {
												d3.selectAll("path").attr("visibility", "visible");
												d3.selectAll("text.path_label").attr("visibility", "visible");
												d3.select(".btn.btn-default.pull-left.link_button4").classed("active", false);
												togglehidelinks = true;
											}

										}



									}

									function svgresize() {
										//alert("aa");

										w = $("div.block_linkage").width();
										//h= $("div.block_linkage").outerHeight();

										d3.select("svg").attr("width", w).attr("height", h);
										force.size([w, h]);
										force.start();

									}

									scope.hidenodes= function(nodetype,flg) {

									//scope.checkModel[nodetype]=!scope.checkModel[nodetype];
									//chmod=(scope.checkModel);
									//console.log(nodetype,flg,scope.checkModel);
									var allunchecked=false;

									angular.forEach(scope.checkModel, function(value, key){
										
										
									if(!value)
									{
										allunchecked=true;
										//console.log(value);
									}
										

									});

									if(allunchecked)
									{
										scope.disableHideLines=true;
									}
									else
									{
										scope.disableHideLines=false;
									}

									var showflg;

									if(flg==true)
									{
										showflg='visible';
									}
									else
									{
										showflg='hidden';
									}

									d3.selectAll("circle.node." + nodetype)
									.attr("visibility",function(d){
										
										if(d.id==leftnodeid)
										{
											//return showflg;	
										}
										else if(d.id==rightnodeid)
										{
											//return showflg;	
										}
										else
										{
											return showflg;
										}
										

									});

									d3.selectAll("text.nodetext." + nodetype)
									.attr("visibility",function(d){
										
										if(d.id==leftnodeid)
										{
											//return showflg;	
										}
										else if(d.id==rightnodeid)
										{
											//return showflg;	
										}
										else
										{
											return showflg;
										}
										

									});


									
											
												
									if(!flg)
									{
										
										d3.selectAll("path.link[pseudo_label*=\""+nodetype+"\"]")
										.attr("visibility",function(d){


											var sourcenodelabel=d.source.label;
											var targetnodelabel=d.target.label;
											var sourcenodeid=d.source.id;
											var targetnodeid=d.target.id;

											var sourceyes=false;
											var targetyes=false;
											//var i=0;
											angular.forEach(scope.checkModel, function(value, key){
												
												//console.log("**********",value,key);
												if(!value & key==sourcenodelabel)
												{
													sourceyes=true;
													
												}
												if(!value & key==targetnodelabel)
												{
													targetyes=true;
													
												}
											});



											if(sourceyes | targetyes  )
											{
												
												if(sourceyes&targetyes)
												{
													
													return "hidden";
												}
												if(sourceyes & !targetyes & (sourcenodeid==leftnodeid | sourcenodeid == rightnodeid))
												{
													
													return "visible";
												}
												if(!sourceyes & targetyes & (targetnodeid==leftnodeid | targetnodeid == rightnodeid))
												{
													
													return "visible";
												}
												else
												{
													
													return "hidden";
												}
												

											}

										
									});
											

									//var i=0;
									d3.selectAll("text[pseudo_label*=\""+nodetype+"\"]")
										.attr("visibility",function(d){


											var sourcenodelabel=d.source.label;
											var targetnodelabel=d.target.label;
											var sourcenodeid=d.source.id;
											var targetnodeid=d.target.id;

											var sourceyes=false;
											var targetyes=false;
											//var i=0;
											angular.forEach(scope.checkModel, function(value, key){
												
												//console.log("**********",value,key);
												if(!value & key==sourcenodelabel)
												{
													sourceyes=true;
													//console.log("left",key,value,leftnodelabel);
												}
												if(!value & key==targetnodelabel)
												{
													targetyes=true;
													//console.log("right",key,value,rightnodelabel);
												}
											});

											if(sourceyes | targetyes  )
											{
												
												if(sourceyes&targetyes)
												{
													
													return "hidden";
												}
												if(sourceyes & !targetyes & (sourcenodeid==leftnodeid | sourcenodeid == rightnodeid))
												{
													
													return "visible";
												}
												if(!sourceyes & targetyes & (targetnodeid==leftnodeid | targetnodeid == rightnodeid))
												{
													
													return "visible";
												}
												else
												{
													
													return "hidden";
												}
												

											}

										
									});










								}
									
									if(flg)
									{
										

										d3.selectAll("path.link[pseudo_label*=\""+nodetype+"\"]")
											.attr("visibility",function(d){
												var sourcenodelabel=d.source.label;
												var targetnodelabel=d.target.label;
												var sourcenodeid=d.source.id;
												var targetnodeid=d.target.id;

												var sourceyes=false;
												var targetyes=false;
												//var i=0;
												angular.forEach(scope.checkModel, function(value, key){
													
													//console.log("**********",value,key);
													if(value & key==sourcenodelabel)
													{
														sourceyes=true;
														//console.log("left",key,value,leftnodelabel);
													}
													if(value & key==targetnodelabel)
													{
														targetyes=true;
														//console.log("right",key,value,rightnodelabel);
													}
												});

									
												if(sourceyes | targetyes  )
												{
													
													if(sourceyes&targetyes)
													{
														
														return "visible";
													}
													if(!sourceyes & targetyes & (sourcenodeid==leftnodeid | sourcenodeid == rightnodeid))
													{
														
														return "visible";
													}
													if(sourceyes & !targetyes & (targetnodeid==leftnodeid | targetnodeid == rightnodeid))
													{
														
														return "visible";
													}
													else
													{
														
														return "hidden";
													}
													

												}

										});
										d3.selectAll("text[pseudo_label*=\""+nodetype+"\"]")
											.attr("visibility",function(d){
												var sourcenodelabel=d.source.label;
												var targetnodelabel=d.target.label;
												var sourcenodeid=d.source.id;
												var targetnodeid=d.target.id;

												var sourceyes=false;
												var targetyes=false;
												//var i=0;
												angular.forEach(scope.checkModel, function(value, key){
													
													//console.log("**********",value,key);
													if(value & key==sourcenodelabel)
													{
														sourceyes=true;
														//console.log("left",key,value,leftnodelabel);
													}
													if(value & key==targetnodelabel)
													{
														targetyes=true;
														//console.log("right",key,value,rightnodelabel);
													}
												});


												if(sourceyes | targetyes  )
												{
													
													if(sourceyes&targetyes)
													{
													
														return "visible";
													}
													if(!sourceyes & targetyes & (sourcenodeid==leftnodeid | sourcenodeid == rightnodeid))
													{
														
														return "visible";
													}
													if(sourceyes & !targetyes & (targetnodeid==leftnodeid | targetnodeid == rightnodeid))
													{
														
														return "visible";
													}
													else
													{
														
														return "hidden";
													}
													

												}

										});



										
									}

									

									

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
										//.style("fill", "#8D8D91");

										//Set values to 0,0 since these are relative postions. Any value greater than 0,0 will offset the path label by a and y values.
										path_label
											.attr('transform', function(d) {
												return 'translate(' + 0 + ',' + 0 + ')';
											});

										hidelinks("hide");
										locknodes("lock");


									}


									function linkmouseover(d) {

										//alert(d3.select(this).attr("testattr"));

									}

									function dragstart(d) {
										d3.select(this).classed("fixed", true);
										//d3.select(this).attr("class","node fixed");
										d.fixed = true;
									}

								}); //jsonret

							} //else id=blank	



						}); //doument ready



					},

					template: '<img class="img-responsive linkage_empty" id="defaultimg" src="img/rel_explorer_empty_bg.png" ng-show="showImage"/>'	
							
				}	
				}
			]);