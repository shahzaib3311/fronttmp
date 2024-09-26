import React, { useState, useEffect } from "react"; // Import useEffect from React
import { useNavigate } from 'react-router-dom';
import DiscountPopup from './DiscountPopup'; // Import the DiscountPopup component

const Landing = () => {
  const [inputValue, setInputValue] = useState('');
  const [promptCount, setPromptCount] = useState(0);
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for current image index
  const images = [
    "/dripSaintAssets/How it Works 1.webp",
    "/dripSaintAssets/How it Works 2.webp",
    "/dripSaintAssets/How it Works 3.webp"
  ];
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const imagineApiImageGeneration = async (event) => {
    event.preventDefault();

    if (promptCount >= 3) {
      // Redirect to login or sign-up page after 3 prompts
      navigate('/login');
      return;
    }

    setIsLoading(true); // Start loading animation

    try {
      const response = await fetch('https://cl.imagineapi.dev/items/images/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sJ0nQ5O3t2qluZ2imEknuL7yVGnGF_Gj',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: inputValue + " --ar 4:5" })
      });

      const responseData = await response.json();

      setData(responseData.data);

      if (responseData.data.id) {
        navigate(`/generated/yes/${responseData.data.id}`); // Navigate using react-router-dom
      }

      // Increment prompt count after successful API call
      setPromptCount(promptCount + 1);
      
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    } finally {
      setIsLoading(false); // Stop loading animation
      setInputValue(''); // Clear the input field after each submission
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    // Initial check on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  
  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !message) {
      setError('All fields are required.');
      return;
    }
    // Clear the fields and error message
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
    setError('');
    
    // Add your submit logic here, e.g., send data to the server
  };

  return (
<div className="text-sm h-full pt-22 px-4 sm:px-16 md:px-28 lg:px-32">
  <DiscountPopup /> {/* Added DiscountPopup component here */}
  <section className="flex flex-col md:flex-row justify-between items-center">
    <div className={`p-4 flex-shrink flex-grow md:w-1/2 ${isMobile ? 'text-center' : ''}`}>
      <h1 className="text-6xl sm:text-7xl md:text-8xl text-white font-abril">Custom Fashion</h1>
      <p className="mt-4 text-[#A87FF3] text-2xl sm:text-3xl font-economica">
      Enter a one liner prompt down below<br />to have it displayed on your T-Shirt
      </p>

      {/* Mobile Layout */}
      {isMobile && (
              <div className="flex flex-col items-center mt-8">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs border text-white bg-[rgba(17,12,34,0.48)] shadow-[0px_0px_10px_2px_#3E2487] rounded-[44px] mb-2 h-[50px]"
                  value={inputValue}
                  onChange={handleChange}
                />
                <button
                  className="shadow-[0px_4px_0px_0px_#000000] bg-pink-500 text-white font-bold rounded-full py-2 px-6 hover:bg-pink-600 transition duration-300 ease-in-out mb-2 h-[50px]"
                  onClick={imagineApiImageGeneration}
                  disabled={isLoading} // Disable button while loading
                >
                  {isLoading ? 'Loading...' : 'Create'}
                </button>
              </div>
            )}

      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex items-center mt-8">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs border text-white bg-[rgba(17,12,34,0.48)] shadow-[0px_0px_10px_2px_#3E2487] rounded-[44px] mb-2 h-[50px] mr-4"
            value={inputValue}
            onChange={handleChange}
          />
          <button
            className="shadow-[0px_4px_0px_0px_#000000] bg-pink-500 text-white font-bold rounded-full py-2 px-6 hover:bg-pink-600 transition duration-300 ease-in-out mb-2 h-[50px]"
            onClick={imagineApiImageGeneration}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Loading...' : 'Create'}
          </button>
        </div>
      )}
    </div>


        <div className="hidden lg:flex flex-grow">
          <div className="flex flex-row items-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="marquee-container h-[700px] w-[250px] relative">
                <div className="marquee overflow-hidden h-[700px] w-[250px]">
                  <div className="marquee-up-content flex flex-col items-center animate-verticalMarqueeUp">
                    <img src="/dripSaintAssets/pic2.webp" alt="Image 1" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic3.webp" alt="Image 2" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic5.webp" alt="Image 3" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic2.webp" alt="Image 1" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic3.webp" alt="Image 2" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic5.webp" alt="Image 3" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic2.webp" alt="Image 1" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic3.webp" alt="Image 2" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic5.webp" alt="Image 3" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                  </div>
                </div>
              </div>
            </div>
            <div className="marquee-container h-[700px] w-[250px] relative">
              <div className="marquee overflow-hidden h-[700px] w-[250px]">
                <div className="marquee-down-content flex flex-col items-center animate-verticalMarqueeDown">
                    <img src="/dripSaintAssets/pic1.webp" alt="Image 3" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic4.webp" alt="Image 1" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic6.webp" alt="Image 2" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic1.webp" alt="Image 3" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic4.webp" alt="Image 1" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic6.webp" alt="Image 2" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />            
                    <img src="/dripSaintAssets/pic1.webp" alt="Image 3" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic4.webp" alt="Image 1" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                    <img src="/dripSaintAssets/pic6.webp" alt="Image 2" className="w-[250px] h-[350px] rounded-lg object-cover mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center min-h-fit py-12 mt-28 lg:mt-40 lg:mx-8 lg:ml-0 sm:mt-0" style={{ marginTop: '13rem' }}>
        <h1 className="text-4xl sm:text-6xl font-abril text-white text-center">How It Works</h1>
      </div>

      <section className="mt-18 lg:mt-40 lg:mx-8 lg:ml-0 relative">

  {/* Display images based on screen size */}
  {isMobile ? (
    <div className="w-full rounded-16xl mx-auto bg-transparent flex justify-center">
      <img
        src={images[currentImageIndex]}
        className="px-4 pb-4 max-w-xs h-auto" // Adjust image size for mobile
        alt={`How it Works ${currentImageIndex + 1}`}
      />
    </div>
  ) : (
<div className="w-full rounded-3xl mx-auto bg-transparent flex justify-center">
  {images.map((image, index) => (
    <img
      key={index}
      src={image}
      className="px-4 pb-8 max-w-full h-auto lg:w-48 lg:h-48" // Adjust image size for desktop
      style={{ width: '100%', maxWidth: '450px', height: 'auto' }} // Adjust width and height here
      alt={`How it Works ${index + 1}`}
    />
  ))}
</div>

  )}

  {/* Navigation buttons for mobile */}
  {isMobile && (
    <>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10 w-12 h-12 bg-transparent text-white flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-900 shadow-md" onClick={prevImage}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10 w-12 h-12 bg-transparent text-white flex justify-center items-center rounded-full cursor-pointer hover:bg-gray-900 shadow-md" onClick={nextImage}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </>
  )}
