import React from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { Link} from 'react-router-dom';

export default function BackToMenu()  {
  return (
    <div>
    
   
    <Link to="/menu" className='ms-3'>
      <div className='display-6 ms-4'>
    <FaRegArrowAltCircleLeft /></div>
  </Link>
  </div>
  )
}

