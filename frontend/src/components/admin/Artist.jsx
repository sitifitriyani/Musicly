import { Link, useNavigate } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from "./NavbarAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import {Pencil, Trash} from "lucide-react"
export default function Artist() {
    const [artists, setArtists] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
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

    return (
        <div>
            {alertMessage && (
                <div className="alert alert-info">
                    {alertMessage}
                </div>
            )}
            <NavbarAdmin />
            <div className="flex flex-1">
                <SidebarAdmin />
                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">Artist</h1>
                        <Link
                            to="/createArtist"
                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            Create Artist
                        </Link>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search Artist..."
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <table className="min-w-full bg-white border border-gray-300 rounded">
                        <thead>
                            <tr>
                                <th className="p-2 border-b">ID</th>
                                <th className="p-2 border-b">Name</th>
                                <th className="p-2 border-b">Country</th>
                                <th className="p-2 border-b">Image</th>
                                <th className="p-2 border-b" colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artists.map(artist => (
                                <tr key={artist.id}>
                                    <td className="p-2 border-b">{artist.id}</td>
                                    <td className="p-2 border-b">{artist.name}</td>
                                    <td className="p-2 border-b">{artist.country}</td>
                                    <td className="p-2 border-b"><img src={artist.imageUrl} alt={artist.name} className="w-16 h-16 object-cover" /></td>
                                    <td className="p-2 border-b">
                                        <button onClick={() => handleEdit(artist)} className="text-blue-500 hover:underline flex items-center gap-2">
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>
                                    </td>
                                    <td className="p-2 border-b">
                                        <button onClick={() => handleDelete(artist.id)} className="text-red-500 hover:underline flex items-center gap-2">
                                            <Trash className="w-4 h-4" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}
