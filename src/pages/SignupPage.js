import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Registeration from '../Components/Registeration';
import Navbar from '../Components/Navbar';

const SignupPage = () => {
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
        <Registeration />
      </div>
    </div>
  );
}

export default SignupPage;
