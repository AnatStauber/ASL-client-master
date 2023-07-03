
import React, { useState, useContext, useRef } from 'react';
import { FaEdit, FaUpload } from 'react-icons/fa';
import { AuthContext } from '../context';
import { API_URL, doApiMethod } from '../services/apiService';


const FileUpload = ({ handleFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      <button
        onClick={handleButtonClick}
        style={{ border: 'none', background: 'none', padding: '0' }}
      >
        <img
          src="../images/addImage.png"
          alt="Add File"
          style={{ width: '100px', height: '100px' }} 
        />
      </button>
    </div>
  );
};

export default function SignUp() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState("../images/user.png");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("enter signup");
    if (password !== confirmPassword) {
      return;
    }

    const bodyData = {
      fullName: {
        firstName: firstName,
        lastName: lastName
    },
      email: email,
      password: password,
      img: profilePicture
    };
    try {
      const response = await doApiMethod(`${API_URL}/users/register`, 'POST', bodyData);
      // Handle successful login response
      console.log('register successful:', response.data);
      setIsLoggedIn(true)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("userId", response.data.userId)
      setIsLoggedIn(true); 
    } catch (error) {
      // Handle login error
      console.error('Register error:', error);
      alert("there was an error: " , error);
    }

    
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    console.log("file: " , file);
    console.log("url file: " , URL.createObjectURL(file))
    setSelectedProfileImage(URL.createObjectURL(file));
    setProfilePicture(file);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedProfileImage(URL.createObjectURL(file));
    console.log(selectedProfileImage);
    setProfilePicture(file);
    setIsModalOpen(false);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsEditingProfile(true);
  };

  const renderProfileCircle = () => {
    if (isEditingProfile) {
      return (
        <div className="profile-circle">
          <div className="profile-image-upload">
            <label htmlFor="profilePictureUpload" className="profile-image-upload-label">
              <FaUpload />
              <input
                type="file"
                id="profilePictureUpload"
                accept="image/*"
                className="profile-image-upload-input"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile-circle text-center mb-4">
          {selectedProfileImage && <img src={selectedProfileImage} alt="Selected Profile" className="w-25 profile-image-small" />}
          <div className="profile-edit-icon w-75" onClick={openModal}>
            <FaEdit />
          </div>
          {isModalOpen && (
            <div className="profile-image-modal" style={{ top: '0' }}>
              <div className="profile-image-modal-content text-start">
                <span className="profile-image-modal-close fs-2 " role="button" onClick={closeModal}>
                  &times;
                </span>
                <div className="row row-cols-4 g-2" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  <FileUpload handleFileSelect={handleFileSelect} />
                  {Array.from(Array(20), (_, index) => (
                    <div
                      key={`../images/user${index + 1}.png`}
                      className="col text-center"
                      onClick={() => setSelectedProfileImage(`../images/user${index + 1}.png`)}
                    >
                      <img src={`../images/user${index + 1}.png`} alt={`User ${index + 1}`} className="profile-image" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <form >
        <div className="mb-3 form-group">
          <div>
            {renderProfileCircle()}
          </div>
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="form-control"
              value={password}
              minLength="3" maxLength="99"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="mb-3 form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onSubmit={handleSignUp} type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
      <div className="text-center mt-3">
        <p>
          Already have an account? <a href="/user/login">Login</a>
        </p>
      </div>
    </div>
  );
}
