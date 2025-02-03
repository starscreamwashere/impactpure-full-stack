import React, { useState, useEffect } from "react";

import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideLeft, SlideRight } from "../utility/animation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Plane, Environment } from "@react-three/drei";
import { motion as motion3D } from "framer-motion-3d"; // Import for 3D animations

const Model = () => {
  const assembledModel = useGLTF("/Impactpure.glb");
  const dismantledModel = useGLTF("/all seprate.glb");

  const [isDismantled, setIsDismantled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const applyTransparency = (model) => {
      model.scene.traverse((node) => {
        if (node.isMesh) {
          node.material.transparent = true;
          node.material.opacity = hovered ? 0.4 : 1;
          node.material.depthWrite = !hovered;
          node.material.color.set(node.material.color.getHex());
        }
      });
    };

    applyTransparency(assembledModel);
    applyTransparency(dismantledModel);
  }, [hovered, isDismantled]);

  return (
    <motion3D.group
      initial={{ scale: 1, opacity: 1 }}
      animate={{
        scale: hovered ? 1.05 : 1,
        opacity: hovered ? 0.9 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <primitive
        object={isDismantled ? dismantledModel.scene : assembledModel.scene}
        scale={[0.07, 0.07, 0.07]}
        position={[0, -3.0, 0]}
        rotation={[0, 0, 0]}
        onPointerOver={() => !isMobile && setHovered(true)}
        onPointerOut={() => !isMobile && setHovered(false)}
        onClick={() => isMobile && setIsDismantled(!isDismantled)}
        onDoubleClick={() => !isMobile && setIsDismantled(!isDismantled)}
      />

      {/* ✅ Subtle Shadow Plane */}
      <Plane args={[5, 5]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <meshStandardMaterial attach="material" color="black" opacity={0.2} transparent />
      </Plane>
    </motion3D.group>
  );
};

const Hero = () => {
  return (
    <>
      {/* ✅ Wrapping everything with Gradient & Wavy Background */}
      <div className="relative w-full min-h-screen bg-gradient-to-b from-white to-gray-100 overflow-hidden">
        
        {/* ✅ Wavy SVG Background */}
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,224L48,218.7C96,213,192,203,288,192C384,181,480,171,576,149.3C672,128,768,96,864,101.3C960,107,1056,149,1152,186.7C1248,224,1344,256,1392,272L1440,288V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"></path>
          </svg>
        </div>

        <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
          {/* Text Section */}
          <div className="flex flex-col justify-center px-8 sm:px-16 space-y-6 font-playfair">
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal"
            >
              World's First <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f292c] via-[#00a9e0] to-[#004b59] text-shadow-lg">
                Plug & Play
              </span>
              <br />
              Water Purifier
            </motion.h1>
            <motion.p variants={SlideRight(1.2)} initial="hidden" animate="visible" className="text-gray-600 xl:max-w-[500px]">
              IMPACTPURE® offers portable, sustainable water purification with zero electricity and no water wastage, while retaining essential minerals.
              <span className="block mt-2 text-sm font-semibold text-gray-800">Hover, Toggle and Double Click the model on the right to see the magic.</span>
            </motion.p>
            <motion.div variants={SlideRight(1.5)} initial="hidden" animate="visible" className="flex gap-8 mt-8">
              <button className="primary-btn flex items-center gap-2">Order Now</button>
              <button className="flex items-center gap-2"><FaPlay /> Learn More</button>
            </motion.div>
          </div>

          {/* 3D Model Section */}
          <div className="relative z-50">
            <Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
              <color attach="background" args={["#ffffff"]} />

              {/* ✅ Enhanced Lighting */}
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
              <spotLight position={[10, 15, 10]} intensity={1.2} angle={0.4} penumbra={0.8} castShadow />

              {/* ✅ Studio Environment */}
              <Environment preset="studio" />

              {/* ✅ Model With Proper Transparency */}
              <motion3D.group>
                <Model />
              </motion3D.group>

              {/* ✅ Allow Full 360° Rotation */}
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} rotateSpeed={1} zoomSpeed={0.8} dampingFactor={0.1} autoRotate={true} autoRotateSpeed={1.5} />
            </Canvas>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;
