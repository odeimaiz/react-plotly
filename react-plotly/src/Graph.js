import React from 'react';
import Plot from 'react-plotly.js';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        x: [],
        y: [],
      },
      title: "Title"
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.graphData,
      title: props.graphTitle
    });
  }

  render() {
    const data = this.state.data;
    const title = this.state.title;
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
          width: 480,
          height: 360,
          title: title,
          xaxis: {
            tickformat: "%H:%M:%S"
          }
        }}
      />
    );
  }
}

export default Graph;