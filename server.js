const path = require("path");
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// add middlewares
app.use(express.static(path.join(__dirname, "react-plotly", "public")));
app.use(express.static(path.join(__dirname, "react-plotly", "src")));
app.use(express.static("react-plotly"));

// create a GET route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "react-plotly", "public", "index.html"));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
