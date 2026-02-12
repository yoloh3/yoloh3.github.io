import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

interface GiftBoxProps {
    stopX: number; // X position of the final stop
    stopY: number; // Y position of the final stop
    onComplete?: () => void;
    onVideoEnd?: () => void; // Callback to update milestone content
}

export default function GiftBox({ stopX, stopY, onComplete, onVideoEnd }: GiftBoxProps) {
    const [showVideo, setShowVideo] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleStopClick = () => {
        setShowVideo(true);
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

        if (onComplete) onComplete();
    };

    return (
        <>
            {/* Pointing finger - positioned higher above the stop */}
            {!showVideo && !videoEnded && (
                <div
                    className="absolute transform -translate-x-1/2 z-30 pointer-events-none"
                    style={{
                        left: stopX,
                        top: stopY - 180 // Much higher above the stop
                    }}
                >
                    <div className="animate-bounce text-6xl">
                        👇
                    </div>
                </div>
            )}

            {/* Full-screen clickable overlay - click anywhere to trigger video */}
            {!showVideo && !videoEnded && (
                <div
                    className="fixed inset-0 z-25 cursor-pointer"
                    onClick={handleStopClick}
                    style={{
                        background: 'transparent'
                    }}
                />
            )}

            {/* Video Player Fullscreen */}
            {showVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
                    <div className="relative max-w-6xl w-full mx-4">
                        <video
                            ref={videoRef}
                            src="/photos/timelapse.mp4"
                            className="w-full rounded-2xl shadow-2xl"
                            onEnded={handleVideoEnd}
                            controls
                            autoPlay
                        />
                    </div>
                </div>
            )}
        </>
    );
}
