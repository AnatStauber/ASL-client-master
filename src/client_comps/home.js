import React, {  useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./home.css"
import jwt_decode from 'jwt-decode'
import { AuthContext } from '../context';

export default function Home() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    let token = localStorage.getItem('token');
    //check token
    if (token!=null){
      //check if token is expired:
      let decodedToken = jwt_decode(token);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();
      // JWT expiration is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        setIsLoggedIn(false);
        localStorage.clear();
      } else {
        console.log("Valid token");   
      }
  }
  }, []);


  return (
    <div className="main container-fluid" style={{position: "relative", width: "100%", overflow: "hidden", minHeight:"80vh", zIndex:"999"}}>
      <img className="img1" src="../Byron-Ready-Circle-blue_sm.webp" alt="byron" ></img>
    <div className='container text-center'>
      <h1 className=' fw-bold display-4' style={{marginTop:"20vh"}}>Learn ASL Online</h1>
      <h3 className=' mt-4 '>Take learning American Sign Language into your own hands with our online ASL tutorial!</h3>
    </div>
    <img className="img2" src="../Sandra-Circle-Yellow_sm.webp" alt="sandra"></img>
    <Link to="/menu" className="icon-link text-decoration-none ">         
      <button className='mt-5 mx-auto d-flex justify-content-center align-items-center' style={{
           backgroundColor: "rgb(250 204 21)",
           fontWeight: "500",
           fontSize: "x-large",
           border: "2px solid transparent",
           borderRadius: "0.375rem",
           minWidth: "30vw",
           minHeight: "8vh",
           textDecoration: "none",
           color:"white"
      }}> Explore our tutorial! </button>
    </Link>
   </div>
  );
}
