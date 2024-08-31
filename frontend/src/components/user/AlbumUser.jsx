import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Header from "./Header";

export default function AlbumUser() {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar openModal={openModal} />
        <main className="flex-1 bg-gray-900 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Contoh Card */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <img
                  src={`https://via.placeholder.com/150?text=Card+${item}`}
                  alt={`Card ${item}`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
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
      {modalType && <Modal type={modalType} onClose={closeModal} />}
    </>
  );
};


