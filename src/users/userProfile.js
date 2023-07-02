import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom'; 
import { API_URL, doApiGet } from '../services/apiService';
import "../main.css"

const UserDetails = () => {
  const navigate = useNavigate(); 

  const { isLoggedIn } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails();
    }
  }, [isLoggedIn]);

  const fetchUserDetails = async () => {
    try {
      const response = await doApiGet(`${API_URL}/user/myInfo`); 
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoggedIn) {
    navigate('/user/login');
    return null; 
  }

  return (
    <div>
      {userDetails && (
        <div>
          <h2>User Details</h2>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;