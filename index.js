const path = require("path");
const express = require("express");
const app = express(); // create express app

app.use(express.static(path.join(__dirname, "react-plotly", "build")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "react-plotly", "public", "index.html"));
});

let initTime = 0;
app.get('/getData', (req, res) => {
  const respData = {
    title: "Amplitude",
    data: {
      x: [],
      y: []
    }
  };
  const nSamples = 1000;
  let idx = 0;
  for (let i = initTime; i < nSamples+initTime; i++) {
    // x: time series, formatted as %H:%M:%S 
    const date = new Date(null);
    date.setSeconds(initTime+i);
    const result = date.toISOString().substring(11, 19);
    respData.data.x[idx] = result;

    // y: sine wave
    const t = i / 60;
    respData.data.y[idx] = Math.sin(t);
    idx++;
  }
  initTime += 30;

  res.send({
    newData: respData
  });
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});