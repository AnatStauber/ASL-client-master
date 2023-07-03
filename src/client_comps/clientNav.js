import React, { useContext, useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import "./nav.css"
import MenuBox from './clientMenuBox';


export default function ClientNav() {
  const token = localStorage.getItem('token');
  const firstName = localStorage.getItem("firstName") || "Guest";
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn])

  const handleLogout = () => {
    setMenuOpen(false);
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  const handleProfile = () => {
    setMenuOpen(false);
    navigate("/user/userProfile");
  }

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen); // Toggle the menu's open state
  };

  return (

    <header className='shadow  ' style={{backgroundColor:"rgb(79 71 135)"}}> 
    <div className='align-items-center d-flex '>
      <Link className='ms-5' to="/"><img src="../logo.png" alt="SignMaster Logo" width="150px"/></Link>
      
      <ul className="nav  col-5 justify-content-around mx-auto" >
              <li className="nav-item d-flex justify-content-between" >
                <Link to="/" className="icon-link  ">
                  <i className=" fa fa-home fa-3x" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="nav-item">

                {isLoggedIn ? (
                   <Link to="/user/userProfile" className="icon-link  ">
                   <i className=" fa fa-user fa-3x" aria-hidden="true"></i>
                 </Link>
                ) : (
                <Link to="/user/login" className="icon-link  ">
                  <i className=" fa fa-user fa-3x" aria-hidden="true"></i>
                </Link>
                )}
              </li>
              <li className="nav-item">
                <Link to="/highScores" className="icon-link ">
                  <i className=" fa fa-trophy fa-3x" aria-hidden="true"></i>
                </Link>
              </li>
        </ul>

        <div className="user-picture" style={{minWidth:"150px"}}>
        {isLoggedIn ? (
                   <div>
                   <img src={localStorage.getItem('userPicture')} alt="user"></img>
                   <p style={{color:"#FACC15"}}> Welcome, <span onClick={handleMenuClick} style={{cursor:"pointer", fontWeight:"bold"}}>{firstName} </span>! </p>
                  {isMenuOpen && <MenuBox onLogout={handleLogout} onProfile={handleProfile} />}
                
                 </div>
                ) : (
                <Link to="/user/login" className="icon-link  ">
                  <i className="userIcon p-3 fa fa-user fa-3x " aria-hidden="true" style={{borderRadius: "40%"}} ></i>
                </Link>
                )}
            </div>
            </div>
           
       </header>

  );
}
