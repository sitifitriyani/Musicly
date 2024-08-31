import { Link, useNavigate } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

export default function Album() {
    const [album, setAlbum] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/album")
            .then((response) => {
                setAlbum(response.data);
            })
            .catch((error) => {
                console.error("Error fetching artist data:", error);
            });
    }, []);

    function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this Album?")) {
            axios.delete(`http://localhost:8080/album/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        setAlbum(album.filter((album) => album.id !== id));
                        setAlertMessage("Album successfully deleted!");
                    } else {
                        setAlertMessage("Failed to delete Album.");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting Album:", error);
                    setAlertMessage("Failed to delete Album.");
                });
        }
    }

    function handleEdit(album) {
        navigate('/createAlbum', { state: { album } });
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
                <div className="w-60 h-max bg-gray-800 rounded-lg">
                    <SidebarAdmin />
                </div>

                {/* Main content */}
                <div className="flex-1 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center p-3">
                        <h1 className="text-2xl font-bold text-gray-50">Album</h1>
                        <Link to="/createAlbum" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Create Album</Link>
                    </div>

                    <div className="p-3">
                        <input
                            type="text"
                            placeholder="Search Album..."
                            className="p-2 bg-gray-700 rounded w-full"
                        />
                    </div>

                    <table className="w-full p-5 bg-gray-700 text-white rounded">
                        <thead>
                            <tr>
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Release Year</th>
                                <th className="p-2 border">Artist</th>
                                <th className="p-2 border">Image</th>
                                <th className="p-2 border" colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {album.map(g => (
                                <tr key={g.id}>
                                    <td className="p-2 border">{g.id}</td>
                                    <td className="p-2 border">{g.name}</td>
                                    <td className="p-2 border">{g.releaseYear}</td>
                                    <td className="p-2 border">{g.artist.name}</td>
                                    <td className="p-2 border">{g.image}</td>
                                    <td className="p-2 border">
                                    <button onClick={() => handleEdit(g)} className="text-blue-500 hover:underline flex items-center gap-2">
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>
                                    </td>
                                    <td className="p-2 border">
                                        <button onClick={() => handleDelete(g.id)} className="text-red-500 hover:underline flex items-center gap-2">
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
        
    )
}