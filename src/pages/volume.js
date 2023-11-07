import Day30Vol from './day_30_vol';
import JSTVolume from './jst_volume';
import MKTVolume from './mkt_volume';
import React from 'react';
import VolSnapshot from './vol_snapshot';

function Volume() {
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column', // Stack the children vertically
	};

	const rowStyle = {
		display: 'flex',
		justifyContent: 'space-between', // Put the two volumes side by side
	};

	return (
		<div style={containerStyle}>
			<div>
				<VolSnapshot />
			</div>
			<div style={rowStyle}>
				<JSTVolume />
				<MKTVolume />
			</div>
			<div>
				<Day30Vol />
			</div>
		</div>
	);
}

export default Volume;
