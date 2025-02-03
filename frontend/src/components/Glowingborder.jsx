import React from "react";

const Glowingborder = ({ children }) => {
  return (
    <div className="relative group">
      {/* Glowing Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#003f5c] via-[#2f89fc] to-[#003f5c] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-[6px] drop-shadow-[0_0_10px_#2f89fc]"></div>
      
      {/* Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Glowingborder;
