import React, { useState, useEffect } from 'react';
import Login from '../Components/Login';
import Cookies from 'js-cookie';
import Navbar from '../Components/Navbar';

const LoginPage = () => {
  const [toggleRegister, setToggleRegister] = useState(false);

  useEffect(() => {
    if (Cookies.get('jwt')) {
      document.location.href = '/';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/dripSaintAssets/bg111.jpg')" }}>
      <Navbar />
      <div className="flex-grow flex justify-center items-center">
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
