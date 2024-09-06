import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin';
import NavbarAdmin from './NavbarAdmin';

export default function CreateArtist() {
    const [artist, setArtist] = useState({
        id: '',
        name: '',
        country: '',
        imageUrl: ''  
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
        axios.put(`http://localhost:8080/artist/${artist.id}`, artist,{
            withCredentials: true
        })
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
        axios.post("http://localhost:8080/artist", artist,{
            withCredentials: true
        })
            .then((response) => {
                if (response.status === 200) {
                    setAlertMessage("New artist added successfully!");
                    navigate('/artist');
                } else {
                    setAlertMessage("Failed to add artist.");
                }
            })
            .catch((error) => {
                console.error("Error adding new artist:", error);
                setAlertMessage("Failed to add new artist.");
            });
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
                        <h2 className="text-xl font-bold">{artist.id ? 'Edit Artist' : 'Create Artist'}</h2>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleSave} className="flex flex-col gap-5">
                            <img 
                                src={artist.imageUrl || "https://via.placeholder.com/300"} 
                                alt="Artist" 
                                id="artistImage" 
                                className="w-80 h-80 object-cover mb-5" 
                            />
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
                                    onChange={(e) => setArtist({ ...artist, country:e.target.value })}
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="imageUrl" className="text-white w-1/4">Image URL</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={artist.imageUrl}
                                    onChange={(e) => setArtist({ ...artist, imageUrl: e.target.value })}
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                />
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
