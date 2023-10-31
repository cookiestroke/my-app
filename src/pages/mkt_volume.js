import Plot from 'react-plotly.js';
import React from 'react';
import data from '../static/data_mkt.json'

class MKTVolume extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {data: [], layout: {}, frames: [], config: {}};
    this.state = {data: data.data, layout: data.layout};
  }

  render() {
    return (
      <Plot
        data={this.state.data}
        layout={this.state.layout}
        frames={this.state.frames}
        config={this.state.config}
        onInitialized={(figure) => this.setState(figure)}
        onUpdate={(figure) => this.setState(figure)}
      />
    );
  }
}

export default MKTVolume;