import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderProcessed, setOrderProcessed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const processOrder = async (url) => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setMessage("Order placed! You will receive an email confirmation.");
          setRedirect("home");
        } else {
          setMessage("An error occurred. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
        setOrderProcessed(true);
      }
    };

    if (!orderProcessed) {
      if (query.get("success")) {
        const orderId = query.get("order_id");
        if (orderId) {
          processOrder(`https://api.dripsaint.com/api/confirm_checkout/${orderId}`);
        } else {
          setRedirect("home");
        }
      }

      if (query.get("cancel")) {
        const orderId = query.get("order_id");
        if (orderId) {
          processOrder(`https://api.dripsaint.com/api/cancel_order/${orderId}`);
        } else {
          setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
          setRedirect("cart");
        }
      }
    }
  }, [navigate, orderProcessed]);

  const handleRedirect = () => {
    if (redirect === "home") {
      setMessage("Order placed! You will receive an email confirmation.");
      navigate("/");
    } else if (redirect === "cart") {
      navigate("/cart");
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        message && (
          <div className="mt-20">
            <p>{message}</p>
            {redirect && (
              <button onClick={handleRedirect}>
                {redirect === "home" ? "Go to Homepage" : "Go to Cart"}
              </button>
            )}
          </div>
        )
      )}
    </>
  );
};

export default CheckoutPage;
