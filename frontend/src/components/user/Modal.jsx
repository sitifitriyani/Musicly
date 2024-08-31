export default function Modal({ type, artist, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-5 rounded-lg w-1/3">
          <h2 className="text-2xl font-semibold text-white mb-4">{artist.name}</h2>
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-400 mb-4">Informasi tambahan tentang artis bisa ditampilkan di sini.</p>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }
  