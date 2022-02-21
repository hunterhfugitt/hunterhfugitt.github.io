console.log("Hello world");


let data1 = [], data2 = [], lineChart1, lineChart2; 

d3.csv('data/data.csv')
  .then(_data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(_data);
	console.log(typeof(_data)); 	
	var state1 = prompt("What is the state you want to observe").toLowerCase();
	var county1 = prompt("Which county in that state?").toLowerCase();
	var state2 = prompt("Which other state you want to compare this to?").toLowerCase();
	var county2 = prompt("Which county in that state?").toLowerCase();
	if(state1 == null)
	{
	  state1 = 'Ohio'
	}
	if(state2 == null)
	{
	  state2 = 'Ohio'
	}
	if(county1 ==null)
	{
	  county1 = 'Hamilton'
	}
	if(county2 ==null)
	{
	  county2 = 'Butler'
	}
	maxMax_AQI = d3.max(_data, d => d.Max_AQI);
    //process the data - this is a forEach function.  You could also do a regular for loop.... 
    _data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function // convert string 'cost' to number
      	 //note- I just created this field in each object in the array on the fly
		   //console.log(typeof(d.Year))
		  // console.log(typeof(d.Max_AQI))
		   d.Year = +d.Year;
		   d.State = d.State.toLowerCase();
		   d.County = d.County.toLowerCase();
		   d.Max_AQI = +d.Max_AQI;
		   d.Median_AQI = +d.Median_AQI;

		   if(d.State.startsWith(state1) && d.County.startsWith(county1))
		   {
			   data1.push(d);
		   }
		   if(d.State.startsWith(state2) && d.County.startsWith(county2))
		   {
			   data2.push(d);
		   }
  	});

	console.log(data1)
	const lineChart1 = new Line({ parentElement: '#chart'}, data1, county1, maxMax_AQI);
	lineChart1.initVis();
	document.getElementById("chart")
	console.log(lineChart1)
	console.log(data2)
	const lineChart2 = new Line({ parentElement: '#chart2'}, data2, county2,maxMax_AQI);
	const lineChart3 = new Line_2({ parentElement: '#chart3'}, data1, county1);
	const lineChart4 = new Line_2({ parentElement: '#chart4'}, data2, county2);
	lineChart2.initVis();
	lineChart3.initVis();
	lineChart4.initVis();
	console.log(lineChart2)

})

.catch(error => console.error(error));
