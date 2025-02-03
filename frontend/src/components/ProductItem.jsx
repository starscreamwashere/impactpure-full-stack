import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Glowingborder from './Glowingborder.jsx';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Glowingborder>
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className='p-3 bg-white shadow-md rounded-lg hover:shadow-lg transition-all'
    >
      <Link 
        onClick={() => scrollTo(0, 0)} 
        className='text-gray-700 cursor-pointer flex flex-col items-center'
        to={`/product/${id}`}
      >
        <div className='overflow-hidden rounded-lg'>
          <motion.img 
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.3 }} 
            className='w-full h-48 object-cover transition-transform duration-300' 
            src={image[0]} 
            alt={name} 
          />
        </div>
        <p className='pt-3 pb-1 text-sm font-semibold text-gray-800'>{name}</p>
        <p className='text-sm font-bold text-black'>{currency}{price}</p>
      </Link>
    </motion.div>
  </Glowingborder>
  );
};

export default ProductItem;
