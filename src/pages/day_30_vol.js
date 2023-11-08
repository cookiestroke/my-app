import React, { useEffect, useState } from 'react';

import DataTable from './DataTable';
import LoadingSpinner from '../lib/LoadingSpinner'; // Import the LoadingSpinner component

const Day30Vol = () => {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [columns, setColumns] = useState([]);
  	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch the data from the data.json file
		fetch('/data_table_big.json')
			.then((response) => response.json())
			.then((jsonData) => {
				setData(jsonData);
				// Extract column definitions from the first item (assuming all items have the same structure)
				if (jsonData.length > 0) {
					const firstItem = jsonData[0];
					const extractedColumns = Object.keys(firstItem).map((key) => ({
					  header: key,
					  dataField: key,
					}));
					setColumns(extractedColumns);
				  }
		  
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			});
	}, []);

	// Calculate the total number of pages based on the data length
	const totalPages = Math.ceil(data.length / 10);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>L30D Volume by Day (JST)</h2>
			{loading ? (
				<LoadingSpinner />
			) : (
			<DataTable
				data={data}
				columns={columns}
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
			)}
		</div>
	);
};

export default Day30Vol;
