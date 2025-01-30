import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideLeft, SlideRight } from "../utility/animation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Environment } from "@react-three/drei";
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
          node.material.opacity = hovered ? 0.3 : 1;
        }
      });
    };

    applyTransparency(assembledModel);
    applyTransparency(dismantledModel);
  }, [hovered, isDismantled]);

  return (
    <primitive
      object={isDismantled ? dismantledModel.scene : assembledModel.scene}
      scale={[0.06, 0.06, 0.06]}
      position={[0, -2.7, 0]}
      rotation={[0, 0, 0]}
      onPointerOver={() => !isMobile && setHovered(true)}
      onPointerOut={() => !isMobile && setHovered(false)}
      onClick={() => isMobile && setIsDismantled(!isDismantled)}
      onDoubleClick={() => !isMobile && setIsDismantled(!isDismantled)}
    />
  );
};

const Hero = () => {
  return (
    <>
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
            <span className="text-primary">Plug & Play</span> <br />
            Water Purifier
          </motion.h1>
          <motion.p
            variants={SlideRight(1.2)}
            initial="hidden"
            animate="visible"
            className="text-gray-600 xl:max-w-[500px]"
          >
            IMPACTPURE® offers portable, sustainable water purification with
            zero electricity and no water wastage, while retaining essential
            minerals.
            <span className="block mt-2 text-sm font-semibold text-gray-800">
              Hover, Toggle and Double Click the model on the right to see the magic.
            </span>
          </motion.p>
          <motion.div
            variants={SlideRight(1.5)}
            initial="hidden"
            animate="visible"
            className="flex gap-8 mt-8"
          >
            <button className="primary-btn flex items-center gap-2">
              Order Now
            </button>
            <button className="flex items-center gap-2">
              <FaPlay /> Learn More
            </button>
          </motion.div>
        </div>

        {/* 3D Model Section */}
        <div className="relative">
          <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
            <color attach="background" args={["#ffffff"]} />

            {/* Lighting */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
            <spotLight position={[10, 15, 10]} intensity={1.2} angle={0.4} penumbra={0.8} castShadow />
            <Environment preset="studio" />

            {/* ✅ Fixed SlideLeft Animation */}
            <motion3D.group
              initial="hidden"
              animate="visible"
              variants={SlideLeft(0.8)} // ✅ Smoothly slides left without bouncing right first
            >
              <Model />
            </motion3D.group>

            {/* Allow Full 360° Rotation */}
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={true} 
              rotateSpeed={1} 
              minPolarAngle={0} 
              maxPolarAngle={Math.PI} 
              minAzimuthAngle={-Infinity} 
              maxAzimuthAngle={Infinity} 
            />
          </Canvas>
        </div>
      </section>
    </>
  );
};

export default Hero;
