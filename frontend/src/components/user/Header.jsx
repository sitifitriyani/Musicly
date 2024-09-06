import { useState, useEffect } from "react";
import axios from "axios";
import cookie from 'js-cookie';
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // const [isProfileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState(""); // Nama pengguna yang sebenarnya
  const [userEmail, setUserEmail] = useState(""); // Email pengguna
  const [tracks, setTracks] = useState([]); // Daftar lagu yang diambil dari backend
  const token = cookie.get('token');
  const navigate = useNavigate();

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
      await fetch("http://localhost:8080/api/auth/sign-out", {
        method:"POST",
        credentials: 'include',
        header: {
          "Content-Type": "application/json",
          "Authentication":`Bearer ${token}`
        }
      });
      alert("Logged out successfully");
      navigate ("/signin") ;
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
      <div className="flex items-center gap-2 font-bold text-4xl">
            <img src="../public/download (3).png" alt="Musicly Logo" className="w-15 h-20" />
            <h1 className="text-purple-500">Musicly</h1>
        </div>
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
            className="flex items-center gap-2"          >
            <CircleUserRound className="text-purple-500" size={48} strokeWidth={1.75} />
          </button>
          <button
            onClick={handleLogout}
            className="bg-purple-700 text-white px-4 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