</section>


      <div className="flex items-center justify-center min-h-fit py-6" style={{ marginTop: '13rem' }}>
        <h1 className="text-6xl font-abril text-white">FEATURES</h1>
      </div>
      <section className="mt-18 pt-28">
  {isMobile ? (
    <div className="flex flex-col items-center mb-16 gap-8">
      <img src="/dripSaintAssets/LandingPage1.jpg" className="w-5/6 rounded-[20px]" />
      <div className="p-8 bg-transparent rounded-tl-3xl min-w-[343px] shadow-2xl">
        <h1 className="mb-8 text-white font-bold text-4xl">Craft your design with prompt</h1>
        <p className="mb-4 text-white w-4/5 text-xl">
          Unleash the power of AI design with our innovative software! Simply type your text and generate countless original design options, no design skills required. Effortlessly create unique and stylish tees with our cutting-edge AI design and printing platform. Enjoy the ease and creativity of AI-infused design, all at your fingertips!
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-row justify-evenly items-center mb-16 gap-32">
      <div className="p-8 bg-transparent rounded-tl-3xl min-w-[343px] md:w-2/5 shadow-2xl">
        <h1 className="mb-8 text-white font-bold text-4xl">Craft your design with prompt</h1>
        <p className="mb-4 text-white w-4/5 text-xl">
          Unleash the power of AI design with our innovative software! Simply type your text and generate countless original design options, no design skills required. Effortlessly create unique and stylish tees with our cutting-edge AI design and printing platform. Enjoy the ease and creativity of AI-infused design, all at your fingertips!
        </p>
      </div>
      <img src="/dripSaintAssets/LandingPage1.jpg" className="w-5/12 rounded-[20px] hidden md:block" />
    </div>
  )}
