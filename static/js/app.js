// Use the D3 library to read in samples.json from the URL provided

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);

// Create data promise
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
    gauge(samples[0]);
});


function optionChanged(value) {
    const selectedId = samples.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);

    // Insert the demographic Data
    metaData(demographicInfo);

    // Insert info into Bar Chart
    hbarChart(selectedId);

    // Insert info into bubble chart
    bubbleChart(selectedId);

    // Insert info into Gauge Chart
    gauge(selectedId);

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
        marker: {
          color: "rgb(125,182,237)"
        },
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
            colorscale: "Picnic",
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

// Create the gauge chart 
function gauge(selectedId) {
  // Fetch the JSON data and console log it 
  d3.json(url).then((data) => {
      // Use the metadata from the data fetch
      let metadata = data.metadata; 
      console.log("l", metadata)
      console.log("f", selectedId.id)
      // Filter data where id = selected value after converting their types 
      // (bc meta.id is in integer format and selectValue from is in string format)
      let filteredData = metadata.filter((meta) => meta.id == selectedId.id);

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
                  { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
                  { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
                  { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
                  { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
                  { range: [4, 5], color: "rgba(184, 205, 68, .5)" },
                  { range: [5, 6], color: "rgba(170, 202, 42, .5)" },
                  { range: [6, 7], color: "rgba(142, 178, 35 , .5)" },
                  { range: [7, 8], color: "rgba(110, 154, 22, .5)" },
                  { range: [8, 9], color: "rgba(50, 143, 10, 0.5)" },
                  { range: [9, 10], color: "rgba(14, 127, 0, .5)" }
              ]
          }
      }];

       // Use Plotly to plot the data in a gauge chart
       Plotly.newPlot("gauge", trace);
  });
}
