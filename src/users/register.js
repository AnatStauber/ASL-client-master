import React, { useState,  useRef  } from 'react';
import { API_URL, doApiMethod } from '../services/apiService';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const fileRef = useRef();
  
  const handleSignUp = async(e) => {
   

    e.preventDefault();
   
    try {
      console.log(fileRef.current.files[0])
      if(fileRef.current.files.length === 0){
        return alert("you need to choose file and then upload it")
      }
      let myFile = fileRef.current.files[0];
      if(myFile.size > 2 * 1024 * 1024){
        return alert("file too big")
      }
    let bodyData= new FormData();
    bodyData={ email: email,
      fullName : {firstName:firstName,
        lastName:lastName
      },
      password:password,
    
    //  img:profilePicture
    }
    bodyData.append("myFile",myFile)
    console.log(bodyData)
    let url = API_URL + "/users/";
    let resp = await doApiMethod(url,'POST',bodyData)
    console.log(resp.data);
  }
  catch (err) {

    console.log(err.response);
    alert("There problem , try again later")
  }
  };


  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <form onSubmit={handleSignUp}>
        <div className="mb-3 form-group">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3 form-group">
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
        <div className="mb-3 form-group">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture:
          </label>
          <input
            type="file"
            id="profilePicture"
            // accept="image/*"
            className="form-control"
            ref={fileRef}
            // onChange={handleProfilePictureChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
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
