import { Link } from "react-router-dom";

export default function Sidebar(

) {
    return (
    <aside className="flex flex-col gap-2.5 w-72 bg-gray-800 p-5 rounded-lg">
      <div className="sidebarHeader flex flex-col gap-5 p-5 bg-gray-700 rounded-lg">
        <Link to="/user" className="headerItem text-white text-lg cursor-pointer hover:text-gray-300 transition duration-300 ease-in-out">
        <h2 className="text-4xl font-bold text-purple-500">Home</h2>
        </Link>
        {/* Other items */}
      </div>
      <div className="playlist flex flex-col gap-2.5 text-white bg-gray-700 rounded-lg flex-1">
        <div className="playlistItems flex flex-col gap-2.5 p-5 overflow-y-auto">
          <ul>
          <li>
                    <Link to="/tracksUser" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                   Tracks
                    </Link>
                </li>
          <li>
                    <Link to="/albumUser" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                   Albums
                    </Link>
                </li>
                <li>
                    <Link to="/artistUser" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                  Artist
                    </Link>
                </li>
                <li>
                    <Link to="/genreUser" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                     Genre
                    </Link>
                </li>
                <li>
                    <Link to="/favorite" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                    favorite
                    </Link>
                </li>
          </ul>

        </div>
      </div>
    </aside>
  );
};


