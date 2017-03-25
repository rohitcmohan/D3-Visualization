var w = 400, h = 400, r = 200, color = d3.scale.category20c();
data = [{"label":"apples", "count":20},
        {"label":"bananas", "count":50},
        {"label":"pears", "count":30}];

var vis = d3.select("body")
    .append("svg:svg")
  .data([data])
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + r + "," + r + ")")
var arc = d3.svg.arc()
    .outerRadius(r);
var pie = d3.layout.pie()
  .value(function(d) { return d.count; });
var arcs = vis.selectAll("g.slice")
  .data(pie)
  .enter().append("svg:g")
        .attr("class", "slice");
arcs.append("svg:path")
  .attr("fill", function(d, i) { return color(i); } )
  .attr("d", arc)
  .append("svg:title") // TITLE APPENDED HERE
    .text(function(d) { return d.value; });
arcs.append("svg:text")
  .attr("transform", function(d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";
    })
  .attr("text-anchor", "middle")
  .text(function(d, i) { return data[i].label; });

  // text add
  // svg.selectAll("text")
  //    .data(dataset)
  //    .enter()
  //    .append("text")
  //    .text(function(d) {
  //       return d;
  //    })
  //    .attr("text-anchor", "middle")
  //    .attr("x", function(d, i) {
  //       return i * (w / dataset.length) + (w / dataset.length - barPadding) / 4;
  //    })
  //    .attr("y", function(d) {
  //       return h - (d * 4) + 14;
  //    })
  //    .attr("font-family", "sans-serif")
  //    .attr("font-size", "11px")
  //    .attr("fill", "white");


  // on click change val
  // d3.select("p")
  //   .on("click", function() {
  //
  //     //New values for dataset
  //     dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
  //           5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];
  //
  //     //Update all rects
  //     svg.selectAll("rect")
  //        .data(dataset)
  //        .transition()
  //        .duration(1000)
  //        .attr("y", function(d) {
  //           return h - (d * 4);
  //        })
  //        .attr("height", function(d) {
  //           return (d * 4);
  //        })
  //        .attr("fill", function(d) {
  //         return "rgb(0, 0, " + (d * 10) + ")";
  //        });
  //
  //     //Update all labels
  //     svg.selectAll("text")
  //        .data(dataset)
  //        .transition()
  //        .duration(1000)
  //        .text(function(d) {
  //           return d;
  //        })
  //        .attr("x", function(d, i) {
  //           return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
  //        })
  //        .attr("y", function(d) {
  //           return h - (d * 4) + 14;
  //        });
  //   });

  // //Width and height
  // var w = 1000;
  // var h = 200;
  // var barPadding = 1;
  //
  // var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
  //         11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
  //
  // //Create SVG element
  // var svg = d3.select("body")
  //       .append("svg")
  //       .attr("width", w)
  //       .attr("height", h);
  //
  // svg.selectAll("rect")
  //    .data(dataset)
  //    .enter()
  //    .append("rect")
  //    .attr("x", function(d, i) {
  //       return i * (w / dataset.length) / 2 + 50;
  //    })
  //    .attr("y", function(d) {
  //       return 0;
  //    })
  //    .attr("width", (w / dataset.length - barPadding) / 2)
  //    .attr("height", function(d) {
  //       return 0;
  //    })
  //    .style('opacity', 0)
  //    .attr("fill", function(d) {
  //      return "rgb(0, 0, " + (d * 10) + ")";
  //     })
  //   .transition()
  //     .delay(function(d, i) { return i * 50 })
  //     .duration(1000)
  //     .attr("y", function(d) {
  //        return h - (d * 4);
  //     })
  //     .attr('height', function(d) { return (d * 4); })
  //     .style('opacity', 0.5 );
  //
  // var tip = d3.tip()
  //             .attr('class', 'd3-tip')
  //             .offset([-20, 12])
  //             .html(function(d, i) {
  //               data = dataset[i]
  //               return "<span class='data'>"+data+"</span>"
  //             })
  //             svg.call(tip);
  //
  // d3.selectAll("rect")
  //   .on("mouseover", function(d, i) {
  //       index = i
  //       d3.select(this)
  //       .transition()
  //       .style('opacity', 1)
  //       .attr("y", function(d) {
  //          return h - (d * 8);
  //       })
  //       .attr("height", function(d) {
  //          return (d * 8);
  //       })
  //       .attr("width", w / dataset.length - barPadding)
  //       //.attr("fill", "orange");
  //       svg.selectAll("rect")
  //       .attr("x", function(d, i) {
  //          return (i>index)?i * (w / dataset.length) / 2 + ((w / dataset.length - barPadding)/4) +50 :i * (w / dataset.length) / 2 - ((w / dataset.length - barPadding)/4) + 50;
  //       })
  //       tip.show(d, i)
  //   })
  //   .on("mouseout", function(d, i) {
  //     index = i
  //     d3.select(this)
  //      .transition()
  //      .style('opacity', 0.5)
  //      .attr("y", function(d) {
  //        return h - (d * 4);
  //      })
  //      .attr("height", function(d) {
  //        return (d * 4);
  //      })
  //      .attr("width", (w / dataset.length - barPadding) / 2)
  //      svg.selectAll("rect").attr("x", function(d, i) {
  //         return i * (w / dataset.length) / 2 + 50;
  //      })
  //      //.duration(250)
  //      tip.hide(d, i)
  //      //.attr("fill", "rgb(0, 0, " + (d * 10) + ")");
  //   });

  // transition
  // d3.select(this)
  // .transition()
  // .style('opacity', 1)
  // .attr("y", function(d) {
  //    return h - (d * 8);
  // })
  // .attr("height", function(d) {
  //    return (d * 8);
  // })
  // .attr("width", w / dataset.length - barPadding)
  //.attr("fill", "orange");

  // d3pie
  // var pie = new d3pie("pieChart", {
  // 	"header": {
  // 		"title": {
  // 			"text": "Road Accident Deaths",
  // 			"fontSize": 24,
  // 			"font": "open sans"
  // 		},
  // 		"subtitle": {
  // 			"color": "#999999",
  // 			"fontSize": 12,
  // 			"font": "open sans"
  // 		},
  // 		"titleSubtitlePadding": 9
  // 	},
  // 	"footer": {
  // 		"color": "#999999",
  // 		"fontSize": 10,
  // 		"font": "open sans",
  // 		"location": "bottom-left"
  // 	},
  // 	"size": {
  // 		"canvasWidth": 590,
  // 		"pieOuterRadius": "90%"
  // 	},
  // 	"data": {
  // 		"sortOrder": "value-desc",
  // 		"content": [
  // 			{
  // 				"label": "Go",
  // 				"value": 264131,
  // 				"color": "#5a378f"
  // 			},
  // 			{
  // 				"label": "Groovy",
  // 				"value": 218812,
  // 				"color": "#546e91"
  // 			},
  // 			{
  // 				"label": "Processing",
  // 				"value": 157618,
  // 				"color": "#8bde94"
  // 			},
  // 			{
  // 				"label": "Smalltalk",
  // 				"value": 114384,
  // 				"color": "#d2ab58"
  // 			},
  // 			{
  // 				"label": "Scala",
  // 				"value": 95002,
  // 				"color": "#273c71"
  // 			},
  // 			{
  // 				"label": "Visual Basic",
  // 				"value": 78327,
  // 				"color": "#98bf6e"
  // 			},
  // 			{
  // 				"label": "Scheme",
  // 				"value": 67706,
  // 				"color": "#4caa4a"
  // 			},
  // 			{
  // 				"label": "Rust",
  // 				"value": 36344,
  // 				"color": "#98aac5"
  // 			}
  // 		]
  // 	},
  // 	"labels": {
  // 		"outer": {
  // 			"pieDistance": 32
  // 		},
  // 		"inner": {
  // 			"hideWhenLessThanPercentage": 3
  // 		},
  // 		"mainLabel": {
  // 			"fontSize": 11
  // 		},
  // 		"percentage": {
  // 			"color": "#ffffff",
  // 			"decimalPlaces": 0
  // 		},
  // 		"value": {
  // 			"color": "#adadad",
  // 			"fontSize": 11
  // 		},
  // 		"lines": {
  // 			"enabled": true
  // 		},
  // 		"truncation": {
  // 			"enabled": true
  // 		}
  // 	},
  // 	"tooltips": {
  // 		"enabled": true,
  // 		"type": "placeholder",
  // 		"string": "{label}: {value}, {percentage}%"
  // 	},
  // 	"effects": {
  // 		"pullOutSegmentOnClick": {
  // 			"effect": "linear",
  // 			"speed": 400,
  // 			"size": 8
  // 		}
  // 	},
  // 	"misc": {
  // 		"gradient": {
  // 			"enabled": true,
  // 			"percentage": 100
  // 		}
  // 	},
  // 	"callbacks": {}
  // });
