import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TOKEN_NAME } from '../services/apiService';
import "./admin.css";
import { AuthContext } from '../context';

export default function HeaderAdmin() {
  const nav = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { isAdmin, setIsAdmin } = useContext(AuthContext);


  const onLogOut = () => {
  
    if (window.confirm("Are you sure you want to logout ?")) {
      setIsLoggedIn(false);
      localStorage.clear();
      setIsAdmin(false);
      nav("/");
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
            {localStorage['token'] ?
            <ul className='nav'>
              <li>
                <Link to="/admin/users">Users</Link>
              </li>
            </ul> : <ul></ul> }
            <div>
              {localStorage['token'] ? <button className='btn btn-danger' onClick={onLogOut}>Log out</button> : <Link to="/admin" className='btn btn-dark'>Log in page</Link>}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
