import React from 'react';
import { motion } from 'framer-motion';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { SlideRight, SlideLeft } from '../utility/animation.js';

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <motion.div
        className="text-2xl text-center pt-8"
        initial="hidden"
        animate="visible"
        variants={SlideLeft(0.3)} // Applying SlideRight to the title
      >
        <Title text1={'ABOUT'} text2={'US'} />
      </motion.div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <motion.img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
          initial="hidden"
          animate="visible"
          variants={SlideRight(0.5)} // Applying SlideLeft to the image
        />
        <motion.div
          className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600"
          initial="hidden"
          animate="visible"
          variants={SlideLeft(0.5)} // Applying SlideRight to the text
        >
          <p>
            <b>IMPACTPURE</b> was founded to revolutionize water purification by making clean, mineral-rich water
            accessible anywhere, anytime. Our journey began with a vision to create innovative, eco-friendly solutions
            that prioritize sustainability without compromising quality.
          </p>
          <p>
            From homes and workplaces to outdoor adventures, our plug-and-play purifiers are designed to meet diverse
            needs. By eliminating water wastage, retaining essential minerals, and requiring no electricity,{' '}
            <b>IMPACTPURE</b> sets a new standard in water purification.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At <b>IMPACTPURE</b>, our mission is to empower people with access to clean water through innovative,
            sustainable, and affordable solutions. We are dedicated to preserving the environment for future
            generations while ensuring reliability and convenience.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <motion.div
        className="text-xl py-4"
        initial="hidden"
        animate="visible"
        variants={SlideRight(0.6)} // Applying SlideRight to the "WHY CHOOSE US" title
      >
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </motion.div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <motion.div
          className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
          initial="hidden"
          animate="visible"
          variants={SlideRight(0.7)} // Applying SlideRight to the first reason
        >
          <b>Eco-Friendly Solutions:</b>
          <p className="text-gray-600">
            Designed with sustainability in mind, our purifiers require no electricity and eliminate water wastage.
          </p>
        </motion.div>
        <motion.div
          className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
          initial="hidden"
          animate="visible"
          variants={SlideRight(0.8)} // Applying SlideRight to the second reason
        >
          <b>Convenience:</b>
          <p className="text-gray-600">
            Plug-and-play technology ensures ease of use, whether at home, work, or on the go.
          </p>
        </motion.div>
        <motion.div
          className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
          initial="hidden"
          animate="visible"
          variants={SlideRight(0.9)} // Applying SlideRight to the third reason
        >
          <b>Uncompromised Quality:</b>
          <p className="text-gray-600">
            Retains essential minerals while ensuring 99.99% sterilization with advanced technology.
          </p>
        </motion.div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
