import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Generated = () => {
  const navigate = useNavigate();
  const sizechartpath = "/dripSaintAssets/sizechart.png";
  const { custom, id } = useParams();
  const [data, setData] = useState(null);
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customImage, setCustomImage] = useState([]);
  const [shirtStyles, setShirtStyles] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedShirtStyle, setSelectedShirtStyle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showDelayedText, setShowDelayedText] = useState(false);
  const [status, setStatus] = useState("pending");
  const [isSizeChartModalOpen, setIsSizeChartModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchShirtStyles = async () => {
      try {
        const response = await fetch(
          "https://api.dripsaint.com/api/shirt_styles"
        );
        const data = await response.json();
        setShirtStyles(data.shirt_styles);
      } catch (error) {
        console.error("Error fetching shirt styles:", error);
      }
    };

    const pollTaskStatus = (taskId) => {
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.get(
            `https://api.dripsaint.com/api/task_status/${taskId}/`
          );
          const responseData = response.data;

          if (responseData.state === "SUCCESS") {
            setCustomImage(responseData.result.images);
            setLoading(false);
            clearInterval(intervalId);
          } else if (responseData.state === "FAILURE") {
            console.error("Task failed:", responseData.result);
            clearInterval(intervalId);
          } else {
            console.log("Task status:", responseData.status);
          }
        } catch (error) {
          console.error("Error polling task status:", error);
          clearInterval(intervalId);
        }
      }, 5000);
    };

    const fetchData = async () => {
      if (custom === "no") {
        try {
          const response = await fetch(
            "https://api.dripsaint.com/api/get_custom_product/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                custom,
                id,
                custom_img: null,
              }),
            }
          );
          const responseDataTask = await response.json();
          setLoading(false);
          setDesign(responseDataTask.design);
          pollTaskStatus(responseDataTask.task_id);
        } catch (error) {
          console.error("Error starting custom product process:", error);
        }
      } else {
        const pollApiResponse = async () => {
          try {
            const intervalId = setInterval(async () => {
              const response = await fetch(
                `https://cl.imagineapi.dev/items/images/${id}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: "Bearer sJ0nQ5O3t2qluZ2imEknuL7yVGnGF_Gj",
                    "Content-Type": "application/json",
                  },
                }
              );

              const responseData = await response.json();
              if (
                responseData.data &&
                responseData.data.upscaled_urls &&
                responseData.data.upscaled_urls.length > 0
              ) {
                console.log(responseData.data);
                setData(responseData.data);
                setLoading(false);
                clearInterval(intervalId);

                const response = await fetch(
                  "https://api.dripsaint.com/api/get_custom_product/",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      custom,
                      id,
                      custom_img: responseData.data.upscaled_urls[0],
                    }),
                  }
                );
                const responseDataTask = await response.json();
                pollTaskStatus(responseDataTask.task_id);
              } else {
                console.log("image generating");
              }
            }, 5000);

            return () => clearInterval(intervalId);
          } catch (error) {
            console.error("Error", error);
          }
        };

        pollApiResponse();
      }

      fetchShirtStyles();
    };

    fetchData();
  }, [custom, id]);

  useEffect(() => {
    // Commented out for now, but you can uncomment if needed
    // const timer = setTimeout(() => {
    //   setShowDelayedText(true);
    // }, 120000); // Display text after 2 minutes (120000 milliseconds)

    // return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const handleIsSizeChartModalOpen = () => {
    setIsSizeChartModalOpen(true);
  };

  const handleIsSizeChartModalClose = () => {
    setIsSizeChartModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleShirtStyleChange = (styleId) => {
    setSelectedShirtStyle(styleId);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      console.log(data);
      const url =
        custom === "yes"
          ? `https://api.dripsaint.com/api/custom_cart/`
          : `https://api.dripsaint.com/api/design_cart/`;
      const body =
        custom === "yes"
          ? {
              quantity,
              shirt_style: selectedShirtStyle.id,
              size: selectedSize,
              image: data.upscaled_urls[0],
            }
          : {
              design: design.id,
              quantity,
              shirt_style: selectedShirtStyle.id,
              size: selectedSize,
            };
      console.log(body);
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsSubmitting(false);
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
      } else {
        console.error("Error adding to cart:", response.statusText);
        setIsSubmitting(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      console.error("Error adding to cart:", error);

      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <div className="relative flex h-screen w-screen items-center justify-center bg-black">
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center rounded-full overflow-hidden bg-white w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64">
            <video
              src="\dripSaintAssets\130872-748406279_small.mp4"
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="relative text-white text-center text-sm sm:text-lg md:text-xl mt-6">
            our team is working on it so you'll be the only one with the good
            shirt!
          </h3>
          <h4 className="relative text-white text-center text-sm sm:text-lg md:text-xl mt-6"> 
          To save the design, copy the URL
          </h4>
        </div>
      </div>
    );
  }

return (
<div>
  {customImage.length > 0 ? (
    <div className="bg-black dark:bg-black py-8 pt-30">
      <Layout background="bg-gradient-to-r from-slate-900 to-purple-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 py-20">
         <div className="wrapperforimgdesc flex flex-col lg:flex-row lg:gap-4">

         
          <div className="allimgs lg:w-1/2">

          
            <div className="flex flex-col md:flex-row -mx-4">
              {/* Main Image Section */}
              <div className="md:w-full px-4 relative">
                <div onContextMenu={(e)=>{e.preventDefault()}} className=" h-[460px] rounded-lg bg-transparent dark:bg-transparent mb-4 relative object-contain">
                  <img
                    src={`data:image/jpeg;base64,${customImage[selectedImageIndex]}`}
                    alt="Customized Shirt"
                    className="w-full h-full object-contain pointer-events-none"
                    onContextMenu={(e)=>{e.preventDefault()}}
                  />
                  <button
                    className={`absolute left-2 md:left-1/4 lg:left-[12.5%] xl:left-[6.25%] top-1/2 transform -translate-y-1/2 bg-purple-800 dark:bg-purple-800 text-white py-2 px-4 rounded-full font-bold hover:bg-purple-700 dark:hover:bg-purple-700`}
                    onClick={() => handleImageSelect(selectedImageIndex - 1)}
                    disabled={selectedImageIndex === 0}
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    className={`absolute right-2 md:right-1/4 lg:right-[12.5%] xl:right-[6.25%] top-1/2 transform -translate-y-1/2 bg-purple-800 dark:bg-purple-800 text-white py-2 px-4 rounded-full font-bold hover:bg-purple-700 dark:hover:bg-purple-700`}
                    onClick={() => handleImageSelect(selectedImageIndex + 1)}
                    disabled={selectedImageIndex === customImage.length - 1}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails Section */}
            <div className="flex justify-center mb-4">
              {customImage.map((image, index) => (
                <div
                  key={index}
                  className={`mx-2 border ${
                    selectedImageIndex === index
                      ? "border-purple-800"
                      : "border-gray-300 dark:border-gray-700"
                  } rounded-lg cursor-pointer`}
                  onClick={() => handleImageSelect(index)}
                >
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt={`Shirt ${index + 1}`}
                    className="w-24 h-24 object-contain"
                    style={{ width: "150px", height: "150px" }}
                    onContextMenu={(e)=>{e.preventDefault()}}
                  />
                </div>
              ))}
            </div>
            </div>

              {/* Details Section */}
              <div className="md:w-full lg:w-1/2 px-4">
                <h2 className="text-l text-white mb-1">
                  {data ? "AI GENERATED DESIGN " : "Pre-Made Design"}
                </h2>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {design
                    ? design.design_name
                    : data.prompt.replace(/ --ar 4:5$/, "")}
                </h2>
                <div className="flex mb-4">
                  <div className="mr-4 text-xl">
                    <span className="font-bold text-white">Price: Rs </span>
                    {custom === "no" ? (
                      design.discount_price && design.discount_price !== 0 ? (
                        <span className="text-white font-bold">
                          <s>{design.design_price}</s> {design.discount_price}
                        </span>
                      ) : (
                        <span className=" text-white font-bold">
                          {design.design_price}
                        </span>
                      )
                    ) : (
                      <span className="text-2xl text-white font-bold">
                        <s>6600</s> 3500
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full px-0 pb-4">
                  <p className="text-md text-white">
                    Looking for your size? Check{" "}
                    <span
                      className="text-white dark:text-white font-bold underline cursor-pointer hover:text-purple-600"
                      onClick={handleIsSizeChartModalOpen}
                    >
                      Size Chart
                    </span>
                  </p>
                </div>
                <div>
                  {/* Product Description */}
                  <span className="text-xl font-bold font-open sans text-white pt-2">
                    About this Design:
                  </span>
                  <p className="text-white text-sm">
                    {custom === "no" ? (
                      design.design_detail
                    ) : (<p>AI-generated, fully customized
                      designs according to your prompt for a unique and
                      personal touch</p>)
                    }
                  </p>
                </div>
                <button
                    className="bg-purple-800 dark:bg-purple-800 text-white py-2 px-4 mt-4 rounded-full font-bold hover:bg-purple-700 dark:hover:bg-purple-700"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                </button>
              </div>
              </div>

{/* Product Information */}
<div className="mt-8">
  {/* Model Information */}
  <div className="text-white mb-8">
    <p className="text-base font-open-sans">
      The Model is 5’7” wearing small (S) size
    </p>
  </div>

  {/* Care Instructions */}
  <div className="text-white">
    <span className="text-2xl font-bold font-open-sans pt-2">
      Care Instructions:
    </span>
    <ul className="pt-4 text-base font-semibold list-disc pl-5">
      <li className="pt-2">Wash it inside out.</li>
      <li className="pt-2">Gentle Machine wash.</li>
      <li className="pt-2">Do not bleach.</li>
      <li className="pt-2">Iron inside out.</li>
      <li className="pt-2">Do not iron directly on prints.</li>
      <li className="pt-2">Do not dry clean.</li>
    </ul>
  </div>

  {/* Gap Between Sections */}
  <div className="my-8"></div> {/* Adjust the margin as needed for desired gap */}

  {/* Product Description */}
  <div className="text-white">
    <span className="text-2xl font-bold font-open-sans">
      Product Description:
    </span>
    <p className="text-base pt-2 font-open-sans">
      Experience the perfect blend of style and comfort with our Premium 100% Cotton Oversized T-Shirt.
      Crafted from high-quality, 220 GSM fabric, this tee offers exceptional durability and softness,
      ensuring you stay comfortable all day long.
    </p>
    <p className="text-base pt-4 font-open-sans">
      Designed with an oversized fit, it provides a relaxed and effortless look, making it ideal for
      everyday wear. Whether you’re lounging at home, running errands, or meeting friends, this versatile
      t-shirt is your go-to choice for a laid-back, fashionable appearance.
    </p>

    {/* Key Features */}
    <h2 className="text-2xl font-bold pt-4 font-open-sans">
      Key Features:
    </h2>
    <ul className="text-base pt-2 font-semibold list-disc pl-5">
      <li className="pt-2">Material: 100% Cotton for ultimate softness and breathability.</li>
      <li className="pt-2">Fabric Weight: 220 GSM for superior durability and comfort.</li>
      <li className="pt-2">Fit: Oversized for a relaxed and trendy look.</li>
      <li className="pt-2">Usage: Perfect for everyday wear, providing comfort and style.</li>
    </ul>
  </div>
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
      </Layout>
        </div>
      ) : (
        // Loading Animation or Message
        <div className="relative flex h-screen w-screen items-center justify-center bg-black">
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center rounded-full overflow-hidden bg-white w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64">
              <video
                src="\dripSaintAssets\130872-748406279_small.mp4"
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>
            <p className="relative text-white text-center text-sm sm:text-lg md:text-xl mt-4">
              you still there? we are almost done!
            </p>
          </div>
        </div>
      )}
  
  {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Select Options</h2>
      <div className="mb-4">
        <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
        <div className="flex items-center mt-2">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange({ target: { value: size } })}
              className={`relative bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                selectedSize === size ? "bg-purple-500 dark:bg-purple-600" : ""
              }`}
              style={{
                border: selectedSize === size ? "2px solid" : "none",
                background: selectedSize === size ? "linear-gradient(to right, #8A2BE2, #9370DB)" : "",
                fontWeight: selectedSize === size ? "bold" : "normal",
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Shirt Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {shirtStyles.map((style) => (
            <div
              key={style.id}
              className={`p-2 border ${
                selectedShirtStyle && selectedShirtStyle.id === style.id
                  ? "border-purple-800 dark:border-purple-500"
                  : "border-gray-300 dark:border-gray-700"
              } rounded-lg cursor-pointer`}
              onClick={() => handleShirtStyleChange(style)}
            >
              <img
                src={`https://api.dripsaint.com${style.image}`}
                alt={style.name}
                className="w-full h-32 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <span className="font-bold text-gray-700 dark:text-gray-300">Select Quantity:</span>
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleQuantityChange({ target: { value: Math.max(quantity - 1, 1) } })}
            className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            -
          </button>
          <span className="font-bold text-gray-700 dark:text-gray-300 mr-2">{quantity}</span>
          <button
            onClick={() => handleQuantityChange({ target: { value: quantity + 1 } })}
            className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-purple-800 dark:bg-purple-800 text-white py-2 px-4 rounded-full font-bold hover:bg-purple-700 dark:hover:bg-purple-700 mr-2"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="bg-gray-500 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-400 dark:hover:bg-gray-500"
          onClick={handleModalClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

  
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

      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Success!</h2>
            <p>Your item has been added to the cart.</p>
            <button
              className="bg-purple-800 dark:bg-purple-800 text-white py-2 px-4 rounded-full font-bold hover:bg-purple-700 dark:hover:bg-purple-700 mt-4"
              onClick={handleSuccessModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  
  
};

export default Generated;
