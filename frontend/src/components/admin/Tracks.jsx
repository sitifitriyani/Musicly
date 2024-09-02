import { Link, useNavigate } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from "./NavbarAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";

export default function Tracks() {
    const [tracks, setTracks] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/music")
            .then((response) => {
                setTracks(response.data);
            })
            .catch((error) => {
                console.error("Error fetching track data:", error);
            });
    }, []);

    function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this track?")) {
            axios.delete(`http://localhost:8080/api/music/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        setTracks(tracks.filter((track) => track.id !== id));
                        setAlertMessage("track successfully deleted!");
                    } else {
                        setAlertMessage("Failed to delete track.");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting tracks:", error);
                    setAlertMessage("Failed to delete tracks.");
                });
        }
    }

    function handleEdit(track) {
        navigate('/createTracks', { state: { track } });
    }


    return(
        <div>
             {alertMessage && (
                <div className="alert alert-info">
                    {alertMessage}
                </div>
            )}
                     <NavbarAdmin />
            {/* Main content */}
            <main className="bg-gray-900 min-h-screen p-5 flex gap-5">
                {/* Sidebar */}
                <div className="w-60 h-max bg-gray-800 rounded-lg">
                    <SidebarAdmin />
                </div>

                {/* Main content */}
                <div className="flex-1 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center p-3">
                        <h1 className="text-2xl font-bold text-gray-50">Tracks</h1>
                        <Link to="/createTracks" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Create Tracks</Link>
                    </div>

                    <div className="p-3">
                        <input
                            type="text"
                            placeholder="Search Tracks..."
                            className="p-2 bg-gray-700 rounded w-full"
                        />
                    </div>

                    <table className="w-full p-5 bg-gray-700 text-white rounded">
                        <thead>
                            <tr>
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">Title</th>
                                <th className="p-2 border">Duration</th>
                                <th className="p-2 border">Album</th>
                                <th className="p-2 border">Artist</th>
                                <th className="p-2 border">Genre</th>
                                <th className="p-2 border">Song Url</th>
                                <th className="p-2 border">image Url</th>
                                <th className="p-2 border" colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {tracks.map(t => (
                                <tr key={t.id}>
                                    <td className="p-2 border">{t.id}</td>
                                    <td className="p-2 border">{t.title}</td>
                                    <td className="p-2 border">{t.duration}</td>
                                    <td className="p-2 border">{t.album.artist.name}</td>
                                    <td className="p-2 border">{t.album.name}</td>
                                    <td className="p-2 border">{t.genre}</td>
                                    <td className="p-2 border">
                                    <audio controls>
                                        <source src={t.songUrl} type="audio/mp3" />
                                            Your browser does not support the audio element.</audio>
                                    </td>
                                    <td className="p-2 border">
                                    <img src={t.imageUrl} alt={t.title} className="w-16 h-16 object-cover" /></td>
                                    <td className="p-2 border">
                                    <button onClick={() => handleEdit(t)} className="text-blue-500 hover:underline flex items-center gap-2">
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>                                    </td>
                                    <td className="p-2 border">
                                    <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:underline flex items-center gap-2">
                                            <Trash className="w-4 h-4" /> Delete
                                        </button>                                    </td>
                                </tr>
                          
                            ))} 
                            
                        </tbody>
                    </table>
            </div>
                </main>

        </div>
        
    )
}