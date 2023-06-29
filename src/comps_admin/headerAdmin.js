import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TOKEN_NAME } from '../services/apiService';
import "./admin.css";

export default function HeaderAdmin() {
  const nav = useNavigate();


  const onLogOut = () => {
    // מחיקת טוקן
    if (window.confirm("Are you sure you want to logout ?")) {
      localStorage.removeItem(TOKEN_NAME)
      // להעביר לעמוד לוג אין
      nav("/admin");
    }
  }

  return (
    <header className='container-fluid admin-header bg-info'>
      <div className="container ">
        <div className="row align-items-center">
          <div className="logo col-auto">
            <h2>Admin panel</h2>
          </div>
          <nav className='d-flex col justify-content-between align-items-center'>
            {localStorage[TOKEN_NAME] ?
            <ul className='nav'>
              <li>
                <Link to="/admin/users">Users</Link>
              </li>
            </ul> : <ul></ul> }
            <div>
              {localStorage[TOKEN_NAME] ? <button className='btn btn-danger' onClick={onLogOut}>Log out</button> : <Link to="/admin" className='btn btn-dark'>Log in page</Link>}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
