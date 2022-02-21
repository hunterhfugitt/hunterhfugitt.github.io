class Line_2 {

  constructor(_config, _data, _County) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 1000,
      containerHeight: _config.containerHeight || 600,
      margin: { top: 30, bottom: 100, right: 50, left: 50 },


    }
    this .County = _County
    this  .data = _data;
    // Call a class function
  }

  initVis() {
        let vis = this;
    
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
        let maxYear,minYear;
        maxYear = d3.max(vis.data, d => d.Year);
        minYear = d3.min(vis.data, d => d.Year);
        vis.xValue = d => d.Year; 
        vis.yValue = d => d.Days_CO;
        vis.yValue2 = d => d.Days_NO2;
        vis.yValue3 = d => d.Days_Ozone;
        vis.yValue4 = d => d.Days_SO2;
        vis.yValue5 = d => d.Days_PM2_5;
        vis.yvalue6 = d => d.Days_PM10;
        vis.yValue7 = d => 365 - d.Days_CO - d.Days_NO2 - d.Days_Ozone - d.Days_SO2 - d.Days_PM2_5 - d.Days_PM10
        
        vis.xScale = d3.scaleLinear()
        .domain([minYear,maxYear]) //d3.min(vis.data, d => d.year), d3.max(vis.data, d => d.year) );
        .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
         .domain([0, 365])
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
        vis.yValue = d => d.Days_CO;
        vis.yValue2 = d => d.Days_NO2;
        vis.yValue3 = d => d.Days_Ozone;
        vis.yValue4 = d => d.Days_SO2;
        vis.yValue5 = d => d.Days_PM2_5;
        vis.yValue6 = d => d.Days_PM10;
        vis.yValue7 = d => 365 - d.Days_CO - d.Days_NO2 - d.Days_Ozone - d.Days_SO2 - d.Days_PM2_5 - d.Days_PM10
        // Initialize area generator
        //365 - parseInt(d.Days_CO2) - parseInt(d.Days_NO2) - parseInt(d.Days_Ozone) - parseInt(d.Days_SO2) - parseInt(d.Days_PM2_5) - parseInt(d.Days_PM10)
    
        vis.line1 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue(d)))
        
        vis.line2 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue2(d)))

        vis.line3 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue3(d)))
        
        vis.line4 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue4(d)))
        
        vis.line5 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue5(d)))
            
        vis.line6 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue6(d)))
        
        vis.line7 = d3.line()
            .x(d => vis.xScale(vis.xValue(d)))
            .y(d => vis.yScale(vis.yValue7(d)))    
        // Set the scale input domains
        vis.xScale.domain(d3.extent(vis.data, vis.xValue));
        vis.yScale.domain([0,365]);
    
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
            .attr("stroke", "red")
            .attr('d', vis.line1)
    
        vis.chart.append('path')
            .data([vis.data])
            .attr('class', 'chart-line')
            .attr("stroke", "orange")
            .attr('d', vis.line2)
    
        vis.chart.append('path')
            .data([vis.data])
            .attr('class', 'chart-line')
            .attr("stroke", "magenta")
            .attr('d', vis.line3)
        
        vis.chart.append('path')
            .data([vis.data])
            .attr('class', 'chart-line')
            .attr("stroke", "green")
            .attr('d', vis.line4)
        vis.chart.append('path')
            .data([vis.data])
            .attr('class', 'chart-line')
            .attr("stroke", "blue")
            .attr('d', vis.line5)
        vis.chart.append('path')
            .data([vis.data])
            .attr('class', 'chart-line')
            .attr("stroke", "purple")
            .attr('d', vis.line6)
        vis.chart.append('path')
            .data([vis.data])
            .attr('class', 'chart-line')
            .attr("stroke", "black")
            .attr('d', vis.line7)
        // Update the axes
    
        vis.chart.append("text")
            .attr("x", (vis.width / 2))             
            .attr("y", 0)
            .attr("text-anchor", "middle")  
            .style("font-size", "40px") 
            .style("text-decoration", "underline")  
            .text(vis.County + " pollutant data");
        
        vis.chart.append("text")
            .attr("x", (vis.width / 2))             
            .attr("y", 550)
            .attr("text-anchor", "middle")  
            .style("font-size", "30px") 
            .style("text-decoration", "underline")  
            .text("Years");
        vis.xAxisG.call(vis.xAxis);
        vis.yAxisG.call(vis.yAxis);
      }
    }