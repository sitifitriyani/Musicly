import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user' // Set default role to USER
  });

  const [errMsg, setErrMsg] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, role } = formData;

    try {
      const response = await fetch('http://localhost:8080/api/auth/sign-up', {
        method: 'POST',
        // credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        //   Authorization : "Bearer " + JSON.parse(localStorage.getItem("user"))

        },
        body: JSON.stringify({ email, username, password, role }),
        
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setShowSuccess(true);
        setErrMsg('Successfully registered');
        navigate('/signin');
        
      } else {
        setShowError(true);
        setErrMsg(data.message);
      }
    } catch (error) {
      setShowError(true);
      setErrMsg(`Server error!,${error}`);
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="logo mb-8">
        <a href="#" className="flex items-center gap-2 text-4xl font-bold text-purple-500">
          <img src="../public/download (3).png" alt="Musicly" className="w-20 h-25" /> Musicly
        </a>
      </div>
      {showError && (
        <div className="alert bg-red-200 text-red-800 p-4 rounded mb-4">
          <p className="danger"><span className="font-bold">Alert!</span> {errMsg}</p>
        </div>
      )}
      {showSuccess && (
        <div className="alert bg-green-200 text-green-800 p-4 rounded mb-4">
          <p className="success"><span className="font-bold">Success!</span> {errMsg}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 space-y-4">
        <div className="inputItem">
          <label htmlFor="email" className="block text-gray-300 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="inputItem">
          <label htmlFor="username" className="block text-gray-300 font-bold mb-2">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="inputItem">
          <label htmlFor="password" className="block text-gray-300 font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="inputItem">
          <label htmlFor="role" className="block text-gray-300 font-bold mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300">
          Sign Up
        </button>
      </form>
      <p className="text-gray-400 mt-4">
        Sudah punya akun? <Link to="/signIn" className="text-purple-500 hover:text-purple-400">Klik di sini</Link>
      </p>
    </div>
  );
}
