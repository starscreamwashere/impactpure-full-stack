import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import NewsletterBox from '../components/NewsletterBox';
import Banner from '../components/Banner/Banner';
import Banner2 from '../components/Banner/Banner2';
import Banner3 from '../components/Banner/Banner3';
import Banner4 from '../components/Banner/Banner4';
import Banner5 from '../components/Banner/Banner5';
import Banner6 from '../components/Banner/Banner6';
import Testimonials from "../components/Testimonials/Testimonials";
import Img1 from "../assets/2.png";
import Img2 from "../assets/3.png";
import Equipments from "../components/Equipments/Equipments";
import ProductItem from '../components/ProductItem.jsx';

const BannerData = {
  image: Img1,
  title: "Revolutionizing Water Purification",
  subtitle:
    "IMPACTPURE® uses advanced <strong>Magnetohydrodynamics (MHD)</strong> technology to naturally condition hard water, ensuring <strong>essential mineral retention</strong> for optimal hydration. It operates without electricity, eliminates water wastage, and provides an innovative, <strong>eco-friendly solution</strong> for clean water at home or on the go. IMPACTPURE® is a perfect blend of technology and sustainability for everyday hydration needs.",
  link: "#",
};

const Banner2Data = {
  image: Img2,
  title: "Advanced Multi-Stage Filtration",
  subtitle:
    "IMPACTPURE® features <strong>UF</strong>, <strong>nano-silver</strong>, <strong>copper infusion</strong>, and <strong>KDF filtration technologies</strong> to ensure safe drinking water. It removes <strong>bacteria</strong>, <strong>viruses</strong>, <strong>heavy metals</strong>, <strong>pesticides</strong>, and microplastics, along with harmful chemicals like <strong>PFOA</strong> and <strong>PFAS</strong>. Its multi-stage system guarantees superior water quality, delivering clean, pure, and safe hydration for various environments.",
  link: "#",
};

const Banner3Data = {
  image: Img1,
  title: "Eco-Friendly and Sustainable Design",
  subtitle:
    "IMPACTPURE® minimizes plastic use by incorporating durable materials like <strong>high-grade metals</strong> and <strong>clay components</strong>. It operates entirely without electricity, eliminates water wastage, and significantly reduces its <strong>carbon footprint</strong>. This design ensures environmental responsibility, supporting <strong>global sustainability goals</strong> while maintaining access to clean water for users everywhere.",
  link: "#",
};

const Banner4Data = {
  image: Img2,
  title: "Portable and Plug-and-Play Design",
  subtitle:
    "With its <strong>plug-and-play functionality</strong>, IMPACTPURE® transforms any tap into a source of clean, safe water. Lightweight and compact, it’s ideal for travel, outdoor use, and <strong>emergency situations</strong>. Designed for long-term use, with a lifespan of up to <strong>10 years</strong>, it ensures reliable hydration wherever you are.",
  link: "#",
};

const Banner5Data = {
  image: Img1,
  title: "Affordable Hydration Without Compromise",
  subtitle:
    "IMPACTPURE® delivers high-quality hydration at an average cost of <strong>₹80 per month</strong>. With <strong>DIY maintenance</strong> and filters requiring replacement only once a year, it’s cost-effective and easy to manage. For budget-conscious users, it offers unmatched value and consistent performance, ensuring mineral-rich water without breaking the bank.",
  link: "#",
};

const Banner6Data = {
  image: Img2,
  title: "Certified for Your Peace of Mind",
  subtitle:
    "IMPACTPURE® is backed by <strong>NABL certification</strong> and five <strong>registered patents</strong>, ensuring the highest standards of quality and reliability. Its filtration system delivers <strong>Himalayan-level water purity</strong>, making it a trusted choice for safe hydration. With certifications to validate its performance, users can enjoy peace of mind with every sip.",
  link: "#",
};

// const Home = () => {
//   return (
//     <div>
//       <Hero />
//       <LatestCollection />
//       <Equipments />
      
//       {/* Banner Section with Animated Image */}
//       <motion.div 
//         initial={{ opacity: 0, y: 50 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Banner {...BannerData} />
//       </motion.div>

//       <motion.div 
//         initial={{ opacity: 0, y: 50 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Banner2 {...Banner2Data} />
//       </motion.div>

//       <motion.div 
//         initial={{ opacity: 0, y: 50 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Banner3 {...Banner3Data} />
//       </motion.div>

//       <motion.div 
//         initial={{ opacity: 0, y: 50 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Banner4 {...Banner4Data} />
//       </motion.div>

//       <motion.div 
//         initial={{ opacity: 0, y: 50 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Banner5 {...Banner5Data} />
//       </motion.div>

//       <motion.div 
//         initial={{ opacity: 0, y: 50 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Banner6 {...Banner6Data} />
//       </motion.div>

//       <Testimonials />
//       <NewsletterBox />
//     </div>
//   );
// }

// export default Home;
const Home=()=>{
  const [scrollDirection,setScrollDirection]=useState(null);
  useEffect(()=>{
    let lastScrollY=window.scrollY;
    const handleScroll = ()=>{
      if (window.scrollY>lastScrollY){
        setScrollDirection('down');
      }else{
        setScrollDirection('up'); // Scrolling up
      }
      lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY; // Prevent negative values
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to apply animations based on scroll direction
  const getScrollAnimation = () => {
    return {
      initial: { y: scrollDirection === 'down' ? 100 : -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.5, ease: 'easeOut' },
    };
  };

  return (
    <div>
      <Hero />
      <LatestCollection />
      <Equipments />
      
      {/* Banner Sections */}
      <motion.div {...getScrollAnimation()}>
        <Banner {...BannerData} />
      </motion.div>

      <motion.div {...getScrollAnimation()}>
        <Banner2 {...Banner2Data} />
      </motion.div>

      <motion.div {...getScrollAnimation()}>
        <Banner3 {...Banner3Data} />
      </motion.div>

      <motion.div {...getScrollAnimation()}>
        <Banner4 {...Banner4Data} />
      </motion.div>

      <motion.div {...getScrollAnimation()}>
        <Banner5 {...Banner5Data} />
      </motion.div>

      <motion.div {...getScrollAnimation()}>
        <Banner6 {...Banner6Data} />
      </motion.div>

      <Testimonials />
      <NewsletterBox />
    </div>
  );
};
export default Home;
