import React from 'react';
import { motion } from 'framer-motion';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Add functionality for handling form submission here if needed
  };

  return (
    <div className="text-center bg-gradient-to-r from-gray-100 to-gray-200 py-10 rounded-lg shadow-md">
      <motion.p 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-gray-900"
      >
        Stay Updated with IMPACTPURE
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.7 }}
        className="text-gray-500 mt-3"
      >
        Add your email to stay informed about the latest offers and updates from IMPACTPURE.
      </motion.p>
      
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 bg-white rounded-lg shadow-sm"
      >
        <input
          className="w-full sm:flex-1 outline-none py-3 px-4 text-sm text-gray-700"
          type="email"
          placeholder="Enter your email"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          type="submit"
          className="bg-black text-white text-xs px-10 py-3 rounded-r-lg hover:bg-gray-800 transition-all"
        >
          SUBSCRIBE
        </motion.button>
      </motion.form>
    </div>
  );
};

export default NewsletterBox;
