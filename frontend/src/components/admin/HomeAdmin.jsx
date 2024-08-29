// import React, { useEffect, useState } from 'react';

import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";

export default function HomeAdmin(){
  // const [stats, setStats] = useState({
  //   totalTracks: 0,
  //   totalAlbums: 0,
  //   totalArtists: 0,
  //   totalGenre: 0,
  //   totalPlaylists: 0,
  // });

  // useEffect(() => {
  //   fetch('/api/dashboard/stats')
  //     .then(res => res.json())
  //     .then(data => setStats(data));
  // }, []);

  return (
    <div>
              <NavbarAdmin  user={{ fname: 'John', lname: 'Doe' }} />
    <div className="flex h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className=" flex-1 bg-white rounded-lg p-6 shadow-md">
          <div className=" flex justify-between items-center border-b pb-4 mb-4">
            <h2 className=" text-xl font-bold">Dashboard</h2>
            <div className=" flex space-x-2">
              {/* Add buttons or other actions */}
            </div>
          </div>
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className=" bg-purple-500 text-white p-4 rounded-lg shadow-md">
              {/* <div className="cardFigure text-4xl font-bold">{stats.totalTracks}</div> */}
              <div className=" uppercase">Tracks</div>
            </div>
            <div className="card bg-green-500 text-white p-4 rounded-lg shadow-md">
              {/* <div className="cardFigure text-4xl font-bold">{stats.totalAlbums}</div> */}
              <div className=" uppercase">Albums</div>
            </div>
            <div className="card bg-blue-500 text-white p-4 rounded-lg shadow-md">
              {/* <div className="cardFigure text-4xl font-bold">{stats.totalArtists}</div> */}
              <div className=" uppercase">Artists</div>
            </div>
            <div className="card bg-red-500 text-white p-4 rounded-lg shadow-md">
              {/* <div className="cardFigure text-4xl font-bold">{stats.totalGenre}</div> */}
              <div className=" uppercase">Genre</div>
            </div>
            <div className=" bg-yellow-500 text-white p-4 rounded-lg shadow-md">
              {/* <div className="cardFigure text-4xl font-bold">{stats.totalPlaylists}</div> */}
              <div className=" uppercase">History</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}


