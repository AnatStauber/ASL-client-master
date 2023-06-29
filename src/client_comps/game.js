import React, { useState, useEffect } from 'react';
import GameOver from './gameOver';
import SignDetection from '../services/signDetection2';
import Modal from 'react-modal';
import './modal.css';
import ShowTimer from '../services/showTimer';

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
    //    console.log(questions)
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
    
    return(
    <GameOver score={score} />
    )

  }
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex ===10) {
    // Reached the last question, game over
    // You can display the final score or redirect to a different page here
    gameOver();
  }

  return (
    <div className='container d-flex justify-content-center'>
        {currentQuestionIndex<10 && (
            <div>            
              <h3 className='text-center'>Show us your signing skills!</h3>
            <h1 className=' text-center text-info mt-4'>Show us the letter:<strong>{currentQuestion}</strong></h1>
            <div className='d-flex justify-content-center mt-5'> 
            <ShowTimer key={timerKey} />
            </div>
            <div className='mt-4'>
            <SignDetection setGesture={setUserAnswer} />
            <h4 className='text-center fw-bold mt-2' style={{cursor : "pointer"}} onClick={() => {
              setRemainingTime(30);
              setUserAnswer('');
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              setTimerKey((prevKey) => prevKey + 1);
            }}>Next letter</h4>
            </div>
            <h3 className='mt-3 text-center'>Score: {score}</h3>
          </div>)}
            {showModal && (
              <div className='container h-50 d-flex justifu-content-center'>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                className="Modal"
                overlayClassName="Overlay"
            >
              
                <h2 className='text-center mt-5'>Correct!</h2> 
                <h2 className='text-center text-success fw-bold'> +10 points</h2>
              
            </Modal>
            </div>
            )}
      </div>
  );
};

export default Game;
