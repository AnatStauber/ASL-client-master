import React from 'react'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./timer.css";

function ShowTimer() {

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Too late...</div>;
        }

        return (
            <div className="timer container  d-flex justify-content-center">
              <div className="value">{remainingTime+1}</div>
              <div className="text">seconds</div>
            </div>
          );
    }

    return (
        <div className="App">
          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying
              duration={29}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[29, 20, 10, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        </div>
      );
}
export default ShowTimer