import '../components/DataTable.css';

import React from 'react';

// Helper function to format the value to a fixed number of decimal places
const formatValue = (value) => {
	// Check if it is a number and format it
	return typeof value === 'number' ? value.toFixed(3) : value;
};

const DataTable = ({ data, columns, currentPage = 1, totalPages = 1, onPageChange = () => { } }) => {
	// Calculate the range of data to display
	const startIndex = (currentPage - 1) * 10;
	const endIndex = startIndex + 10;

	// Slice the data to display only the current page's data
	const currentData = data.slice(startIndex, Math.min(endIndex, data.length));

	return (
		<div className="table-container">
			<table className="data-table">
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={index}>{column.header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{currentData.map((item, index) => (
						<tr key={index}>
							{columns.map((column, columnIndex) => (
								<td key={columnIndex}>{formatValue(item[column.dataField])}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{totalPages > 1 && (
				<div className="pagination">
					<span>
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage <= 1}
					>
						&#8592; Previous
					</button>
					<button
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage >= totalPages}
					>
						Next &#8594;
					</button>
				</div>
			)}
		</div>
	);
};

export default DataTable;
