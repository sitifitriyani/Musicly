import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";
import { HeartPulse, Play, Pause } from "lucide-react";
import axios from "axios";

export default function TracksUser() {
  const [tracks, setTracks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // State untuk status Play/Pause

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/music")
      .then((response) => {
        setTracks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching track data:", error);
        setAlertMessage("Failed to load tracks.");
      });
  }, []);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (trackId) => {
    let updatedFavorites;
    if (favorites.includes(trackId)) {
      updatedFavorites = favorites.filter((id) => id !== trackId);
    } else {
      updatedFavorites = [...favorites, trackId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const playTrack = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      // Jika track yang sama sedang diputar, set ke pause (hapus player)
      setIsPlaying(false);
      setCurrentTrack(null); // Hentikan pemutaran, player menghilang
    } else {
      // Jika track berbeda atau sedang di-pause, set ke play
      setCurrentTrack(track);
      setIsPlaying(true); // Lagu mulai diputar
    }
  };

  const playNextTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(
        (track) => track.id === currentTrack.id
      );
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
      setIsPlaying(true); // Pastikan track selanjutnya langsung diputar
    }
  };

  const playPreviousTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(
        (track) => track.id === currentTrack.id
      );
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrack(tracks[prevIndex]);
      setIsPlaying(true); // Pastikan track sebelumnya langsung diputar
    }
  };

  return (
    <>
      <Header />
      {alertMessage && (
        <div className="alert alert-info p-3 bg-blue-100 text-blue-700 border border-blue-300 rounded">
          {alertMessage}
        </div>
      )}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-900 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="relative bg-gray-800 p-6 rounded-lg shadow-lg h-100"
              >
                <img
                  src={
                    track.imageUrl ||
                    `https://via.placeholder.com/150?text=Card+${track.id}`
                  }
                  alt={track.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <button
                  className="absolute top-2 right-2"
                  onClick={() => toggleFavorite(track.id)}
                >
                  <HeartPulse
                    className={`w-6 h-6 size-16 stroke-[3] ${
                      favorites.includes(track.id)
                        ? "text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>

                {/* Play/Pause Button */}
                <button
                  className="absolute bottom-2 right-2 text-white"
                  onClick={() => playTrack(track)}
                >
                  {currentTrack?.id === track.id && isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {track.title}
                </h3>
                <p className="text-gray-400">
                  {track.album?.name ?? "Unknown Album"} -{" "}
                  {track.album?.artist?.name ?? "Unknown Artist"}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Player Component */}
      {currentTrack && isPlaying && (
        <Player
          track={currentTrack}
          isPlaying={isPlaying}
          onNext={playNextTrack}
          onPrevious={playPreviousTrack}
        />
      )}
    </>
  );
}
