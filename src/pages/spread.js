import MarketDepthCharts from '../lib/MarketDepthCharts';
import React from 'react';

function App() {
  // Configuration could also come from an API or some global state in a real-world app
  const config = {
    cryptocurrencies: ['BTC', 'ETH', 'AVAX'],
    depthTypes: ['bids', 'asks']
  };

  return (
    <div className="App">
      <MarketDepthCharts 
        cryptocurrencies={config.cryptocurrencies} 
        depthTypes={config.depthTypes} 
      />
    </div>
  );
}

export default App;
