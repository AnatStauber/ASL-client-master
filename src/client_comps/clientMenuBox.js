import React from 'react';
import { Link } from 'react-router-dom';
import "./menuBox.css"

const MenuBox = (props) => {
    return (
        <div className="menu-overlay">
        <div className="menu-box">
          <ul >
            <li>
            <p style={{color:"rgb(79 71 135)",  cursor:"pointer"}} onClick={props.onProfile}>View Profile</p>
            </li>
            <li>
              <p style={{color:"rgb(79 71 135)",  cursor:"pointer"}} onClick={props.onLogout}>Log Out</p>
            </li>
          </ul>
        </div>
        </div>
      );
    };

export default MenuBox;
