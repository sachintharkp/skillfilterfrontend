import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const[click,setClick] = useState(false);

    const[logStatus,setLogStatus] = useState();
    const[logRole,setLogRole] = useState();
    const[userid,setUser] = useState();
    
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);

    useEffect(()=>{
      setLogStatus(localStorage.getItem("logstatus"));
      setLogRole(localStorage.getItem("roletype"));
      setUser(localStorage.getItem("user_global"));
    });

    /* Logout request*/

  const clickLogout=(e)=>{
      setClick(false);
      const user = {userid}      
      fetch("http://localhost:8081/logout",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }) .then(resp => resp.json())
       .then((result)=>{
        if(result.status == "SUCCESS"){
          localStorage.removeItem("user_global");
          localStorage.removeItem("logstatus");
          localStorage.removeItem("roletype"); 
          window.location.reload();
        } 
   })  
  }


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
         
          {logStatus =="logged" ? 
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
            {logRole == "manager" ?  <li className='nav-item'>
              <Link to='/employees' className='nav-links' onClick={closeMobileMenu}>
              Search Employee
              </Link>
            </li>:""}
            {logRole == "manager" ?<li className='nav-item'>
            <Link to='/filter' className='nav-links' onClick={closeMobileMenu}>
              Filter Employee
              </Link>
            </li> :""}           
            {logRole == "manager" ? <li className='nav-item'>
              <Link to='/assignment' className='nav-links' onClick={closeMobileMenu}>
              Assignment
              </Link>
            </li> :""} 
            <li className='nav-item'>
              <Link to='/skill' className='nav-links' onClick={closeMobileMenu}>
              Skill
              </Link>
            </li>
            {logRole == "employee" ?<li className='nav-item'>
              <Link to='/UpdateProfile' className='nav-links' onClick={closeMobileMenu}>
              Profile
              </Link>
            </li>:""}    
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={clickLogout}>
             Logout
            </Link>
            </li>       
            </ul> : <ul className={click ? 'nav-menu active' : 'nav-menu'}>            
              <li className='nav-item'>
              <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
              Login
              </Link>
            </li>       
          </ul>}

        </div>
     </nav>
    </>
  )
}

export default Navbar