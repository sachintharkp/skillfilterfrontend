import React from 'react';
import { BrowserRouter as Router,Routes,Route}  from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Employees from './components/pages/Employees';
import Skill from './components/pages/Skill';
import Assignment from './components/pages/Assignment';
import Filter from './components/pages/Filter'
import UpdateEmployeeProfile from './components/pages/UpdateEmployeeProfile';
import Navbar from './components/Navbar'
import Register from './components/pages/Register';
import LoginUser from './components/pages/LoginUser';

function App() {
  return (
  <> 
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/skill" element={<Skill/>} />
          <Route path="/assignment" element={<Assignment/>} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="/filter" element={<Filter/>} />
          <Route path="/register" element={<Register/>} />
          <Route path='/login' element={<LoginUser/>}/>
          <Route path="/UpdateProfile"element={<UpdateEmployeeProfile/>} />
      </Routes>
    </Router>
  </>
  );
}
export default App;