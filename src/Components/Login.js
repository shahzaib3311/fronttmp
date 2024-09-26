import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/auth/`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      navigate(-1); // Navigate back to previous page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="flex flex-col md:flex-row w-full max-w-3xl h-auto p-8 bg-white shadow-lg rounded-lg mx-4 mt-8">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src="/dripSaintAssets/box.jpeg"
            alt="Plant"
            className="w-full h-full object-cover rounded-lg md:block hidden"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <img
              src="/DripSaint.png"
              alt="Company Logo"
              className="mx-auto mb-4 w-28 h-34" // Adjust the size as needed
            />
            <h2 className="text-3xl font-bold mb-4 text-center">
              Log in to your Account!
            </h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center mt-6 space-x-4">
            </div>
            <div className="flex items-center justify-center mt-6">
              <span className="text-sm text-gray-700">
                Don’t have an account?{' '}
                <Link to="/SignUp" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign Up
                </Link>
              </span>
            </div>
            {error && <p className="text-red-500 text-center mt-4">Invalid Email or Password</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
