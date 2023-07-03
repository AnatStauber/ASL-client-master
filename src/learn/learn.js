import React, { useState } from 'react';

export default function Learn(props) {
  const [selectedLetter, setSelectedLetter] = useState('A');

  const handleClick = (letter) => {
    setSelectedLetter(letter);
    if (props.onChooseLetter){
      props.onChooseLetter(letter)
    }
    
  };

  const getVideoSource = (letter) => {
    return `../video/${letter}.mp4`;
  };

  return (
    <div className="container-fluid text-center mt-1">
      <div className="row justify-content-center">
        <div className="col-12 mt-3">
          <div className="container" style={{ width: '600px' }}>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-8">
                <div className="embed-responsive embed-responsive-16by9 ">
                  <video src={getVideoSource(selectedLetter)} className="embed-responsive-item w-100"  autoPlay loop>
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="row justify-content-center">
                  {[...Array(26)].map((_, index) => {
                    const letter = String.fromCharCode(65 + index);
                    return (
                      <div key={letter} className="col-2 m-1">
                        <button
                          className={`btn btn-primary btn-block ${selectedLetter === letter ? 'active' : ''}`}
                          style={{ width: '100px' }}
                          onClick={() => handleClick(letter)}
                        >
                          {letter}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}