import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Mock data - replace with the actual data import
const mockData = {
  // ... The JSON data extracted earlier
};

// DepthTable component to display a table for bids or asks
const DepthTable = ({ data, title }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>{title}</TableCell>
          <TableCell align="right">10bps</TableCell>
          <TableCell align="right">20bps</TableCell>
          <TableCell align="right">50bps</TableCell>
          <TableCell align="right">100bps</TableCell>
          <TableCell align="right">200bps</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(data).map(([coin, depthLevels]) => (
          <TableRow
            key={coin}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {coin}
            </TableCell>
            {Object.values(depthLevels).map((depth, index) => (
              <TableCell align="right" key={index}>{depth.toFixed(2)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// Main component that renders the two tables
const DepthTables = () => {
  const [bidsData, setBidsData] = useState({});
  const [asksData, setAsksData] = useState({});

  useEffect(() => {
    // Here you would fetch your data and set it, but for now, we're using mock data
    const avgDepths = calculateAverageDepths(mockData);
    setBidsData(avgDepths.bids);
    setAsksData(avgDepths.asks);
  }, []);

  return (
    <div>
      <h2>Average Depth per BPS Level (Bids)</h2>
      <DepthTable data={bidsData} title="Coin" />
      <h2>Average Depth per BPS Level (Asks)</h2>
      <DepthTable data={asksData} title="Coin" />
    </div>
  );
};

export default DepthTables;

// Function to calculate the average depths (placeholder for actual calculation function)
const calculateAverageDepths = (data) => {
  // This function should calculate the average depths for bids and asks
  // and return an object with the formatted data for the DepthTable component
  // For now, it returns the mock data directly
  return {
    bids: mockData.map(coinData => coinData.bids),
    asks: mockData.map(coinData => coinData.asks),
  };
};

