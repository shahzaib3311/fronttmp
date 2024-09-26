import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // New state to track registration status
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const phone_number = formData.get('phone_number');
    const confirmPassword = formData.get('confirm-password');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    try {
      const response = await axios.post(`https://api.dripsaint.com/api/auth/`, {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number
      }, {
        withCredentials: true
      });
      console.log(response.data);
      setIsRegistered(true); // Set isRegistered to true on successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Your DripSaint Account has been created!
          </h2>
          <div className="text-center">
            <button
              onClick={() => navigate(-1)} // Navigate to login page on click
              className="text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="flex flex-col md:flex-row w-full max-w-2xl h-auto p-8 bg-white shadow-lg rounded-lg mx-4 mt-8">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src="/dripSaintAssets/pic.jpeg"
            alt="Plant"
            className="w-full h-full object-cover rounded-lg md:block hidden"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Create an Account!
            </h2>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="name@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="FirstName"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="LastName"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    required
                    pattern="[\d+]*"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="ContactNumber"
                    title="Please enter a valid phone number."
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
                    placeholder="Enter Your Password here"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                    placeholder="Enter Your Password Again Here"
                  />
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500"
                  >
                    I accept the{' '}
                    <a
                      className="font-medium text-indigo-600 hover:underline"
                      href="\termsandcondition"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Create an account
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center mt-6">
              <span className="text-sm text-gray-700">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Log in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