</section>

<section className="mt-28 pt-28">
  {isMobile ? (
    <div className="flex flex-col items-center mb-16 gap-8">
      <img src="/dripSaintAssets/LandingPage2.jpg" className="w-5/6 rounded-[20px]" />
      <div className="p-8 transparent rounded-tr-[100px] min-w-[343px] shadow-2xl">
        <h1 className="mb-8 text-white font-bold text-4xl">Personalize Your Design</h1>
        <p className="mb-4 text-white w-4/5 text-xl">
          Transform your vision into reality with ease! Our user-friendly platform lets you personalize your apparel in just a few clicks. Enjoy the flexibility to:
        </p>
        <ul className="mb-3 text-white w-4/5 text-xl list-disc list-inside">
          <li>Experiment with multiple design options</li>
          <li>Craft your one-of-a-kind design with Drip Saint</li>
        </ul>
        <p className="text-white w-4/5 text-xl">
          When you're satisfied, simply checkout and complete your order. Our seamless personalization process makes it easy to bring your design to life and make it shine.
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-row justify-evenly items-center mb-16 gap-32">
      <div className="order-2 p-8 transparent rounded-tr-[100px] min-w-[343px] md:w-1/2 shadow-2xl">
        <h1 className="mb-8 text-white font-bold text-4xl">Personalize Your Design</h1>
        <p className="mb-4 text-white w-4/5 text-xl">
          Transform your vision into reality with ease! Our user-friendly platform lets you personalize your apparel in just a few clicks. Enjoy the flexibility to:
        </p>
        <ul className="mb-3 text-white w-4/5 text-xl list-disc list-inside">
          <li>Experiment with multiple design options</li>
          <li>Craft your one-of-a-kind design with Drip Saint</li>
        </ul>
        <div className="h-2 mb-4"></div>
        <p className="text-white w-4/5 text-xl">
          When you're satisfied, simply checkout and complete your order. Our seamless personalization process makes it easy to bring your design to life and make it shine.
        </p>
      </div>
      <img src="/dripSaintAssets/LandingPage2.jpg" className="w-5/12 rounded-[20px] hidden md:block" />
    </div>
  )}
</section>

<section className="mt-28 pt-28">
  {isMobile ? (
    <div className="flex flex-col items-center mb-16 gap-8">
      <img src="/dripSaintAssets/LandingPage3.jpg" className="w-5/6 rounded-[20px]" />
      <div className="p-8 transparent rounded-tl-3xl min-w-[343px] shadow-2xl">
        <h1 className="mb-8 text-white font-bold text-4xl">Swift printing and delivery</h1>
        <p className="mb-4 text-white w-4/5 text-xl">
          Experience the best in printing and delivery! After finalizing your design, our state-of-the-art printer ensures a flawless transfer of your design onto high-quality apparel. Our rigorous quality inspections guarantee a defect-free print every time. Your apparel is then expertly folded, professionally packaged, and swiftly shipped to your doorstep, ready to impress. Enjoy:
        </p>
        <ul className="mb-4 text-white w-4/5 text-xl list-disc list-inside">
          <li>High-quality apparel that exceeds your expectations</li>
          <li>The best print machines for crisp and vibrant designs</li>
          <li>Fastest delivery to get your apparel to you quickly</li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="flex flex-row justify-evenly items-center mb-16 gap-32">
      <div className="p-8 transparent rounded-tl-3xl min-w-[343px] md:w-1/2 shadow-2xl">
        <h1 className="mb-8 text-white font-bold text-4xl">Swift printing and delivery</h1>
        <p className="mb-4 text-white w-4/5 text-xl">
          Experience the best in printing and delivery! After finalizing your design, our state-of-the-art printer ensures a flawless transfer of your design onto high-quality apparel. Our rigorous quality inspections guarantee a defect-free print every time. Your apparel is then expertly folded, professionally packaged, and swiftly shipped to your doorstep, ready to impress. Enjoy:
        </p>
        <ul className="mb-4 text-white w-4/5 text-xl list-disc list-inside">
          <li>High-quality apparel that exceeds your expectations</li>
          <li>The best print machines for crisp and vibrant designs</li>
          <li>Fastest delivery to get your apparel to you quickly</li>
        </ul>
      </div>
      <img src="/dripSaintAssets/LandingPage3.jpg" className="w-5/12 rounded-[20px] hidden md:block" />
    </div>
  )}
