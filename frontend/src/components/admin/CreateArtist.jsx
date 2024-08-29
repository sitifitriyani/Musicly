import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin';

export default function CreateArtist() {
    const [artist, setArtist] = useState({
        id: '',
        name: '',
        country: '',
        image: ''
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.artist) {
            setArtist(location.state.artist);
        }
    }, [location.state]);

    function handleSave(event) {
        event.preventDefault();
        if (artist.id) {
            handleEdit();
        } else {
            handleAdd();
        }
    }

    function handleEdit() {
        axios.put(`http://localhost:8080/artist/${artist.id}`, artist)
            .then((response) => {
                if (response.status === 200) {
                    setAlertMessage("Artist successfully updated!");
                    navigate('/artist');
                } else {
                    setAlertMessage("Failed to update artist.");
                }
            })
            .catch((error) => {
                console.error("Error updating artist:", error);
                setAlertMessage("Failed to update artist.");
            });
    }

    function handleAdd() {
        axios.post("http://localhost:8080/artist", artist)
            .then((response) => {
                setAlertMessage("New artist added successfully!");
                navigate('/artist');
            })
            .catch((error) => {
                console.error("Error adding new artist:", error);
                setAlertMessage("Failed to add new artist.");
            });
    }

    return (
        <div>
            <nav className="flex items-center justify-between p-5 bg-gray-800 text-white border-b border-gray-700 h-16">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <img src="/img/icons/purple-play-button.png" alt="Musicly Logo" className="w-8 h-8" />
                    <span>Musicly</span>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-user"></i>
                    </div>
                    <Link to="/logout" className="bg-gray-700 text-white px-4 py-2 rounded-full">Logout</Link>
                </div>
            </nav>

            <main className="bg-gray-900 min-h-screen p-5 flex gap-5">
                <div className="w-60 h-max bg-gray-800 rounded-lg">
                    <SidebarAdmin />
                </div>

                <div className="flex-1 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between p-5 border-b border-gray-700 text-white">
                        <h2 className="text-xl font-bold">{artist.id ? 'Edit Artist' : 'Create Artist'}</h2>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleSave} className="flex flex-col gap-5">
                        <img src="" alt="" id="artistImage" className="w-80 h-80 object-cover mb-5" />
                            <div className="flex items-center gap-5">
                                <label htmlFor="name" className="text-white w-1/4">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={artist.name}
                                    onChange={(e) => setArtist({ ...artist, name: e.target.value })}
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="country" className="text-white w-1/4">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={artist.country}
                                    onChange={(e) => setArtist({ ...artist, country: e.target.value })}
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="cover" className="text-white w-1/4">Cover Photo</label>
                                <input type="file" name="cover" accept="image/*" className="flex-1 p-2 bg-gray-700 text-white rounded-lg" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        document.getElementById('artistImage').src = URL.createObjectURL(file);
                                    }
                                }} />
                            </div>
                            <div className="flex justify-end gap-5 mt-5">
                                <button type="submit" className="bg-purple-600 text-white px-5 py-2 rounded-lg">
                                    {artist.id ? 'Save Changes' : 'Create'}
                                </button>
                                <Link to="/artist" className="bg-gray-700 text-white px-5 py-2 rounded-lg">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
