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
            <div className="flex-1 pr-8"> {/* Tambah padding kanan */}
              {/* Player Musik */}
              <div className="p-6 mb-10 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"> {/* Tambah margin bawah */}
                <div className="flex items-center">
                  <img
                    src="https://i.pinimg.com/1200x/e9/36/6e/e9366e7ea590b4487ac3557594eb5482.jpg"
                    alt="Album Art"
                    className="w-40 h-40 rounded-full mr-10 border-4 border-purple-600"
                  />
                  <div className="trackSeeker relative w-96">
                    <input type="range" id="seeker" className="w-full accent-purple-600" />
                    <div className="currTrackTime absolute top-[-25px] left-0 text-sm">
                      0:00
                    </div>
                    <div className="currTrackTotalTime absolute top-[-25px] right-0 text-sm">
                      4:00
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-1 justify-center text-center mt-4"> {/* Tambah margin atas */}
                  <p className="text-lg font-semibold text-purple-400">Kokobop</p>
                  <p className="text-sm text-gray-400">EXO</p>
                </div>
              </div>

              {/* Terpopuler, Baru Terbaru, Rekomendasi */}
              <div className="grid gap-5 grid-cols-3 mt-8">
                {/* Terpopuler */}
                <div className="bg-gray-800 p-6 rounded hover:bg-purple-800 hover:scale-105 transition duration-300 shadow-lg"> {/* Tambah padding */}
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Terpopuler</h3> {/* Tambah margin bawah */}
                  <ul className="text-sm text-gray-400">
                    <li className="mb-2 hover:text-white transition duration-200"> {/* Tambah margin bawah */}
                      1. Black Out - Chanyeol
                    </li>
                    <li className="mb-2 hover:text-white transition duration-200">
                      2. I Do - Do Kyungsoo
                    </li>
                    <li className="mb-2 hover:text-white transition duration-200">
                      3. Monster - EXO
                    </li>
                    <li className="hover:text-white transition duration-200">
                      4. Carol Of The Bell - Lindsey Stirling
                    </li>
                  </ul>
                </div>

                {/* Baru Terbaru */}
                <div className="bg-gray-800 p-6 rounded hover:bg-purple-800 hover:scale-105 transition duration-300 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Baru Terbaru</h3>
                  <ul className="text-sm text-gray-400">
                    <li className="mb-2 hover:text-white transition duration-200">
                      1. Untungnya, Hidup Harus Tetap Berjalan - Bernadya
                    </li>
                    <li className="mb-2 hover:text-white transition duration-200">
                      2. Gala Bunga Matahari - Sal Pribadi
                    </li>
                    <li className="hover:text-white transition duration-200">
                      3. Badut Baru - Dbatlayar
                    </li>
                  </ul>
                </div>

                {/* Rekomendasi */}
                <div className="bg-gray-800 p-6 rounded hover:bg-purple-800 hover:scale-105 transition duration-300 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">Rekomendasi</h3>
                  <ul className="text-sm text-gray-400">
                    <li className="mb-2 hover:text-white transition duration-200">
                      1. Dont Flirt - Winner
                    </li>
                    <li className="mb-2 hover:text-white transition duration-200">
                      2. Playing With Fire - Blackpink
                    </li>
                    <li className="mb-2 hover:text-white transition duration-200">
                      3. Sialan - Juicy Luicy
                    </li>
                    <li className="hover:text-white transition duration-200">
                      4. UN Village - Baekhyun
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Playlist di Sisi Kanan */}
            <div className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg ml-8"> {/* Tambah margin kiri */}
              <h3 className="text-xl font-bold mb-4 text-purple-400">Your Playlist</h3>
              <ul className="space-y-3"> {/* Tambah jarak antar elemen */}
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">1. MOVE - Taemin</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">2. Love Shot - EXO</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">3. Love Wins All - IU</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">4. Navillera - GFriend</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">5. Beautiful - WannaOne</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">6. Drama - Aespa</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">7. UP - Karina</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">8. Bite Me - Enypen</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">9. Candy - NCT Dream</li>
                <li className="p-2 hover:bg-gray-700 rounded transition duration-300">10. BOSS - NCT U</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
