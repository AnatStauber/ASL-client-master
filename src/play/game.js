import React, { useState, useEffect } from 'react';
import GameOver from './gameOver';
import SignDetection from '../services/signDetection2';
import ShowTimer from '../services/showTimer';
import OpenModal from './modal';
import { Link, Navigate  } from 'react-router-dom';


const generateRandomLetters = () => {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXY';
    const uniqueLetters = new Set();
    while (uniqueLetters.size < 10) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const randomLetter = alphabet[randomIndex];
      uniqueLetters.add(randomLetter);
    }
    console.log (uniqueLetters)
    return Array.from(uniqueLetters);
  };

  const Game = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [remainingTime, setRemainingTime] = useState(30);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(parseInt(localStorage.getItem("score")) || 0);
    const [questions, setQuestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [timerKey, setTimerKey] = useState(0); 
      
    // Generate random letters for questions when the component mounts
    useEffect(() => {
       setQuestions(generateRandomLetters())
    }, []);
  
  // Start the timer when the current question changes
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the timer when the component unmounts or when the current question changes
    return () => {
      clearInterval(timer);
    };
  }, [currentQuestionIndex]);

  useEffect(() => {
    // Automatically check if the gesture matches the letter
    checkGesture();
  }, [userAnswer]);

  // Move to the next question when the time is up
  useEffect(() => {
    if (remainingTime === 0) {
      moveToNextQuestion();
    }
  }, [remainingTime]);


  // Move to the next question and check the answer if it's correct
  const moveToNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (userAnswer === currentQuestion) {
      setScore((prevScore) => (prevScore +10));
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }

    setRemainingTime(30);
    setUserAnswer('');

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTimerKey((prevKey) => prevKey + 1);
  };

  // Handle input change and check if the answer is correct
  const checkGesture = () => {

    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion === userAnswer) {
      // If the answer is correct, move to the next question automatically
      moveToNextQuestion();
    }
  };

  const gameOver =  () => {
    console.log('Game Over');
    
  }
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex ===10) {
    // Reached the last question, game over
    // You can display the final score or redirect to a different page here
    gameOver();
  }

  return (
    <div className='container d-flex justify-content-center'>
        {currentQuestionIndex<10 ? 
        (
          <div>            
            <h3 style={{color:"#FACC15"}} className='text-center fw-bold'>Show us your signing skills!</h3>
            <h4 style={{color:"rgb(79 71 135)"}} className=' text-center mt-4'>Show us the letter: <span style={{backgroundColor:"rgb(79 71 135)"}} className='fw-bold  rounded-4 text-light px-3  py-2'>{currentQuestion}</span></h4>
            <p className='text-center fw-bold mt-2 p-3 ' style={{cursor : "pointer"}} onClick={() => {
              setRemainingTime(30);
              setUserAnswer('');
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              setTimerKey((prevKey) => prevKey + 1);
            }}>Don't know the answer? Skip to the next letter &rarr; </p>

            <div className='d-flex justify-content-between'>
           
            <div className='mt-1 mx-4' style={{ position: 'relative' }}>
            <SignDetection setGesture={setUserAnswer} />
            <p className='text-center'>Detected gesture: <span className='text-danger fw-bold'>{userAnswer}</span> </p>
            
            <div  style={{ position: 'absolute', top: "-50Px", right: "-50px" }} className=' d-flex flex-column justify-content-center '> 
            <ShowTimer key={timerKey} />
            </div>
            </div>
            </div>
            <h3  style={{color:"rgb(79 71 135)"}} className='mt-3 text-center'>Score: {score}</h3>
          </div>
          ) 
          : 
          (
            <Navigate to={{ pathname: '/play/gameOver', score: { score } }}> </Navigate>
          )}

            {showModal && (
               
               <OpenModal 
               showModal={true}
               setShowModal={setShowModal}
               message1={"correct!"}
               message2={"+10 points"}/>
        
            )}
      </div>
  );
};

export default Game;
