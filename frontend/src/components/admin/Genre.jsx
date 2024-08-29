import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import SidebarAdmin from './SidebarAdmin';
import { Pencil, Trash } from 'lucide-react';

export default function Genre() {
    const [genres, setGenres] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/genre")
            .then((response) => {
                setGenres(response.data);
            })
            .catch((error) => {
                console.error("Error fetching artist data:", error);
            });
    }, []);

    function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this artist?")) {
            axios.delete(`http://localhost:8080/genre/${id}`)
                .then((response) => {
                    if (response.status === 200) {
                        setGenres(genres.filter((genres) => genres.id !== id));
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

    function handleEdit(genres) {
        navigate('/createGenre', { state: { genres } });
    }
    return (
        <div className="flex flex-col min-h-screen">
            {alertMessage && (
                <div className="alert alert-info">
                    {alertMessage}
                </div>
            )}
            {/* Navbar */}
         <NavbarAdmin />
            {/* Main content */}
            <div className="flex flex-1">
                {/* Sidebar */}
              <SidebarAdmin />
                {/* Main content */}
                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">Genre</h1>
                        <Link to="/createGenre" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Create Genre</Link>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search genre..."
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                    </div>

                    <table className="min-w-full bg-white border border-gray-300 rounded">
                        <thead>
                            <tr>
                                <th className="p-2 border-b">ID</th>
                                <th className="p-2 border-b">Title</th>
                                <th className="p-2 border-b" colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.map(genres => (
                                <tr key={genres.id}>
                                    <td className="p-2 border-b">{genres.id}</td>
                                    <td className="p-2 border-b">{genres.title}</td>
                                    <td className="p-2 border-b">
                                    <button onClick={() => handleEdit(genres)} className="text-blue-500 hover:underline flex items-center gap-2">
                                            <Pencil className="w-4 h-4" /> Edit
                                        </button>                                   
                                        </td>
                                    <td className="p-2 border-b">
                                    <button onClick={() => handleDelete(genres.id)} className="text-red-500 hover:underline flex items-center gap-2">
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
};
