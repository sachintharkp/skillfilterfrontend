import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route}  from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import SkillSelector from './components/SkillSelector';

function App() {
  return (
  <> 
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/filter" element={<SkillSelector/>} />
      </Routes>
    </Router>
  </>
  );
}
export default App;