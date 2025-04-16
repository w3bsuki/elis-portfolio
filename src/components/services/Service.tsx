import React, { useState, useCallback, memo } from "react";
import { useAnimation, useInView, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BiCalendar, BiVideo } from "react-icons/bi";
import { ServiceModal } from "./ServiceModal";
import Reveal from "../util/Reveal";
import { FaCalendarCheck, FaExternalLinkAlt } from "react-icons/fa";

interface ServiceProps {
  modalContent: React.ReactNode;
  description: string;
  projectLink: string;
  imgSrc: string;
  tech: string[];
  title: string;
  code: string;
  categories: string[];
}

export const Service = memo(({
  modalContent,
  description,
  projectLink,
  imgSrc,
  tech,
  title,
  code,
  categories,
}: ServiceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  }, []);

  // CardTag component
  const CardTag = ({ text }: { text: string }) => (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50 whitespace-nowrap"
    >
      {text}
    </motion.span>
  );

  return (
    <>
      <motion.div 
        className="relative group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Service Card */}
        <motion.div
          onClick={handleOpen}
          className="cursor-pointer overflow-hidden bg-gradient-to-br from-zinc-800/50 to-zinc-900/70 border border-zinc-700/30 rounded-lg h-full p-5 transition-all"
          whileHover={{ 
            y: -5,
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
            borderColor: "rgba(132, 204, 22, 0.3)" // green-500 with low opacity
          }}
        >
          {/* Background glow effect on hover */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-500/0 to-green-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"></div>
          
          {/* Image container with overlay on hover */}
          <div className="relative mb-4 rounded-lg overflow-hidden aspect-video bg-zinc-800">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
              style={{ 
                transform: isHovered ? "scale(1.05)" : "scale(1)"
              }}
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-green-500 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
              >
                <FaExternalLinkAlt /> Повече информация
              </motion.span>
            </div>
          </div>
          
          {/* Title and Description */}
          <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-green-400 transition-colors duration-300">{title}</h3>
          <p className="text-zinc-400 mb-4 text-sm line-clamp-3">{description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item) => (
              <CardTag key={item} text={item} />
            ))}
          </div>
          
          {/* Action button */}
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button className="flex items-center gap-2 text-sm bg-zinc-800 hover:bg-green-500 text-zinc-300 hover:text-white px-4 py-2 rounded-full transition-colors duration-300 mt-2 border border-zinc-700/40 hover:border-transparent">
              <FaCalendarCheck /> Запазете час
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <ServiceModal
        modalContent={modalContent}
        projectLink={projectLink}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        imgSrc={imgSrc}
        title={title}
        code={code}
        tech={tech}
      />
    </>
  );
});

Service.displayName = "Service"; 