import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateStationForm from './components/CreateStationForm';
import SideNavBar from './components/SideNavBar'; // Import the SideNavBar component
import Analytics from './pages/Analytics'; // Import the Analytics component

function App() {
  return (
    <Router>
      <div className="flex">
        <SideNavBar /> 
        <div className="ml-64 p-4 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-station" element={<CreateStationForm />} />
            <Route path="/analytics" element={<Analytics />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
