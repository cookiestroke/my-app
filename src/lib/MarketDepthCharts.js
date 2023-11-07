import '../components/MarketDepthCharts.css'; // Import the CSS file

import React, { useEffect, useState } from 'react';

import DatePicker from './DatePicker';
import TimeSeriesChart from './TimeSeriesChart';

export default function MarketDepthCharts({ cryptocurrencies, depthTypes }) {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [timeSeriesData, setTimeSeriesData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch('/bps_data.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setTimeSeriesData(data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
			console.error('There has been a problem with your fetch operation:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="container">
			<h1>Market Depth Charts</h1>
			<div className="row">
				<div className="date-picker-container">
					<DatePicker label="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
				</div>
				<div className="date-picker-container">
					<DatePicker label="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
				</div>
			</div>
			{cryptocurrencies.map(coin => (
				<div key={coin} className="row">
					{depthTypes.map(type => (
						<TimeSeriesChart key={`${coin}-${type}`} coin={coin} type={type} data={timeSeriesData} />
					))}
				</div>
			))}
		</div>
	);
}
