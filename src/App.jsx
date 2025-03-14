import { useState, useRef } from 'react';
import { useEffect } from 'react';
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
import FavoritesPage from './pages/FavoritesPage';
import SnippetDetailPage from './pages/SnippetDetailPage';
import MySnippetsPage from './pages/MySnippetsPage';
import EditSnippetPage from './pages/EditSnippetPage';

function App() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, index) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = index * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        } else {
          drops[index]++;
        }
      });
    };

    const intervalId = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AuthProviderWrapper>
      <div className='App'>
        <canvas ref={canvasRef} className='matrix-background'></canvas>

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
            element={<IsPrivate><SnippetPage/></IsPrivate>}
          />

          <Route
            path='/my-snippets'
            element={<IsPrivate><MySnippetsPage/></IsPrivate>}
          />

          <Route
            path='/snippets/:id'
            element={<IsPrivate><SnippetDetailPage/></IsPrivate>}
          />
          
          <Route
            path='/snippets/edit/:id'
            element={<IsPrivate><EditSnippetPage/></IsPrivate>}
          />

          <Route
            path="/favorites"
            element={<IsPrivate><FavoritesPage /></IsPrivate>}
          />
        </Routes>
      </div>
    </AuthProviderWrapper>
  )
}

export default App
