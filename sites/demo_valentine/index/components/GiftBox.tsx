import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

interface GiftBoxProps {
    stopX: number; // X position of the final stop
    stopY: number; // Y position of the final stop
    onComplete?: () => void;
    onVideoEnd?: () => void; // Callback to update milestone content
    onVideoStart?: () => void; // Callback when video starts playing
}

export default function GiftBox({ stopX, stopY, onComplete, onVideoEnd, onVideoStart }: GiftBoxProps) {
    const [showVideo, setShowVideo] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleStopClick = () => {
        setShowVideo(true);
        if (onVideoStart) onVideoStart(); // Notify parent that video is starting
        setTimeout(() => {
            videoRef.current?.play();
        }, 100);
    };

    const handleVideoEnd = () => {
        // Fireworks effect
        const duration = 3000;
        const animationEnd = Date.now() + duration;

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                setShowVideo(false);
                setVideoEnded(true);

                // Update milestone content after fireworks
                if (onVideoEnd) onVideoEnd();

                // Call onComplete AFTER onVideoEnd to ensure videoCompleted is set first
                if (onComplete) onComplete();

                return;
            }

            confetti({
                particleCount: 3,
                angle: randomInRange(55, 125),
                spread: randomInRange(50, 70),
                origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
                colors: ['#F06C9B', '#FFD93D', '#87CEEB', '#FFB6C1'],
            });
        }, 100);
    };

    return (
        <>
            {/* Pointing finger - positioned to the right of the stop */}
            {!showVideo && !videoEnded && (
                <div
                    className="absolute z-30 pointer-events-none"
                    style={{
                        left: stopX + 120, // Position further to the right
                        top: stopY - 250 // Raise higher
                    }}
                >
                    <div className="animate-bounce text-6xl">
                        👈
                    </div>
                </div>
            )}


            {/* Clickable gift box area - only at final stop point */}
            {!showVideo && !videoEnded && (
                <div
                    className="absolute z-40 cursor-pointer"
                    onClick={handleStopClick}
                    style={{
                        left: stopX - 50,
                        top: stopY - 100,
                        width: 200,
                        height: 150
                    }}
                    title="Click to open gift"
                />
            )}

            {/* Video Player Fullscreen */}
            {showVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
                    <div className="relative max-w-6xl w-full mx-4">
                        <div className="relative w-full aspect-video">
                            <iframe
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1"
                                className="w-full h-full rounded-2xl shadow-2xl"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Valentine Love Trip"
                            />

                            {/* Close button */}
                            <button
                                onClick={handleVideoEnd}
                                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg transition-all hover:scale-105"
                            >
                                ✕ Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
