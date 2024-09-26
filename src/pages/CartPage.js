import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItems from "../Components/CartItems";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [designCart, setDesignCart] = useState([]);
  const [customCart, setCustomCart] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const productCartResponse = await axios.get(`https://api.dripsaint.com/api/cart`, {
        withCredentials: true,
      });
      setCart(productCartResponse.data.cart);

      const designCartResponse = await axios.get(`https://api.dripsaint.com/api/design_cart`, {
        withCredentials: true,
      });
      setMessage(designCartResponse.data.message);
      setDesignCart(designCartResponse.data.cart);

      const customCartResponse = await axios.get(`https://api.dripsaint.com/api/custom_cart`, {
        withCredentials: true,
      });
      setCustomCart(customCartResponse.data.cart);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        document.location.href = "/login";
      } else if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from the server.");
      } else {
        setError("Error setting up the request.");
      }
    } finally {
      setLoading(false);
      console.log({ cart, designCart, customCart });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Layout background="bg-gradient-to-br from-slate-900 to-teal-900">
      <div className="flex flex-col items-center justify-center h-full text-white mt-28">
        {loading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            {cart.length === 0 && customCart.length === 0 && designCart.length === 0 ? (
              <div>
                <h1 className="text-4xl font-extrabold">Nothing here :/</h1>
                <h1 className="text-2xl">Try adding something to the cart</h1>
              </div>
            ) : (
              <>
                {(cart.length > 0 || designCart.length > 0 || customCart.length > 0) && (
                  <div>
                    <CartItems cart={cart} designCart={designCart} customCart={customCart} />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
