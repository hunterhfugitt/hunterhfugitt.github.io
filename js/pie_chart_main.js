var state1, county1, state2, county2, year1, year2;

function PieMain(){

d3.select("#chart1").selectAll("*").remove();
d3.select("#chart2").selectAll("*").remove();
d3.select("#chart3").selectAll("*").remove();
d3.select("#chart4").selectAll("*").remove();
var year2 = document.getElementById('years2');
let data1 = [], data2 = [];

d3.csv('data/data.csv')
      .then(_data => {
          console.log('Data loading complete. Work with dataset.');
        console.log(_data);
        console.log(typeof(_data)); 	
        state1 = prompt("What is the state you want to observe").toLowerCase();
        county1 = prompt("Which county in that state?").toLowerCase();
        state2 = prompt("Which other state you want to compare this to?").toLowerCase();
        county2 = prompt("Which county in that state?").toLowerCase();
        year1 = document.getElementById('years1');
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
        if(year1 == null)
        {
          year1 = '1980'
        }
        if(year2 == null)
        {
          year2 = '1980'
        }
        console.log(year1.value)
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
              if(year1.value == 'all')
               {
                if(d.State.startsWith(state1) && d.County.startsWith(county1))
                {
                    data1.push(d);
                }
               }
                else
                {
                  if(d.State.startsWith(state1) && d.County.startsWith(county1) && d.Year == year1.value)
                  {
                    data1.push(d);
                  }
                }
              if(year2.value == 'all')
                {
                  if(d.State.startsWith(state2) && d.County.startsWith(county2))
                  {
                     data2.push(d);
                  }
                }
            else
              {
                if(d.State.startsWith(state2) && d.County.startsWith(county2) && d.Year == year2.value)
                {
                   data2.push(d);
                }
              } 
          });
    
        console.log(data1)
        showPieChart(data1,data2)
    
    })
    .catch(error => console.error(error));
  
  }    