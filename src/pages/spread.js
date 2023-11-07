import React, { useState } from 'react';

import Plot from 'react-plotly.js';

export default function Spread() {
  // State for time range selection
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mock data for the area charts
  const generateMockData = () => {
    return [...Array(10).keys()].map((_, index) => ({
      date: `2023-01-${index + 1 < 10 ? `0${index + 1}` : index + 1}`,
      depth: Math.random() * 100
    }));
  };

  const mockTimeSeriesData = {
    'BTC': {
      'bids': {
        '10bps': generateMockData(),
        '20bps': generateMockData(),
        '50bps': generateMockData(),
        '100bps': generateMockData(),
        '200bps': generateMockData(),
      },
      'asks': {
        '10bps': generateMockData(),
        '20bps': generateMockData(),
        '50bps': generateMockData(),
        '100bps': generateMockData(),
        '200bps': generateMockData(),
      },
    },
    'ETH': {
      'bids': {
        '10bps': generateMockData(),
        '20bps': generateMockData(),
        '50bps': generateMockData(),
        '100bps': generateMockData(),
        '200bps': generateMockData(),
      },
      'asks': {
        '10bps': generateMockData(),
        '20bps': generateMockData(),
        '50bps': generateMockData(),
        '100bps': generateMockData(),
        '200bps': generateMockData(),
      },
    },
    'AVAX': {
      'bids': {
        '10bps': generateMockData(),
        '20bps': generateMockData(),
        '50bps': generateMockData(),
        '100bps': generateMockData(),
        '200bps': generateMockData(),
      },
      'asks': {
        '10bps': generateMockData(),
        '20bps': generateMockData(),
        '50bps': generateMockData(),
        '100bps': generateMockData(),
        '200bps': generateMockData(),
      },
    },
  };

  // Handlers for date range changes
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Function to render the Time Series Area Charts for Bids or Asks for all bps in the same graph
  const renderTimeSeriesChart = (coin, type) => {
    const bpsLevels = ['10bps', '20bps', '50bps', '100bps', '200bps'];

    return (
      <div key={`${coin}-${type}`}>
        <h2>{coin} {type.toUpperCase()} Depth Over Time</h2>
        <Plot
          data={bpsLevels.map(bps => ({
            x: mockTimeSeriesData[coin][type][bps].map(entry => entry.date),
            y: mockTimeSeriesData[coin][type][bps].map(entry => entry.depth),
            type: 'scatter',
            mode: 'lines+markers',
            fill: 'tozeroy',
            name: `${bps}`
          }))}
          layout={{
            title: `${coin} ${type.toUpperCase()} Depth Over Time`,
            xaxis: { title: 'Date' },
            yaxis: { title: 'Depth' },
            width: 600,
            height: 400,
            margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 },
            paper_bgcolor: '#f8f9fa',
            plot_bgcolor: '#f8f9fa',
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <h1>Market Depth Charts</h1>
      <div>
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {['BTC', 'ETH', 'AVAX'].map(coin => (
          <div key={coin} style={{ display: 'flex', marginBottom: '20px' }}>
            {renderTimeSeriesChart(coin, 'bids')}
            {renderTimeSeriesChart(coin, 'asks')}
          </div>
        ))}
      </div>
    </div>
  );
}
