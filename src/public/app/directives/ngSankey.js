angular.module('jupiterApp')
	.directive('ngSankey', [

		function() {
			return {
				link: function(scope, element, attrs) {

					var jsonpointer = [];
					var currentstep = 1;
					var w;
					var h = 900;
				
					$("#viewSankey").click(function() {
						var leftnodeid = $('#nodeAId').val();
						var rightnodeid = $('#nodeBId').val();


						// hops = "";

						// $('input[name=hop]:checked').each(function() {

						// 	hops = hops + $(this).val() + ",";

						// });


						// hops = hops.trim();
						// var lastIndex = hops.lastIndexOf(",")
						// hops = hops.substring(0, lastIndex);


						if (leftnodeid == "" | rightnodeid == "" | leftnodeid == undefined | rightnodeid == undefined) {
							alert('Please enter left node, right node and select the number of hops.');

						} else {

							window.open("#/sankey2/" + leftnodeid + "-" + rightnodeid, "_self", "", false);
							hops = "";
						}



					}); //button click

					// $("#btn_as_inccon").click(inccons());
					// $("#btn_as_deccon").click(deccons());
					
					$(document).ready(function() {
						
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
						var units = "Links";

						var margin = {top: 30, right: 10, bottom: 10, left: 10},
						    width = 1000 - margin.left - margin.right,
						    height = 1500 - margin.top - margin.bottom;

						var formatNumber = d3.format(",.0f"),    // zero decimal places
						    format = function(d) { return formatNumber(d) + " " + units; },
						    color = d3.scale.category20();

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
							Tag: true,
							Concept: true,
							DataElement: true
						};

						scope.disableHideLines = false;

						scope.disabledeccon = true;
						scope.disableinccon = true;

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
						scope.showConcept = false;
						scope.showDataElement = false;

						var rootnodelabell = "";
						var rootnodelabelr = "";

						var json, drag, path, text, path_label,svg,sankey,rootGraphic,link;
						var togglehidelinks = true;
						var togglefixnodes = true;
						//var w = 1000,


						//console.log("www",w);
						var url = $(location).attr('href');
						var split = url.split('/');
						var id = split[split.length - 1];


						//console.log(".."+id+"..");

						//d3.json("/api/node/viewer/" + id, function(error, json) {
						var leftnodeid = id.split("-")[0];
						var rightnodeid = id.split("-")[1];
						//var hop = id.split("-")[2];


					
						scope.$watch(
							function() {
								return scope.stepstatusallcomplete;
							},
							function(newValue, oldValue) {
								if (newValue !== oldValue) {

									if (scope.stepstatusallcomplete) {

										//console.log("AS json", scope.step1json, scope.step2json, scope.step3json, scope.step4json);
										//console.log("w h",w,h);


										if (scope.step1status == 1) {
											jsonpointer.push(1);

										}
										if (scope.step2status == 1) {
											jsonpointer.push(2);

										}
										if (scope.step3status == 1) {
											jsonpointer.push(3);

										}
										if (scope.step4status == 1) {
											jsonpointer.push(4);

										}

										jsonpointer.sort();

										//console.log(jsonpointer);

										// console.log(jsonstep.step1);
										// console.log(jsonstep.step2);
										// console.log(jsonstep.step3);
										// console.log(jsonstep.step4);


										if (jsonpointer.length < 2) {
											scope.disabledeccon = true;
											scope.disableinccon = true;
										} else {
											scope.disabledeccon = true;
											scope.disableinccon = false;
										}

										if (scope.step1status != -1) {
											currentstep = 1;
											constructsvg(1);
										} else if (scope.step2status != -1) {
											currentstep = 2;
											constructsvg(2);
										} else if (scope.step3status != -1) {
											currentstep = 3;
											constructsvg(3);
										} else if (scope.step4status != -1) {
											currentstep = 4;
											constructsvg(4);
										}
										else
										{
											w = $("div.block_linkage").width()-margin.left - margin.right;
											h = $("div.block_linkage").height() -margin.top - margin.bottom;
											svg = d3.select(".block_linkage").append("svg:svg")
											.attr("width", w)
											.attr("height", h);
											var msg = "Sorry, there were no relationships found between between the selected activities.";//+scope.nodeA+" and "+scope.nodeB;
											"No relationships found.";
											var xcoord = (w / 2) - (msg.length * 9 / 2.5);

											var errortext = svg
												.append("svg:text")
												.attr("class", "linkageerrormsg")
												.attr("x", xcoord)
												.attr("y", h / 6)
												.html(msg);
										}



										//console.log("currentstep",currentstep);
									} //if scope status

								} //if old and new value
							}); //scope watch


						//var hoparray=hop.split(",");

						//console.log(leftnodeid,rightnodeid);

						// if (id == "" | id == "-") {

						// } else {



						//jsonret = d3.json("/api/node/advancedSearch/" + leftnodeid + "-" + rightnodeid + "-" + hop, function(error, json) {




						

						function removesvgcontents() {

							d3.select("svg").remove();
						}

						function deccons() {
							
							//console.log("dec cons", currentstep);
							removesvgcontents();
							currentstep--;



							for (var i = jsonpointer.length-1;i >= 0; i--) {
								//console.log(jsonpointer[i],currentstep);
								if (jsonpointer[i] == currentstep) {
									break;
								}
								if(jsonpointer[i] < currentstep)
								{
									currentstep=jsonpointer[i];
									break;
								}
							}
							//console.log("dec cons", currentstep);


							var nextstepavailable = false;
							for (var i = 0; i < jsonpointer.length; i++) {
								if (jsonpointer[i] < currentstep ) {
									nextstepavailable = true;
								}
							}

							if (nextstepavailable) {
								scope.disableinccon = false;
								scope.disabledeccon = false;
							} else {
								scope.disableinccon = false;
								scope.disabledeccon = true;
							}

							constructsvg(currentstep);
						}

						function inccons() {


							//console.log("inc cons", currentstep);
							removesvgcontents();
							currentstep++;

							

							for (var i = 0; i < jsonpointer.length; i++) {
								//console.log(jsonpointer[i],currentstep);
								if (jsonpointer[i] == currentstep) {
									break;
								}
								if(jsonpointer[i] > currentstep)
								{
									currentstep=jsonpointer[i];
									break;
								}
							}
							//console.log("inc cons", currentstep);
							//console.log("inc cons", currentstep);

							var nextstepavailable = false;
							for (var i = 0; i < jsonpointer.length; i++) {

								if (jsonpointer[i] > currentstep) {
									nextstepavailable = true;
								}
							}

							if (nextstepavailable) {
								scope.disableinccon = false;
								scope.disabledeccon = false;
							} else {
								scope.disableinccon = true;
								scope.disabledeccon = false;
							}

							constructsvg(currentstep);

						}

						function constructsvg(jsonno) {

							scope.showLinkageLoading=false;
							//console.log(jsonno);
							json = scope.step4json;
							//json = jsonob;
							w = $("div.block_linkage").width()-margin.left-margin.right;
							//console.log("json", w, h);


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
							scope.showDataElement = false;
							scope.showConcept = false;
							//error = false;

							var nodeCount=json.nodes.length;
							//console.log("circle count",circle,nodeCount);

							if(nodeCount<20)
							{
								h=600;
							}
							else if(nodeCount<30)
							{
								h=700;
							}
							else if(nodeCount<60)
							{
								h=900;
							}
							else if(nodeCount<80)
							{
								h=1000;
							}
							else
							{
								h=1100;
							}

							h = h - margin.top-margin.bottom;
							//d3.select("svg").attr("width", w).attr("height", h);
							//console.log("ww", w);
						//console.log(json);
						removesvgcontents();
						svg = d3.select(".block_linkage").append("svg:svg")
						    //.attr( "preserveAspectRatio", "xMinYMid meet" )
						    .attr("width",w)
						    .attr("height",h)

						    //.attr("viewBox", "0 0 1800 1300")
						//     //.attr("style", "width: 100%; padding-bottom: 99.99%; height: 1px;")
						// rootGraphic = svg
						//     .append("g")
						//     .attr("transform", 
						//           "translate(" + margin.left + "," + margin.top + ")");

						sankey = d3.sankey()
					    .nodeWidth(8)
					    .nodePadding(4)
					    .size([w-10, h-10]);

						 path = sankey.link();
							// path = svg.append("svg:g")
							// 	.selectAll("path")
							// 	.data(json.links)
							// 	.enter().append("svg:path")
							// 	.attr("id", function(d) {
							// 		return d.source.index + "_" + d.target.index;
							// 	})
							// 	.attr("pseudo_label", function(d) {
							// 		return d.source.label + "_" + d.target.label;
							// 	})
							// 	.attr("pseudo_id", function(d) {
							// 		return d.source.id + "_" + d.target.id;
							// 	})
							// 	.attr("class", "link");

						
						sankey.nodes(json.nodes)
			                      .links(json.links)
			                      .layout(32);
						


							d3.select(window).on('resize', svgresize);


							d3.select(".btn.btn-default.pull-left.link_button1").on("click", clickreset);
							d3.select(".btn.btn-default.pull-left.link_button5").on("click", locknodes);
							d3.select(".btn.btn-default.pull-left.link_button4").on("click", hidelinks);

							d3.select("#btn_as_inccon").on("click", inccons);

							d3.select("#btn_as_deccon").on("click", deccons);	



			


                link = svg.append("g").selectAll(".link")
                              .data(json.links)
                              .enter().append("path")
                              .attr("class", "sankeyLink")
                              .attr("pseudo_label", function(d) {
									return d.source.label + "_" + d.target.label;
								})
								.attr("pseudo_id", function(d) {
									return d.source.id + "_" + d.target.id;
								})
                              .attr("d", path)
                              .style("stroke-width", 2)
                              .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
        return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });



link.append("svg:textPath")
	.attr("class", "testpath")
	.attr("startOffset", "50%")
	.attr("text-anchor", "middle")
	.attr("xlink:href", function(d) {
		return "#" + d.source + "_" + d.target;
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


// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
      return "translate(" + d.x + "," + d.y + ")"; })
      .attr("class", function(d) {
 		var labelname = "show" + d.label;
		if (d.id == leftnodeid) {
			rootnodelabell = d.label;

		} else if (d.id == rightnodeid) {
			rootnodelabelr = d.label;

		} else {
			scope[labelname] = true;
		}
		return "node " + d.label;
	})
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
      this.parentNode.appendChild(this); })
      .on("drag", dragmove));
// add the link to node
node.append("svg:a")
	.attr("xlink:href", function(d) {
		return "/#/linkage/" + d.id;
	})
	
// add the rectangles for the nodes
  	  .append("svg:rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) {
         return d.color = d3.rgb(nodeColors[d.label[0]]);})
      .style("stroke", function(d) { 
        return d3.rgb(d.color).darker(2); })
      .append("title")
      .text(function(d) { 
        return d.name + "\n" + format(d.value); });
       

//add in the title for the nodes
node.append("svg:text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < w / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");


							//For tooltip
							var div = d3.select("body").append("div")
								.attr("class", "tooltip")
								.style("opacity", 0);



							
							//.on("mouseover", linkmouseover);

							// if (!scope.$$phase) {
							// 	scope.$apply();
							// }

							// clickreset();

							// svg.style("opacity", 1e-6)
							// 		  .transition()
							// 		    .duration(1000)
							// 		    .style("opacity", 1);

							//} //else json undefined


						} //create svg

						function dragmove(d) {
                                    d3.select(this).attr("transform", 
                                        "translate(" + (
                                            d.x = Math.max(0, Math.min(w - d.dx, d3.event.x))
                                        )
                                        + "," + (
                                            d.y = Math.max(0, Math.min(h - d.dy, d3.event.y))
                                        ) + ")");
                                    sankey.relayout();
                                    link.attr("d", path);
                              }
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
						// function tick() {

						// 	w = $("svg").outerWidth();
						// 	h = $("svg").outerHeight();


						// 	circle.attr("cx", function(d) {
						// 		return d.x = Math.max(rcent + 2, Math.min(w - rcent - 2, d.x));
						// 	})
						// 		.attr("cy", function(d) {
						// 			return d.y = Math.max(rcent + 2, Math.min(h - rcent - 2, d.y));
						// 		});


						// 	path.attr("d", function(d) {
						// 		var dx = d.target.x - d.source.x,
						// 			dy = d.target.y - d.source.y,
						// 			dr = Math.sqrt(dx * dx + dy * dy),
						// 			theta = Math.atan2(dy, dx) + Math.PI / 100, //orientation of the arrow
						// 			d90 = Math.PI / 2,
						// 			dtxs = d.target.x - 10 * Math.cos(theta), //distance of arrow from the node
						// 			dtys = d.target.y - 10 * Math.sin(theta);
						// 		//return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0 1," + d.target.x + "," + d.target.y + "A" + dr + "," + dr + " 0 0 0," + d.source.x + "," + d.source.y + "M" + dtxs + "," + dtys +  "l" + (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "L" + (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "z";
						// 		return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y + "M" + dtxs + "," + dtys + "l" + (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "L" + (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "z";
						// 		//return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y +"m0,-5l10,0l0,5z";
						// 		//return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y + "A" + dr + "," + dr + " 0 0 0," + d.source.x + "," + d.source.y + "M" + dtxs + "," + dtys +  "l" + (3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (-3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "L" + (dtxs - 3.5 * Math.cos(d90 - theta) - 10 * Math.cos(theta)) + "," + (dtys + 3.5 * Math.sin(d90 - theta) - 10 * Math.sin(theta)) + "z";
						// 	})
						// 		.style("fill", "#8D8D91");



						// 	d3.selectAll(".testpath")
						// 		.html(function(d) {

						// 			var relationship_label=d.type;
						// 			relationship_label=relationship_label.replace(/_/g, ' ');
						// 			relationship_label=relationship_label.toLowerCase();
						// 			relationship_label=relationship_label.replace(/\w\S*/, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

						// 			if (d.target.x < d.source.x) {

						// 				if (d.source.id == id) {
						// 					return "&#8592;" + relationship_label + "&#8592;";
						// 				} else {
						// 					return "&#8592;" + relationship_label + "&#8592;";
						// 				}
						// 			} else {
						// 				//return 'rotate(0)';

						// 				if (d.source.id == id) {
						// 					return "&#8594;" + relationship_label + "&#8594;";
						// 				} else {
						// 					return "&#8594;" + relationship_label + "&#8594;";
						// 				}
						// 			}
						// 		})
						// 		.text(function(d) {

						// 			var relationship_label=d.type;
						// 			relationship_label=relationship_label.replace(/_/g, ' ');
						// 			relationship_label=relationship_label.toLowerCase();
						// 			relationship_label=relationship_label.replace(/\w\S*/, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

						// 			if (d.target.x < d.source.x) {

						// 				if (d.source.id == id)
						// 				{
						// 					return "\u27F5"+relationship_label+"\u27F5";
						// 				}
						// 				else
						// 				{
						// 					return "\u27F5"+relationship_label+"\u27F5";
						// 				}
						// 			} else {
						// 				//return 'rotate(0)';

						// 				if (d.source.id == id)
						// 				{
						// 					return "\u27F6"+relationship_label+"\u27F6";
						// 				}
						// 				else
						// 				{
						// 					return "\u27F6"+relationship_label+"\u27F6";
						// 				}
						// 			}
						// 		});

						// 	var labeloverlaparr = [];
						// 	var i = 0;
						// 	var offset = false;

						// 	var offsettracker = [];

						// 	path_label.attr('transform', function(d) {


						// 		var tokens = d.source.x + "-" + d.source.y + "-" + d.target.x + "-" + d.target.y;
						// 		var tokent = d.target.x + "-" + d.target.y + "-" + d.target.x + "-" + d.target.y;
						// 		//token ="ss";
						// 		var found1 = jQuery.inArray(tokens, labeloverlaparr);
						// 		var found2 = jQuery.inArray(tokent, labeloverlaparr);

						// 		// var nonrootid;

						// 		// if(d.source.id==leftnodeid | d.source.id==rightnodeid)
						// 		// {
						// 		// 	nonrootid=d.target.id;
						// 		// }
						// 		// else
						// 		// {
						// 		// 	nonrootid=d.source.id;
						// 		// }

						// 		//console.log("idsinpath raw",d.source.id+"-"+d.target.id);

						// 		var idsinpath, idsinpathreverse;

						// 		if (d.source.id < d.target.id) {

						// 			//console.log("less");
						// 			idsinpath = d.source.id + "-" + d.target.id;
						// 			idsinpathreverse = d.target.id + "-" + d.source.id;
						// 		} else {
						// 			//console.log("more");
						// 			idsinpath = d.target.id + "-" + d.source.id;
						// 			idsinpathreverse = d.source.id + "-" + d.target.id;
						// 		}

						// 		//console.log("idsinpath",idsinpath);

						// 		if (found1 < 0 & found2 < 0) {
						// 			labeloverlaparr[i] = d.source.x + "-" + d.source.y + "-" + d.target.x + "-" + d.target.y;

						// 			i++;
						// 		} else {


						// 			offset = true;
						// 			offsetstep++;



						// 			//console.log(offsetstep);
						// 		}

						// 		offsettracker.push(idsinpath);
						// 		//console.log(offsettracker);

						// 		var num = 0;

						// 		offsettracker.forEach(function(d1, i) {
						// 			if (d1 == idsinpath | d1 == idsinpathreverse)
						// 				num++;

						// 		});
						// 		//console.log(idsinpath,num);
						// 		offsetstep = num - 1;

						// 		if (num > 0) {
						// 			offset = true;
						// 		}


						// 		//console.log(idsinpath,offsetstep);
						// 		//return 'translate(' + d.source.x + ',' + d.source.y + );


						// 		if (d.target.x < d.source.x) {


						// 			midx = (d.source.x + d.target.x) / 2;
						// 			midy = (d.source.y + d.target.y) / 2;

						// 			if (offset) {
						// 				offset = false;

						// 				return 'translate(0,' + (10 * offsetstep) + ') rotate(180 ' + midx + ' ' + midy + ') ';
						// 			} else
						// 				return 'rotate(180 ' + midx + ' ' + midy + ') ';
						// 		} else {
						// 			if (offset) {
						// 				offset = false;

						// 				return 'translate(0,' + (10 * offsetstep) + ') rotate(0)';
						// 			} else
						// 				return 'rotate(0)';
						// 		}


						// 	});

						// 	text.attr("transform", function(d) {
						// 		return "translate(" + d.x + "," + d.y + ")";
						// 	});
						// 	force.size([w, h]);
						// 	//force.start();
						// 	//console.log(w,h);
						// }

						function dblclick(d) {
							d.fixed = false;
							d3.select(this).classed("fixed", false);
						}


						function locknodes(lock) {

							if (lock == "lock") {
								d3.selectAll("rect").classed("fixed", true);
								d3.select(".btn.btn-default.pull-left.link_button5").classed("active", true);
								i = 0;
								for (n in json.nodes) {
									//alert(n.id);
									json.nodes[i].fixed = true;
									i++;

								}

								togglefixnodes = false;

							}
							else if(lock == "unlock") 
							{
								d3.selectAll("rect").classed("fixed", false);
								d3.select(".btn.btn-default.pull-left.link_button5").classed("active", false);
								i = 0;
								for (n in json.nodes) {
									//alert(n.id);
									json.nodes[i].fixed = false;
									i++;

								}

								togglefixnodes = true;
							}
							else {

								if (togglefixnodes) {

									d3.selectAll("rect").classed("fixed", true);
									d3.select(".btn.btn-default.pull-left.link_button5").classed("active", true);
									i = 0;
									for (n in json.nodes) {
										//alert(n.id);
										json.nodes[i].fixed = true;
										i++;

									}

									togglefixnodes = false;
								} else {

									d3.selectAll("rect").classed("fixed", false);
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

							d3.selectAll("rect").classed("fixed", false);
							//togglefixnodes=true;
							d3.select("#btn_as_lock").classed("active", false);
							locknodes("unlock");
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

							d3.selectAll("path").attr("visibility", "visible");
							d3.selectAll("text.path_label").attr("visibility", "visible");
							d3.select("#btn_as_hide").classed("active", false);
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
								Tag: true,
								Concept: true,
								DataElement: true
							};

							scope.disableHideLines = false;
							//scope.$apply();


							if (!scope.$$phase) {
								scope.$apply();
							}
						}

						function hidelinks(x) {

							if (x == "hide") {
								d3.selectAll("link").attr("visibility", "hidden");
							//	d3.selectAll("path").attr("visibility", "hidden");
								d3.select("#btn_as_hide").classed("active", true);

								togglehidelinks = false;

							} else if (x == "show") {
								d3.selectAll("link").attr("visibility", "visible");
								//d3.selectAll("path").attr("visibility", "visible");
								//d3.select("#btn_lv_hide").classed("active", true);

								//togglehidelinks = false;

							} else {
								if (togglehidelinks) {
									d3.selectAll("link").attr("visibility", "hidden");
									//d3.selectAll("text.path_label").attr("visibility", "hidden");
									d3.select("#btn_as_hide").classed("active", true);

									togglehidelinks = false;
								} else {
									d3.selectAll("link").attr("visibility", "visible");
									//d3.selectAll("text.path_label").attr("visibility", "visible");
									d3.select("#btn_as_hide").classed("active", false);
									togglehidelinks = true;
								}

							}



						}

						function svgresize() {
							
							w = $("div.block_linkage").width()-margin.left-margin.right;
							//h= $("div.block_linkage").outerHeight();
						
							d3.select("svg").attr("width", w).attr("height",h);
							sankey.relayout()
						

							//alert("aa");
		


						
							//force.start();

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

							if (firstuncheck == 1 && !scope.disableHideLines) {
								hidelinks("show");
								//console.log("first show");
							}

							if (allunchecked) {
								scope.disableHideLines = true;
							} else {
								scope.disableHideLines = false;
								d3.select("#btn_as_hide").classed("active", false);
								togglehidelinks = true;
							}

							var showflg;

							if (flg == true) {
								showflg = 'visible';
							} else {
								showflg = 'hidden';
							}

							d3.selectAll("g.node." + nodetype)
								.attr("visibility", function(d) {

									if (d.id == leftnodeid) {
										//return showflg;	
									} else if (d.id == rightnodeid) {
										//return showflg;	
									} else {
										return showflg;
									}


								});

							// d3.selectAll("link.nodetext." + nodetype)
							// 	.attr("visibility", function(d) {

							// 		if (d.id == leftnodeid) {
							// 			//return showflg;	
							// 		} else if (d.id == rightnodeid) {
							// 			//return showflg;	
							// 		} else {
							// 			return showflg;
							// 		}


							// 	});



							if (!flg) {

								d3.selectAll("path.sankeyLink[pseudo_label*=\"" + nodetype + "\"]")
									.attr("visibility", function(d) {


										var sourcenodelabel = d.source.label;
										var targetnodelabel = d.target.label;
										var sourcenodeid = d.source.id;
										var targetnodeid = d.target.id;

										var sourceyes = false;
										var targetyes = false;
										//var i=0;
										angular.forEach(scope.checkModel, function(value, key) {

											//console.log("**********",value,key);
											if (!value & key == sourcenodelabel) {
												sourceyes = true;

											}
											if (!value & key == targetnodelabel) {
												targetyes = true;

											}
										});



										if (sourceyes | targetyes) {

											if (sourceyes & targetyes) {

												return "hidden";
											}
											if (sourceyes & !targetyes & (sourcenodeid == leftnodeid | sourcenodeid == rightnodeid)) {

												return "visible";
											}
											if (!sourceyes & targetyes & (targetnodeid == leftnodeid | targetnodeid == rightnodeid)) {

												return "visible";
											} else {

												return "hidden";
											}


										}


									});


								//var i=0;
								d3.selectAll("text[pseudo_label*=\"" + nodetype + "\"]")
									.attr("visibility", function(d) {


										var sourcenodelabel = d.source.label;
										var targetnodelabel = d.target.label;
										var sourcenodeid = d.source.id;
										var targetnodeid = d.target.id;

										var sourceyes = false;
										var targetyes = false;
										//var i=0;
										angular.forEach(scope.checkModel, function(value, key) {

											//console.log("**********",value,key);
											if (!value & key == sourcenodelabel) {
												sourceyes = true;
												//console.log("left",key,value,leftnodelabel);
											}
											if (!value & key == targetnodelabel) {
												targetyes = true;
												//console.log("right",key,value,rightnodelabel);
											}
										});

										if (sourceyes | targetyes) {

											if (sourceyes & targetyes) {

												return "hidden";
											}
											if (sourceyes & !targetyes & (sourcenodeid == leftnodeid | sourcenodeid == rightnodeid)) {

												return "visible";
											}
											if (!sourceyes & targetyes & (targetnodeid == leftnodeid | targetnodeid == rightnodeid)) {

												return "visible";
											} else {

												return "hidden";
											}


										}


									});



							}

							if (flg) {


								d3.selectAll("path.sankeyLink[pseudo_label*=\"" + nodetype + "\"]")
									.attr("visibility", function(d) {
										var sourcenodelabel = d.source.label;
										var targetnodelabel = d.target.label;
										var sourcenodeid = d.source.id;
										var targetnodeid = d.target.id;

										var sourceyes = false;
										var targetyes = false;
										//var i=0;
										angular.forEach(scope.checkModel, function(value, key) {

											//console.log("**********",value,key);
											if (value & key == sourcenodelabel) {
												sourceyes = true;
												//console.log("left",key,value,leftnodelabel);
											}
											if (value & key == targetnodelabel) {
												targetyes = true;
												//console.log("right",key,value,rightnodelabel);
											}
										});


										if (sourceyes | targetyes) {

											if (sourceyes & targetyes) {

												return "visible";
											}
											if (!sourceyes & targetyes & (sourcenodeid == leftnodeid | sourcenodeid == rightnodeid)) {

												return "visible";
											}
											if (sourceyes & !targetyes & (targetnodeid == leftnodeid | targetnodeid == rightnodeid)) {

												return "visible";
											} else {

												return "hidden";
											}


										}

									});
								d3.selectAll("text[pseudo_label*=\"" + nodetype + "\"]")
									.attr("visibility", function(d) {
										var sourcenodelabel = d.source.label;
										var targetnodelabel = d.target.label;
										var sourcenodeid = d.source.id;
										var targetnodeid = d.target.id;

										var sourceyes = false;
										var targetyes = false;
										//var i=0;
										angular.forEach(scope.checkModel, function(value, key) {

											//console.log("**********",value,key);
											if (value & key == sourcenodelabel) {
												sourceyes = true;
												//console.log("left",key,value,leftnodelabel);
											}
											if (value & key == targetnodelabel) {
												targetyes = true;
												//console.log("right",key,value,rightnodelabel);
											}
										});


										if (sourceyes | targetyes) {

											if (sourceyes & targetyes) {

												return "visible";
											}
											if (!sourceyes & targetyes & (sourcenodeid == leftnodeid | sourcenodeid == rightnodeid)) {

												return "visible";
											}
											if (sourceyes & !targetyes & (targetnodeid == leftnodeid | targetnodeid == rightnodeid)) {

												return "visible";
											} else {

												return "hidden";
											}


										}

									});



							}



						}


						function linkmouseover(d) {

							//alert(d3.select(this).attr("testattr"));

						}

						function dragstart(d) {
							d3.select(this).classed("fixed", true);
							//d3.select(this).attr("class","node fixed");
							d.fixed = true;
						}

						//}); //jsonret get json from neo4j

						//} //else id=blank	



					}); //doument ready



				}, //link

				template: '<img class="img-responsive linkage_empty" id="defaultimg" src="img/rel_explorer_empty_bg.png" ng-show="showImage"/>' +
				'<img class="img-responsive linkage_empty" id="defaultimg" src="img/ajax-loader.gif" ng-show="showLinkageLoading"/>'

			} //directive function return
		} //function under directive
	]); //directive