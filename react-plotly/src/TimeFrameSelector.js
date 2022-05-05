import React from 'react';

class TimeFrameSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedTF: "10"
    };
  }

  timeFrames = [
    { label: "1s", value: "1" },
    { label: "10s", value: "10" },
    { label: "1m", value: "60" },
    { label: "5m", value: "300" },
  ];

  componentWillReceiveProps(props) {
    if (this.state.selectedTF !== props.selectedTimeFrame) {
      this.setState({
        selectedTF: props.selectedTimeFrame
      });
    }
  }

  render() {
    return (
      <div>
        {
          this.timeFrames.map((timeFrame, i) => (
            <div key = { i }>
              <input
                type = "radio"
                checked = { this.state.selectedTF === timeFrame.value }
                value = { timeFrame.value }
                onChange = {this.props.onTimeFrameChanged}
              /> 
                { timeFrame.label }
            </div>
          ))
        }
      </div>
    );
  }
}

export default TimeFrameSelector;