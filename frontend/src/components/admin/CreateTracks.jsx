import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarAdmin from "./SidebarAdmin";
import NavbarAdmin from "./NavbarAdmin";

export default function CreateTracks() {
    const [tracks, setTracks] = useState({
        id: '',
        title: '',
        duration: '',
        album: {
            id: '',
            name: '',
            artist: {
                id: '',
                name: ''
            }
        },
        genre: {
            id: '',
            genre: ''
        },
        songUrl: null,
        imageUrl: null
    });
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [genres, setGenres] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        axios.get("http://localhost:8080/album")
            .then(response => {
                setAlbums(response.data);
            })
            .catch(error => {
                console.error("Error fetching albums:", error);
            });

        axios.get("http://localhost:8080/genre")
            .then(response => {
                setGenres(response.data);
            })
            .catch(error => {
                console.error("Error fetching genres:", error);
            });

        if (location.state && location.state.tracks) {
            setTracks(location.state.tracks);
        }
    }, [location.state]);

    useEffect(() => {
        if (tracks.album.id) {
            const selectedAlbum = albums.find(album => album.id === tracks.album.id);
            if (selectedAlbum) {
                setTracks(prevTracks => ({
                    ...prevTracks,
                    album: {
                        ...prevTracks.album,
                        artist: selectedAlbum.artist
                    }
                }));
            }
        }
    }, [tracks.album.id, albums]);

    function handleSave(event) {
        event.preventDefault();
        if (tracks.id) {
            handleEdit();
        } else {
            handleAdd();
        }
    }

    function handleEdit() {
        const formData = new FormData();
        formData.append('title', tracks.title);
        formData.append('duration', tracks.duration);
        formData.append('albumId', tracks.album.id);
        formData.append('artistId', tracks.album.artist.id);
        formData.append('genreId', tracks.genre.id);
        if (tracks.songUrl) formData.append('song', tracks.songUrl);
        if (tracks.imageUrl) formData.append('imageUrl', tracks.imageUrl);

        axios.put(`http://localhost:8080/api/music/${tracks.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            if (response.status === 200) {
                setAlertMessage("Track successfully updated!");
                navigate('/tracks');
            } else {
                setAlertMessage("Failed to update track.");
            }
        })
        .catch((error) => {
            console.error("Error updating track:", error);
            setAlertMessage("Failed to update track.");
        });
    }

    function handleAdd() {
        const formData = new FormData();
        formData.append('title', tracks.title);
        formData.append('duration', tracks.duration);
        formData.append('albumId', tracks.album.id);
        formData.append('genreId', tracks.genre.id);
        if (tracks.songUrl) formData.append('song', tracks.songUrl);
        if (tracks.imageUrl) formData.append('imageUrl', tracks.imageUrl);

        axios.post("http://localhost:8080/api/music", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            if (response.status === 201) {
                setAlertMessage("New track added successfully!");
                navigate('/tracks');
            } else {
                setAlertMessage("Failed to add new track.");
            }
        })
        .catch((error) => {
            console.error("Error adding new track:", error);
            setAlertMessage("Failed to add new track.");
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
                        <h2 className="text-xl font-bold">
                            {tracks.id ? "Edit Track" : "Create Track"}
                        </h2>
                    </div>
                    <div className="p-5">
                        <form onSubmit={handleSave} className="flex flex-col gap-5">
                            <img
                                src={tracks.imageUrl || ""}
                                alt="Track Cover"
                                id="tracksImage"
                                className="w-80 h-80 object-cover mb-5"
                            />
                            <div className="flex items-center gap-5">
                                <label htmlFor="trackTitle" className="text-white w-1/4">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="trackTitle"
                                    value={tracks.title}
                                    onChange={(e) =>
                                        setTracks({ ...tracks, title: e.target.value })
                                    }
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="duration" className="text-white w-1/4">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={tracks.duration}
                                    onChange={(e) =>
                                        setTracks({ ...tracks, duration: e.target.value })
                                    }
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="album" className="text-white w-1/4">
                                    Album
                                </label>
                                <select
                                    name="album"
                                    value={tracks.album.id}
                                    onChange={(e) =>
                                        setTracks({
                                            ...tracks,
                                            album: {
                                                id: e.target.value,
                                                name: albums.find(album => album.id === e.target.value)?.name || '',
                                                artist: { id: '', name: '' } // Reset artist on album change
                                            }
                                        })
                                    }
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                >
                                    <option value="">Select Album</option>
                                    {albums.map((album) => (
                                        <option key={album.id} value={album.id}>
                                            {album.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="genre" className="text-white w-1/4">
                                    Genre
                                </label>
                                <select
                                    name="genre"
                                    value={tracks.genre.id}
                                    onChange={(e) =>
                                        setTracks({
                                            ...tracks,
                                            genre: genres.find(genre => genre.id === e.target.value) || { id: '', genre: '' }
                                        })
                                    }
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                >
                                    <option value="">Select Genre</option>
                                    {genres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.genre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="mp3File" className="text-white w-1/4">
                                    Upload MP3
                                </label>
                                <input
                                    type="file"
                                    name="mp3File"
                                    accept="audio/mp3"
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setTracks({ ...tracks, songUrl: file });
                                    }}
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <label htmlFor="cover" className="text-white w-1/4">
                                    Cover Photo
                                </label>
                                <input
                                    type="file"
                                    name="cover"
                                    accept="image/*"
                                    className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = URL.createObjectURL(file);
                                            document.getElementById("tracksImage").src = imageUrl;
                                            setTracks({ ...tracks, imageUrl });
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex justify-end gap-5 mt-5">
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-5 py-2 rounded-lg"
                                >
                                    {tracks.id ? "Save Changes" : "Create"}
                                </button>
                                <Link
                                    to="/tracks"
                                    className="bg-gray-700 text-white px-5 py-2 rounded-lg"
                                >
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
