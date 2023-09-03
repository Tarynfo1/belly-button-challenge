# Plotly Belly Button Biodiversity challenge

<img width="1440" alt="Belly button cleaning" src="https://github.com/Tarynfo1/belly-button-challenge/blob/392a69e46dcbf6a7225bef728568b1e3a9326be7/Images/bellybuttonclean.png">

## Dashboard
* Links to a dashboard containing several different plots to display data
https://Tarynfo1.github.io/belly-button-challenge 


*** 
## Description
 For this task an interactive dashboard was built using Javascript, Plotly and JSON data to explore the various microbes that live in the human navel referred to as OTUs (Operational Taxonomic Units) which were present in 70% of people with 30% being quite rare.
***
## File structure
- __Images:__ contains images of the plots and background for readme file
- __static/js:__ Contains app.js file with completed code for bonus activity
- __README.md:__ ReadMe file, you're already here
- __index.html:__ html. css source code
- __samples.json:__ reference file for the study
***
## Tools
- Plotly
- D3 library
- Javascript
***
## Instructions
1. Use the D3 library to read in `samples.json` from the URL `https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json`.

 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    * Use `sample_values` as the values for the bar chart.
    * Use `otu_ids` as the labels for the bar chart.
    * Use `otu_labels` as the hovertext for the chart.
    
    <img width="366" alt="bar_chart" src="https://github.com/Tarynfo1/belly-button-challenge/blob/392a69e46dcbf6a7225bef728568b1e3a9326be7/Images/bar_chart.png">

 3. Create a bubble chart that displays each sample.
    * Use `otu_ids` for the x values.
    * Use `sample_values` for the y values.
    * Use `sample_values` for the marker size.
    * Use `otu_ids` for the marker colors.
    * Use `otu_labels` for the text values.
    
    <img width="913" alt="bubble_chart" src="https://github.com/Tarynfo1/belly-button-challenge/blob/392a69e46dcbf6a7225bef728568b1e3a9326be7/Images/bubble_chart.png">

  4. Display the sample metadata, i.e., an individual's demographic information.

  5. Display each key-value pair from the metadata JSON object somewhere on the page.
  
  <img width="129" alt="demographic_info" src="https://github.com/Tarynfo1/belly-button-challenge/blob/392a69e46dcbf6a7225bef728568b1e3a9326be7/Images/demographic_info.png">

  6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard.

  7. Deploy your app to a free static page hosting service, such as GitHub Pages.

  __Bonus question__
  * Adapt the Gauge Chart from [https://plot.ly/javascript/gauge-charts/](https://plotly.com/javascript/gauge-charts/) to plot the weekly washing frequency of the individual.
 * You will need to modify the example gauge code to account for values ranging from 0 through 9.
 * Update the chart whenever a new sample is selected.
 
 <img width="321" alt="gauge_chart" src="https://github.com/Tarynfo1/belly-button-challenge/blob/392a69e46dcbf6a7225bef728568b1e3a9326be7/Images/gauge_chart.png">
 

***
## Acknowledgements
- https://plotly.com/python/reference/indicator/#indicator-gauge-axis-dtick assisted in the following code snippet
```
          gauge: {
              axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2}, 
              bar: {color: "rgba(14, 127, 0, .5)"},
```

- Reference from https://www.d3indepth.com/requests/ assisted in the following code snippet
```
// // Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});
```  

- Reference https://plotly.com/python/v3/gauge-charts/ assisted in the following code snippet
```
// Assign the first object to obj variable
      let obj = filteredData[0]
      console.log(obj)
      // Trace for the data for the gauge chart
      let trace = [{
          domain: { x: [0, 1], y: [0, 1] },
          value: obj.wfreq,
          title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
          type: "indicator", 
          mode: "gauge+number",
          gauge: {
              axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2}, 
              bar: {color: "rgba(14, 127, 0, .5)"},
              steps: [
```

- Reference from AskBCS Learning assistant Mohamed Metwali assisted with the following code snippet
```
' // Filter data where id = selected value after converting their types 
' // (bc meta.id is in integer format and selectValue from is in string format)
' let filteredData = metadata.filter((meta) => meta.id == selectedId.id);
```