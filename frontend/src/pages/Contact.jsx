import React from 'react';
import { motion } from 'framer-motion';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { SlideLeft, SlideRight } from '../utility/animation.js';

const Contact = () => {
  return (
    <div>
      {/* Contact Us Section */}
      <motion.div
        className="text-center text-2xl pt-10"
        initial="hidden"
        animate="visible"
        variants={SlideLeft(0.3)} // Applying SlideLeft to the title
      >
        <Title text1={'CONTACT'} text2={'US'} />
      </motion.div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        {/* Applying SlideRight to the Image */}
        <motion.img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
          initial="hidden"
          animate="visible"
          variants={SlideRight(0.5)}
        />
        
        {/* Applying SlideLeft to the Text Section */}
        <motion.div
          className="flex flex-col justify-center items-start gap-6"
          initial="hidden"
          animate="visible"
          variants={SlideLeft(0.5)}
        >
          <p className="font-semibold text-xl text-gray-600">Our Office</p>
          <p className="text-gray-500">
            54709 XXXX Road <br /> MUMBAI - XXXXXX, Maharashtra, India
          </p>
          <p className="text-gray-500">
            Tel: +91 XXXXX XXXXX <br /> Email: contact@impactpure.com
          </p>
        </motion.div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;

