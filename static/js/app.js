// Use the D3 library to read in samples.json from the URL provided

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);

console.log("Data Promise: ", dataPromise);

// // Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});
// Set up variables and get data from JSON for charts 
var samples;
var meta_data;
d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset");
    meta_data = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    metaData(meta_data[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});

function optionChanged(value) {
    const selectedId = samples.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);

    // Insterting Demographic Data
    metaData(demographicInfo);

    // Bar Chart
    hbarChart(selectedId);

    // Bubble Chart
    bubbleChart(selectedId);

    // Gauge Chart
    gaugeChart(selectedId);

}

function metaData(demographicInfo) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
        `id: ${demographicInfo.id} <br> 
      ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
    );
}

function hbarChart(selectedId) {
    let x_axis = selectedId.sample_values.slice(0, 10).reverse();
    let y_axis = selectedId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = selectedId.otu_labels.slice(0, 10).reverse();

    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
    };

    Plotly.newPlot("bar", chart, layout);
}

function bubbleChart(selectedId) {
    let x_axis = selectedId.otu_ids;
    let y_axis = selectedId.sample_values;
    let marker_size = selectedId.sample_values;
    let color = selectedId.otu_ids;
    let text = selectedId.otu_labels;

    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Pastel",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    Plotly.newPlot("bubble", chart, layout);
}

// Make the gauge chart 
function gauge(selectedId) {
  // Fetch the JSON data and console log it 
  d3.json(url).then((data) => {
      // An array of metadata objects
      let metadata = data.metadata;
      
      // Filter data where id = selected value after converting their types 
      // (bc meta.id is in integer format and selectValue from is in string format)
      let filteredData = metadata.filter((meta) => meta.id == selectedValue);
    
      // Assign the first object to obj variable
      let obj = filteredData[0]

      // Trace for the data for the gauge chart
      let trace = [{
          domain: { x: [0, 1], y: [0, 1] },
          value: obj.wfreq,
          title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
          type: "indicator", 
          mode: "gauge+number",
          gauge: {
              axis: {range: [null, 10]}, 
              bar: {color: "rgb(68,166,198)"},
              steps: [
                  { range: [0, 1], color: "rgb(233,245,248)" },
                  { range: [1, 2], color: "rgb(218,237,244)" },
                  { range: [2, 3], color: "rgb(203,230,239)" },
                  { range: [3, 4], color: "rgb(188,223,235)" },
                  { range: [4, 5], color: "rgb(173,216,230)" },
                  { range: [5, 6], color: "rgb(158,209,225)" },
                  { range: [6, 7], color: "rgb(143,202,221)" },
                  { range: [7, 8], color: "rgb(128,195,216)" },
                  { range: [8, 9], color: "rgb(113,187,212)" },
                  { range: [9, 10], color: "rgb(98,180,207)" }
              ]
          }
      }];

       // Use Plotly to plot the data in a gauge chart
       Plotly.newPlot("gauge", trace);
  });
}
// START OF LA CODE
// dataPromise.then(function(incomingData) {
//   // Use incomingData to populate the dropdown
//   const dropdown = d3.select("#selDataset");
//   incomingData.names.forEach(function(name) {
//     dropdown.append("option").attr("value", name).text(name);
//   });

//   // Define the function to handle dropdown changes
//   function optionChanged(selectedValue) {
//     // Implement what should happen when the dropdown changes
//     console.log("Selected Value: ", selectedValue);

//     // You can update charts or perform other actions here
//   }

//   // Attach the event listener to the dropdown
//   dropdown.on("change", function() {
//     const selectedValue = d3.select(this).property("value");
//     optionChanged(selectedValue);
//   });

//   // Fetch the JSON data and console log it
//   console.log("Data Loaded: ", incomingData);
// });
        // // Create array to hold all names (all ID names)
        // var names = data.samples.map(x=>x.id)
        // // Append an option in the dropdown
        // names.forEach(function(name) {
        //     d3.select('#selDataset')
        //         .append('option')
        //         .text(name)
        //     });
        



// // Create barchart using the Top 10 OTUs
// function CreateHBar(x,y,text) {
//     var data = [{
//         type: 'bar',
//         x: x,
//         y: y,
//         text: text,
//         orientation: 'h'
//     }];

//     var layout = {
//         title: "Top 10 OTU's"
//     };

//     Plotly.newPlot('bar', data. layout);


// };
