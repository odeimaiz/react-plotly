import React from 'react';
import Plot from 'react-plotly.js';

class Graph extends React.Component {
  render() {
    const data = {
      x: [],
      y: []
    };
    const n = 1000;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1) * 2 - 1;

      // A sine wave:
      data.x[i] = t * Math.PI;
      data.y[i] = Math.sin(t * Math.PI);
    }

    return (
      <Plot
        data={
          [{
            x: data.x,
            y: data.y,
            type: 'scatter',
            marker: {
              color: 'red'
            },
          }]
        }
        layout={{width: 640, height: 480, title: 'A Sine'}}
      />
    );
  }
}

export default Graph;