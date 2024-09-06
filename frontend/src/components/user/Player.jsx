import React, { useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const Player = ({ track, onNext, onPrevious }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (track) {
      audioRef.current?.play();
    }
  }, [track]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="flex items-center justify-between max-w-5xl mx-auto space-x-6">
        {/* Player Title */}
        <h2 className="text-lg font-semibold">Now Playing</h2>

        {/* Song/Track Player */}
        <iframe
          src={track?.songUrl}
          className="rounded-lg w-full h-16 bg-black"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        {/* Player Controls */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition duration-300"
            onClick={onPrevious}
          >
            <SkipBack className="w-6 h-6 text-white" />
          </button>
          <button
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition duration-300"
            onClick={onNext}
          >
            <SkipForward className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
