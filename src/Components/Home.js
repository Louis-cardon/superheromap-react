import React from 'react';
import { useNavigate } from "react-router-dom";
import '../Styles/home.css'; // adjust this import to match your file structure

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  }

  return (
    <div className="hero-container">
      <div className="hero-part left-part">
        <button className="hero-button" onClick={() => handleButtonClick("/Incident")}>Go to Incident</button>
      </div>
      <div className="hero-part right-part">
        <button className="hero-button" onClick={() => handleButtonClick("/Hero")}>Go to Hero</button>
      </div>
    </div>
  );
}

export default Home;
