import React from 'react'
import Game from './game'
import { useNavigate ,Link, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';


function GameOver(props) {

  // const navigate = useNavigate ();
  const location = useLocation();
  console.log("score: " ,location.state);

  const id = localStorage.getItem("userId")
  const bodyData = {
    score: location.state
  };

  useEffect(() => {
    console.log("enter game over");
    localStorage.setItem("score",location.state);
    checkIfScoreExist();
  }, []);

const changeScore = async () => {
    let url = API_URL + "/scores/changeScore/"+id;
    let resp = await doApiMethod(url,'PATCH',bodyData)
    console.log(resp.data);
}

const enterScore = async () => {
    let url = API_URL + "/scores/";
    let resp = await doApiMethod(url,'POST',bodyData)
    console.log(resp.data);
}

const checkIfScoreExist = async() => {
  let url = API_URL + "/scores/getScoresByUserId/"+id;
  let resp = await doApiGet(url);
  if (resp.data.length >0){
    console.log ("there is a record");
    changeScore();
  } else {
    console.log("no records", resp);
    enterScore();
  }
}


  return (
  //   <div>
  //   <p>Game Over!</p>
  //   <p>Final Score: {location.state}</p>
    
  //   <Link to="/">
  //      <i className="fa fa-home fa-3x" aria-hidden="true"></i>
  //   </Link>
  //   <Link to="/play">
  //     <button>Play Again</button>
  //   </Link>
    
  // </div>
 
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '75vh' }}>
      <div className="text-center">
        <p style={{ fontSize: '40px', fontWeight: 'bold' }}>Game Over!</p>
        <p style={{ color: '#FACC15', fontSize: '25px' }}>Final Score: {location.state}</p>
        <Link to="/play">
          <button className="btn btn-primary rounded-circle" style={{ backgroundColor: '#FACC15', borderColor: '#FACC15', width: '80px', height: '80px', fontSize: '16px' }}>Play Again</button>
        </Link>
      </div>
    </div>
    
   
  );
  
}

export default GameOver