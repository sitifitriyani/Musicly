import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarAdmin from './SidebarAdmin';

export default function CreateAlbum() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
            axios.get(`/album`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the user data!", error);
                });
        
    }, [navigate]);

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
                        {/* {user && <span>{user.fname} {user.lname}</span>} */}
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
                        <h2 className="text-xl font-bold">Create Album</h2>
                    </div>
                    <div className="p-5">
                        <form action="/api/albums" method="post" encType="multipart/form-data" className="flex flex-col gap-5">
                            <img src="" alt="" id="albumCover" className="w-80 h-80 object-cover mb-5" />
                            <div className="flex items-center gap-5">
                                <label htmlFor="albumTitle" className="text-white w-1/4">Title</label>
                                <input type="text" name="albumTitle" className="flex-1 p-2 bg-gray-700 text-white rounded-lg" />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="albumYear" className="text-white w-1/4">Year</label>
                                <input type="text" name="albumYear" className="flex-1 p-2 bg-gray-700 text-white rounded-lg" />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="cover" className="text-white w-1/4">Cover Photo</label>
                                <input type="file" name="cover" accept="image/*" className="flex-1 p-2 bg-gray-700 text-white rounded-lg" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        document.getElementById('albumCover').src = URL.createObjectURL(file);
                                    }
                                }} />
                            </div>
                            <div className="flex justify-end gap-5 mt-5">
                                <button type="submit" className="bg-purple-600 text-white px-5 py-2 rounded-lg">Create</button>
                                <Link to="/album" className="bg-gray-700 text-white px-5 py-2 rounded-lg">Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
