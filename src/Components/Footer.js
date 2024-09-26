import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-black dark:bg-black-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between md:items-center">
          <div className="mb-4 md:mb-0 flex flex-col items-center">
            <a href="/" className="flex items-center mb-4 md:mb-2">
              <img src="/DripSaint.png" className="h-16 md:h-24 me-2" alt="DripSaint Logo" />
            </a>
            <ul className="flex space-x-4 md:space-x-6">
              <li>
                <a href="https://www.facebook.com/profile.php?id=61561487249372" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-lg md:text-2xl">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/drip.saintz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-lg md:text-2xl">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/dripsaint/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-lg md:text-2xl">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:gap-4 w-full md:max-w-screen-lg">
            <div className="mb-6 md:mb-0">
              <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400 hidden md:block">Reach Us</h2>
              <details className="block md:hidden mb-2">
                <summary className="cursor-pointer text-gray-500 dark:text-gray-400 font-medium">Reach Us</summary>
                <ul className="pl-4 text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-2"><a href="/AboutUs" className="hover:underline">About Us</a></li>
                  <li className="mb-2"><strong>Phone:</strong> 0348-6389113</li>
                  <li className="mb-2"><strong>Email:</strong> contact@dripsaint.com</li>
                </ul>
              </details>
              <ul className="hidden md:block text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2"><a href="/AboutUs" className="hover:underline">About Us</a></li>
                <li className="mb-2"><strong>Phone:</strong> 0348-6389113</li>
                <li className="mb-2"><strong>Email:</strong> contact@dripsaint.com</li>
                <li className="mb-2"><strong>Operation Hours:</strong> 9-5 Monday to Saturday</li>
                <li className="mb-2"><strong>Address:</strong> 113 Ghaznavi Block, Bahria Town Lahore</li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400 hidden md:block">Boring Stuff</h2>
              <details className="block md:hidden mb-2">
                <summary className="cursor-pointer text-gray-500 dark:text-gray-400 font-medium">Boring Stuff</summary>
                <ul className="pl-4 text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-2"><a href="/privacypolicy" className="hover:underline">Privacy Policy</a></li>
                  <li className="mb-2"><a href="/termsandcondition" className="hover:underline">Terms and Conditions</a></li>
                  <li className="mb-2"><a href="/termsofuse" className="hover:underline">Terms of Use</a></li>
                  <li className="mb-2"><a href="/RefundPolicy" className="hover:underline">Replacement Policy</a></li>
                  <li className="mb-2"><a href="/ShippingPolicy" className="hover:underline">Shipping Policy</a></li>
                  <li className="mb-2"><a href="/FAQ" className="hover:underline">FAQ</a></li>
                </ul>
              </details>
              <ul className="hidden md:block text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2"><a href="/privacypolicy" className="hover:underline">Privacy Policy</a></li>
                <li className="mb-2"><a href="/termsandcondition" className="hover:underline">Terms and Conditions</a></li>
                <li className="mb-2"><a href="/termsofuse" className="hover:underline">Terms of Use</a></li>
                <li className="mb-2"><a href="/RefundPolicy" className="hover:underline">Replacement Policy</a></li>
                <li className="mb-2"><a href="/ShippingPolicy" className="hover:underline">Shipping Policy</a></li>
                <li className="mb-2"><a href="/FAQ" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0">
              <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400 hidden md:block">Resources</h2>
              <details className="block md:hidden mb-2">
                <summary className="cursor-pointer text-gray-500 dark:text-gray-400 font-medium">Resources</summary>
                <ul className="pl-4 text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-2"><a href="https://www.clicksotic.com" className="hover:underline">Clicksotic</a></li>
                </ul>
              </details>
              <ul className="hidden md:block text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-2"><a href="https://www.clicksotic.com" className="hover:underline">Clicksotic</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
