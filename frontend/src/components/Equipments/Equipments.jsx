import React from "react";
import { FaTint } from "react-icons/fa";
import { GiMineralHeart, GiRecycle } from "react-icons/gi";
import { motion } from "framer-motion";
import { SlideLeft } from "../../utility/animation";

const EquipmentData = [
  {
    id: 1,
    title: "Advanced Filtration",
    desc: "Removes bacteria, viruses, heavy metals, and pesticides.",
    icon: <FaTint />,
    delay: 0.3,
  },
  {
    id: 2,
    title: "Mineral Retention",
    desc: "Retains essential minerals for healthier hydration.",
    icon: <GiMineralHeart />,
    delay: 0.6,
  },
  {
    id: 3,
    title: "Sustainable Design",
    desc: "Eco-friendly materials with zero water wastage.",
    icon: <GiRecycle />,
    delay: 0.9,
  },
];

const Equipments = () => {
  return (
    <div className="w-full bg-white py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 font-playfair">
        {/* Introductory Text */}
        <div className="col-span-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            What Makes IMPACTPURE Unique
          </h1>
          <p className="text-gray-500">
            Combining innovation, sustainability, and efficiency in water purification.
          </p>
        </div>

        {/* Equipment Cards */}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EquipmentData.map((item) => (
            <motion.div
              key={item.id}
              variants={SlideLeft(item.delay)}
              initial="hidden"
              whileInView="visible"
              className="bg-gray-100 space-y-4 p-6 hover:bg-white rounded-xl hover:shadow-[0_0_22px_0_rgba(0,0,0,0.15)]"
            >
              <div className="text-4xl">{item.icon}</div>
              <p className="text-2xl font-semibold">{item.title}</p>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipments;
