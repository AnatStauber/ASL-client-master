import React, { useState, useEffect } from 'react';
import GameOver from '../play/gameOver';
import SignDetection from '../services/signDetection2';
import Modal from 'react-modal';
import '../play/modal.css';
import ShowTimer from '../services/showTimer';
import { Link, Navigate  } from 'react-router-dom';
import Learn from '../learn/learn';
import Game from '../play/game';
import OpenModal from '../play/modal';



const Practice = () => {

  const [letter, setLetter] = useState('A');
  const [userAnswer, setUserAnswer] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChosenLetter = (letter) => {
    setLetter(letter);
    console.log(letter);
  };

  useEffect(() => {
    // Automatically check if the gesture matches the letter
    checkGesture();
    console.log(userAnswer);
  }, [userAnswer]);

  const checkGesture = () => {
    if (letter === userAnswer) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
    }

  
    return (
        <div className='d-flex mt-5 justify-content-around'>
       <div className=''>
        <h2 className='text-center mb-3'> Choose a letter : </h2>
       <Learn onChooseLetter={handleChosenLetter}/>
        </div>   
      
      <div className=''>
      <h2 className='text-center mb-5'> Now try for yourself: </h2>
      <SignDetection setGesture={setUserAnswer}/>
      
      {showModal && (
         <OpenModal 
         showModal={true}
         setShowModal = {()=>{}}
         message1={"correct!"}
         message2={"Your'e doing great!"}/>
      )}
      </div>
      
      </div>
    );




}
export default Practice;
