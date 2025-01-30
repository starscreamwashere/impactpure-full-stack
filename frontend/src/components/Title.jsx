import React from 'react'
import { motion } from "framer-motion";
import { SlideRight } from "../utility/animation";

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <motion.p 
      className='text-gray-500'>{text1} <span className='text-gray-700 font-medium'>{text2}</span>
      </motion.p>
    </div>
  )
}

export default Title
