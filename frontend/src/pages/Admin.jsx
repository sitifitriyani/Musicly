import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    // const [user, setUser] = useState({});
    // const [counts, setCounts] = useState({});
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/api/admin-data'); // Adjust API endpoint as necessary
    //             const data = await response.json();
    //             setUser(data.user);
    //             setCounts(data.counts);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
        
    //     fetchData();

    //     const user_id = localStorage.getItem('user_id'); // Use appropriate method to get session data
    //     if (!user_id) {
    //         navigate('/login');
    //     }
    // }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="flex items-center justify-between px-10 py-5 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2 font-bold text-purple-400 text-xl">
                    <img src="/img/icons/purple-play-button.png" alt="Logo" className="w-8 h-8" />
                    Musicly
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <i className="fas fa-user"></i>
                        {/* <span>{user.fname} {user.lname}</span> */}
                    </div>
                    <a href="/logout" className="bg-purple-600 text-white rounded-full px-5 py-2">Logout</a>
                </div>
            </nav>
            <main className="flex p-10 gap-5">
                <Sidebar />
                <div className="flex-1 bg-gray-800 rounded-lg p-5">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-5 mb-5">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* <Card title="Tracks" count={counts.totalTracks} />
                        <Card title="Albums" count={counts.totalAlbums} />
                        <Card title="Artists" count={counts.totalArtists} />
                        <Card title="Genre" count={counts.totalGenre} />
                        <Card title="Playlists" count={counts.totalPlaylists} /> */}
                    </div>
                </div>
            </main>
        </div>
    );
};

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 rounded-lg">
            <ul className="flex flex-col">
                <SidebarItem title="Dashboard" icon="fas fa-star" active />
                <SidebarItem title="Albums" icon="fas fa-star" />
                <SidebarItem title="Artists" icon="fas fa-star" />
                <SidebarItem title="Genre" icon="fas fa-star" />
                <SidebarItem title="Tracks" icon="fas fa-star" />
                <SidebarItem title="Playlists" icon="fas fa-star" />
            </ul>
        </aside>
    );
};

const SidebarItem = ({ title, icon, active }) => {
    return (
        <li className={`flex items-center cursor-pointer p-4 ${active ? 'bg-purple-600 text-white' : 'hover:bg-gray-700 text-gray-400'}`}>
            <i className={`${icon} mr-3`}></i>
            <a href={`/${title.toLowerCase()}`} className="uppercase">{title}</a>
        </li>
    );
};

const Card = ({ title, count }) => {
    return (
        <div className="bg-gray-700 rounded-lg p-5 text-center">
            <div className="text-4xl font-bold mb-2">{count}</div>
            <div className="uppercase font-semibold">{title}</div>
        </div>
    );
};

export default Admin;
