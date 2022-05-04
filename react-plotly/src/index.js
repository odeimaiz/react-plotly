import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Graph from './Graph';

const root = ReactDOM.createRoot(document.getElementById('root'));

const callBackendAPI = async (requestOptions = {}) => {
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

function reGraph() {
  const requestOptions = {
    "channel": 1,
    "variables": ["amplitude"]
  };
  callBackendAPI(requestOptions)
    .then(res => {
      const respData = res["data"];
      root.render(<Graph graphData={respData.graphData} graphTitle={respData.title} />);
    })
    .catch(err => console.log(err));
}

setInterval(reGraph, 500);
