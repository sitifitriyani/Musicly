// Navbar.js
// import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* <Link to="/" className="text-2xl font-bold">
            MusicApp
          </Link> */}
          <a href="">MusicApp</a>
          <ul className="flex space-x-4">
            <li>
              {/* <Link to="/" className="hover:text-gray-400">Home</Link> */}
              <a href="" className="bg-red-800">Home</a>
            </li>
            <li>
              {/* <Link to="/about" className="hover:text-gray-400">About</Link> */}
              <a href="">About</a>
            </li>
            <li>
              {/* <Link to="/contact" className="hover:text-gray-400">Contact</Link> */}
              <a href="">Contact</a>
            </li>
          </ul>
          <div className="flex space-x-4">
            {/* <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> */}
             <a href="">Login</a> 
            {/* </Link> */}
            {/* <Link to="/register" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"> */}
              <a href="">register</a>
            {/* </Link> */}
          </div>
        </div>
      </nav>
    );
  };
  
  export default Sidebar;
  