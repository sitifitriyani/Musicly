// import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

    );
};

export default NavbarAdmin;
