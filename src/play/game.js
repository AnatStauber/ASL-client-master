
import React, { useState, useEffect, useContext } from 'react';
import GameOver from './gameOver';
import SignDetection from '../services/signDetection2';
import ShowTimer from '../services/showTimer';
import OpenModal from './modal';
import { Link, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { AuthContext } from '../context';


const generateRandomLetters = () => {
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXY';
  const uniqueLetters = new Set();
  while (uniqueLetters.size < 10) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet[randomIndex];
    uniqueLetters.add(randomLetter);
  }
  console.log(uniqueLetters);
  return Array.from(uniqueLetters);
};

const Game = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(30);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(parseInt(localStorage.getItem('score')) || 0);
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  let token = localStorage.getItem('token');
  // Generate random letters for questions when the component mounts
  useEffect(() => {
    setQuestions(generateRandomLetters());

    //check token
    if (token!=null){
      //check if token is expired:
      let decodedToken = jwt_decode(token);
      console.log("Decoded Token", decodedToken);
      let currentDate = new Date();
      // JWT expiration is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        alert("your token is expired! please log in again.")
        setIsLoggedIn(false);
        localStorage.clear();
      } else {
        console.log("Valid token");   
      }
  } else {
    alert ("you must be logged in to play!");
    window.location("/user/login");
  }
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
      setScore((prevScore) => prevScore + 10);
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

  const gameOver = () => {
    console.log('Game Over');
    console.log("score: ", score);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestionIndex === 10) {
    // Reached the last question, game over
    // You can display the final score or redirect to a different page here
    gameOver();
  }

  return (
    <div>
  {currentQuestionIndex<10 ? (
    <div className="container-fluid row d-flex justify-content-around">
     
      <div className="left-side col-4 mt-5 d-flex flex-column align-items-center">
        <h3 style={{ color: '#FACC15' }} className=" mt-4 text-center fw-bold">
          Show us your signing skills!
        </h3>
        <h4 style={{ color: 'rgb(79 71 135)' }} className="text-center mt-4">
          Show us the letter:{' '}
          <span style={{ backgroundColor: 'rgb(79 71 135)' }} className="fw-bold mt-3 rounded-4 text-light px-3 py-2">
            {currentQuestion}
          </span>
        </h4>
        <div className="text-center mt-4">
          <ShowTimer key={timerKey} />
        </div>
        <h3 style={{ color: 'rgb(79 71 135)' }} className="mt-4 text-center">
          Score: {score}
        </h3>
   
      </div>

      <div className="right-side col-5 mt-5">
      <p
          className="text-center fw-bold "
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setRemainingTime(30);
            setUserAnswer('');
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setTimerKey((prevKey) => prevKey + 1);
          }}
        >
          Don't know the answer? Skip to the next letter &rarr;
        </p>
        <div  style={{ position: 'relative' }}>
          <SignDetection setGesture={setUserAnswer} />
          <p className="text-center fw-bold">
            Detected gesture: <span className="text-danger fw-bold">{userAnswer}</span>{' '}
          </p>
        </div>
      </div>

      {showModal && (
        <OpenModal showModal={true} setShowModal={setShowModal} message1={'correct!'} message2={'+10 points'} />
      )}
    
     
    </div>
   ) : (
    <Navigate to="/play/gameOver" state={score} />
    // <Navigate to={{ pathname: '/play/gameOver' state={score} }}> </Navigate>
  )}
  </div>
  );
};

export default Game;