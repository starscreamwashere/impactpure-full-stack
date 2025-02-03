import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className="bg-gray-100 py-10 mt-40 rounded-t-lg shadow-md">
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm px-6 sm:px-20'>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <img src={assets.logo} className='mb-5 w-32' alt="IMPACTPURE Logo" />
            <p className='w-full md:w-2/3 text-gray-600'>
              IMPACTPURE® combines advanced technology and eco-friendly design to deliver pure, mineral-rich water for every need. Join us in creating a sustainable future with zero electricity, no water wastage, and reliable hydration for homes, workplaces, and outdoor adventures.
            </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <p className='text-xl font-semibold text-gray-800 mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li className='hover:text-black transition-all cursor-pointer'>Home</li>
                <li className='hover:text-black transition-all cursor-pointer'>About us</li>
                <li className='hover:text-black transition-all cursor-pointer'>Delivery</li>
                <li className='hover:text-black transition-all cursor-pointer'>Privacy policy</li>
            </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
            <p className='text-xl font-semibold text-gray-800 mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li className='hover:text-black transition-all cursor-pointer'>+91 XXXXX XXXXX</li>
                <li className='hover:text-black transition-all cursor-pointer'>contact@impactpure.com</li>
            </ul>
        </motion.div>
      </div>

      <div className='px-6 sm:px-20'>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center text-gray-600'>Copyright 2024 @ impactpure.com - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
