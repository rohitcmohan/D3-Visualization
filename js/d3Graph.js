
var idg1 = 20
var idg2 = 40
var idg3 = 60
var idg4 = 80
var idg5 = 100
var idg6 = 120

var drawGraph = function(vG){
  d3.selectAll("g").remove()
  d3.selectAll(".link").remove()
  d3.selectAll(".node").remove()
  d3.selectAll("rect").remove()
  d3.selectAll("text").remove()

  d3.selectAll("svg").remove()

  var width = 960
  var height = 800

  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .linkDistance(vG)
      .gravity(0.1)
      .charge(-150)
      .size([width, height]);

  d3.json("data/graph.json", function(error, graph) {
    if (error) throw error;

    force
    .nodes(graph.nodes)
    .links(graph.links)
    .start();

  var link = svg.selectAll(".link")
    .data(graph.links)
  .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
    .data(graph.nodes)
  .enter().append("circle")
    .attr("r", 5)
    .style("fill", function(d) { return color(d.group); })
    .attr("class", "node")
    .call(force.drag);

  force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
    });

  });
}

d3.select('#optsGraph')
  .on('change', function() {
    var varG = eval(d3.select(this).property('value'));
    console.log(varG)
    drawGraph(varG)
  })

d3.selectAll("#graph")
	.on("click", function() {
    drawGraph(80)
  });
