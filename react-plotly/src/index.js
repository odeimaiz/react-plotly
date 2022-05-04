import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Graph from './Graph';

const root = ReactDOM.createRoot(document.getElementById('root'));


const callBackendAPI = async () => {
  const response = await fetch('/getData');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};

function reGraph() {
  callBackendAPI()
    .then(res => {
      const respData = res["newData"];
      root.render(<Graph graphData={respData.data} graphTitle={respData.title} />);
    })
    .catch(err => console.log(err));
}

setInterval(reGraph, 500);
