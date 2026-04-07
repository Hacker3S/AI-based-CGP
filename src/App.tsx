import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import Analyzer from './pages/Analyzer';
import Assistant from './components/Assistant';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/analyzer" element={<Analyzer />} />
        </Routes>
        <Assistant />
      </div>
    </Router>
  );
}

export default App;
