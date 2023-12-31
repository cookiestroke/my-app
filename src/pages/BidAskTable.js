import '../components/DataTable.css';

import React, { useEffect, useState } from 'react';

import DataTable from './DataTable';
import LoadingSpinner from '../lib/LoadingSpinner'; // Import the LoadingSpinner component

// Helper function to calculate average depths from the JSON data
function calculateAverageDepths(data) {
	const bids = {};
	const asks = {};
	for (const [coin, coinData] of Object.entries(data)) {
		bids[coin] = {};
		asks[coin] = {};
		for (const [bps, depthArray] of Object.entries(coinData.bids)) {
			bids[coin][bps] = depthArray.reduce((acc, { depth }) => acc + depth, 0) / depthArray.length;
		}
		for (const [bps, depthArray] of Object.entries(coinData.asks)) {
			asks[coin][bps] = depthArray.reduce((acc, { depth }) => acc + depth, 0) / depthArray.length;
		}
	}
	return { bids, asks };
}

// Helper function to calculate the top of book averages
function calculateTopOfBookAverages(bidsData, asksData) {
    const averages = { 'Average Top of Book': 'Avg' };
    Object.keys(bidsData).forEach((coin) => {
        // Get the smallest bps for bids and asks
        const bidBps = Math.min(...Object.keys(bidsData[coin]).map(bps => parseFloat(bps))).toString() + 'bps';
        const askBps = Math.min(...Object.keys(asksData[coin]).map(bps => parseFloat(bps))).toString() + 'bps';

        // Check if the smallest bps is the same for bids and asks, use it for average calculation
        if (bidBps === askBps) {
            const bid = bidsData[coin][bidBps];
            const ask = asksData[coin][askBps];
            averages[coin] = ((bid + ask) / 2).toFixed(3);
        } else {
            // Handle the case where bidBps and askBps are not equal
            console.error(`Bids and asks have different smallest bps values for ${coin}.`);
        }
    });
    return averages;
}

const DepthTable = ({ data, title }) => {
	const tableData = Object.entries(data).map(([coin, depthLevels]) => ({
		coin,
		...depthLevels,
	}));

	const columns = Object.keys(tableData[0]).map(key => ({
		header: key === 'coin' ? title : key,
		dataField: key,
	}));

	return (
		<DataTable
			data={tableData}
			columns={columns}
		/>
	);
};

const BidAskTable = () => {
	const [bidsData, setBidsData] = useState({});
	const [asksData, setAsksData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/bps_data.json'); // Path to your JSON file
				const jsonData = await response.json();
				const avgDepths = calculateAverageDepths(jsonData);
				setBidsData(avgDepths.bids);
				setAsksData(avgDepths.asks);
			} catch (error) {
				console.error("Failed to fetch data: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const topOfBookAverages = calculateTopOfBookAverages(bidsData, asksData);
	const averageRow = [topOfBookAverages];
	const averageColumns = Object.keys(topOfBookAverages).map(key => ({
		header: key,
		dataField: key,
	}));

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<div className="table-container">
				<h3>Average Top of Book Per Coin</h3>
				<DataTable data={averageRow} columns={averageColumns} />
			</div>
			<div className="row">
				<div className="table-container">
					<h3>Bids</h3>
					<DepthTable data={bidsData} title="Bids" />
				</div>
				<div className="table-container">
					<h3>Asks</h3>
					<DepthTable data={asksData} title="Asks" />
				</div>
			</div>
		</div>
	);
};

export default BidAskTable;
