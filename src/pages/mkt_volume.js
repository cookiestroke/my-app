import Plot from 'react-plotly.js';
import React from 'react';

class MKTVolume extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: { autosize: false },
      frames: [],
      config: {},
    };
    this.updatePlotSize = this.updatePlotSize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updatePlotSize);
    this.updatePlotSize(); // Set initial size

    // Fetch your data here
    fetch('/data_mkt.json')
      .then((response) => response.json())
      .then((data) => {
        // Update the component's state with the fetched data
        this.setState({
          data: data.data,
          layout: { ...data.layout, ...this.state.layout },
          frames: data.frames,
          config: data.config,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePlotSize);
  }

  updatePlotSize() {
    const newWidth = (window.innerWidth - 300) / 2;
    this.setState({
      layout: {
        ...this.state.layout,
        width: newWidth,
      },
    });
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
