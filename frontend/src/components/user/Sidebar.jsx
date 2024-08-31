import { Link } from "react-router-dom";

export default function Sidebar(

) {
    return (
    <aside className="flex flex-col gap-2.5 w-72 bg-gray-800 p-5 rounded-lg">
      <div className="sidebarHeader flex flex-col gap-5 p-5 bg-gray-700 rounded-lg">
        <div className="headerItem text-white text-lg cursor-pointer hover:text-gray-300 transition duration-300 ease-in-out">
          <i className="fa fa-home"></i> Home
        </div>
        {/* Other items */}
      </div>
      <div className="playlist flex flex-col gap-2.5 bg-gray-700 rounded-lg flex-1">
        <div className="playlistHeader flex items-center justify-between p-5 text-gray-500 border-b border-gray-600">
          <div className="headerItem flex items-center gap-2.5 cursor-pointer">
            <i id="createPlaylistBtn" className="fa fa-plus"></i> Buat Playlist
          </div>
        </div>
        <div className="playlistItems flex flex-col gap-2.5 p-5 overflow-y-auto">
          <ul>
          <li>
                    <Link to="/albumUser" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> Albums
                    </Link>
                </li>
                <li>
                    <Link to="/artistUser" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> Artist
                    </Link>
                </li>
                <li>
                    <Link to="/genreUser" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> Genre
                    </Link>
                </li>
                <li>
                    <Link to="/favorite" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> favorite
                    </Link>
                </li>
          </ul>

        </div>
      </div>
    </aside>
  );
};


