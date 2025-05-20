import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import MyCarousel from '../components/Carousel';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='body'>
      <div className="container">
        <p>❤</p>
        <h1>Welcome to the Seasonal Color Analysis System</h1>
        <MyCarousel />
        <p>
          Discover your seasonal palette by uploading your photo and vein color. Your picture will not be saved as we priorities privacy
        </p>
        <button className="button" onClick={() => navigate('/upload')}>
          Seasonal Color Analysis
        </button>
      </div>

      <div className='AboutUs'>
        <p>❤</p>
        <h3>BCS Comsats Wah 8th Semester Project</h3>
        <h6>
          Student: Anza Malik (FA21-BCS-037)
          Romysa Siddiqui (FA21-BCS-069)
        </h6>
        <p>
          Big Thank you to every single one of the 100 people who participated in data collection 💌
        </p>
      </div>
    </div>
  );
};

export default HomePage;