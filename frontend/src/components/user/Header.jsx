import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleProfileClick = () => {
    alert("Nama yang login");
  };

  const handleLogout = () => {
    alert("Logout clicked");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-bold">Musicly</a>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            onClick={handleProfileClick}
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
