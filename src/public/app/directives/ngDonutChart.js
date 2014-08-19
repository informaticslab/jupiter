angular.module('apolloApp')
	.directive('ngDonutChart', [

		function() {
			return {

				//restrict: 'E',
				scope: {
					percent: '@attributePercent',
					newload: '@attributeNewload'
					//totvalidatearr: '='
				},
				link: function(scope, element, attrs) {

					//console.log("nodetype" + scope.nodetype + "*");

					var nodetype = scope.nodetype;
					console.log("new load",scope.newload);
					scope.$watch(
						function() {
							return scope.newload;
						},
						function(newValue, oldValue) {
							if (newValue !== oldValue) {

								console.log("new load on change",scope.newload);

								if (scope.percent) {



									var arcpercent = scope.percent / 100;

									console.log("nodetypoe" + nodetype + "*" + arcpercent);

									var width = 100,
										height = 100,
										τ = 2 * Math.PI; // http://tauday.com/tau-manifesto

									var arc = d3.svg.arc()
										.innerRadius(30)
										.outerRadius(50)
										.startAngle(0);

									var svg = d3.select("#" + nodetype).append("svg")
										.attr("width", width)
										.attr("height", height)
										.append("g")
										.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

									svg.append("text")
									.attr("transform","translate(0,9)")
									.attr("style","stroke:#3598db;fill:#3598db;")
									.attr("class","donut_text")
									.text(scope.percent+"%");

									var background = svg.append("path")
										.datum({
											endAngle: τ
										})
										.style("fill", "#E0E0E0")
										.attr("d", arc);

									var foreground = svg.append("path")
										.datum({
											endAngle: 0 * τ
										})
										.style("fill", "#A7C5BD")
										.attr("d", arc);

									foreground.transition()
										.delay(200)
										.duration(750)
										.call(arcTween, arcpercent * τ);

									

									function arcTween(transition, newAngle) {

										transition.attrTween("d", function(d) {
											var interpolate = d3.interpolate(d.endAngle, newAngle);

											return function(t) {

												d.endAngle = interpolate(t);
												return arc(d);
											};
										});
									}

								}
							}
						}
					);




				}
			}
		}
	]);