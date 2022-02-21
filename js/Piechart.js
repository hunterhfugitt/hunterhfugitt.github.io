//https://www.d3-graph-gallery.com/graph/pie_annotation.html
function showPieChart(orig_data,orig_data2) {
orig_data = orig_data
orig_data2 = orig_data2
	vis = this
	// Margin object with properties for the four directions
	var width = 600
    height = 600
    margin = 60

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin
var year1;

if(orig_data.length>1)
{
  year1 = 'all';
}
else
{
  year1 = orig_data[0].Year;
}

var year2;

if(orig_data2.length>1)
{
  year2 = 'all';
}
else
{
  year2 = orig_data2[0].Year;
}

var state1 = orig_data[0].State;
var county1 = orig_data[0].County;

var state2 = orig_data2[0].State;
var county2 = orig_data2[0].County;

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#chart1")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append('g')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var full_string = county1+", "+ state1 + " year " + year1+ " air quality and pollution"
svg.append("text")
    .attr("x", 0)             
    .attr("y", -250)
    .attr("text-anchor", "middle")  
    .style("font-size", "25px") 
    .style("text-decoration", "underline")  
    .text(full_string);
// Create dummy data

// set the color scale
console.log(orig_data)
console.log(orig_data[0])
console.log(orig_data[0].Days_with_AQI)
var sum_Days_with_AQI= 0, sum_Good_Days=0, sum_Moderate_days=0, sum_Unhealthy_for_Sensitive_Groups=0, sum_Unhealthy_Days=0, sum_Very_Unhealthy_Days= 0, sum_Hazardous_Days = 0

for(let i = 0; i<orig_data.length; i++)
{
    sum_Days_with_AQI+=+orig_data[i].Days_with_AQI;
    sum_Good_Days+=+orig_data[i].Good_Days;
    sum_Moderate_days+=+orig_data[i].Moderate_Days;
    sum_Unhealthy_for_Sensitive_Groups+=+orig_data[i].Unhealthy_for_Sensitive_Groups_Days;
    sum_Unhealthy_Days+=+orig_data[i].Unhealthy_Days;
    sum_Very_Unhealthy_Days+=+orig_data[i].Very_Unhealthy_Days;
    sum_Hazardous_Days+=+orig_data[i].Hazardous_Days;
}
var Div = sum_Days_with_AQI;
var g1 = sum_Good_Days
console.log(Div)
console.log(g1)
var g2 = sum_Moderate_days
var g3 = sum_Unhealthy_for_Sensitive_Groups
var g4 = sum_Unhealthy_Days
var g5 = sum_Very_Unhealthy_Days
var g6 = sum_Hazardous_Days

var data = {Good:g1/Div, Moderate:g2/Div, Unhealthy_for_Sensitive_Groups:g3/Div, Unealthy:g4/Div, Very_Unhealthy:g5/Div, Hazardous:g6/Div} 
console.log(data)
// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
// Now I know that group A goes from 0 degrees to x degrees and so on.

const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
var color = d3.scaleOrdinal()
  .range(d3.schemeSet2);
// shape helper to build arcs:
var pie = d3.pie()
  .value(function(d) {return d[1]})
var data_ready = pie(Object.entries(data))
console.log(Object.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('mySlices')
  .data(data_ready)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color(d.data[0])) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
svg
  .selectAll('mySlices')
  .data(data_ready)
  .join('text')
  .text(function(d){ return d.data[0]})
  .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
  .style("text-anchor", "middle")
  .style("font-size", 17)

// append the svg object to the div called 'my_dataviz'
var svg2 = d3.select("#chart2")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append('g')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

console.log(data)
console.log(data[0])
var sum_CO= 0, sum_NO2=0, sum_PM2_5=0, sum_Ozone=0, sum_SO2=0, sum_PM10 = 0

for(let i = 0; i<orig_data.length; i++)
{
    sum_CO+=+orig_data[i].Days_CO;
    sum_NO2+=+orig_data[i].Days_NO2;
    sum_Ozone+=+orig_data[i].Days_Ozone;
    sum_SO2+=+orig_data[i].Days_SO2;
    sum_PM2_5+=+orig_data[i].Days_PM2_5;
    sum_PM10+=+orig_data[i].Days_PM10;
}

var Div = sum_CO+sum_NO2+sum_Ozone+sum_PM10+sum_SO2+sum_PM2_5
var g1 = sum_CO
console.log(Div)
console.log(g1)
var g2 = sum_NO2
var g3 = sum_Ozone
var g4 = sum_SO2
var g5 = sum_PM2_5
var g6 = sum_PM10

data = {CO:g1/Div, NO2:g2/Div, Ozone:g3/Div, SO2:g4/Div, PM2_5:g5/Div, PM10:g6/Div} 
console.log(data)

color = d3.scaleOrdinal()
  .range(d3.schemeSet1);

data_ready = pie(Object.entries(data))
console.log(Object.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg2
  .selectAll('mySlices')
  .data(data_ready)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color(d.data[0])) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
svg2
  .selectAll('mySlices')
  .data(data_ready)
  .join('text')
  .text(function(d){ return d.data[0]})
  .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
  .style("text-anchor", "middle")
  .style("font-size", 17)




var svg3 = d3.select("#chart1")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append('g')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data

// set the color scale
console.log(orig_data2)
console.log(orig_data2[0])
console.log(orig_data2[0].Days_with_AQI)
var sum_Days_with_AQI= 0, sum_Good_Days=0, sum_Moderate_days=0, sum_Unhealthy_for_Sensitive_Groups=0, sum_Unhealthy_Days=0, sum_Very_Unhealthy_Days= 0, sum_Hazardous_Days = 0

for(let i = 0; i<orig_data2.length; i++)
{
    sum_Days_with_AQI+=+orig_data2[i].Days_with_AQI;
    sum_Good_Days+=+orig_data2[i].Good_Days;
    sum_Moderate_days+=+orig_data2[i].Moderate_Days;
    sum_Unhealthy_for_Sensitive_Groups+=+orig_data2[i].Unhealthy_for_Sensitive_Groups_Days;
    sum_Unhealthy_Days+=+orig_data2[i].Unhealthy_Days;
    sum_Very_Unhealthy_Days+=+orig_data2[i].Very_Unhealthy_Days;
    sum_Hazardous_Days+=+orig_data2[i].Hazardous_Days;
}
var Div = sum_Days_with_AQI;
var g1 = sum_Good_Days
console.log(Div)
console.log(g1)
var g2 = sum_Moderate_days
var g3 = sum_Unhealthy_for_Sensitive_Groups
var g4 = sum_Unhealthy_Days
var g5 = sum_Very_Unhealthy_Days
var g6 = sum_Hazardous_Days

var data = {Good:g1/Div, Moderate:g2/Div, Unhealthy_for_Sensitive_Groups:g3/Div, Unealthy:g4/Div, Very_Unhealthy:g5/Div, Hazardous:g6/Div} 
console.log(data)
// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
// Now I know that group A goes from 0 degrees to x degrees and so on.
var color = d3.scaleOrdinal()
  .range(d3.schemeSet2);
// shape helper to build arcs:
var pie = d3.pie()
  .value(function(d) {return d[1]})
var data_ready = pie(Object.entries(data))
console.log(Object.entries(data))

var full_string2 = county2+", "+ state2 + " year " + year2+ " air quality and pollution"
svg3.append("text")
    .attr("x", 0)             
    .attr("y", -250)
    .attr("text-anchor", "middle")  
    .style("font-size", "25px") 
    .style("text-decoration", "underline")  
    .text(full_string2);

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg3
  .selectAll('mySlices')
  .data(data_ready)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color(d.data[0])) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
