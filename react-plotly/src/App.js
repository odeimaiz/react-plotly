import React from 'react';
import Graph from './Graph';


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

  componentDidMount() {
    setInterval(this.reGraph, 500);
  }

  render() {
    return (
      <div>
        <Graph graphData={this.state.graphData} graphTitle={this.state.graphTitle} />
      </div>
    )
  }
}

export default App;