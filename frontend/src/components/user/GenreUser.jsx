import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function GenreUser() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        // Fetch genres
        axios.get("http://localhost:8080/genre")
            .then((response) => {
                // Initialize genres with empty music array
                const genresWithMusic = response.data.map(genre => ({
                    ...genre,
                    musics: []
                }));
                setGenres(genresWithMusic);

                // Fetch music for each genre
                genresWithMusic.forEach((genre) => {
                    axios.get(`http://localhost:8080/api/music?genreId=${genre.id}`)
                        .then((musicResponse) => {
                            setGenres((prevGenres) =>
                                prevGenres.map((g) =>
                                    g.id === genre.id ? { ...g, musics: musicResponse.data } : g
                                )
                            );
                        })
                        .catch((error) => {
                            console.error(`Error fetching music for genre ${genre.name}:`, error);
                        });
                });
            })
            .catch((error) => {
                console.error("Error fetching genres:", error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-900 p-5 overflow-y-auto">
                    {genres.map((genre) => (
                        <section key={genre.id} className="mb-8">
                            <h2 className="text-2xl text-white mb-4">{genre.genre}</h2>
                            <div className="flex overflow-x-scroll space-x-4">
                                {genre.musics.length > 0 ? (
                                    genre.musics.map((music) => (
                                        <div key={music.id} className="bg-gray-800 p-4 rounded-lg shadow-lg min-w-[200px]">
                                            <img
                                                src={music.imageUrl}
                                                alt={music.title}
                                                className="w-full h-40 object-cover rounded-lg mb-4"
                                            />
                                            <h3 className="text-lg font-semibold text-white mb-2">
                                                {music.title}
                                            </h3>
                                            <p className="text-gray-400">{music.duration} minutes</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white">No music available for this genre.</p>
                                )}
                            </div>
                        </section>
                    ))}
                </main>
            </div>
        </>
    );
}
