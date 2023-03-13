import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';

import './Navbar.css';

function Navbar() {
    const[click,setClick] = useState(false);
    const[button,setButton] = useState(true);
    
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);

 
    //function to show button on ui depending on the screen size.

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        }
        else{
            setButton(true);
        }
    };

    //setting and event listner to detect the change of the screen
    window.addEventListener('resize',showButton);

  return (
    <>
     <nav className='navbar'>
        <div className='navbar-container'>
          
          <Link to = "/" className='navbar-logo'>
            Skill Filter  <i className='fab fa-typo3'></i>
          </Link>
         
          <div className='menu-icon' onClick={handleClick}>
             <i className={click ? 'fas fa-times' : 'fas fa-bars'}/> 
          </div>
         
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/employee' className='nav-links' onClick={closeMobileMenu}>
                Employee
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/manager'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Manager
              </Link>
            </li>
            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
     </nav>
    </>
  )
}

export default Navbar