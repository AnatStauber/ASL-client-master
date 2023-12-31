
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HeaderAdmin from './comps_admin/headerAdmin';
// בשביל הודעות טוסט צריך קונטיינר שיהיה באפ ואת
// הסי אס אס שלו
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { adminRoutes } from './comps_admin/adminRoutes';
import ClientNav from './client_comps/clientNav.js';
import Home from './client_comps/home';
import Learn from './learn/learn';
import LogIn from './users/logIn';
import SignUp from './users/register';
import Game from './play/game';
import GameOver from './play/gameOver';
import { AuthProvider } from './context';
import Practice from './practice/practice';
import Menu from './client_comps/mainMenu';
import UserDetails from './users/userProfile';
import HighScores from "./general_comps/highScores";
import Footer from "./general_comps/footer";
// מפעיל את האפשרות באקספרס לעבוד עם קבצים


function App() {
  return (
    <AuthProvider>

    <BrowserRouter>
      
      <Routes>
        <Route path="/admin/*" element={<HeaderAdmin />} />
        <Route path="/*" element={<ClientNav />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/menu" element={<Menu />}/>

        {/* ADMIN ROUTES */}
        {adminRoutes()}
      </Routes>

      <Routes>
      <Route path="/learn/" element={< Learn/>} />
      <Route path="/practice/" element={< Practice/>}/>
      <Route path='/play/' element={<Game />} /> 
      <Route path='/play/gameOver' element={<GameOver />} /> 
      <Route path='/highScores' element={<HighScores />} /> 

      
      </Routes>

      <Routes>
      <Route path="/user/login" element={< LogIn/>} />
      <Route path="/user/register" element={< SignUp/>} /> 
      <Route path="/user/userProfile" element={< UserDetails/>} /> 
     {/* <Route path="/*" element={<h2>Page 404</h2>}/> */}
     <Route path="/*" element={<Footer />} />
      </Routes>
      <ToastContainer position="top-left" theme="colored" />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
