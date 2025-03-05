import { useState } from 'react';
import './App.css';
import { Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';



function App() {

  return (
    <div className='App'>
      
      <Navbar/>

      <Routes>
        <Route
          path='/'
          element={<HomePage/>}
        />

        <Route 
          path='/signup'
          element={<IsAnon><SignupPage/></IsAnon>}
        />
        
        <Route 
          path='/login'
          element={<IsAnon><LoginPage/></IsAnon>}
        />
        
      </Routes>
    </div>
  )
}

export default App
