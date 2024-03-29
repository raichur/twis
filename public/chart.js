var width = $(window).width(),
    height = $(window).height();

console.log(JSON.stringify(json));

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.09)
    .distance(150)
    .charge(-300)
    .size([width, height]);

force
    .nodes(json.nodes)
    .links(json.links)
    .start();

var link = svg.selectAll(".link")
    .data(json.links)
  .enter().append("line")
    .attr("class", "link")
  .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

var node = svg.selectAll(".node")
    .data(json.nodes)
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

node.append("circle")
    .attr("fill", function(d) { return d.color; })
    .attr("r","5");

node.append("text")
    .attr("dx", 12)
    .attr("dy", ".3em")
    .attr("font-family", "BlinkMacSystemFont")
    .text(function(d) { return d.name });

force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
});
