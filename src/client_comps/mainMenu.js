import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

export default function Menu() {
  return (
    <div
      className="container justify-content-center"
      style={{
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '600px', // Added width style
        margin: '0 auto', // Centering the container
      }}
    >
      <h1 className='mt-5 pt-5 display-4'>Signs for Begginers</h1>
      <p >come and learn how to sign the ASL alphabet with our online tutorial!
with these 3 simple steps - you can learn to sign quickly and easily!</p>
<div className='mx-auto mt-3'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '80%' }}>
      <Link to="/learn">
          <button className="btn btn1 " style={{ width: '100%' }}>
            Learn
          </button>
        </Link>
        <Link to="/practice">
          <button className="btn btn1 " style={{ width: '100%' }}>
            Practice
          </button>
        </Link>
        <Link to="/play">
          <button className="btn btn1 " style={{ width: '100%' }}>
            Play
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
}