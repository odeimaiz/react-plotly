import React from 'react';
import Plot from 'react-plotly.js';

class Graph extends React.Component {
  render() {
    const data = {
      x: [],
      y: []
    };
    const n = 100;
    for (let i = 0; i < n; i++) {
      const t = i / 4;


      const date = new Date(null);
      date.setSeconds(i);
      // formatted as %H:%M:%S time series
      const result = date.toISOString().substring(11, 19);
      data.x[i] = result;

      // A sine wave:
      data.y[i] = Math.sin(t);
    }

    return (
      <Plot
        data={
          [{
            x: data.x,
            y: data.y,
            type: "scatter",
            marker: {
              color: "red"
            },
          }]
        }
        layout={{
          width: 640,
          height: 480,
          title: "A Sine",
          xaxis: {
            tickformat: "%H:%M:%S"
          }
        }}
      />
    );
  }
}

export default Graph;