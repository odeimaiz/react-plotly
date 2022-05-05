import React from 'react';
import TimeFrameSelector from './TimeFrameSelector';
import Graph from './Graph';
import GraphsSelector from './GraphsSelector';


const fetchMoreData = async (requestOptions = {}) => {
  let queryParams = "";
  const requestKeys = Object.keys(requestOptions);
  if (requestKeys.length) {
    queryParams += "?"
    requestKeys.forEach(key => {
      queryParams += encodeURIComponent(key) + "=" + encodeURIComponent(requestOptions[key]) + "&";
    });
  };
  const response = await fetch("/getData" + queryParams);
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGraphs: ["1a"],
      timeFrame: "10",
      graphData: {},
      graphTitle: ""
    };
  }

  reGraph = () => {
    const requestOptions = {
      "channel": 1,
      "variables": ["amplitude"]
    };
    fetchMoreData(requestOptions)
      .then(res => {
        const respData = res["data"];
        this.setState(state => ({
          graphData: respData["graphData"],
          graphTitle: respData["title"]
        }));
      })
      .catch(err => console.log(err));
  }

  onSelectedGraphsChanged = (event) => {
    const v = event.target.value;
    if (this.state.selectedGraphs.includes(v)) {
      this.state.selectedGraphs.splice(this.state.selectedGraphs.indexOf(v), 1);
    } else {
      this.state.selectedGraphs.push(v);
    }
    this.setState(state => ({
      selectedGraphs: this.state.selectedGraphs
    }));
  }

  onTimeFrameChanged = (event) => {
    this.setState(state => ({
      timeFrame: event.target.value
    }));
  }

  componentDidMount() {
    setInterval(this.reGraph, 500);
  }

  render() {
    return (
      <div>
        <GraphsSelector
          selectedGraphs={this.state.selectedGraphs}
          onSelectedGraphsChanged={this.onSelectedGraphsChanged}
        />
        <TimeFrameSelector
          selectedTimeFrame={this.state.timeFrame}
          onTimeFrameChanged={this.onTimeFrameChanged}
        />
        <Graph
          graphData={this.state.graphData}
          graphTitle={this.state.graphTitle}
        />
      </div>
    )
  }
}

export default App;