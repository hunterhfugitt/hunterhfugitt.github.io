class Line {

  constructor(_config, _data, _County,_max) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 1000,
      containerHeight: _config.containerHeight || 600,
      margin: { top: 30, bottom: 100, right: 50, left: 50 },


    }

    this .County = _County
    this  .data = _data;
    this .max = _max
    // Call a class function
  }

  initVis() {
        let vis = this;
    
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
        vis.xValue = d => d.Year; 
        vis.yValue = d => d.Max_AQI;
        vis.yValue2 = d => d._90th_Percentile_AQI;
        vis.yValue3 = d => d.Median_AQI;
        let maxYear,minYear,maxMax_AQI,minMax_AQI;
        maxYear = d3.max(vis.data, d => d.Year);
        minYear = d3.min(vis.data, d => d.Year);
        maxMax_AQI = d3.max(vis.data, d => d.Max_AQI);
        minMax_AQI = d3.min(vis.data, d => d.Max_AQI);

        vis.xScale = d3.scaleLinear()
        .domain([minYear,maxYear]) //d3.min(vis.data, d => d.year), d3.max(vis.data, d => d.year) );
        .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
         .domain([0, maxMax_AQI])
         .range([vis.height, 0])
         .nice(); //this just makes the y axes behave nicely by rounding up  
        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale)
            .ticks(12)
            .tickSizeOuter(0)
            .tickPadding(10);
            //.tickFormat(d => d + ' km');
      
        vis.yAxis = d3.axisLeft(vis.yScale)
            .ticks(12)
            .tickSizeOuter(0)
            .tickPadding(10);
    
        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)
    
        // Append group element that will contain our actual chart (see margin convention)
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
    
        // Append empty x-axis group and move it to the bottom of the chart
        vis.xAxisG = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);
        
        // Append y-axis group
        vis.yAxisG = vis.chart.append('g')
            .attr('class', 'axis y-axis');
      vis.updateVis();
      }
    
      /**
       * Prepare the data and scales before we render it.
       */
      updateVis() {
        let vis = this
        vis.xValue = d => d.Year;
        vis.yValue = d => d.Max_AQI;
        vis.yValue2 = d => d._90th_Percentile_AQI;
        vis.yValue3 = d => d.Median_AQI;
    
        vis.line1 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue(d)))

        vis.line2 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue2(d)))

        vis.line3 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue3(d)))

            
        // Set the scale input domains
        vis.xScale.domain(d3.extent(vis.data, vis.xValue));
        vis.yScale.domain([0,vis.max]);
    
        vis.renderVis();
      }
    
      /**
       * This function contains the D3 code for binding data to visual elements
       * Important: the chart is not interactive yet and renderVis() is intended
       * to be called only once; otherwise new paths would be added on top
       */
    renderVis() {

    let vis = this;
    // Add line path
    vis.chart.append('path')
        .data([vis.data])
        .attr('class', 'chart-line')
        .attr("stroke", "purple")
        .attr('d', vis.line1)
        
    // vis.chart.append("text")
    //     .attr("x", (vis.line1.x))
    //     .attr("y", (vis.line1.y))
    //     .attr("text-anchor", "middle")  
    //     .style("font-size", "16px") 
    //     .style("text-decoration", "underline")  
    //     .text("Max AQI");

    vis.chart.append('path')
        .data([vis.data])
        .attr('class', 'chart-line')
        .attr("stroke", "red")
        .attr('d', vis.line2)


    vis.chart.append('path')
        .data([vis.data])
        .attr('class', 'chart-line')
        .attr("stroke", "orange")
        .attr('d', vis.line3)
        .text("Median AQI");
    
    // Update the axes

    vis.chart.append("text")
        .attr("x", (vis.width / 2))             
        .attr("y", 0)
        .attr("text-anchor", "middle")  
        .style("font-size", "40px") 
        .style("text-decoration", "underline")  
        .text(vis.County + " AQI data");

    vis.chart.append("text")
        .attr("x", (vis.width / 2))             
        .attr("y", 550)
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        .style("text-decoration", "underline")  
        .text("Years");

    vis.xAxisG.call(vis.xAxis);
    vis.yAxisG.call(vis.yAxis);
    
    var color_key = {Max_AQI:"red",_90th_Percentile_AQI:"orange",Median_AQI:"Yellow"}

    //this.svg()
    //     .data(color_keys)
    //     .enter()
    //     .append("rect")
    //         .attr("x", 100)
    //         .attr("y", function(d,i){ return 100 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
    //         .attr("width", size)
    //         .attr("height", size)
    //         .style("fill", d => d.value)
    // this.svg()
    //     .data(color_keys)
    //     .enter()
    //     .append("text")
    //         .attr("x", 100 + size*1.2)
    //         .attr("y", function(d,i){ return 100 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
    //         .style("fill", function(d){ return color(d)})
    //         .text(d=>d.key)
    //         .attr("text-anchor", "left")
    //         .style("alignment-baseline", "middle")

  }
}