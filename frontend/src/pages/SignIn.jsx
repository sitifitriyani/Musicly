import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const [errMsg, setErrMsg] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password } = formData;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (data.error) {
        setShowError(true);
        setErrMsg(data.message);
      } else {
        navigate('/home');
      }
    } catch (error) {
      setShowError(true);
      setErrMsg('Server error!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="logo mb-8">
        <a href="#" className="flex items-center gap-2 text-4xl font-bold text-purple-500">
          <img src="/img/icons/purple-play-button.png" alt="Musicly" className="w-12 h-12" /> Musicly
        </a>
      </div>
      {showError && (
        <div className="alert bg-red-200 text-red-800 p-4 rounded mb-4">
          <p className="danger"><span className="font-bold">Alert!</span> {errMsg}!</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 space-y-4">
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
        <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300">
          Login
        </button>
      </form>
      <p className="text-gray-400 mt-4">
        Belum punya akun? <Link to="/signup" className="text-purple-500 hover:text-purple-400">Klik di sini</Link>
      </p>
    </div>
  );
}
