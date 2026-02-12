import React, { useState } from 'react';
import PasswordGate from './components/PasswordGate';
import RoadTrip from './components/RoadTrip';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.LOCKED);

  // Audio Ref
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handleUnlock = () => {
    setGameState(GameState.DRIVING);
    // Start music early
    const audio = new Audio("https://cdn.pixabay.com/audio/2022/10/05/audio_6861c8a526.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio autoplay prevented", e));
    audioRef.current = audio;
  };

  return (
    <>
      {gameState === GameState.LOCKED ? (
        <PasswordGate onUnlock={handleUnlock} />
      ) : (
        <RoadTrip />
      )}
    </>
  );
};

export default App;
