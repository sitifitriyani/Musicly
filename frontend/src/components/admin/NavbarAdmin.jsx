// import React, { useEffect, useState } from 'react';
import {  Link, Navigate } from 'react-router-dom';

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

    // const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         // Send the logout request
    //         const response = await fetch('http://localhost:8080/api/auth/sign-out', { 
    //             // method: 'POST', 
    //             credentials: 'include'
    //         });
            
    //         if (response.ok) {
    //             // Redirect to the homepage after successful logout
    //             Navigate('/');
    //         } else {
    //             console.error('Logout failed');
    //         }
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //     }
    // };
    return (
        <nav className="flex items-center justify-between p-5 bg-gray-800 text-purple-500 border-b border-gray-700 h-16">
        <div className="flex items-center gap-2 font-bold text-3xl">
            <img src="../public/download (3).png" alt="Musicly Logo" className="w-15 h-20" />
            <span>Musicly</span>
        </div>
        <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
                <i className="fas fa-user"></i>
                {/* {user && <span>{user.fname} {user.lname}</span>} */}
            </div>
            <Link to="/logout" className="bg-purple-700 text-white px-4 py-2 rounded-full">Logout</Link>
            {/* <button onClick={handleLogout} className="bg-purple-700 text-white px-4 py-2 rounded-full">Logout</button> */}
        </div>
    </nav>

    );
};

export default NavbarAdmin;
