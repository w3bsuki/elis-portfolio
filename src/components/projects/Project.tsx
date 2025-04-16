import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiFillBook, AiOutlineShoppingCart } from "react-icons/ai";
import { ProjectModal } from "./ProjectModal";
import { FlipCard, FlipCardFront, FlipCardBack } from "../ui/flip-card";

interface Props {
  modalContent: React.ReactNode;
  description: string;
  projectLink: string;
  imgSrc: string;
  tech: string[];
  title: string;
  code: string;
}

export const Project = memo(({
  modalContent,
  projectLink,
  description,
  imgSrc,
  title,
  code,
  tech,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpenModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[240px] aspect-[2/3] rounded-2xl overflow-hidden shadow-xl shadow-black/30 group transition-all duration-300 hover:shadow-2xl hover:shadow-green-900/20">
          <FlipCard
            front={
              <FlipCardFront className="bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/50 relative overflow-hidden">
                {/* Cover image with overlay */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={`Корица на книгата ${title}.`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-zinc-900/90"></div>
                </div>
                
                {/* Book title and badges */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {tech.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-0.5 bg-green-500/20 border border-green-500/30 backdrop-blur-sm text-green-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-lg text-white">{title}</h3>
                  <div className="mt-2 w-10 h-1 bg-green-500 rounded-full opacity-70" />
                </div>
                
                {/* Flip hint */}
                <div className="absolute top-2 right-2 bg-zinc-800/80 backdrop-blur-sm p-1.5 rounded-full text-xs text-zinc-400 border border-zinc-700/50 animate-pulse">
                  Обърни
                </div>
              </FlipCardFront>
            }
            back={
              <FlipCardBack className="bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/50 flex flex-col p-5 justify-between text-left">
                <div>
                  <h3 className="font-bold text-xl text-green-400 mb-3">{title}</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4 line-clamp-4">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tech.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-zinc-800 border border-zinc-700/50 text-zinc-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button 
                    onClick={handleOpenModal}
                    className="w-full py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Научете повече
                  </button>
                  
                  <div className="flex gap-2">
                    <Link 
                      href={code} 
                      target="_blank" 
                      rel="nofollow"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-xs border border-zinc-700 hover:border-green-500/50 text-zinc-300 hover:text-green-400 rounded-lg transition-colors"
                    >
                      <AiFillBook /> Прочети
                    </Link>
                    <Link 
                      href={projectLink} 
                      target="_blank" 
                      rel="nofollow"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-xs border border-zinc-700 hover:border-green-500/50 text-zinc-300 hover:text-green-400 rounded-lg transition-colors"
                    >
                      <AiOutlineShoppingCart /> Купи
                    </Link>
                  </div>
                </div>
              </FlipCardBack>
            }
          />
        </div>
        
        {/* Book title with hover effects */}
        <motion.div 
          className="mt-4 w-full max-w-[240px] group cursor-pointer"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 w-full">
            <h4 className="font-bold text-base shrink-0 text-zinc-100 group-hover:text-green-400 transition-colors">
              {title}
            </h4>
            <div className="w-full h-[1px] bg-zinc-700 group-hover:bg-green-500/30 transition-colors" />
          </div>
        </motion.div>
      </div>
      
      <ProjectModal
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

Project.displayName = "Project";
