import React, { useRef, useEffect, useState } from 'react';
// import { doApiMethod } from './apiService';
import axios from "axios"

const SignDetection = (props)  => {
  const videoRef = useRef(null);
  // const [gesture, setGesture] = useState('');
  const [squareTop, setSquareTop] = useState('100px');
  const [squareLeft, setSquareLeft] = useState('100px');
  const [gesture, predictGesture] = useState('');
  const [size, setSize] = useState(60);
  

  useEffect(() => {
    if (props.size){
      console.log("wwww");
      setSize(props.size);
    }
    console.log(size)
  }, []);

  const url = "http://anatstauber.pythonanywhere.com/"
  useEffect(() => {
    const captureVideo = async () => {
      const constraints = { video: true };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    captureVideo();
  }, []);

  useEffect(() => {
    const processFrame = async () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const videoElement = videoRef.current;

      if (!videoElement || !videoElement.videoWidth || !videoElement.videoHeight) {
        requestAnimationFrame(processFrame);
        return;
      }

      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      context.drawImage(
        videoElement,
        0,
        0,
        canvas.width,
        canvas.height
      );

      
      const image = canvas.toDataURL('image/jpeg');
      // console.log (JSON.stringify({ image }))

      try {
      
        
        const response = await fetch(`${url}/api/detect-gesture`, {
          method: 'POST',
          body: JSON.stringify({ image }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        predictGesture(data.gesture);
        props.setGesture(data.gesture);

       // Calculate the relative position of the square
       const canvasWidth = canvas.width;
       const canvasHeight = canvas.height;
       const squareWidth = 224;
       const squareHeight = 224;

       const squareTopPosition = (100 / canvasHeight) * 100 + '%';
       const squareLeftPosition = (100 / canvasWidth) * 100 + '%';

       setSquareTop(squareTopPosition);
       setSquareLeft(squareLeftPosition);
      } catch (error) {
        console.error('Error processing frame:', error);
      }

      requestAnimationFrame(processFrame); // Continuously process frames
    };

    processFrame();
  }, []);

   return (
    <div className="container" >
      <div className={`video-container `} style={{ position: 'relative'  , width:"fit-content",margin:'0 auto'}}>
        <video ref={videoRef} autoPlay style={{height:`${size}vh`,border: '2px solid black'}} />
        <div
          style={{
            position: 'absolute',
            top: squareTop , // Set the calculated top position
            left: squareLeft, // Set the calculated left position
            width:  `${224*(size/100)}px`,
            height:`${224*(size/100)}px`,
            border: '4px solid red',
          }}
        ></div>
      </div>
      {/* <p className='text-center'>Detected gesture: <span className='text-danger'>{gesture}</span> </p> */}
      
    </div>
  );
};

export default SignDetection;
