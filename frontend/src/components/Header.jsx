// Navbar.js
// import { Link } from 'react-router-dom';

import { Link } from "react-router-dom";

const Header = () => {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* <Link to="/" className="text-2xl font-bold">
            MusicApp
          </Link> */}
          <a href="">MusicApp</a>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-400">Home</Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Login
            </Link>
            {/* <Link to="/register" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"> */}
              <a href="">register</a>
            {/* </Link> */}
          </div>
        </div>
      </nav>
    );
  };
  
  export default Header;
  