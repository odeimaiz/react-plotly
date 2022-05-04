const path = require("path");
const express = require("express");
const app = express(); // create express app

app.use(express.static(path.join(__dirname, "react-plotly", "build")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "react-plotly", "public", "index.html"));
});

app.get('/getData', (req, res) => {
  res.send({
    newData: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'
  });
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});