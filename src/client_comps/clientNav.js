import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context';

export default function ClientNav() {
  const token = localStorage.getItem('token');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {

  }, [isLoggedIn])


  return (
    <header className="container-fluid client-header bg-light shadow ">
      <div className="container">
        <div className="row align-items-center justify-content-between mt-3">
          <div className="col-auto d-flex align-items-center">
            <h2 >
              <Link to="/"><img src="../logo.png" alt="SignMaster Logo" width="100px"/></Link>
            </h2>
          </div>
          <div className="col-auto">
            <div className="user-picture">
              {token == "null" ? (
                // <img src={localStorage.getItem('userPicture')} alt="User" />

                <i className="fa fa-user fa-3x" aria-hidden="true"></i>

              ) : (
                <h2 onClick={() => {
                  localStorage.setItem('token', null);
                  setIsLoggedIn(false)
                  console.log(isLoggedIn)
                }}>dd</h2>)}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <nav className="col">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link to="/" className="icon-link mx-5">
                  <i className="fa fa-home fa-3x" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="icon-link mx-5">
                  <i className="fa fa-user fa-3x" aria-hidden="true"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/trophy" className="icon-link mx-5">
                  <i className="fa fa-trophy fa-3x" aria-hidden="true"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
