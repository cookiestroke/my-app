import React from 'react';

const DataTable = ({ data, columns, currentPage, totalPages, onPageChange }) => {
	// Calculate the range of data to display
	const startIndex = (currentPage - 1) * 10;
	const endIndex = startIndex + 10;

	// Slice the data to display only the current page's data
	const currentData = data.slice(startIndex, endIndex);

	return (
		<div>
			<table>
				{/* Render your table headers */}
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={index}>{column.header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* Map over the currentData and render rows */}
					{currentData.map((item, index) => (
						<tr key={index}>
							{columns.map((column, columnIndex) => (
								<td key={columnIndex}>{item[column.dataField]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			{/* Display pagination info */}
			<div>
				<span>
					{currentPage} of {totalPages}
				</span>
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					&#8592; Previous
				</button>
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next &#8594;
				</button>
			</div>
		</div>
	);
};

export default DataTable;
