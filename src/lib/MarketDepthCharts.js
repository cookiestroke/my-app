import React, { useEffect, useState } from 'react';

import DatePicker from './DatePicker';
import TimeSeriesChart from './TimeSeriesChart';

export default function MarketDepthCharts({ cryptocurrencies, depthTypes }) {
	const containerStyle = {
		display: 'flex',
		flexDirection: 'column', // Stack the children vertically
	};

	const rowStyle = {
		display: 'flex',
		justifyContent: 'space-between', // Put the two volumes side by side
	};
	
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [timeSeriesData, setTimeSeriesData] = useState(null);

	const handleStartDateChange = (event) => {
		setStartDate(event.target.value);
	};

	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
	};

	useEffect(() => {
		fetch('/bps_data.json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => setTimeSeriesData(data))
			.catch(error => {
				console.error('There has been a problem with your fetch operation:', error);
			});
	}, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

	if (!timeSeriesData) {
		return <div>Loading...</div>;
	}

	return (
		<div style={containerStyle}>
			<h1>Market Depth Charts</h1>
			<div style={rowStyle}>
				<DatePicker label="Start Date" value={startDate} onChange={handleStartDateChange} />
				<DatePicker label="End Date" value={endDate} onChange={handleEndDateChange} />
			</div>
			<div>
				{cryptocurrencies.map(coin => (
					<div key={coin} style={rowStyle}>
						{depthTypes.map(type => (
							<TimeSeriesChart key={`${coin}-${type}`} coin={coin} type={type} data={timeSeriesData} />
						))}
					</div>
				))}
			</div>
		</div>
	);
}
