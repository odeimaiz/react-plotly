import React from 'react';
import TimeFrameSelector from './TimeFrameSelector';
import Graph from './Graph';
import GraphsSelector from './GraphsSelector';



const buildQueryParams = (requestOptions) => {
  const {selectedGraphs} = requestOptions;
  // selectedGraphs: ["1amplitude", "1impedance", "3amplitude", "3voltage"]
  // query:          ?channels=[1,3]&variables=[["amplitude", "impedance"]["amplitude", "voltage"]]
  console.log("buildQueryParams");
  console.log(selectedGraphs);
  if (selectedGraphs.length) {
    const params = new URLSearchParams();

    const selectedGraphsObj = {};
    selectedGraphs.forEach(requestGraph => {
      const channelKey = requestGraph.charAt(0);
      if (!(channelKey in selectedGraphsObj)) {
        selectedGraphsObj[channelKey] = [];
      }
      selectedGraphsObj[channelKey].push(requestGraph.slice(1));
    });

    const channels = Object.keys(selectedGraphsObj);
    channels.forEach(chKey => params.append("channels", chKey));
    channels.forEach(chKey => params.append("variables", selectedGraphsObj[chKey]));

    return params.toString();
  };
  return null;
}

const fetchMoreData = async (requestOptions = {}) => {
  const queryParams = buildQueryParams(requestOptions);
  if (queryParams) {
    const response = await fetch("/getData?" + queryParams);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }
  return null;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGraphs: ["1amplitude"],
      timeFrame: "10",
      graphData: {},
      graphTitle: ""
    };
  }

  reGraph = () => {
    fetchMoreData(this.state)
      .then(res => {
        if ("data" in res) {
          const respData = res["data"];
          this.setState(state => ({
            graphData: respData["graphData"],
            graphTitle: respData["title"]
          }));
        } else {
          this.setState(state => ({
            graphData: {},
            graphTitle: ""
          }));
        }
      })
      .catch(err => console.log(err));
  }

  onSelectedGraphsChanged = (event) => {
    const changedGraph = event.target.value;
    if (this.state.selectedGraphs.includes(changedGraph)) {
      this.state.selectedGraphs.splice(this.state.selectedGraphs.indexOf(changedGraph), 1);
    } else {
      this.state.selectedGraphs.push(changedGraph);
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
    setInterval(() => this.reGraph(), 1000);
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