// import  { useEffect, useState } from 'react';
// import api from './services/api';

import Login from "./Login";


const Home = () => {
  // const [playlists, setPlaylists] = useState([]);
  // const [tracks, setTracks] = useState([]);

  // useEffect(() => {
  //   api.getPlaylists().then((response) => {
  //     setPlaylists(response.data);
  //   });

  //   api.getTracks().then((response) => {
  //     setTracks(response.data);
  //   });
  // }, []);

  return (
  
    <div className="flex flex-col h-screen bg-gray-100">
      <Login/>
      {/* <Header /> */}
      <main className="flex flex-1 overflow-hidden">
      {/* <Sidebar /> */}
        <div className="flex-1 p-5">
          <h2 className="text-2xl font-bold mb-5">ini halaman home</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {/* {tracks.map((track) => (
              <div
                key={track.id}
                className="bg-white p-4 rounded shadow-md flex items-center cursor-pointer hover:bg-gray-100"
                onClick={() => api.playTrack(track.id)}
              >
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-16 h-16 object-cover mr-4 rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{track.title}</h3>
                  <p className="text-gray-600">{track.artist_name}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </main>
      {/* <Player /> */}
    </div>
  );
};

export default Home;
