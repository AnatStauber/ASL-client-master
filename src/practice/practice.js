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
import BackToMenu from '../client_comps/backToMenu';



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
      <div>
        <BackToMenu />
      
        <div className='d-flex mt-5 justify-content-around'>
          
       <div className=''>
        <h2 className='text-center mb-3' style={{color:"#FACC15"}}> Choose a letter : </h2>
        <div >
          <Learn onChooseLetter={handleChosenLetter} size={"400px"}/>  
        </div>
       
        </div>   
      
      <div className=''>
      <h2 className='text-center mb-5' style={{color:"#FACC15"}}> Now try for yourself: </h2>
      <div className=''>
      <SignDetection setGesture={setUserAnswer} size={50} />
      </div>

      {showModal && (
         <OpenModal 
         showModal={true}
         setShowModal = {()=>{}}
         message1={"correct!"}
         message2={"Your'e doing great!"}/>
      )}
      </div>
      </div>
      </div>
    );




}
export default Practice;
