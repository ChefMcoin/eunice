// App.js
import React, { useState, useEffect } from 'react';
import { FaHeart, FaSmileBeam } from 'react-icons/fa';
import './App.css';
import Confetti from 'react-confetti';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import photo1 from './assets/photo1.jpg';
import photo2 from './assets/photo2.jpg';
import photo3 from './assets/photo3.jpg';

function App() {
  const [yesButtonSize, setYesButtonSize] = useState(20);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 50, y: 50 });
  const [message, setMessage] = useState('Get ready...');
  const [showButtons, setShowButtons] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [confetti, setConfetti] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      console.log('Countdown finished!');
      setMessage('Will you be my Valentine?');
      setShowButtons(true);
    }
  }, [countdown]);

  const handleYesClick = () => {
    setMessage('Yay! You made me the happiest person! 💖');
    setConfetti(true);
    setYesClicked(true);
  };

  const handleNoHover = () => {
    const newX = Math.random() * window.innerWidth * 0.8;
    const newY = Math.random() * window.innerHeight * 0.8;
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoClick = () => {
    setYesButtonSize(prevSize => prevSize + 10);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 to-orange-200">
      {confetti && <Confetti />}
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-4xl w-11/12 border-2 border-purple-500">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          {message}
        </h1>
        {!showButtons && (
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800">
            {countdown}
          </h2>
        )}
        {showButtons && (
          <>
            <Carousel
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={3000}
              stopOnHover={false}
              className="my-6"
            >
              <div>
                <img src={photo1} alt="Photo 1" className="rounded-lg" />
              </div>
              <div>
                <img src={photo2} alt="Photo 2" className="rounded-lg" />
              </div>
              <div>
                <img src={photo3} alt="Photo 3" className="rounded-lg" />
              </div>
            </Carousel>
            <div className="flex flex-col gap-4">
              <button
                className="bg-pink-500 text-white px-6 py-3 rounded-lg text-lg sm:text-xl md:text-2xl hover:bg-pink-600 transition-colors"
                onClick={handleYesClick}
              >
                Yes <FaHeart />
              </button>
              {!yesClicked && (
                <button
                  disabled={yesClicked}
                  className={`bg-purple-600 text-white px-6 py-3 rounded-lg text-lg sm:text-xl md:text-2xl hover:bg-purple-700 transition-colors ${
                    yesClicked ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoClick}
                  style={{
                    position: 'absolute',
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                  }}
                >
                  No <FaSmileBeam />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
