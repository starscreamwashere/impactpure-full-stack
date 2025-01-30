import React from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../utility/animation";

const Banner5 = ({ image, title, subtitle, link }) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">

      <div className="grid grid-cols-1 md:grid-cols-2 items-center py-14 gap-6">
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            src={image}
            alt=""
            className="w-[300px] md:max-w-[400px] xl:min-w-[600px] h-full object-cover"
          />
        </div>

        {/* Banner Text */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-4 lg:max-w-[500px] pl-2">
          <motion.p
            variants={SlideUp(0.5)}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="text-2xl lg:text-4xl font-bold"
            style={{ lineHeight: "1.8" }} // Add this line
          >
            {title}
          </motion.p>
          <motion.p
            variants={SlideUp(0.7)}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="text-gray-600"
            style={{ lineHeight: "1.8" }} // Add this line
            dangerouslySetInnerHTML={{ __html: subtitle }} // Enable rendering bold tags
          />
          <motion.div
            variants={SlideUp(0.9)}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
            className="flex justify-center md:justify-start"
          >
            <button className="primary-btn">Explore More</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner5;
