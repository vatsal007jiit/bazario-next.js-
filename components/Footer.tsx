import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; 
const Footer = () => {
  return (
    <>
      <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-16 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          {/* <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bazario</h2>
          <p className="mt-2 text-sm">India’s Bazaar, Online.</p> */}
          <svg className='cursor-pointer' width="180" height="40" viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="28" font-family="Poppins, sans-serif" font-size="28" fill="#2563EB" font-weight="600">
            Bazario
          </text>
        </svg>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Men</a></li>
            <li><a href="#" className="hover:underline">Women</a></li>
            <li><a href="#" className="hover:underline">Electronics</a></li>
            <li><a href="#" className="hover:underline">Grocery</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-xs mt-10 text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Bazario. All rights reserved.
      </div>
    </footer>
    </>
  )
}

export default Footer