svg3
  .selectAll('mySlices')
  .data(data_ready)
  .join('text')
  .text(function(d){ return d.data[0]})
  .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
  .style("text-anchor", "middle")
  .style("font-size", 17)

// append the svg object to the div called 'my_dataviz'
var svg4 = d3.select("#chart2")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append('g')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

console.log(data)
console.log(data[0])
var sum_CO= 0, sum_NO2=0, sum_PM2_5=0, sum_Ozone=0, sum_SO2=0, sum_PM10 = 0

for(let i = 0; i<orig_data.length; i++)
{
    sum_CO+=+orig_data2[i].Days_CO;
    sum_NO2+=+orig_data2[i].Days_NO2;
    sum_Ozone+=+orig_data2[i].Days_Ozone;
    sum_SO2+=+orig_data2[i].Days_SO2;
    sum_PM2_5+=+orig_data2[i].Days_PM2_5;
    sum_PM10+=+orig_data2[i].Days_PM10;
}

var Div = sum_CO+sum_NO2+sum_Ozone+sum_PM10+sum_SO2+sum_PM2_5
var g1 = sum_CO
console.log(Div)
console.log(g1)
var g2 = sum_NO2
var g3 = sum_Ozone
var g4 = sum_SO2
var g5 = sum_PM2_5
var g6 = sum_PM10

data = {CO:g1/Div, NO:g2/Div, Ozone:g3/Div, SO2:g4/Div, PM2_5:g5/Div, PM10:g6/Div} 
console.log(data)

color = d3.scaleOrdinal()
  .range(d3.schemeSet1);

data_ready = pie(Object.entries(data))
console.log(Object.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg4
  .selectAll('mySlices')
  .data(data_ready)
  .join('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color(d.data[0])) })
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
svg4
  .selectAll('mySlices')
  .data(data_ready)
  .join('text')
  .text(function(d){ return d.data[0]})
  .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
  .style("text-anchor", "middle")
  .style("font-size", 17)

// var Svg2 = d3.select("#chart2")

// Svg2.selectAll("mydots")
//   .data(Object.keys(data))
//   .enter()
//   .append("circle")
//     .attr("cx", 100)
//     .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
//     .attr("r", 7)
//     .style("fill", function(d){ return color(d)})

// Svg2.selectAll("mylabels")
//   .data(Object.keys(data))
//   .enter()
//   .append("text")
//     .attr("x", 120)
//     .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
//     .style("fill", function(d){ return color(d)})
//     .text(function(d){ return d})
//     .attr("text-anchor", "left")
//     .style("alignment-baseline", "middle")

// }
}