import Plot from 'react-plotly.js';
import React from 'react';

const TimeSeriesChart = ({ coin, type, data }) => {
  const bpsLevels = ['10bps', '20bps', '50bps', '100bps', '200bps'];

  return (
    <div>
      <h2>{coin} {type.toUpperCase()} Depth Over Time</h2>
      <Plot
        data={bpsLevels.map(bps => ({
          x: data[coin][type][bps].map(entry => entry.date),
          y: data[coin][type][bps].map(entry => entry.depth),
          type: 'scatter',
          mode: 'lines+markers',
          fill: 'tozeroy',
          name: `${bps}`
        }))}
        layout={{
          title: `${coin} ${type.toUpperCase()} Depth Over Time`,
          xaxis: { title: 'Date' },
          yaxis: { title: 'Depth' },
          // width: 600,
          // height: 400,
          // margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 },
          paper_bgcolor: '#f8f9fa',
          plot_bgcolor: '#f8f9fa',
        }}
      />
    </div>
  );
};

export default TimeSeriesChart;

