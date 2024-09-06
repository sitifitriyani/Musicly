// import React, { useEffect, useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const NavbarAdmin = () => {
    const token = cookie.get('token');

    // const [user, setUser] = useState({});
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        await fetch("http://localhost:8080/api/auth/sign-out", {
          method:"POST",
          credentials: 'include',
          header: {
            "Content-Type": "application/json",
            "Authentication":`Bearer ${token}`
          }
        });
        alert("Logged out successfully");
        navigate ("/signin") ;
    };
  
    return (
        <nav className="flex items-center justify-between p-5 bg-gray-800 text-purple-500 border-b border-gray-700 h-20">
        <div className="flex items-center gap-2 font-bold text-5xl">
            <img src="../public/download (3).png" alt="Musicly Logo" className="w-20 h-25" />
            <h1 className="text-purple-500">Musicly</h1>
        </div>
        <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
            <CircleUserRound size={48} strokeWidth={1.75} />
            </div>
            {/* <Link to="/logout" className="bg-purple-700 text-white px-4 py-2 rounded-full">Logout</Link> */}
            <button onClick={handleLogout} className="bg-purple-700 text-white px-4 py-2 rounded-full">Logout</button>
        </div>
    </nav>

    );
};

export default NavbarAdmin;
