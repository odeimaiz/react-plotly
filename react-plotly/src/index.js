import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Graph from './Graph';

const root = ReactDOM.createRoot(document.getElementById('root'));

let initTime = 0;
function reGraph() {
  const data = {
    x: [],
    y: []
  };
  const nSamples = 1000;
  for (let i = initTime; i < nSamples+initTime; i++) {
    const t = i / 42;
    const date = new Date(null);
    date.setSeconds(i);
    // formatted as %H:%M:%S time series
    const result = date.toISOString().substring(11, 19);
    data.x[i] = result;

    // A sine wave:
    data.y[i] = Math.sin(t);
  }
  initTime += 1;
  root.render(<Graph dataFromParent={data} />);
}

setInterval(reGraph, 500);
