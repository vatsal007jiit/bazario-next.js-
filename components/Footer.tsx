import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; 
import Logo from './shared/Logo';
const Footer = () => {
  return (
    <>
      <footer className="bg-green-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10  border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <Logo/>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            {/* <li><a href="#" className="hover:underline hover:text-green-700 transition-colors">Men</a></li> */}
            {/* <li><a href="#" className="hover:underline hover:text-green-700 transition-colors">Women</a></li> */}
            <li><a href="/products" className="hover:underline hover:text-green-700 transition-colors">Wellness Roll-ons</a></li>
            <li><a href="/products" className="hover:underline hover:text-green-700 transition-colors">Fragrances</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:underline hover:text-green-700 transition-colors">About Us</a></li>
            <li><a href="/shipping" className="hover:underline hover:text-green-700 transition-colors">Shipping & Returns</a></li>
            <li><a href="/refund" className="hover:underline hover:text-green-700 transition-colors">Refunds</a></li>
            <li><a href="/privacy" className="hover:underline hover:text-green-700 transition-colors">Privacy Policy </a></li>
            <li><a href="/terms" className="hover:underline hover:text-green-700 transition-colors">Terms & Conditions</a></li>
            <li><a href="/contact-us" className="hover:underline hover:text-green-700 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.instagram.com/greenatva/?hl=en"><FaInstagram /></a>
            <a href="https://www.facebook.com/61563660814171"><FaFacebookF /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-xs mt-10 text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Greenatva. All rights reserved.
      </div>
    </footer>
    </>
  )
}

export default Footer
