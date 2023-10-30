import './components/TradeApp.css';

import {
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/home";
import Sidebar from './lib/Sidebar';
import Spread from "./pages/spread";
import Volume from "./pages/volume";

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/spread" element={<Spread />} />
          <Route path="/volume" element={<Volume />}/>
        </Routes>
      </main>
    </div>
  );
}
export default App;

