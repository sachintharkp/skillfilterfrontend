import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

import './Navbar.css';

function Navbar() {
    const[click,setClick] = useState(false);
    
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);

  return (
    <>
     <nav className='navbar'>
        <div className='navbar-container'>          
          <Link to = "/" className='navbar-logo' onClick={closeMobileMenu}>
            FILTRERA  <i className='fab fa-typo3'></i>
          </Link>
         
          <div className='menu-icon' onClick={handleClick}>
             <i className={click ? 'fas fa-times' : 'fas fa-bars'}/> 
          </div>
         
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/filter' className='nav-links' onClick={closeMobileMenu}>
              Filter Employee
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/employees' className='nav-links' onClick={closeMobileMenu}>
              Search Employee
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/skill' className='nav-links' onClick={closeMobileMenu}>
              Skill
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/assignment' className='nav-links' onClick={closeMobileMenu}>
              Assignment
              </Link>
            </li>  
            <li className='nav-item'>
              <Link to='/UpdateProfile' className='nav-links' onClick={closeMobileMenu}>
              Profile
              </Link>
            </li>       
          </ul>
        </div>
     </nav>
    </>
  )
}

export default Navbar