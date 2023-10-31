import Day30Vol from './day_30_vol';
import JSTVolume from './jst_volume';
import MKTVolume from './mkt_volume';
import React from 'react';

function Volume() {
  return (
    <div>
      <JSTVolume />
      <MKTVolume />
      <Day30Vol />
    </div>
  );
}

export default Volume;