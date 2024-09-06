import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";
import { Heart, Play } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Favorite() {
  const [tracks, setTracks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all tracks
    axios.get("http://localhost:8080/api/music")
      .then((response) => {
        setTracks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching track data:", error);
      });
  }, []);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  const playNextTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
    }
  };

  const playPreviousTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrack(tracks[prevIndex]);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-900 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tracks
              .filter(track => favorites.includes(track.id)) // Filter tracks to only include favorites
              .map((track) => (
                <div key={track.id} className="relative bg-gray-800 p-4 rounded-lg shadow-lg">
                  <img
                    src={track.imageUrl || `https://via.placeholder.com/150?text=Card+${track.id}`}
                    alt={track.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <button
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute bottom-2 right-2 text-white"
                    onClick={() => playTrack(track)}
                  >
                    <Play className="w-6 h-6" />
                  </button>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {track.title}
                  </h3>
                  <p className="text-gray-400">
                    {track.album?.name ?? 'Unknown Album'} - {track.album?.artist?.name ?? 'Unknown Artist'}
                  </p>
                </div>
              ))}
          </div>
        </main>
      </div>
      <Player
        track={currentTrack}
        onNext={playNextTrack}
        onPrevious={playPreviousTrack}
      />
    </>
  );
}
