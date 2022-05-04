import React from 'react';
import Plot from 'react-plotly.js';

class Graph extends React.Component {
  render() {
    const data = this.props.dataFromParent;
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
          width: 560,
          height: 420,
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