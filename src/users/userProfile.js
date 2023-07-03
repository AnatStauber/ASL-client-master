import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom'; 
import { API_URL, doApiGet } from '../services/apiService';


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
      console.log("entered fetch");
      const response = await doApiGet(`${API_URL}/users/myInfo`); 
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
        <div className='container'>
          <h2 className="display-3 text-center mt-4 fw-bold"  style={{color:"#FACC15"}}>Your Profile</h2>
          <div className='d-flex justify-content-center'>
            <div className='d-flex flex-column justify-content-between'>
            {localStorage.getItem("img") && (
              <img className="mt-4" src={localStorage.getItem("img")} alt="profile picture"></img>)}
            <p className='text-left mt-4 fw-bold'> First Name: <span className='fw-normal'>{userDetails.fullName.firstName}</span> </p>
            <p className='text-left mt-1 fw-bold'>Last Name:  <span className='fw-normal'>{userDetails.fullName.lastName}</span></p>
            <p className='text-left mt-1 fw-bold'>Email:  <span className='fw-normal'>{userDetails.email}</span></p>
            <p className='text-left mt-1 fw-bold'>Score:  <span className='fw-normal'>{localStorage.getItem("score")}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;