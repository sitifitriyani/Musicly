import { Link } from 'react-router-dom';

export default function SidebarAdmin () {
    return (
        <div className="w-60  bg-gray-900 text-white min-h-screen">
            <ul className="flex flex-col">
                <li>
                    <Link to="/admin" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/album" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> Albums
                    </Link>
                </li>
                <li>
                    <Link to="/artist" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> Artist
                    </Link>
                </li>
                <li>
                    <Link to="/genre" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> Genre
                    </Link>
                </li>
                <li>
                    <Link to="/tracks" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> Tracks
                    </Link>
                </li>
                <li>
                    <Link to="/historyUser" className="p-4 block hover:bg-gray-700 bg-gray-800 font-bold">
                        <i className="fas fa-star mr-2"></i> History
                    </Link>
                </li>
            </ul>
        </div>
    );
};


