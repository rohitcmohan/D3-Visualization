// on click update
var update = function(varData) {

    //New values for dataset
    if(varData == 'Deaths')
      dataset = data.map(function(a) {return a.deaths;});
    if(varData == 'Rural')
      dataset = data.map(function(a) {return a.rural;});
    if(varData == 'Popden')
      dataset = data.map(function(a) {return a.popden;});
    if(varData == 'Temperature')
      dataset = data.map(function(a) {return a.temp;});
    if(varData == 'Drivers')
      dataset = data.map(function(a) {return a.drivers;});
    if(varData == 'Fuel')
      dataset = data.map(function(a) {return a.fuel;});

    change_bins(numBin, dataset)
    // d3.selectAll("rect").remove()
  	// d3.selectAll("text").remove()
    // var numBin = 10
    // var bins = d3.layout.histogram()
    //     .bins(numBin)
    //     (dataset);
    // var max_check = bins.map(function(a) {return a.length;});
    // var max = Math.max(...max_check)
    // var scale = h/(max*2)
    //
    // reset(scale, max)
    //
    // //Update all rects
    // // svg.selectAll("rect")
    // //    .data(bins)
    // //    .transition()
    // //    .duration(1000)
    // //    .attr("y", function(d) {
    // //       return h - (d.length * scale);
    // //    })
    // //    .attr("height", function(d) {
    // //       return (d.length * scale);
    // //    })
    // //    .attr("fill", function(d) {
    // //     return "rgb(0, 0, " + (d.length * 10) + ")";
    // //    });
    // //
    // //  svg.selectAll("text")
    // //     .data(bins)
    // //     .transition()
    // //     .duration(1000)
    // //     .text(function(d) {
    // //        return d.x;
    // //     });
    // svg.selectAll("rect")
    //    .data(bins)
    //    .enter()
    //    .append("rect")
    //    .attr("x", function(d, i) {
    //       return i * (w / bins.length) / 2;
    //    })
    //    .attr("y", function(d) {
    //       return h;
    //    })
    //    .attr("width", (w / bins.length - barPadding) / 2)
    //    .attr("height", function(d) {
    //       return 0;
    //    })
    //    .style('opacity', 0)
    //    .attr("fill", function(d) {
    //      return "rgb(0, 0, " + (d.x * 10) + ")";
    //     })
    //   .transition()
    //     .delay(function(d, i) { return i * 50 })
    //     .duration(1000)
    //     .attr("y", function(d) {
    //        return h - (d.length * scale);
    //     })
    //     .attr('height', function(d) { return (d.length * scale); })
    //     .style('opacity', 0.4 );
    //
    //   svg.selectAll("text")
    //      .data(bins)
    //      .enter()
    //      .append("text")
    //      .text(function(d) {
    //         return d.x;
    //      })
    //      .attr("text-anchor", "middle")
    //      .attr("x", function(d, i) {
    //         return i * (w / bins.length) / 2 + (w / bins.length - barPadding) /4;
    //      })
    //      .attr("y", function(d) {
    //         return h - 2;
    //      })
    //      .attr("font-family", "sans-serif")
    //      .attr("font-size", "11px")
    //      .style("font-weight", "bold")
    //      .attr("fill", "black");
  };
