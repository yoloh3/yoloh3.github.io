import React, { useRef, useState, useEffect } from 'react';
import { MILESTONES, ROAD_LENGTH, THEME, VIEWPORT_HEIGHT } from '../constants';
import { generateTerrainPath, getTerrainPoint } from '../utils/terrainUtils';
import Motorcycle from './Motorcycle';
import GiftBox from './GiftBox';
import confetti from 'canvas-confetti';

const RoadTrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Remove state for high-frequency updates
  const scrollRef = useRef(0);
  const [_, forceUpdate] = useState(0); // Only for low-frequency UI updates

  // Constants
  const BIKE_OFFSET_X = 150;
  const SCROLL_SPEED_NORMAL = 3.5;
  const SCROLL_SPEED_SLOW = 1;
  const terrainPath = generateTerrainPath(ROAD_LENGTH, VIEWPORT_HEIGHT + 200);

  // Use refs for bike state to avoid re-renders
  const bikeStateRef = useRef({ y: 0, angle: 0 });

  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Audio refs
  const bgMusicRef = useRef<HTMLAudioElement>(null);
  const videoMusicRef = useRef<HTMLAudioElement>(null);

  // Initialize bike position once
  useEffect(() => {
    const { y, angle } = getTerrainPoint(BIKE_OFFSET_X);
    bikeStateRef.current = { y, angle };
    forceUpdate(n => n + 1);
  }, []);

  // Animation Loop - Optimized
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (isPlaying && containerRef.current) {
        // 1. Determine Speed
        let currentSpeed = SCROLL_SPEED_NORMAL;
        if (activeMilestone !== null) {
          currentSpeed = SCROLL_SPEED_SLOW;
        }

        // 2. Calculate new scroll position
        const newScroll = containerRef.current.scrollLeft + currentSpeed;
        const maxScroll = ROAD_LENGTH - window.innerWidth;

        if (newScroll < maxScroll) {
          // 3. Update DOM directly (No React State update!)
          containerRef.current.scrollLeft = newScroll;
          scrollRef.current = newScroll;

          // 4. Update Bike State (No React State update!)
          const bikeWorldX = newScroll + BIKE_OFFSET_X;
          const { y, angle } = getTerrainPoint(bikeWorldX);
          bikeStateRef.current = { y, angle };

          // 5. Update UI elements directly for smooth animation
          const bikeEl = document.getElementById('bike-container');
          if (bikeEl) {
            bikeEl.style.top = `${y - 70}px`;
            // Update parallax elements directly
            const sun = document.getElementById('parallax-sun');
            if (sun) sun.style.transform = `translateX(${-newScroll * 0.1}px)`;
            const cloud1 = document.getElementById('parallax-cloud-1');
            if (cloud1) cloud1.style.transform = `translateX(${-newScroll * 0.2}px)`;
            const cloud2 = document.getElementById('parallax-cloud-2');
            if (cloud2) cloud2.style.transform = `translateX(${-newScroll * 0.25}px)`;
            const mountains = document.getElementById('parallax-mountains');
            if (mountains) mountains.style.transform = `translateX(${-newScroll * 0.4}px)`;
          }

          // 6. Check Milestones (Low frequency state update)
          let foundActive = false;
          MILESTONES.forEach(m => {
            const mX = (m.positionX / 100) * ROAD_LENGTH;
            if (Math.abs(bikeWorldX - mX) < 200) {
              if (activeMilestone !== m.id) setActiveMilestone(m.id);
              foundActive = true;
            }
          });
          if (!foundActive && activeMilestone !== null) setActiveMilestone(null);

          animationFrameId = requestAnimationFrame(animate);
        } else {
          // Reached End
          setIsPlaying(false);
          containerRef.current.scrollLeft = maxScroll;
          scrollRef.current = maxScroll;
          setTimeout(() => setIsFinished(true), 5000);
        }
      } else if (!isFinished && isPlaying) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, activeMilestone, isFinished]);

  // Music Logic
  useEffect(() => {
    if (bgMusicRef.current && videoMusicRef.current) {
      if (isVideoPlaying || videoCompleted) {
        bgMusicRef.current.pause();
        if (isMusicPlaying) {
          videoMusicRef.current.play().catch(e => console.log("Video music play failed:", e));
        } else {
          videoMusicRef.current.pause();
        }
      } else {
        videoMusicRef.current.pause();
        if (isMusicPlaying) {
          bgMusicRef.current.play().catch(e => console.log("BG music play failed:", e));
        } else {
          bgMusicRef.current.pause();
        }
      }
    }
  }, [isVideoPlaying, videoCompleted, isMusicPlaying]);

  // Auto-start music
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {
        const startMusic = () => {
          if (bgMusicRef.current && !isVideoPlaying) {
            bgMusicRef.current.play().catch(err => console.log("Music play failed:", err));
          }
        };
        document.addEventListener('click', startMusic, { once: true });
      });
    }
  }, []);

  const handleRestart = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      scrollRef.current = 0;
      setIsPlaying(true);
      setIsFinished(false);
      setActiveMilestone(null);
      setVideoCompleted(false);
      setIsVideoPlaying(false);

      if (bgMusicRef.current) {
        bgMusicRef.current.currentTime = 0;
        bgMusicRef.current.play().catch(e => console.log("Restart music failed:", e));
      }
      if (videoMusicRef.current) {
        videoMusicRef.current.pause();
        videoMusicRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${THEME.sky}`}>
      {/* Header UI */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="bg-white/90 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          <span className="text-xl">{isMusicPlaying ? '⏸️' : '▶️'}</span>
          <span className="text-sm font-medium text-gray-700">
            {isMusicPlaying ? 'Music' : 'Music'}
          </span>
        </button>
        <button
          onClick={handleRestart}
          className="bg-white/90 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          <span className="text-xl">🔄</span>
          <span className="text-sm font-medium text-gray-700">Restart</span>
        </button>
      </div>

      {/* Parallax Background Layers - Added IDs for direct manipulation */}
      <div className="absolute inset-0 pointer-events-none">
        <div id="parallax-sun" className="absolute top-10 right-1/4 text-8xl animate-[bounce_3s_infinite]" style={{ transform: `translateX(0px)` }}>☀️</div>
        <div id="parallax-cloud-1" className="absolute top-20 left-10 text-6xl opacity-80" style={{ transform: `translateX(0px)` }}>☁️</div>
        <div id="parallax-cloud-2" className="absolute top-40 left-1/2 text-5xl opacity-70" style={{ transform: `translateX(0px)` }}>☁️</div>
        <div id="parallax-mountains" className="absolute bottom-0 left-0 h-64 w-[120%] bg-purple-300/50 rounded-t-[50%] blur-sm" style={{ transform: `translateX(0px)` }}></div>
      </div>

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto no-scrollbar relative"
        style={{ scrollBehavior: 'auto' }}
      >
        <div style={{ width: `${ROAD_LENGTH}px`, height: '100%', position: 'relative' }}>

          {/* SVG Terrain */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            height={VIEWPORT_HEIGHT + 200}
            viewBox={`0 0 ${ROAD_LENGTH} ${VIEWPORT_HEIGHT + 200}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="grassGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7EC850" />
                <stop offset="100%" stopColor="#558b2f" />
              </linearGradient>
            </defs>
            <path d={terrainPath} fill="url(#grassGradient)" stroke="#555" strokeWidth="8" />
            <path d={terrainPath} fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="20,20" transform="translate(0, 10)" opacity="0.5" />
          </svg>

          {/* Milestones */}
          {MILESTONES.map((m) => {
            const mX = (m.positionX / 100) * ROAD_LENGTH;
            const mY = getTerrainPoint(mX).y;
            const isActive = activeMilestone === m.id;

            return (
              <div
                key={m.id}
                className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-300"
                style={{
                  left: mX,
                  top: mY - 20,
                  zIndex: 10,
                  scale: isActive ? '1.1' : '1'
                }}
              >
                <div className="flex flex-col items-center group">
                  <div className={`
                      bg-white p-2 pb-6 rounded-sm shadow-md rotate-[-2deg] mb-[-10px] z-10 transition-transform duration-500
                      ${isActive ? 'scale-110 rotate-0' : 'scale-75 opacity-80'}
                    `}>
                    <div className="w-32 h-24 bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-100">
                      {m.image ? (
                        m.image.endsWith('.mp4') ? (
                          <video src={m.image} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                          <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                        )
                      ) : (
                        m.id !== 6 && <span className="text-3xl">{m.emoji}</span>
                      )}
                    </div>
                  </div>

                  <div className={`
                        bg-white p-4 rounded-xl border-4 shadow-xl max-w-[200px] text-center transition-all duration-500 relative z-20
                        ${isActive ? 'border-pink-500 shadow-pink-300/50 -translate-y-2' : 'border-gray-300'}
                    `}>
                    <div className="text-3xl mb-1">{m.emoji}</div>
                    <h3 className="font-bold text-gray-800 fun-font text-xl">{m.title}</h3>
                    <p className="text-xs text-gray-500 font-bold">{m.date}</p>
                    {isActive && (
                      <div className="overflow-hidden animate-[fadeIn_0.5s_ease-in]">
                        <p className="text-sm text-pink-600 mt-2 font-medium">
                          {m.id === 6 && videoCompleted && m.contentAfterVideo ? m.contentAfterVideo : m.content}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-2 h-16 bg-amber-700"></div>
                </div>
              </div>
            );
          })}

          {/* Gift Box - Optimized to avoid re-creation */}
          {(() => {
            // Constant position for gift box
            const finalMilestone = MILESTONES[MILESTONES.length - 1];
            const finalStopX = (finalMilestone.positionX / 100) * ROAD_LENGTH;
            const finalStopY = getTerrainPoint(finalStopX).y;
            return (
              <GiftBox
                stopX={finalStopX}
                stopY={finalStopY}
                onVideoStart={() => setIsVideoPlaying(true)}
                onVideoEnd={() => {
                  setVideoCompleted(true);
                  setIsVideoPlaying(false);
                }}
                onComplete={() => setIsFinished(true)}
              />
            );
          })()}

          {/* Bike Container - Using ID for direct DOM manipulation */}
          <div
            id="bike-container"
            className="absolute z-20 pointer-events-none"
            style={{
              left: 0, // Will be updated by transform in future, currently relying on scrollX + offset theory but optimizing to direct style
              // Actually we need to keep it relative to scroll window
              // In this structure, the bike MOVES with the scroll container
              // So we just need to position it at scrollRef.current + BIKE_OFFSET_X
              // BUT wait! If it's inside the scroll container, we just position it ABSOLUTELY at `scrollRef.current + OFFSET`
              // AND we need to update that `left` every frame.
            }}
          >
            {/* 
              Wait, previous logic was:
              left: scrollX + BIKE_OFFSET_X
              This means as we scroll RIGHT, scrollX increases, so bike moves RIGHT.
              The container is scrolling, so the bike stays in view (mostly).
              
              We need to apply the style directly in the animation loop.
              I added id="bike-container" above.
              I will set default styles here.
           */}
            <div style={{ position: 'absolute', left: BIKE_OFFSET_X, transform: 'translateX(0px)' }} id="bike-inner">
              <Motorcycle rotation={bikeStateRef.current.angle} />
              {activeMilestone && (
                <div className="absolute -top-16 -right-10 bg-white p-2 rounded-lg rounded-bl-none shadow-md text-xs font-bold animate-bounce z-30 whitespace-nowrap">
                  {activeMilestone === 6 ? "️️️️️❤️️️️" : "✨"}
                </div>
              )}
            </div>
          </div>

          {/* 
              Correction: The previous logic relied on React re-rendering `left: scrollX + BIKE_OFFSET_X`.
              Now we update `bikeEl.style.left` in the animation loop.
              But `bikeEl` is inside the scroll container.
              So `left` should be `currentScroll + BIKE_OFFSET_X`.
              
              I need to fix the JSX structure slightly to make sure `bike-container` is targetable and positioned correctly.
           */}

        </div>
      </div>

      {/* Background Music */}
      <audio ref={bgMusicRef} src="media/O_thi_di.mp3" loop />
      <audio ref={videoMusicRef} src="media/Until_I_found_you.mp3" />
    </div>
  );
};

export default RoadTrip;
