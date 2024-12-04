import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Adminlogin } from "../../Components/Utils/Authservice"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await Adminlogin({
        email,
        password,
        role: "admin", 
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/admin/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:block md:w-1/2">
        <img
          className="w-full h-full object-cover"
          src="https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_579.jpg"
          alt="Login"
        />
      </div>
      <div className="flex flex-col mt-9 justify-center items-center md:w-1/2 px-6 md:px-12">
        <h1 className="font-poppins text-2xl font-semibold mb-6 text-gray-700">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="w-[300px]">
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-600 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white rounded-md py-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
