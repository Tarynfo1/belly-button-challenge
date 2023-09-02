const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);

dataPromise.then(function(incomingData) {
  // Use incomingData to populate the dropdown
  const dropdown = d3.select("#selDataset");
  incomingData.names.forEach(function(name) {
    dropdown.append("option").attr("value", name).text(name);
  });

  // Define the function to handle dropdown changes
  function optionChanged(selectedValue) {
    // Implement what should happen when the dropdown changes
    console.log("Selected Value: ", selectedValue);
    // You can update charts or perform other actions here
  }

  // Attach the event listener to the dropdown
  dropdown.on("change", function() {
    const selectedValue = d3.select(this).property("value");
    optionChanged(selectedValue);
  });

  // Fetch the JSON data and console log it
  console.log("Data Loaded: ", incomingData);
});
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


// }
