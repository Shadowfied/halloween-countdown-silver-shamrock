import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const audio = useRef<HTMLAudioElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentMonth = new Date().toLocaleDateString(undefined, {
    month: 'numeric',
  });
  const currentYear = new Date().getUTCFullYear();
  const currentDay = new Date().toLocaleDateString(undefined, {
    day: 'numeric',
  });
  const yearToCountTo =
    Number(currentMonth) <= 10 ? currentYear : currentYear + 1;

  const nextHalloween = new Date(`10/31/${yearToCountTo}`);

  const timeBetween = nextHalloween.getTime() - new Date().getTime();
  const daysBetween = Math.ceil(timeBetween / (1000 * 3600 * 24));

  const onClick = () => {
    setIsPlaying(!isPlaying);
    audio.current?.paused ? audio.current?.play() : audio.current?.pause();
    video.current?.paused ? video.current.play() : video.current?.pause();
  };

  useEffect(() => {
    if (video.current) {
      video.current.currentTime = 0.2;
    }
  }, []);

  return (
    <div
      className='App'
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      key={currentDay}
    >
      <audio
        ref={audio}
        src={`/assets/audio/${daysBetween}.mp3`}
        loop
        playsInline
      />
      <video
        ref={video}
        src='/assets/video/vid.mp4'
        loop
        playsInline
        poster='/assets/images/poster.jpg'
      />
      {!isPlaying && (
        <>
          <div className='overlay' />
          <div className='click-to-play'>▶️</div>
        </>
      )}
    </div>
  );
}

export default App;
