angular.module('apolloApp')
	.directive('ngForceGraph', [

		function() {
			return {

				//restrict: 'E',
				scope: {
					percent: '@attributePercent',
					nodetype: '@id',
					readytoload:'@attributeReadytoload',
					divid:'@attributeDivid',
					nodelinks:'@attributeNodelinks',
					nodes:'@attributeNodes'
					//totvalidatearr: '='
				},
				link: function(scope, element, attrs) {

					//console.log("11",scope.readytoload);

					var nodetype = scope.nodetype;

					scope.$watch(
						function() {
							return scope.readytoload;
						},
						function(newValue, oldValue) {
							//console.log("22",scope.readytoload);
							//if (newValue !== oldValue) {
							if (true) {
								


								if (scope.readytoload) {

									

									var nodesarr=eval(scope.nodes);
									var linksarr=eval(scope.nodelinks);

									var noderadius=6;
									//console.log(scope.nodelinks);
									//console.log(linksarr);

									nodesobj=[];

									nodesarr.forEach(function(d){
										var jobj=JSON.parse(d);
										//console.log(jobj);
										nodesobj.push({"id":jobj.id,"name":jobj.name,"label":jobj.label});
									});

									linksobj=[];

									linksarr.forEach(function(d){
										var jobj=JSON.parse(d);
										
										var sid = jobj.source,
										sindex = -1;
										for(var i = 0, len = nodesobj.length; i < len; i++) {
											
										    if (nodesobj[i].id === sid) {
										        sindex = i;
										        break;
										    }
										}

										var tid = jobj.target,
										tindex = -1;
										for(var i = 0, len = nodesobj.length; i < len; i++) {
										    if (nodesobj[i].id === tid) {
										        tindex = i;
										        break;
										    }
										}
										//console.log(tindex,sindex);

										linksobj.push({"source":sindex,"sourceid":jobj.source,"target":tindex,"targetid":jobj.target,"reltype":jobj.reltype});
									});
									
									var aid=nodesobj[0].id;
									var bid=nodesobj[nodesobj.length-1].id;

									var width =$("div.fg_placeholder").width();
									var height=$("div.fg_placeholder").height();

									var svg = d3.select("#"+scope.divid).append("svg")
									    .attr("width", width)
									    .attr("height", height);

									var force = d3.layout.force()
									    .gravity(.05)
									    .distance(100)
									    .charge(-100)
									    .size([width, height]);

									json={"nodes":nodesobj,"links":linksobj};
									//console.log(json);
									//d3.json("graph.json", function(error, json) {

										//console.log(json.nodes);
									  force
									      .nodes(json.nodes)
									      .links(json.links)
									      .start();

									var path1 = svg.selectAll(".link")
										//.selectAll("path")
										.data(json.links)
										.enter().append("g")
										.attr("class", "link");

										var path = path1.append("path")
													.attr("id",function(d){return aid+'_'+bid+'_'+d.sourceid+'_'+d.targetid;});

										// var tex=path1.append("text")
										// .attr("class","path_label")
										// ;
									 //      //.text(function(d) { return d.reltype });

									 //    tex.append("svg:textPath")
										// .attr("startOffset", "50%")
										// .attr("text-anchor", "middle")
										// .attr("xlink:href", function(d) {
										// 	return "#" + d.sourceid + "_" + d.targetid;
										// })
										// .text(function(d) {
										// 	return d.reltype;
										// })
										// .style("font-family", "Arial")
										// .attr("class","testpath");






									path_label = svg.append("svg:g").selectAll(".path_label")
										.data(json.links)
										.enter()
										.append("svg:text")
										.attr("class", "path_label");

									path_label.append("svg:textPath")
										.attr("class", "fg_textpath")
										.attr("startOffset", "20%")
										.attr("text-anchor", "middle")
										.attr("xlink:href", function(d) {
											return "#" + aid+'_'+bid+'_'+d.sourceid + "_" + d.targetid;
										})
										.style("font-family", "Arial")
										.text(function(d) {
											return d.reltype;
										});









									  var node = svg.selectAll(".node")
									      .data(json.nodes)
									    .enter().append("g")
									      .attr("class", "node")
									      .call(force.drag);

									  node.append("circle")
									      .attr("r", noderadius)
									      .attr("class",function(d){
									      	
									      	if(d.id==aid)
									      	{
									      		//console.log(d.id,aid,bid);
									      		return "node " + "A";
									      	}
									      	if(d.id==bid)
									      	{
									      		//console.log(d.id,aid,bid);
									      		return "node " + "B";
									      	}
									      	
									      });

									  node.append("text")
									      .attr("dx", 12)
									      .attr("dy", ".35em")
									      .text(function(d) { return d.name+' ('+d.label+' )' });



									  force.on("tick", function() {
									    // link.attr("x1", function(d) { return d.source.x; })
									    //     .attr("y1", function(d) { return d.source.y; })
									    //     .attr("x2", function(d) { return d.target.x; })
									    //     .attr("y2", function(d) { return d.target.y; });

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

									    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
									 });



								}
							}
						}
					);




				}
			}
		}
	]);