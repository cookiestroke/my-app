import './components/TradeApp.css';

import React, { useState } from 'react';
import {
	Route,
	Routes,
} from "react-router-dom";

import Home from "./pages/home";
import Sidebar from './lib/Sidebar';
import Spread from "./pages/spread";
import Volume from "./pages/volume";

function TradeApp() {
	const [isSidebarOpen, setSidebarOpen] = useState(true);

	return (
		<div className="App">
			<Sidebar open={isSidebarOpen} toggleOpen={() => setSidebarOpen(!isSidebarOpen)} />
			<main className={`mainContent ${isSidebarOpen ? "mainOpen" : "mainClosed"}`}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/spread" element={<Spread />} />
					<Route path="/volume" element={<Volume />} />
				</Routes>
			</main>
		</div>
	);
}

export default TradeApp;
