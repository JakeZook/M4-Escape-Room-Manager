import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, BB, CH, ET, SP, VH } from "./comp";

import "./App.css";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/BB" element={<BB />} />
				<Route path="/CH" element={<CH />} />
				<Route path="/ET" element={<ET />} />
				<Route path="/SP" element={<SP />} />
				<Route path="/VH" element={<VH />} />
			</Routes>
		</Router>
	);
};

export default App;
