import React, { useEffect, useState } from 'react';

import Plot from 'react-plotly.js';

const TimeSeriesChart = ({ coin, type, data }) => {
  const bpsLevels = ['10bps', '20bps', '50bps', '100bps', '200bps'];
  
  // useState to set the width of the chart
  const [chartWidth, setChartWidth] = useState(window.innerWidth / 2 - 250);

  // useEffect to update the width on screen resize
  useEffect(() => {
    const handleResize = () => {
      setChartWidth((window.innerWidth - 300) / 2);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

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
          width: chartWidth, // Set the width state
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
