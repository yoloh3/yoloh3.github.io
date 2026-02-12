import React, { useRef, useState, useEffect } from 'react';
import { MILESTONES, ROAD_LENGTH, THEME, VIEWPORT_HEIGHT } from '../constants';
import { generateTerrainPath, getTerrainPoint } from '../utils/terrainUtils';
import Motorcycle from './Motorcycle';
import GiftBox from './GiftBox';
import confetti from 'canvas-confetti';

const RoadTrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);

  // Constants
  const BIKE_OFFSET_X = 150;
  const SCROLL_SPEED_NORMAL = 3.5; // Slower than 5, but faster than original
  const SCROLL_SPEED_SLOW = 1;     // Slow down more at stops
  const terrainPath = generateTerrainPath(ROAD_LENGTH, VIEWPORT_HEIGHT + 200);

  // Initialize bike state immediately with correct position so it doesn't "fall"
  const [bikeState, setBikeState] = useState(() => {
    const { y, angle } = getTerrainPoint(BIKE_OFFSET_X);
    return { y, angle };
  });

  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false); // Track if video has been watched

  // Auto-scroll loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (isPlaying && containerRef.current) {
        // Determine Speed
        let currentSpeed = SCROLL_SPEED_NORMAL;
        if (activeMilestone !== null) {
          currentSpeed = SCROLL_SPEED_SLOW; // Slow down to admire the memory
        }

        // Apply Scroll
        const newScroll = containerRef.current.scrollLeft + currentSpeed;
        const maxScroll = ROAD_LENGTH - window.innerWidth;

        // Check if we reached the end
        if (newScroll < maxScroll) {
          containerRef.current.scrollLeft = newScroll;
          setScrollX(newScroll);
          animationFrameId = requestAnimationFrame(animate);
        } else {
          // Reached the end
          setIsPlaying(false);
          containerRef.current.scrollLeft = maxScroll;
          setScrollX(maxScroll);

          // Wait 5 seconds before showing the restart popup
          setTimeout(() => {
            setIsFinished(true);
          }, 5000);
        }
      } else if (!isFinished && isPlaying) {
        // Keep loop running if playing but maybe stuck (resume logic)
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, activeMilestone, isFinished]);


  // Update bike position based on scroll
  useEffect(() => {
    const bikeWorldX = scrollX + BIKE_OFFSET_X;
    const { y, angle } = getTerrainPoint(bikeWorldX);
    setBikeState({ y, angle });

    // Check milestones
    let foundActive = false;
    MILESTONES.forEach(m => {
      const mX = (m.positionX / 100) * ROAD_LENGTH;
      // Trigger distance: slowing down range
      if (Math.abs(bikeWorldX - mX) < 200) {
        setActiveMilestone(m.id);
        foundActive = true;
      }
    });
    if (!foundActive) setActiveMilestone(null);

  }, [scrollX]);



  const handleRestart = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      setScrollX(0);
      setIsPlaying(true);
      setIsFinished(false);
      setActiveMilestone(null);
    }
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${THEME.sky}`}>
      {/* Header UI */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {/* Music Control with Text */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/90 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          <span className="text-xl">{isPlaying ? '⏸️' : '▶️'}</span>
          <span className="text-sm font-medium text-gray-700">
            {isPlaying ? 'Music' : 'Music'}
          </span>
        </button>

        {/* Restart Button */}
        <button
          onClick={handleRestart}
          className="bg-white/90 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          <span className="text-xl">🔄</span>
          <span className="text-sm font-medium text-gray-700">Restart</span>
        </button>
      </div>



      {/* Parallax Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sun */}
        <div className="absolute top-10 right-1/4 text-8xl animate-[bounce_3s_infinite]" style={{ transform: `translateX(${-scrollX * 0.1}px)` }}>☀️</div>
        {/* Clouds */}
        <div className="absolute top-20 left-10 text-6xl opacity-80" style={{ transform: `translateX(${-scrollX * 0.2}px)` }}>☁️</div>
        <div className="absolute top-40 left-1/2 text-5xl opacity-70" style={{ transform: `translateX(${-scrollX * 0.25}px)` }}>☁️</div>
        {/* Mountains */}
        <div className="absolute bottom-0 left-0 h-64 w-[120%] bg-purple-300/50 rounded-t-[50%] blur-sm" style={{ transform: `translateX(${-scrollX * 0.4}px)` }}></div>
      </div>

      {/* Scroll Container (Hidden Scrollbar but Allow Touch) */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto no-scrollbar relative"
        style={{ scrollBehavior: 'auto' }} // Disable smooth scroll for manual js control
      >
        {/* The World Container */}
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
            {/* The fill */}
            <path d={terrainPath} fill="url(#grassGradient)" stroke="#555" strokeWidth="8" />

            {/* Dashed Road Line */}
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
                  top: mY - 20, // Sit on top of grass
                  zIndex: 10,
                  scale: isActive ? '1.1' : '1'
                }}
              >
                <div className="flex flex-col items-center group">

                  {/* Photo Frame */}
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
                        // Don't show emoji in Polaroid for Valentine milestone (ID 6)
                        m.id !== 6 && <span className="text-3xl">{m.emoji}</span>
                      )}
                    </div>
                  </div>

                  {/* Sign Post Content */}
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
                          {/* Show contentAfterVideo if video completed and it exists, otherwise show regular content */}
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

          {/* Gift Box Interaction at Final Stop */}
          {(() => {
            const finalMilestone = MILESTONES[MILESTONES.length - 1];
            const finalStopX = (finalMilestone.positionX / 100) * ROAD_LENGTH;
            const finalStopY = getTerrainPoint(finalStopX).y;
            return (
              <GiftBox
                stopX={finalStopX}
                stopY={finalStopY}
                onVideoEnd={() => setVideoCompleted(true)}
              />
            );
          })()}

          {/* Bike (Absolute position relative to world, updated via scroll) */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: scrollX + BIKE_OFFSET_X, // Moves with scroll view
              top: bikeState.y - 70, // Adjust to sit on line
              transition: 'top 0.1s linear'
            }}
          >
            <Motorcycle rotation={bikeState.angle} />
            {/* Speech bubble if milestone active */}
            {activeMilestone && (
              <div className="absolute -top-16 -right-10 bg-white p-2 rounded-lg rounded-bl-none shadow-md text-xs font-bold animate-bounce z-30 whitespace-nowrap">
                {activeMilestone === 6 ? "❤️️️️️️❤️️️️️❤️️️️️️" : "✨✨✨"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadTrip;
