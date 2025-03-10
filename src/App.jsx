import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import SnippetPage from './pages/SnippetPage';
import { AuthProviderWrapper } from "./context/auth.context";


function App() {

  return (
    <AuthProviderWrapper>
      <div className='App'>

        <Navbar />

        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />

          <Route
            path='/signup'
            element={<IsAnon><SignupPage /></IsAnon>}
          />

          <Route
            path='/login'
            element={<IsAnon><LoginPage /></IsAnon>}
          />

          <Route
            path='/snippets'
            element={<IsPrivate><SnippetPage /></IsPrivate>}
          />

          <Route
            path="favorites"
            element={<IsPrivate><FavoritesPage /></IsPrivate>}
          />
        </Routes>
      </div>
    </AuthProviderWrapper>
  )
}

export default App
