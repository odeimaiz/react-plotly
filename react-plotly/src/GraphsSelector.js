import React from 'react';

class GraphsSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedGraphs: []
    };
  }

  channels = [
    { label: "Ch-1", value: "1" },
    { label: "Ch-2", value: "2" },
    { label: "Ch-3", value: "3" },
    { label: "Ch-4", value: "4" },
    { label: "Ch-5", value: "5" },
    { label: "Ch-6", value: "6" },
    { label: "Ch-7", value: "7" },
    { label: "Ch-8", value: "8" },
  ];

  quantities = [
    { label: "Amplitude", value: "amplitude" },
    { label: "Current", value: "current" },
    { label: "Impedance", value: "impedance" },
  ];

  componentWillReceiveProps(props) {
    if (JSON.stringify(this.state.selectedGraphs.sort()) !== JSON.stringify(props.selectedGraphs.sort())) {
      this.setState(state => ({
        selectedGraphs: props.selectedGraphs
      }));
    }
  }

  render() {
    return (
      <div>
        {
          this.channels.map((channel) => (
            this.quantities.map((quantity) => (
              <div key = {channel.value + quantity.value}>
                <input
                  type = "checkbox"
                  checked = { this.state.selectedGraphs.includes(channel.value+quantity.value) }
                  value = { channel.value+quantity.value }
                  onChange = {this.props.onSelectedGraphsChanged}
                /> 
                  { channel.label + "-" + quantity.label }
              </div>
            ))
          ))
        }
      </div>
    );
  }
}

export default GraphsSelector;