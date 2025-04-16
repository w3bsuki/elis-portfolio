import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { HiOutlineX } from "react-icons/hi";
import { BiCalendar, BiUser, BiTimeFive, BiShare, BiBookmark } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { IoClose, IoArrowBack } from "react-icons/io5";
import { BiFacebook, BiTwitter, BiLinkAlt } from "react-icons/bi";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
  imageUrl: string;
}

export const BlogModal = ({
  isOpen,
  setIsOpen,
  title,
  date,
  author,
  content,
  tags,
  imageUrl,
}: Props) => {
  // Calculate estimated reading time
  const readingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const textLength = content.split(" ").length;
    const time = Math.ceil(textLength / wordsPerMinute);
    return time < 1 ? 1 : time;
  }, [content]);

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 md:inset-24 z-50 flex items-start justify-center md:items-center overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 500 }}
          >
            <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-2xl flex flex-col max-h-full">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <IoClose className="w-5 h-5" />
              </button>
              
              {/* Header image */}
              <div className="relative h-72 md:h-96 w-full">
                <img
                  src={imageUrl}
                  alt={`Cover image for ${title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-zinc-900 dark:via-transparent dark:to-transparent"></div>
              </div>
              
              {/* Main content */}
              <div className="relative p-6 md:p-10 w-full h-full overflow-y-auto">
                <header className="mb-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h1 className="text-2xl md:text-4xl font-bold text-zinc-800 dark:text-white mb-4">
                    {title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <BiCalendar className="text-green-500" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BiUser className="text-green-500" />
                      <span>{author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BiTimeFive className="text-green-500" />
                      <span>{readingTime} мин. четене</span>
                    </div>
                  </div>
                </header>
                
                {/* Article content */}
                <div 
                  className="prose prose-zinc dark:prose-invert prose-headings:text-zinc-800 dark:prose-headings:text-zinc-100 prose-a:text-green-600 dark:prose-a:text-green-400 prose-img:rounded-xl max-w-none" 
                  dangerouslySetInnerHTML={{__html: content}}
                />
                
                {/* Article footer */}
                <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-white mb-2">
                        Сподели статията
                      </h4>
                      <div className="flex gap-3">
                        <button 
                          className="text-zinc-600 dark:text-zinc-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                          aria-label="Share on Facebook"
                        >
                          <BiFacebook className="w-5 h-5" />
                        </button>
                        <button 
                          className="text-zinc-600 dark:text-zinc-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                          aria-label="Share on Twitter"
                        >
                          <BiTwitter className="w-5 h-5" />
                        </button>
                        <button 
                          className="text-zinc-600 dark:text-zinc-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                          aria-label="Copy link"
                        >
                          <BiLinkAlt className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                    >
                      <IoArrowBack className="w-4 h-4" />
                      Назад
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BlogModal; 