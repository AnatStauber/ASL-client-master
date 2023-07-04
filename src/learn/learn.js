import React, { useState, useEffect } from 'react';
import BackToMenu from '../client_comps/backToMenu';

export default function Learn(props) {
  const [selectedLetter, setSelectedLetter] = useState('A');
  const [size, setSize] = useState('500px');
  const [showBackButton, setShowBackButton] = useState(true);

  useEffect(() => {
    if (props.size){
      setSize(props.size);
    }
    if (props.showBackButton){
      setShowBackButton(false);
    }
    console.log(size)
  }, []);

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
    <div>
    {showBackButton && (
      <BackToMenu />
    )}
    
      
    
    <div className="container-fluid text-center " >
      <div className="row justify-content-center ">
        <div className="col-12 ">
          <div className="container " style={{ width: `${size}` }} >
            <div className="row justify-content-center ">
              <div className="col-12 col-sm-8 ">
                <div className="embed-responsive embed-responsive-16by9 ">
                  <video src={getVideoSource(selectedLetter)} className="embed-responsive-item w-100"  autoPlay loop>
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="col-12 p-0 ">
                <div className="row justify-content-center mb-3">
                  {[...Array(26)].map((_, index) => {
                    const letter = String.fromCharCode(65 + index);
                    return (
                      <div key={letter} className="col-1 mx-2 my-1 "> 
                        <button
                          className={`btn btn-primary btn-block ${selectedLetter === letter ? 'active' : ''}`}
                          style={{ width: '50px' }}
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
    </div>
  );
}