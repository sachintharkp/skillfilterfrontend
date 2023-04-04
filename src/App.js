import React from 'react';
import { BrowserRouter as Router,Routes,Route}  from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Manager from './components/pages/Manager';
import Employee from './components/pages/Employee';
import User from './components/pages/User'
import Employees from './components/pages/Employees';
import Skill from './components/pages/Skill';
import Assignment from './components/pages/Assignment';
import Filter from './components/pages/Filter'
import EmployeeProfile from './components/pages/EmployeeProfile';
import UpdateEmployeeProfile from './components/pages/UpdateEmployeeProfile';
import Navbar from './components/Navbar'

function App() {
  return (
  <> 
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/manager" element={<Manager/>} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/skill" element={<Skill/>} />
          <Route path="/assignment" element={<Assignment/>} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="/filter" element={<Filter/>} />
          <Route path="/profile" element={<EmployeeProfile/>} />
          <Route path="/UpdateProfile" element={<UpdateEmployeeProfile/>} />
      </Routes>
    </Router>
  </>
  );
}
export default App;