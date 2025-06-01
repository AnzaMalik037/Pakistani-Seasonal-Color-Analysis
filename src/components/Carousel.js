import React from 'react';
import { Carousel } from 'react-bootstrap';

const MyCarousel = () => {
  const slides = [
    {
      text: "Want to start wearing hijab? 🎀 Which colors suit you best?",
      img: "../../assets/hijab.png", 
    },
    {
      text: "You love black, but what if black doesn’t love you back? 🤔",
      img: "../../assets/black.PNG", 
    },
    {
      text: "Silver, gold, or rose gold? 😍 Which metallic enhances your natural beauty?",
      img: "../../assets/metals.PNG", 
    },
    { 
      text: "Thinking of dyeing your hair? ✨️ Which shade complements your skin tone?",
      img: "../../assets/haircolor.PNG", 
    },
  ];

  return (
    <Carousel interval={3020} pause={false}>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={slide.img}
            alt={`Slide ${index + 1}`}
            style={{ height: '350px', objectFit: 'cover' }} // Adjust height here
          />
          <Carousel.Caption>
            <h3>{slide.text}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MyCarousel;