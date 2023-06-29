import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      className="container"
      style={{
        backgroundColor: 'lightblue',
        padding: '20px',
        borderRadius: '5px',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '600px', // Added width style
        margin: '0 auto', // Centering the container
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '80%' }}>
      <Link to="/learn">
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Learn
          </button>
        </Link>
        <Link to="/practice">
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Practice
          </button>
        </Link>
        <Link to="/play">
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Play
          </button>
        </Link>
      
      </div>
    </div>
  );
}
