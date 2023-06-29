import React from 'react'
import Game from './game'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';


function GameOver(props) {

  const id = localStorage.getItem("userId")
  const bodyData = {
    id: id, 
    score: props.score 
  };

  useEffect(() => {
    localStorage.setItem("score",props.score);
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
  let resp = await doApiGet(url)
  if (resp.length >0){
    changeScore();
  } else {
    enterScore();
  }
}

  return (
    <div>
    <p>Game Over!</p>
    <p>Final Score: {props.score}</p>
    <button onClick={() =>{return <Game />}}>Play Again</button>
    <button onClick={()=>{<Link to="/"></Link>}}>Go to Homepage</button>
  </div>
  )
}

export default GameOver