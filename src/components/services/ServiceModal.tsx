import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";
import { HiOutlineCalendar } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FaPhoneAlt, FaEnvelope, FaClock, FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";

interface Props {
  modalContent: React.ReactNode;
  projectLink: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  imgSrc: string;
  title: string;
  code: string;
  tech: string[];
}

export const ServiceModal = ({
  modalContent,
  projectLink,
  setIsOpen,
  isOpen,
  imgSrc,
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

  if (!isOpen) return null;

  return ReactDOM.createPortal(
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
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-green-500/10 to-transparent opacity-60 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Затвори диалога"
            >
              <IoMdClose className="text-xl" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Featured image section */}
              <div className="col-span-1 md:col-span-3 relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={imgSrc}
                  alt={`Изображение на услугата ${title}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent pointer-events-none"></div>
                
                {/* Service title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-md">{title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tech.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-zinc-800/90 backdrop-blur-sm border border-green-500/20 text-zinc-300 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-20 h-1 bg-green-500 rounded-full"></div>
                </div>
              </div>

              {/* Service content section */}
              <div className="col-span-1 md:col-span-2 p-6 sm:p-8">
                {/* Service highlights */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                    <div className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
                      <FaClock />
                    </div>
                    <div>
                      <div className="text-zinc-400 text-xs">Продължителност</div>
                      <div className="text-zinc-100 text-sm">2-3 часа</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                    <div className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <div className="text-zinc-400 text-xs">Локация</div>
                      <div className="text-zinc-100 text-sm">Онлайн / На място</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                    <div className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
                      <FaUsers />
                    </div>
                    <div>
                      <div className="text-zinc-400 text-xs">Участници</div>
                      <div className="text-zinc-100 text-sm">Малки групи</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                    <div className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
                      <FaStar />
                    </div>
                    <div>
                      <div className="text-zinc-400 text-xs">Рейтинг</div>
                      <div className="text-zinc-100 text-sm">4.9/5.0</div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="prose prose-invert prose-zinc prose-p:text-zinc-300 prose-headings:text-zinc-100 prose-strong:text-green-400 prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline prose-li:text-zinc-300 max-w-none mb-8">
                  {modalContent}
                </div>

                {/* Booking section */}
                <div className="rounded-lg bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border border-zinc-700/40 p-5 mb-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-3 flex items-center gap-2">
                    <HiOutlineCalendar className="text-green-400" /> Запазване на час
                  </h3>
                  <p className="text-zinc-400 mb-4 text-sm">
                    Свържете се с нас, за да запазите час за тази услуга или да получите повече информация.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={code}
                      target="_blank"
                      rel="nofollow"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg shadow-green-900/20"
                    >
                      <HiOutlineCalendar className="text-lg" /> 
                      <span>Онлайн записване</span>
                    </Link>
                    <Link
                      href={projectLink}
                      target="_blank"
                      rel="nofollow"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50 rounded-lg transition-colors"
                    >
                      <RxExternalLink className="text-lg" /> 
                      <span>Виж графика</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="col-span-1 p-6 sm:p-8 bg-gradient-to-b from-zinc-800/30 to-zinc-900/30 border-t md:border-t-0 md:border-l border-zinc-800/30">
                {/* Testimonials */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4">Отзиви</h3>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 text-xs" />
                        ))}
                      </div>
                      <p className="text-zinc-300 text-sm italic mb-2">
                        "Изключително полезно! Научих техники, които прилагам всеки ден."
                      </p>
                      <p className="text-zinc-400 text-xs">Мария К.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 text-xs" />
                        ))}
                      </div>
                      <p className="text-zinc-300 text-sm italic mb-2">
                        "Страхотен семинар! Елис обяснява сложни концепции по достъпен начин."
                      </p>
                      <p className="text-zinc-400 text-xs">Иван П.</p>
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-3">Контакти</h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                    <div className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <div className="text-zinc-400 text-xs">Телефон</div>
                      <div className="text-zinc-100 text-sm">+359 888 123 456</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/30">
                    <div className="w-8 h-8 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full">
                      <FaEnvelope />
                    </div>
                    <div>
                      <div className="text-zinc-400 text-xs">Имейл</div>
                      <div className="text-zinc-100 text-sm">contact@example.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("root") as HTMLElement
  );
}; 