import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem('authToken');
    navigate(token ? '/chatbot' : '/login');
  };

  return (
    <div className="main">
      {/* Left Text Content */}
      <div className="txt">
        <h2>Empowering Minds. Connecting Knowledge.</h2>
        <p>
         A smart, collaborative platform to explore, create, and share insights across communities.

</p>

        <div className="buttons">
          <button className="button" id="btn1" onClick={handleGetStarted}>
            Explore Articles 
          </button>

          
        </div>
      </div>

      {/* Right Image Section */}
      <div className="pictures">
        <div className="img" id="img1" />
        <div className="img" id="img2" />
        <div className="img" id="img3" />
      </div>

      {/* Brand Logos */}
      <div className="brands">
  <h4 style={{ textAlign: 'center', marginBottom: '18px', color: '#218838', fontWeight: '600', fontSize: '1.3rem' }}>
    Various Brands Using Our Website
  </h4>
  <img src="https://pngimg.com/d/google_PNG19644.png" alt="Google" />
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png"
    alt="Slack"
  />
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Agworld_Logo.svg/2560px-Agworld_Logo.svg.png"
    alt="Agworld"
  />
  <img
    src="https://download.logo.wine/logo/Rio_Tinto_(corporation)/Rio_Tinto_(corporation)-Logo.wine.png"
    alt="Rio Tinto"
  />
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Heroku_logo.svg/2560px-Heroku_logo.svg.png"
    alt="Heroku"
  />
</div>
    </div>
  );
};

export default HeroSection;
