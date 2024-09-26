import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ProductPage = () => {
  const { productKey } = useParams();
  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const BACKEND_API_URL = process.env.BACKEND_API_URL;
  const sizechartpath = "/dripSaintAssets/sizechart.png";
  const [isSizeChartModalOpen, setIsSizeChartModalOpen] = useState(false); // Initial state set to false
  const [userSelection, setUserSelection] = useState({
    product: 0,
    quantity: 1,
    size: "",
    color: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dripsaint.com/api/get_product_details/${productKey}`,
          {
            withCredentials: true,
          }
        );
        setProductData(response.data.Product);
        setUserSelection((prevSelection) => ({
          ...prevSelection,
          product: response.data.Product.id,
        }));

        console.log(response.data);
        setImages(response.data.Images);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        // Handle error response or display error message
      }
    };

    fetchData(); // Call the async function
  }, [productKey]);

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `https://api.dripsaint.com/api/cart/`,
        userSelection,
        { withCredentials: true }
      );
      console.log(response.data);
      document.getElementById("my_modal_4").close(); // Log response data if needed
      // Handle success response
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error response
    }
  };

  const handleSizeSelection = (size) => {
    setUserSelection((prevSelection) => ({
      ...prevSelection,
      size,
    }));
  };

  const handleColorSelection = (color) => {
    setUserSelection((prevSelection) => ({
      ...prevSelection,
      color,
    }));
  };

  const handleIsSizeChartModalOpen = () => {
    setIsSizeChartModalOpen(true);
  };

  const handleIsSizeChartModalClose = () => {
    setIsSizeChartModalOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Layout background="bg-gradient-to-r from-slate-900 to-purple-900">
      <div className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            <div className="hidden md:flex md:w-1/4 px-4">
              <div className="flex flex-col space-y-6">
                {images.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden relative rounded-lg shadow-lg"
                    style={{ width: "150px", height: "150px" }}
                    onClick={() => setCurrentImageIndex(index)}
                    
                  >
                    <img
                      src={`https://api.dripsaint.com${image.media}`}
                      className="object-cover w-full h-full"
                      alt="Product Thumbnail"
                      onContextMenu={(e)=>(e.preventDefault())}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/4 px-4 flex justify-center">
              <div className="relative w-full object-contain">
                <div
                  className="overflow-hidden relative rounded-lg shadow-lg object-contain mx-auto bg-transparent"
                  style={{ width: "100%", height: "500px" }}
                >
                  <img
                    src={`https://api.dripsaint.com${images[currentImageIndex]?.media}`}
                    className="object-contain w-full h-full" // Ensure the image fits inside the box
                    alt="Product"
                    onContextMenu={(e)=>(e.preventDefault())}

                  />
                </div>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-purple-800 dark:bg-purple-800 text-white py-2 px-4 rounded-full font-bold hover:bg-purple-700 dark:hover:bg-purple-700"
                  onClick={handlePreviousImage}
                  style={{
                    left: "-20px", // Adjust to make arrows appear outside the image
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-purple-800 dark:bg-purple-800 text-white py-2 px-4 rounded-full font-bold hover:bg-purple-700 dark:hover:bg-purple-700"
                  onClick={handleNextImage}
                  style={{
                    right: "-20px", // Adjust to make arrows appear outside the image
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/4 px-4 mt-4 md:mt-0">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {productData.product_name}
              </h2>
              <div className="flex flex-col space-y-2 mb-4">
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300 text-xl">
                  Price: Rs
                </span>
                <span className="text-gray-600 dark:text-gray-300 ml-2 text-xl font-bold">
                  {productData.product_price}
                </span>
              </div>

                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">
                    In Stock
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  AI generated t-shirt
                </p>
              </div>
              <p className="text-md">
                Looking for your size? Check{" "}
                <span
                  className="text-purple-800 dark:text-purple-500 font-bold underline cursor-pointer hover:text-purple-700 dark:hover:text-purple-700"
                  onClick={handleIsSizeChartModalOpen} // Open modal on click
                >
                  Size Chart
                </span>
              </p>
              <div className="flex justify-left mt-8">
                <button
                  className="bg-purple-800 dark:bg-purple-800 text-white py-2 px-4 mt-4 rounded-full font-bold hover:bg-purple-700 dark:hover:bg-purple-700"
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                >
                  Add to Cart
                </button>
              </div>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                  <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Select Size:
                    </span>
                    <div className="flex items-center mt-2">
                      {["S", "M", "L", "XL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelection(size)}
                          className={`relative bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                            userSelection.size === size
                              ? "bg-purple-500 dark:bg-purple-600"
                              : ""
                          }`}
                          style={{
                            border: userSelection.size === size ? "2px solid" : "none",
                            background: userSelection.size === size ? "linear-gradient(to right, #8A2BE2, #9370DB)" : "",
                            fontWeight: userSelection.size === size ? "bold" : "normal",
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Select Color:
                    </span>
                    <div className="flex items-center mt-2">
                      <div
                        onClick={() => handleColorSelection("Stone Washed Black")}
                        className={`rounded-lg bg-black text-white flex items-center justify-center cursor-pointer mr-2 p-2 hover:bg-gray-800 ${
                          userSelection.color === "Stone Washed Black"
                            ? "bg-gradient-to-br from-purple-900 to-purple-600"
                            : ""
                        }`}
                        style={{ width: "120px", height: "80px" }}
                      >
                        <span className="text-sm text-center">Stone Washed Black</span>
                      </div>
                      <div
                        onClick={() => handleColorSelection("Snowflake White")}
                        className={`rounded-lg bg-white text-black flex items-center justify-center cursor-pointer p-2 hover:bg-gray-300 ${
                          userSelection.color === "Snowflake White"
                            ? "bg-gradient-to-br from-purple-900 to-purple-600"
                            : ""
                        }`}
                        style={{ width: "120px", height: "80px" }}
                      >
                        <span className="text-sm text-center">Snowflake White</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Select Quantity:
                    </span>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => {
                          setUserSelection((prevSelection) => ({
                            ...prevSelection,
                            quantity:
                              prevSelection.quantity > 1
                                ? prevSelection.quantity - 1
                                : prevSelection.quantity,
                          }));
                        }}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">
                        {userSelection.quantity}
                      </span>
                      <button
                        onClick={() => {
                          setUserSelection((prevSelection) => ({
                            ...prevSelection,
                            quantity: prevSelection.quantity + 1,
                          }));
                        }}
                        className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                      <button className="btn btn-success" onClick={addToCart}>
                      Add to Cart
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
              {isSizeChartModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white dark:bg-gray-800 p-0 rounded-lg shadow-lg flex justify-center flex-col gap-2 w-full max-w-3xl mx-4 sm:mx-0 relative">
                    <button
                      className="bg-black dark:bg-black text-white py-2 px-4 rounded-lg font-bold absolute top-2 right-2"
                      onClick={handleIsSizeChartModalClose}
                    >
                      x
                    </button>
                    <div className="flex justify-center p-0">
                      <img src={sizechartpath} className="w-full object-cover m-0" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-8">
            <span className="text-xl font-bold font-open sans text-white pt-2">
              Product Description:
            </span>
            <p className="text-white text-sm">
                <div className="font-open sans font-semibold text-base">
                  <p className="pt-2">
                    Experience the perfect blend of style and comfort with
                    our Premium 100% Cotton Oversized T-Shirt. Crafted
                    from high-quality, 220 GSM fabric, this tee offers
                    exceptional durability and softness, ensuring you stay
                    comfortable all day long.
                  </p>
                  <p className="pt-4">
                    Designed with an oversized fit, it provides a relaxed
                    and effortless look, making it ideal for everyday
                    wear. Whether you’re lounging at home, running
                    errands, or meeting friends, this versatile t-shirt is
                    your go-to choice for a laid-back, fashionable
                    appearance.
                  </p>

                  {/* Key Features */}
                  <h2 className="text-xl font-bold pt-4">Key Features:</h2>
                    <ul className="pt-4 font-semi bold">
                      <li className="pt-2">
                        • Material: 100% Cotton for ultimate softness and
                        breathability
                      </li>
                      <li className="pt-2">
                        • Fabric Weight: 220 GSM for superior durability and
                        comfort
                      </li>
                      <li className="pt-2">
                        • Fit: Oversized for a relaxed and trendy look
                      </li>
                      <li className="pt-2">
                        • Usage: Perfect for everyday wear, providing
                        comfort and style
                      </li>
                    </ul>
              </div>
            </p>
          </div>

          {/* Free Shipping Image */}
          <div className="flex justify-center mt-8 mb-4">
            <img
              src="/dripSaintAssets/Free Shipping.png"
              alt="Free Shipping"
              className="object-contain"
              style={{ width: '550px', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
