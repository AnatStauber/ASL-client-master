import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    (localStorage.getItem('token')!= null) ? true : false
  );
  const [isAdmin,setIsAdmin]=useState(
    (localStorage.getItem('role')=="admin") ? true : false
  )





  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,isAdmin,setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };