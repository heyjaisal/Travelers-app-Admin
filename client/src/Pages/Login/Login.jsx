import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token); // Store token securely
        navigate('/home'); // Redirect to home page
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
      console.error(err); // Log error for debugging
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:block md:w-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_579.jpg"
          alt="Login Illustration"
        />
      </div>
      <div className="flex flex-col mt-28 justify-center items-center md:w-1/2 px-6 md:px-12">
        <h1 className="font-poppins text-2xl font-semibold mb-6 text-gray-700">Super Admin Sign In</h1>

        <form onSubmit={handleLogin} className="w-[300px] ml-0 rounded-md px-4 focus:outline-none focus:border-blue-500 text-base font-poppins">
          <div>
            <label className="block text-gray-600 text-base font-poppins mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="pr-28 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-blue-500 text-base font-poppins"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-base font-poppins mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="pr-28 border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-blue-500 text-base font-poppins"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-poppins">{error}</p>}

          <button type="submit" className="w-[333px] mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md font-poppins py-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
