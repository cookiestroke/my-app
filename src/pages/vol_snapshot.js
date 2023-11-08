import React, { useEffect, useState } from 'react';

// Assume DataTable is a pre-existing component that accepts columns and data props
import DataTable from './DataTable';
import LoadingSpinner from '../lib/LoadingSpinner'; // Import the LoadingSpinner component

const VolumeTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the data_table_big.json file
    fetch('/data_table_vol.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        // Extract column definitions from the first item (assuming all items have the same structure)
        if (jsonData.length > 0) {
          const firstItem = jsonData[0];
          const extractedColumns = Object.keys(firstItem).map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the headers
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

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Volume Table (JST vs Market)</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          data={data}
          columns={columns}
        />
      )}
    </div>
  );
};

export default VolumeTable;
