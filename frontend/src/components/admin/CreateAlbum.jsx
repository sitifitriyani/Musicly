import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from './NavbarAdmin';

export default function CreateAlbum() {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState({
        id: "",
        name: "",
        releaseYear: "",
        imageUrl: "",
        artist: {
            id: '',
            name: ''
        }
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.albums) {
            setAlbums(location.state.albums);
        }
    }, [location.state]);

    useEffect(() => {
        axios.get("http://localhost:8080/artist")
        .then(response => {
            setArtists(response.data);
        })
        .catch(error => {
            console.error("Error fetching artists:", error);
        });
    }, []);

    function handleAdd() {
        axios.post("http://localhost:8080/album", albums)
        .then((response) => {
            if (response.status === 200) {
                setAlertMessage("New album added successfully!");
                navigate('/album');
            } else {
                setAlertMessage("Failed to add new album.");
            }
        })
        .catch((error) => {
            console.error("Error adding new album:", error);
            setAlertMessage("Failed to add new album.");
        });
    }
    
    function handleEdit() {
        axios.put(`http://localhost:8080/album/${albums.id}`, albums)
        .then((response) => {
            if (response.status === 200) {
                setAlertMessage("Album successfully updated!");
                navigate('/album');
            } else {
                setAlertMessage("Failed to update album.");
            }
        })
        .catch((error) => {
            console.error("Error updating album:", error);
            setAlertMessage("Failed to update album.");
        });
    }    

    function handleSave(event) {
        event.preventDefault();
        if (albums.id) {
            handleEdit();
        } else {
            handleAdd();
        }
    }

        return (
        <div>
            <NavbarAdmin />
            <main className="bg-gray-900 min-h-screen p-5 flex gap-5">
                <div className="w-60 h-max bg-gray-800 rounded-lg">
                    <SidebarAdmin />
                </div>

                <div className="flex-1 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between p-5 border-b border-gray-700 text-white">
                        <h2 className="text-xl font-bold">{albums.id ? "Edit Album" : "Create Album"}</h2>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleSave} className="flex flex-col gap-5">
                            <img
                                src={albums.imageUrl || ""}
                                id="albumCover"
                                className="w-80 h-80 object-cover mb-5"
                                alt="Album Cover"
                            />
                            <div className="flex items-center gap-5">
                                <label htmlFor="albumTitle" className="text-white w-1/4">Title</label>
                                <input
                                    type="text"
                                    name="albumTitle"
                                    value={albums.name}
                                    onChange={(e) => setAlbums({ ...albums, name: e.target.value })}
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="albumYear" className="text-white w-1/4">Year</label>
                                <input
                                    type="text"
                                    name="albumYear"
                                    value={albums.releaseYear}
                                    onChange={(e) => setAlbums({ ...albums, releaseYear: e.target.value })}
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="cover" className="text-white w-1/4">Cover Photo</label>
                                <input
                                    type="file"
                                    name="cover"
                                    accept="image/*"
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = URL.createObjectURL(file);
                                            document.getElementById('albumCover').src = imageUrl;
                                            setAlbums({ ...albums, imageUrl });
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="artist" className="text-white w-1/4">Artist</label>
                                <select
                                    name="artist"
                                    value={albums.artist.id}
                                    onChange={(e) =>
                                        setAlbums({
                                            ...albums,
                                            artist: artists.find(
                                                (artist) => artist.id === parseInt(e.target.value)
                                            ) || { id: '', name: '' }
                                        })
                                    }
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                >
                                    <option value="">Select Artist</option>
                                    {artists.map((artist) => (
                                        <option key={artist.id} value={artist.id}>
                                            {artist.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-5 mt-5">
                                <button type="submit" className="bg-purple-600 text-white px-5 py-2 rounded-lg">
                                    {albums.id ? "Save Changes" : "Create"}
                                </button>
                                <Link to="/album" className="bg-gray-700 text-white px-5 py-2 rounded-lg">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
