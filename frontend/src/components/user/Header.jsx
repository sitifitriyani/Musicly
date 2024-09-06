import { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  // const [isProfileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState(""); // Nama pengguna yang sebenarnya
  const [userEmail, setUserEmail] = useState(""); // Email pengguna
  const [tracks, setTracks] = useState([]); // Daftar lagu yang diambil dari backend

  useEffect(() => {
    // Ambil data tracks saat komponen di-render
    axios.get("http://localhost:8080/api/music")
      .then(response => {
        setTracks(response.data);
      })
      .catch(error => {
        console.error("Error fetching track data:", error);
      });

    // Ambil data pengguna saat komponen di-render
    axios.get("http://localhost:8080/api/auth/me", { withCredentials: true })
      .then(response => {
        console.log(response.data); 
        setUserName(response.data.username); // Ambil username dari response
        setUserEmail(response.data.email);   // Ambil email dari response
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleProfileClick = () => {
    if (userName && userEmail) {
      alert(`Logged in as: ${userName}\nEmail: ${userEmail}`);
    } else {
      alert("No user data found");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/sign-out", {}, {
        withCredentials: true // Mengirimkan cookie dengan permintaan
      });
      alert("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Fungsi untuk memfilter data berdasarkan pencarian
  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm) ||
    track.album?.name.toLowerCase().includes(searchTerm) ||
    track.album?.artist?.name.toLowerCase().includes(searchTerm)
  );

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
