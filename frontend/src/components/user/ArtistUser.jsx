import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";
import Modal from "./Modal";

export default function ArtistUser() {
  const [artists, setArtists] = useState([]);
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  // Fetch data from backend using axios
  useEffect(() => {
    axios.get("http://localhost:8080/artist")
      .then((response) => {
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar openModal={openModal} />
        <main className="flex-1 bg-gray-900 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Render Artist Cards */}
            {artists.map((artist) => (
              <div key={artist.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {artist.name}
                </h3>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Player />
      {modalType && <Modal type={modalType} onClose={closeModal} />}
    </>
  );
}
