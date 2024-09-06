import { useState, useEffect } from "react";
import axios from "axios";
import { Info } from "lucide-react"; // Import ikon info dari Lucide React
import Sidebar from "./Sidebar";
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

  // Function to handle info click and show alert with artist name and country
  const handleInfoClick = (artist) => {
    alert(`Nama: ${artist.name}\nCountry: ${artist.country}`);
  };

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
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {artist.name}
                  </h3>
                  {/* Add Info Icon and Alert on Click */}
                  <Info
                    className="text-white cursor-pointer"
                    onClick={() => handleInfoClick(artist)}
                  />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      {modalType && <Modal type={modalType} onClose={closeModal} />}
    </>
  );
}
