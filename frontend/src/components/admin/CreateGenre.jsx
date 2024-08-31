import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin';
import NavbarAdmin from './NavbarAdmin';

export default function Creategenre() {
    const [genres, setGenres] = useState({
        id: '',
        genre: ''
    });
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.genres) {
            setGenres(location.state.genres);
        }
    }, [location.state]);


    function handleSave(event) {
        event.preventDefault();
        if (genres.id) {
            handleEdit();
        } else {
            handleAdd();
        }
    }

    function handleEdit() {
        axios.put(`http://localhost:8080/genre/${genres.id}`, genres)
            .then((response) => {
                if (response.status === 200) {
                    setAlertMessage("genres successfully updated!");
                    navigate('/genre');
                } else {
                    setAlertMessage("Failed to update genres.");
                }
            })
            .catch((error) => {
                console.error("Error updating genres:", error);
                setAlertMessage("Failed to update genres.");
            });
    }

    function handleAdd() {
        axios.post("http://localhost:8080/genre", genres)
            .then((response) => {
                setAlertMessage("New genres added successfully!");
                navigate('/genre');
            })
            .catch((error) => {
                console.error("Error adding new genres:", error);
                setAlertMessage("Failed to add new genres.");
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
                        <h2 className="text-xl font-bold">Create genres</h2>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleSave} className="flex flex-col gap-5">
                            <div className="flex items-center gap-5">
                                <label htmlFor="albumTitle" className="text-white w-1/4">Title</label>
                                <input 
                                    type="text" 
                                    name="albumTitle" 
                                    value={genres.genre}
                                    onChange={(e) => setGenres({ ...genres, genre: e.target.value })}
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg" />
                            </div>
                            <div className="flex justify-end gap-5 mt-5">
                            <button type="submit" className="bg-purple-600 text-white px-5 py-2 rounded-lg">
                                    {genres.id ? 'Save Changes' : 'Create'}
                                </button>                                 <Link to="/genre" className="bg-gray-700 text-white px-5 py-2 rounded-lg">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
