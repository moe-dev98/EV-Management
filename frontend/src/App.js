import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateStationForm from './components/CreateStationForm';
import SideNavBar from './components/SideNavBar'; 
import DailyOverView from './pages/DailyOverView';
import Analytics from './pages/Analytics'; 
function App() {
  return (
    <Router>
      <div className="flex">
        <SideNavBar /> 
        <div className="ml-64 p-4 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-station" element={<CreateStationForm />} />
            <Route path="/Daily-overview" element={<DailyOverView />} /> 
            <Route path="/analytics" element={<Analytics />} /> 

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
