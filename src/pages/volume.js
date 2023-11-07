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

	const volumeBorderStyle = {
		border: '1px solid #ccc', // Add a 1px solid gray border
		padding: '10px', // Add some padding for spacing
	};

	return (
		<div style={containerStyle}>
			<div>
				<VolSnapshot style={volumeBorderStyle} />
			</div>
			<div style={rowStyle}>
				<JSTVolume style={volumeBorderStyle} />
				<MKTVolume style={volumeBorderStyle} />
			</div>
			<div>
				<Day30Vol style={volumeBorderStyle} />
			</div>
		</div>
	);
}

export default Volume;
