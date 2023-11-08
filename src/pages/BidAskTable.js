import React, { useEffect, useState } from 'react';

// Assuming DataTable is a custom component or from another library
import DataTable from './DataTable';

const DepthTable = ({ data, title }) => {
    // Convert data to the array format expected by DataTable
    const tableData = Object.entries(data).map(([coin, depthLevels]) => ({
        coin,
        ...depthLevels,
    }));

    // Generate columns dynamically from the first item's keys
    const columns = tableData.length > 0
        ? Object.keys(tableData[0]).map(key => ({
              header: key,
              dataField: key,
          }))
        : [];

    // Debug log to check the structure of tableData and columns
    console.log('Table Data:', tableData);
    console.log('Columns:', columns);

    return (
        <DataTable
            data={tableData}
            columns={columns}
        />
    );
};


// Main component that renders the two tables
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

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="row">
			<div>
				<h3>Bids</h3>
				<DepthTable data={bidsData} title="Bids" />
			</div>
			<div>
				<h3>Asks</h3>
				<DepthTable data={asksData} title="Asks" />
			</div>
		</div>
	);
};

export default BidAskTable;

// Helper function to calculate average depths from the JSON data
function calculateAverageDepths(data) {
	// Assuming 'data' is the parsed JSON object from '/bps_data.json'
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
