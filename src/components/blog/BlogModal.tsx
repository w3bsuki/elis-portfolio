import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { HiOutlineX } from "react-icons/hi";
import { BiCalendar, BiUser, BiTimeFive, BiShare, BiBookmark } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

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

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 text-left align-middle shadow-2xl transition-all">
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-20 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Затвори статията"
                  >
                    <HiOutlineX className="text-xl" />
                  </button>
                  
                  {/* Featured image with overlay */}
                  <div className="relative h-72 md:h-80 w-full overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-green-500/10 to-transparent opacity-60 z-10 pointer-events-none"></div>
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl z-10 pointer-events-none"></div>
                    
                    <img
                      src={imageUrl}
                      alt={`Изображение към статията ${title}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent"></div>
                    
                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                        {title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-3 py-1 bg-zinc-800/80 backdrop-blur-sm border border-green-500/20 text-zinc-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Main content */}
                    <div className="col-span-1 md:col-span-2 p-6 md:p-8">
                      {/* Article metadata */}
                      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-zinc-400">
                        <div className="flex items-center gap-1">
                          <BiCalendar className="text-green-500" />
                          <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BiUser className="text-green-500" />
                          <span>{author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BiTimeFive className="text-green-500" />
                          <span>{readingTime} мин. четене</span>
                        </div>
                      </div>

                      {/* Article content */}
                      <div 
                        className="prose prose-invert prose-zinc prose-p:text-zinc-300 prose-headings:text-zinc-100 prose-strong:text-green-400 prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline prose-li:text-zinc-300 max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                      
                      {/* Article footer with share links */}
                      <div className="mt-8 pt-6 border-t border-zinc-800/40">
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="mb-4 md:mb-0">
                            <h4 className="text-sm text-zinc-400 mb-2">Споделете статията</h4>
                            <div className="flex gap-2">
                              <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                                aria-label="Споделете във Facebook"
                              >
                                <FaFacebookF size={14} />
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white rounded-full"
                                aria-label="Споделете в Twitter"
                              >
                                <FaTwitter size={14} />
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white rounded-full"
                                aria-label="Споделете в LinkedIn"
                              >
                                <FaLinkedinIn size={14} />
                              </motion.button>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => setIsOpen(false)}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-900/20"
                          >
                            Затвори
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="col-span-1 hidden md:block p-8 bg-zinc-800/20 border-l border-zinc-800/30">
                      {/* Author info */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-zinc-100 mb-4">За автора</h3>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-full bg-zinc-700 overflow-hidden">
                            <img 
                              src="/images/avatar.jpg" 
                              alt={author}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/100";
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-zinc-100">{author}</h4>
                            <p className="text-sm text-zinc-400">Психолог</p>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-300 mb-3">
                          Елис е психолог с над 10 години опит в областта на личностното развитие и емоционалното благополучие.
                        </p>
                        <button className="text-sm text-green-500 hover:text-green-400">
                          Виж всички статии →
                        </button>
                      </div>
                      
                      {/* Related topics */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-zinc-100 mb-3">Свързани теми</h3>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-full cursor-pointer hover:border-green-500/30 hover:text-green-400 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Save for later */}
                      <div className="p-4 bg-zinc-800/40 border border-zinc-700/30 rounded-lg">
                        <button className="w-full flex items-center justify-center gap-2 py-2 text-zinc-300 hover:text-green-400 transition-colors">
                          <BiBookmark className="text-lg" />
                          <span className="text-sm">Запази за по-късно</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}; 