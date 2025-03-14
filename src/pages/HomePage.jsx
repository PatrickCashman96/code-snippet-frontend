import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="matrix-container">
      
        <h1 className="matrix-title">Enter the Snippet Matrix</h1>
        <p className="matrix-text">
          Organize, tag, and share code snippets in your personal digital reality.  
          Access reusable functions and hacks instantly.
        </p>
        <Link to="https://www.linkedin.com">
            <button className="matrix-btn blue-pill">Take the Red Pill</button>
          </Link>
        <Link to="/snippets" >
          <button className="matrix-btn">Take the Blue Pill</button>
        </Link>
      
    </div>
  );
};

export default HomePage;
