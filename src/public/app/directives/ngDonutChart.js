angular.module('apolloApp')
	.directive('ngDonutChart', [

		function() {
			return {

				//restrict: 'E',
				scope: {
					percent: '@attributePercent',
					nodetype: '@id'
					//totvalidatearr: '='
				},
				link: function(scope, element, attrs) {

					console.log("nodetype" + scope.nodetype + "*");

					var nodetype = scope.nodetype;

					scope.$watch(
						function() {
							return scope.percent;
						},
						function(newValue, oldValue) {
							if (newValue !== oldValue) {

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
										.style("fill", "#ddd")
										.attr("d", arc);

									var foreground = svg.append("path")
										.datum({
											endAngle: 0 * τ
										})
										.style("fill", "#7DB4B5")
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