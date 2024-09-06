import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-900 text-white min-h-screen flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten Utama */}
        <div className="flex-1 p-8">
          <div className="flex">
            {/* Konten Utama Kiri */}
            <div className="flex-1">
              {/* Player Musik */}
              <div className="p-6 mb-4">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Album Art"
                    className="w-40 h-40 rounded-full mr-10"
                  />
                  <div className="trackSeeker relative w-96 ">
                    <input type="range" id="seeker" className="w-full" />
                    <div className="currTrackTime absolute top-[-25px] left-0 text-sm">
                      0:00
                    </div>
                    <div className="currTrackTotalTime absolute top-[-25px] right-0 text-sm">
                      4:00
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-1 justify-center text-center">
                    <p className="text-lg font-semibold">Song Title</p>
                    <p className="text-sm text-gray-400">Artist Name</p>
                  </div>
              </div>

              {/* Terpopuler, Baru Terbaru, Rekomendasi */}
              <div className=" grid gap-5 grid-cols-4 mt-8">
                {/* Terpopuler */}
                <div className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition duration-200">
                  <h3 className="text-lg font-semibold mb-2">Terpopuler</h3>
                  <ul className="text-sm text-gray-400">
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 1 - Artist
                    </li>
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 2 - Artist
                    </li>
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 3 - Artist
                    </li>
                  </ul>
                </div>

                {/* Baru Terbaru */}
                <div className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition duration-200">
                  <h3 className="text-lg font-semibold mb-2">Baru Terbaru</h3>
                  <ul className="text-sm text-gray-400">
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 4 - Artist
                    </li>
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 5 - Artist
                    </li>
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 6 - Artist
                    </li>
                  </ul>
                </div>

                {/* Rekomendasi */}
                <div className="bg-gray-700 p-4 rounded hover:bg-gray-600 hover:scale-105 transition duration-200">
                  <h3 className="text-lg font-semibold mb-2">Rekomendasi</h3>
                  <ul className="text-sm text-gray-400">
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 7 - Artist
                    </li>
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 8 - Artist
                    </li>
                    <li className="mb-1 hover:text-white transition duration-200">
                      Song 9 - Artist
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Playlist di Sisi Kanan */}
            <div className="w-1/4 bg-gray-800 p-4 flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-4">Your Playlist</h3>
              <ul className="space-y-2 flex-1">
                <li className="p-2 hover:bg-gray-700 rounded">Playlist 1</li>
                <li className="p-2 hover:bg-gray-700 rounded">Playlist 2</li>
                <li className="p-2 hover:bg-gray-700 rounded">Playlist 3</li>
                <li className="p-2 hover:bg-gray-700 rounded">Playlist 4</li>
                <li className="p-2 hover:bg-gray-700 rounded">Playlist 4</li>
                <li className="p-2 hover:bg-gray-700 rounded">Playlist 4</li>
                <li className="p-2 hover:bg-gray-700 rounded">Playlist 4</li>
                <li className="p-2 hover:bg-gray-700 rounded">Playlist 4</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
