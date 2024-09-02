import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";
import Modal from "./Modal";

export default function AlbumUser() {
  const [modalType, setModalType] = useState(null);
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/album")
      .then((response) => {
        setAlbum(response.data);
      })
      .catch((error) => {
        console.error("Error fetching album data:", error);
      });
  }, []);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar openModal={openModal} />
        <main className="flex-1 bg-gray-900 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {album.map((item) => (
              <div key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-400">
                  {item.artist.name}
                </p>
                <p className="text-gray-400">
                  {item.releaseYear}
                </p>
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
