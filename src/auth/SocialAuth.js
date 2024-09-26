import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const SocialAuth = () => {
  let location = useLocation();
  console.log("location", location);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code ? values.code : null;

    if (code) {
      onGogglelogin();
    }
  }, []);

  const googleLoginHandler = (code) => {
    console.log(process.env.BACKEND_API_URL,process.env.REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT,process.env.REACT_APP_GOOGLE_CLIENT_ID)
    return axios
      .get(`https://api.dripsaint.com/api/auth/${code}`)
      .then((res) => {
        localStorage.setItem("user", res.data.user.email);
        return res.data;
      })
      .catch((err) => {
        setError(err);
        return err;
      });
  };

  const onGogglelogin = async () => {
    const response = await googleLoginHandler(location.search);
    if (response.ok) {
      navigate("/");
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <button type="button" className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white" disabled>
        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-medium"> Processing... </span>
      </button>
    </div>
  );
};

export default SocialAuth;
