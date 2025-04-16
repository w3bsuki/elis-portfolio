import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AiFillBook, AiOutlineShoppingCart } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FaStar, FaBookmark, FaShare } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  title: string;
  imgSrc: string;
  code: string;
  projectLink: string;
  tech: string[];
  modalContent: React.ReactNode;
}

export const ProjectModal = ({
  modalContent,
  projectLink,
  setIsOpen,
  imgSrc,
  isOpen,
  title,
  code,
  tech,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal content */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-4xl bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-2xl shadow-2xl overflow-hidden relative z-10"
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Затвори диалога"
            >
              <MdClose className="text-xl" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Book cover section */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 flex flex-col items-center justify-center">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-500/10 to-transparent opacity-60"></div>
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"></div>
                
                {/* Book image with shadow effect */}
                <div className="relative w-full max-w-[200px] aspect-[2/3] rounded-lg overflow-hidden shadow-[0_20px_70px_-15px_rgba(22,163,74,0.3)] z-10">
                  <img
                    className="w-full h-full object-cover"
                    src={imgSrc}
                    alt={`Корица на книгата ${title}.`}
                  />
                </div>
                
                {/* Rating stars */}
                <div className="mt-6 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-lg" />
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="mt-6 w-full space-y-3">
                  <Link 
                    href={projectLink}
                    target="_blank"
                    rel="nofollow"
                    className="w-full py-2.5 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg shadow-green-800/20"
                  >
                    <AiOutlineShoppingCart className="text-lg" /> Купи книгата
                  </Link>
                  
                  <Link 
                    href={code}
                    target="_blank"
                    rel="nofollow"
                    className="w-full py-2.5 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50 rounded-lg transition-colors"
                  >
                    <AiFillBook className="text-lg" /> Прочети откъс
                  </Link>
                </div>
                
                {/* Share and save buttons */}
                <div className="mt-6 w-full flex gap-2">
                  <button className="flex-1 py-2 flex items-center justify-center gap-2 text-sm bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/50 rounded-lg transition-colors">
                    <FaShare className="text-sm" /> Сподели
                  </button>
                  <button className="flex-1 py-2 flex items-center justify-center gap-2 text-sm bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/50 rounded-lg transition-colors">
                    <FaBookmark className="text-sm" /> Запази
                  </button>
                </div>
              </div>
              
              {/* Book details section */}
              <div className="col-span-1 md:col-span-2 p-6 sm:p-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                {/* Book title and category */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tech.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 bg-zinc-800/80 border border-green-500/20 text-zinc-300 rounded-full text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="w-20 h-1 bg-green-500/50 rounded-full"></div>
                </div>
                
                {/* Book description */}
                <div className="prose prose-invert prose-zinc prose-p:text-zinc-300 prose-headings:text-zinc-100 prose-strong:text-green-400 prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline prose-li:text-zinc-300 max-w-none">
                  {modalContent}
                </div>
                
                {/* Book details */}
                <div className="mt-8 pt-6 border-t border-zinc-800/70">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4">Детайли за книгата</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-zinc-400 mb-1">Автор</div>
                      <div className="text-zinc-100">Елис Петрова</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-1">Издателство</div>
                      <div className="text-zinc-100">Психология и развитие</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-1">Година</div>
                      <div className="text-zinc-100">2023</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-1">Страници</div>
                      <div className="text-zinc-100">236</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-1">ISBN</div>
                      <div className="text-zinc-100">978-619-XXXX-XX-X</div>
                    </div>
                    <div>
                      <div className="text-zinc-400 mb-1">Формат</div>
                      <div className="text-zinc-100">Печатна и електронна</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
