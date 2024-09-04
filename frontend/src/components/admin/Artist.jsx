import { Link, useNavigate } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from "./NavbarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";

export default function Artist() {
    const [artists, setArtists] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/artist")
            .then((response) => {
                setArtists(response.data);
            })
            .catch((error) => {
                console.error("Error fetching artist data:", error);
            });
    }, []);

    function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this artist?")) {
            axios.delete(`http://localhost:8080/artist/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        setArtists(artists.filter((artist) => artist.id !== id));
                        setAlertMessage("Artist successfully deleted!");
                    } else {
                        setAlertMessage("Failed to delete artist.");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting artist:", error);
                    setAlertMessage("Failed to delete artist.");
                });
        }
    }

    function handleEdit(artist) {
        navigate('/createArtist', { state: { artist } });
    }
    
    const filteredArtists = artists.filter(artist =>
        artist.name && artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {alertMessage && (
                <div className="alert alert-info">
                    {alertMessage}
                </div>
            )}
            <NavbarAdmin />
            <main className="bg-gray-900 min-h-screen p-5 flex gap-5">
                <div className="w-60 h-max bg-gray-800 rounded-lg">
                    <SidebarAdmin />
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center p-3">
                        <h1 className="text-2xl font-bold text-gray-50">Artist</h1>
                        <Link
                            to="/createArtist"
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            Create Artist
                        </Link>
                    </div>

                    <div className="p-3">
                        <input
                            type="text"
                            placeholder="Search Artist..."
                            className="p-2 bg-gray-700 rounded w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <table className="w-full p-5 bg-gray-700 text-white rounded">
                        <thead>
                            <tr>
                                <th className="p-2 border">No</th>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Country</th>
                                <th className="p-2 border">Image</th>
                                <th className="p-2 border" colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArtists.map((artist, index) => (
                                <tr key={artist.id}>
                                    <td className="p-2 border">{index + 1}</td>
                                    <td className="p-2 border">{artist.name}</td>
                                    <td className="p-2 border">{artist.country}</td>
                                    <td className="p-2 border">
                                        <img src={artist.imageUrl} alt={artist.name} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="p-2 border">
                                        <button onClick={() => handleEdit(artist)} className="text-blue-500 hover:underline flex items-center gap-2">
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>
                                    </td>
                                    <td className="p-2 border">
                                        <button onClick={() => handleDelete(artist.id)} className="text-red-500 hover:underline flex items-center gap-2">
                                            <Trash className="w-4 h-4" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
