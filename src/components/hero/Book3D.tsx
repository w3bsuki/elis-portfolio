"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface BookProps {
  title?: string;
  author?: string;
  coverColor?: string;
  className?: string;
}

const Book3D: React.FC<BookProps> = ({
  title = "Житейската Психология",
  author = "Елис",
  coverColor = "bg-green-500",
  className = "",
}) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      controls.start("hover");
    } else {
      controls.start("rest");
    }
  }, [isHovered, controls]);

  const bookVariants = {
    rest: {
      rotateY: 0,
      rotateX: 10,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      rotateY: -30,
      rotateX: 5,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const pageVariants = {
    rest: { rotateY: 0 },
    hover: { rotateY: -170 },
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-56 h-72 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={controls}
        variants={bookVariants}
      >
        {/* Front Cover */}
        <div
          className={`absolute inset-0 ${coverColor} rounded-r-md rounded-l-sm shadow-lg flex flex-col justify-center items-center p-4 text-center`}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: "translateZ(10px)",
          }}
        >
          <div className="text-white font-bold text-lg mb-2">{title}</div>
          <div className="text-white/80 text-sm">{author}</div>
          <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/20 rounded-full"></div>
        </div>

        {/* Spine */}
        <div
          className={`absolute w-6 h-72 ${coverColor} rounded-l-sm`}
          style={{
            transform: "rotateY(-90deg) translateZ(3px) translateX(-3px)",
            transformOrigin: "left",
          }}
        >
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ transform: "rotateZ(180deg)" }}
          >
            <div className="text-white font-bold text-xs whitespace-nowrap"
                 style={{ writingMode: "vertical-rl" }}>
              {title} - {author}
            </div>
          </div>
        </div>

        {/* Back Cover */}
        <div
          className={`absolute inset-0 bg-green-500 rounded-r-sm rounded-l-md`}
          style={{
            transform: "rotateY(180deg) translateZ(10px)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="h-full w-full flex items-center justify-center p-4 text-center">
            <p className="text-white/80 text-xs">
              Пътуване към себепознанието и личностното израстване
            </p>
          </div>
        </div>

        {/* Pages */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-white rounded-r-sm"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "left",
              transform: `rotateY(${index * -5}deg) translateZ(${9 - index}px) translateX(${index * 0.2}px)`,
            }}
            variants={pageVariants}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.05 * index,
            }}
          >
            <div className="h-full w-full p-6 text-gray-500 text-xs opacity-30">
              <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-2 bg-gray-200 rounded w-2/3"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Book3D; 