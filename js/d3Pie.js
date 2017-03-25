d3.selectAll("#pie")
	.on("click", function(d){
		d3.selectAll("rect").remove()
		d3.selectAll("text").remove()
		//d3.selectAll("svg").remove()
	// 	var w = 2000;
	// 	var h = 400;
	// 	var radius = 100;
	 //
	// 	var color = d3.scale.ordinal()
	// 	    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	 //
	// 	var arc = d3.svg.arc()
	// 	    .outerRadius(radius - 10)
	// 	    .innerRadius(0);
	 //
	// 	var pie = d3.layout.pie()
	// 	    .sort(null)
	// 	    .value(function(d) { return d.temp; });
	 //
	// 	var svg = d3.select("body").append("svg")
	// 		.attr("width", w)
	// 		.attr("height", h)
	// 		.append("g")
	// 		.attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
	 //
	// 	d3.csv("data/road.csv", type, function(error, data) {
	// 	  if (error) throw error;
	 //
	// 		var g = svg.selectAll(".arc")
	// 				.data(pie(data))
	// 				.enter().append("g")
	// 				.attr("class", "arc")
	 //
	// 		g.append("path")
	// 		 .attr("d", arc)
	// 		 .style("fill", function(d) { return "rgb(0, 0, " + (d.temp * 10) + ")"; });
	//  });
	//  function type(d) {
	// 	 d.temp = +d.temp;
	// 	 return d;
	//  }
	var width = 960,
	height = 600,
	radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	d3.select("#optsPie")
    .on("change", function() {
      var varData = eval(d3.select(this).property('value'));
      updatePie(varData);
    });

		var updatePie = function(varData){
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

				d3.selectAll("svg").remove()
				d3.selectAll("g").remove()

			var arc = d3.svg.arc()
				.outerRadius(radius - 40)
				.innerRadius(0);

			var arcOver = d3.svg.arc()
					.outerRadius(radius - 10)
					.innerRadius(0);

			var arcIn = d3.svg.arc()
						.outerRadius(radius - 100)
						.innerRadius(0);

			var labelArc = d3.svg.arc()
				.outerRadius(radius - 80)
				.innerRadius(radius - 80);

			var pie = d3.layout.pie()
				.sort(null)
				.value(function(d) { return +d.y; });

				var svg = d3.select("body").append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


			//var dataset = data.map(function(a) {return a.temp;});
			var bins = d3.layout.histogram()
					.bins(15)
					(dataset);

				//Draw pie
				var g = svg.selectAll(".arc")
					.data(pie(bins))
					.enter().append("g")
					.attr("class", "arc");

				g.append("path")
					.attr("d", arcIn)
					.transition()
					.delay(function(d, i) { return i * 80 })
			    // .duration(200)
					.attr("d", arc)
					.style("fill", function(d) { return color(+d.data.y); });

				g.append("text")
					.text(function(d) { return ""; })
					.transition()
					.delay(function(d, i) { return i * 80 })
					.attr("transform", function(d) { return "translate(" +
						labelArc.centroid(d) + ")"; })
					.attr("dy", ".35em")
					.style("font-weight", "bold")
					.attr("font-size", "24px")
					.text(function(d) { return Math.round(d.data.y/dataset.length
						* 100)+"%"; });

				function type(d) {
					return d;
				}

				var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([40, 30])
                    .html(function(d, i) {
                      //d = dataset[i]
                      //s = states[i]
                      d = bins[i].length
                      s = Math.floor(bins[i].x)
                      e = Math.ceil(bins[i].x + bins[i].dx)
											p = d/dataset.length * 100;
											per = Math.round(p, -1);
                      return "<span class='start'>Range: <b>"+s+" - "+e+"</b></span><br/><span class='data_size'>No. of values: <b>"+d+"</b></span><br/><span class='per'>Percentage: <b>"+per+"%</b></span>"
                    })
                    svg.call(tip);

				d3.selectAll(".arc")
					.on("mouseover", function(d, i) {
						tip.show(d, i);
					})
					.on("mouseout", function(d, i) {
						tip.hide(d, i);
					});

				d3.selectAll("path")
					.on("mouseover", function(d) {
						d3.select(this).transition()
          		.duration(500)
          		.attr("d", arcOver);
					})
					.on("mouseout", function(d) {
						d3.select(this).transition()
          		.duration(500)
          		.attr("d", arc);
					})
		};
		
		updatePie('Temperature')

		d3.selectAll("#bar")
		.on("click", function(d){

		  //d3.selectAll("text").remove()
		  //d3.selectAll("svg").remove()

			numBin = 15
		  //dataset = data.map(function(a) {return a.temp;});

		  change_bins(numBin, dataset)
		});

});
