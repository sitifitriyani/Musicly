import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";
import { Heart } from "lucide-react";

const Home = () => {
  const [modalType, setModalType] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const toggleFavorite = (item) => {
    if (favorites.includes(item)) {
      setFavorites(favorites.filter(fav => fav !== item));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar openModal={openModal} />
        <main className="flex-1 bg-gray-900 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="relative bg-gray-800 p-4 rounded-lg shadow-lg">
                <img
                  src={`https://via.placeholder.com/150?text=Card+${item}`}
                  alt={`Card ${item}`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <button
                  className={`absolute top-2 right-2 text-white ${
                    favorites.includes(item) ? "text-red-500" : "text-white"
                  }`}
                  onClick={() => toggleFavorite(item)}
                >
                  <Heart className="w-6 h-6" />
                </button>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Card Title {item}
                </h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Player />
      {/* {modalType && <Modal type={modalType} onClose={closeModal} />} */}
    </>
  );
};

export default Home;
