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
        if (window.confirm("Are you sure you want to delete this artist?")) {
            axios.delete(`http://localhost:8080/Album/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        setAlbum(album.filter((album) => album.id !== id));
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

    function handleEdit(akbum) {
        navigate('/createAlbum', { state: { album } });
    }


    return(
        <div>
                     <NavbarAdmin />
            {/* Main content */}
            <div className="flex flex-1">
                {/* Sidebar */}
           <SidebarAdmin />

                {/* Main content */}
                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">Album</h1>
                        <Link to="/CreateAlbum" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Create Genre</Link>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search Album..."
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <table className="min-w-full bg-white border border-gray-300 rounded">
                        <thead>
                            <tr>
                                <th className="p-2 border-b">ID</th>
                                <th className="p-2 border-b">Name</th>
                                <th className="p-2 border-b">Release Year</th>
                                <th className="p-2 border-b">Artist</th>
                                <th className="p-2 border-b">Image</th>
                                <th className="p-2 border-b" colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {album.map(g => (
                                <tr key={g.id}>
                                    <td className="p-2 border-b">{g.id}</td>
                                    <td className="p-2 border-b">{g.name}</td>
                                    <td className="p-2 border-b">{g.releaseYear}</td>
                                    <td className="p-2 border-b">{g.artist}</td>
                                    <td className="p-2 border-b">{g.image}</td>
                                    <td className="p-2 border-b">
                                    <button onClick={() => handleEdit(g)} className="text-blue-500 hover:underline flex items-center gap-2">
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>
                                    </td>
                                    <td className="p-2 border-b">
                                        <button onClick={() => handleDelete(g.id)} className="text-red-500 hover:underline flex items-center gap-2">
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
        
    )
}