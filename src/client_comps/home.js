import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css"

export default function Home() {
  return (
    <div className="main container-fluid" style={{position: "relative", width: "100%", overflowX: "hidden",overflowY:"visible", minHeight:"75vh"}}>
      <img className="img1" src="../Byron-Ready-Circle-blue_sm.webp" alt="byron"></img>
    <div className='container text-center'>
      <h1 className=' fw-bold display-3' style={{marginTop:"25vh"}}>Learn ASL Online</h1>
      <h2 className=' mt-5 '>Take learning American Sign Language into your own hands with our online ASL tutorial!</h2>
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
