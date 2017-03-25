// Loading data
$.ajax({
    url: "data/road.csv",
    async: false,
    success: function (csvd) {
        data = $.csv.toObjects(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete
    }
});

//data = data.slice(100, 125)

var barPadding = 2;

// Create SVG element
var svg = d3.select("svg"),
  w = +svg.attr("width"),
  h = +svg.attr("height");

console.log(data)
//var states = data.map(function(a) {return a.state;});
var dataset = data.map(function(a) {return a.temp;});
var numBin = 15

var change_bins = function(numBin, dataset) {
  var x = 0
  var y = 0
  d3.selectAll("g").remove()
  d3.selectAll(".link").remove()
  d3.selectAll(".node").remove()
  //d3.selectAll("svg").remove()
  // var w = 1800;
  // var h = 600;
  // var barPadding = 2;
  //
  // //Create SVG element
  // var svg = d3.select("body")
  //       .append("svg")
  //       .attr("width", w)
  //       .attr("height", h);
  //

  var svg = d3.select("svg"),
    w = +svg.attr("width"),
    h = +svg.attr("height");
    h = Math.min(h, 600)
  //console.log(Math.max(...dataset))

  //Bin the dataset
  var bins = d3.layout.histogram()
      .bins(numBin)
      (dataset);

  var max_check = bins.map(function(a) {return a.length;});
  var max = Math.max(...max_check)
  var scale = h/(max*2)
  d3.selectAll("rect").remove()
  d3.selectAll("text").remove()

  //Bar Chart enter
  svg.selectAll("rect")
     .data(bins)
     .enter()
     .append("rect")
     .attr("x", function(d, i) {
        return i * (w / bins.length) * 0.9;
     })
     .attr("y", function(d) {
        return h;
     })
     .attr("width", (w / bins.length - barPadding) * 0.9)
     .attr("height", function(d) {
        return 0;
     })
     .style('opacity', 0)
     .attr("fill", function(d) {
       return "rgb(20 ,20 , " + (d.y * 10) + ")";
      })
    .transition()
      .delay(function(d, i) { return i * 2 })
      .duration(1000)
      .attr("y", function(d) {
         return h - (d.length * scale);
      })
      .attr('height', function(d) { return (d.length * scale); })
      .style('opacity', 0.4 );

  svg.selectAll("text")
     .data(bins)
     .enter()
     .append("text")
     .text(function(d) {
        return Math.floor(d.x);
     })
     .attr("text-anchor", "middle")
     .attr("x", function(d, i) {
        return i * (w / bins.length) * 0.9 + (w / bins.length - barPadding) * 0.45;
     })
     .attr("y", function(d) {
        return h - 2;
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .style("font-weight", "bold")
     .attr("fill", "black");

     //D3 Tip
     var tip = d3.tip()
               .attr('class', 'd3-tip')
               .offset([-20, 10])
               .html(function(d, i) {
                 d = bins[i].length
                 s = Math.floor(bins[i].x)
                 e = Math.ceil(bins[i].x + bins[i].dx)
                 return "<span class='start'>Range: <b>"+s+" - "+e+"</b></span>"+
                 "<br/><span class='data_size'>No. of values: <b>"+d+"</b></span>"
               })
               svg.call(tip);
  //Mouseover
  d3.selectAll("rect")
     .on("mouseover", function(d, i) {
         index = i
         svg.selectAll("rect")
         .transition()
         .delay(function(d, i) { return i * 20 })
         .attr("x", function(d, i) {
            return (i>index)?i * (w / bins.length) * 0.9 + ((w / bins.length -
              barPadding)* 0.9) :i * (w / bins.length) * 0.9;
         })
         .attr("y", function(d, i) {
            return (i == index)?h - (d.length * 1.5 * scale):h - (d.length * scale);
         })
         .attr("height", function(d, i) {
            return (i == index)?d.length * 1.5 * scale:d.length * scale;
         })
         .attr("width", function(d, i) {
           return (i == index)?(w / bins.length - barPadding) * 1.8 :(w / bins.length
             - barPadding) * 0.9;
         })
         .style('opacity', function(d, i) {
           return (i == index)?1:0.5;
         });
         tip.show(d, i)

         svg.selectAll("text")
            .data(bins)
            .transition()
            .delay(function(d, i) { return i * 20 })
            .attr("x", function(d, i) {
               return (i>index)?i * (w / bins.length) * 0.9 + (w / bins.length - barPadding)
               * 0.45 + ((w / bins.length - barPadding)* 0.9) : i * (w / bins.length) * 0.9 +
               (w / bins.length - barPadding) * 0.45;
            })
     })
     .on("mouseout", function(d, i) {
       index = i
        svg.selectAll("rect")
        .transition()
        .delay(function(d, i) { return i * 20 })
        .attr("x", function(d, i) {
           return i * (w / bins.length) * 0.9;
        })
        .attr("y", function(d, i) {
           return h - (d.length * scale);
        })
        .attr("height", function(d, i) {
           return d.length * scale;
        })
        .attr("width", function(d, i) {
          return (w / bins.length - barPadding) * 0.9;
        })
        .style('opacity', 0.4);
        tip.hide(d, i)

        svg.selectAll("text")
           .data(bins)
           .transition()
           .delay(function(d, i) { return i * 20 })
           .attr("x", function(d, i) {
              return i * (w / bins.length) * 0.9 + (w / bins.length - barPadding) * 0.45;
           })
         });


   // Mouse drag
   d3.select("body")
     .on("mousedown", function() {
       x = d3.event.x, y = d3.event.y
     svg.call(drag);
     })

   var drag = d3.behavior.drag()
     .on("drag", function(d) {
       var xx = d3.event.x, yy = d3.event.y

       bin = numBin + ((x - xx)/1000 * numBin)
       bin = Math.max(1, bin)

       change_bins(bin, dataset)
     });
};

change_bins(numBin, dataset)

  var id1 = 'Deaths'
  var id2 = 'Rural'
  var id3 = 'Popden'
  var id4 = 'Temperature'
  var id5 = 'Drivers'
  var id6 = 'Fuel'

  d3.select("#optsBar")
    .on("change", function() {
      var varData = eval(d3.select(this).property('value'));
      update(varData);
    });
