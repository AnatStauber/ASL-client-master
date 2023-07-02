import React from 'react'
import Modal from 'react-modal';
import './modal.css';

function OpenModal(props) {
   
  return (
    <div className='container h-50 d-flex justify-content-center'>
        <Modal
            isOpen={props.showModal}
            onRequestClose={() => props.setShowModal(false)}
            className="Modal"
            overlayClassName="Overlay"
        > 
            <h2 className='text-center mt-1'>{props.message1}</h2> 
            <h2 className='text-center text-success fw-bold'> {props.message2}</h2>
        </Modal>
    </div>
  )
}

export default OpenModal;