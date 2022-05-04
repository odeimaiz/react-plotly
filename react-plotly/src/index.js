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
      const respData = res.newData;
      const removeIndices = respData.data.x.findIndex(v => v !== null);
      if (removeIndices > -1) {
        console.error("removing empty indices: ", removeIndices);
        respData.data.x.splice(0, removeIndices);
        respData.data.y.splice(0, removeIndices);
      }
      root.render(<Graph graphData={respData.data} graphTitle={respData.title} />);
    })
    .catch(err => console.log(err));
}

setInterval(reGraph, 500);
