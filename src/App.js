import React from 'react';
import { BrowserRouter as Router,Routes,Route}  from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Manager from './components/pages/Manager';
import Employee from './components/pages/Employee';
import Menubar from './components/Menubar';
import Skill from './components/pages/Skill';
import Assignment from './components/pages/Assignment';
import Filter from './components/pages/Filter'

function App() {
  return (
  <> 
    <Router>
      <Menubar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/manager" element={<Manager/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/skill" element={<Skill/>} />
          <Route path="/assignment" element={<Assignment/>} />
          <Route path="/filter" element={<Filter/>} />
      </Routes>
    </Router>
  </>
  );
}
export default App;