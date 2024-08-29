import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavbarAdmin = () => {
    // const [user, setUser] = useState({});
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await fetch('/api/users/current'); // API call to Java backend
    //             const data = await response.json();
    //             if (!data.id) {
    //                 navigate('/login');
    //             } else {
    //                 setUser(data);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user:', error);
    //         }
    //     };

    //     fetchUser();
    // }, [navigate]);

    // const handleLogout = async () => {
    //     await fetch('/api/logout', { method: 'POST' }); // API call to Java backend
    //     navigate('/login');
    // };

    return (
        <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <img src="../img/icons/purple-play-button.png" alt="Logo" className="w-8 h-8" />
            <span className="text-lg font-semibold">Musicly</span>
        </div>
        <div className="flex items-center space-x-4">
            <span>Admin</span>
            <Link to="/logout" className="hover:underline">Logout</Link>
        </div>
    </nav>

    );
};

export default NavbarAdmin;