</section>


<section className="lg:ml-0 pt-12">
  <div className="w-full sm:w-4/5 rounded-3xl mx-auto mt-22">
    <h1 className="text-center rounded-3xl text-4xl font-bold text-white p-4">
      Customer Reviews
    </h1>
    <div className="w-full flex flex-col justify-center items-center sm:flex-row gap-4 mb-4">
      <div className="bg-[#144851] rounded-3xl p-4 w-full sm:w-auto">
        <div className="w-full flex flex-row justify-end items-center mb-2">
          <img src="/dripSaintAssets/boy.png" className="w-1/5 rounded-full" />
          <h2 className="ml-4 flex-1 text-xl text-white">Abdullah</h2>
        </div>
        <p className="text-white">
          This AI-designed t-shirt blends innovation with style. The intricate, vivid design showcases AI's artistic prowess, while the soft fabric and perfect fit ensure comfort. A conversation starter wherever you go, it's a must-have for tech-savvy fashion enthusiasts.
        </p>
      </div>
      <div className="bg-[#144851] rounded-3xl p-4 w-full sm:w-auto">
        <div className="w-full flex flex-row justify-end items-center mb-2">
          <img src="/dripSaintAssets/girl.png" className="w-1/5 rounded-full" />
          <h2 className="ml-4 flex-1 text-xl text-white">Mariam</h2>
        </div>
        <p className="text-white">
          Experience the future of fashion with this AI-designed t-shirt. Its abstract yet captivating design reflects the boundless creativity of artificial intelligence. Crafted with high-quality fabric and boasting a flawless fit, it's a statement piece that merges innovation and style seamlessly.
        </p>
      </div>
      <div className="bg-[#144851] rounded-3xl p-4 w-full sm:w-auto">
        <div className="w-full flex flex-row justify-end items-center mb-2">
          <img src="/dripSaintAssets/man.png" className="w-1/5 rounded-full" />
          <h2 className="ml-4 flex-1 text-xl text-white">Ali</h2>
        </div>
        <p className="text-white">
          Elevate your wardrobe with this AI-generated masterpiece. The mesmerizing design, born from artificial intelligence, captivates with intricate patterns and modern flair. Comfortable and durable, this tee transcends clothing—it's a testament to technology's boundless potential in fashion.
        </p>
      </div>
    </div>
    <div className="bg-[#1F6976] text-white rounded-3xl p-12 flex flex-col sm:flex-row justify-center items-center mb-6">
      <div className="mb-10 sm:w-1/2 h-full">
        <h1 className="text-3xl mb-6">Get in touch</h1>
        <p className="sm:w-3/4">
          Experience the future of fashion with this AI-designed t-shirt. Its abstract yet captivating design reflects the boundless creativity of artificial intelligence. Crafted with high-quality fabric and boasting a flawless fit, it's a statement piece that merges innovation and style seamlessly.
        </p>
      </div>
      <div className="sm:w-1/2 h-full p-4 mb-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input w-full max-w-xs bg-white text-black placeholder-gray-600 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input w-full max-w-xs bg-white text-black placeholder-gray-600 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full bg-white text-black placeholder-gray-600 border border-gray-300 rounded p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          className="textarea bg-white text-black w-full placeholder-gray-600 border border-gray-300 rounded p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</section>

</div>
  );
};

export default Landing;