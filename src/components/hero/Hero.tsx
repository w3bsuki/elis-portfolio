import { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../util/Reveal";
// Keeping DotGrid import for future use (temporarily removed from rendering)
import DotGrid from "./DotGrid";
import { OutlineButton } from "../buttons/OutlineButton";
import Book3D from "./Book3D";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { MdClose } from "react-icons/md";
import { IoIosQuote } from "react-icons/io";
import { Dialog } from "../ui/dialog";

// Custom avatar modal component that uses portal
const AvatarModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // Control body overflow
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (typeof window === "undefined" || !isOpen) return null;

  // Create the modal content
  const content = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-left align-middle shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold leading-6 text-green-500">
            За мен
          </h3>
          <button
            type="button"
            className="text-zinc-300 hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Затвори диалога"
            title="Затвори"
          >
            <MdClose />
          </button>
        </div>
        <div className="mt-2 text-zinc-300">
          <div className="text-center mb-4">
            <Avatar size="lg" className="mx-auto mb-4">
              <AvatarImage 
                src="/images/avatar.jpg" 
                alt="Елис" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <AvatarFallback className="text-xl font-semibold text-green-500 bg-zinc-800">ЕД</AvatarFallback>
            </Avatar>
            <h4 className="text-lg font-semibold text-green-500">Елис Димитрова</h4>
            <p className="text-sm text-zinc-400">Психолог & Автор</p>
          </div>
          <p className="mb-2">
            Здравейте! Аз съм сертифициран психолог с над 10 години опит в работата с хора от различни възрасти и с разнообразни предизвикателства.
          </p>
          <p className="mb-2">
            Специализирам в когнитивно-поведенческа терапия и помагам на клиентите си да преодолеят трудности като тревожност, депресия, стрес и проблеми във взаимоотношенията.
          </p>
          <p>
            В моята практика вярвам в създаването на безопасно и подкрепящо пространство, където всеки може да изследва мислите и чувствата си без страх от осъждане.
          </p>
        </div>
      </motion.div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("root") as HTMLElement);
};

// Consultation form modal
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // Adding body overflow control
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "individual",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the form submission 
    // Like sending data to a server
    console.log("Form submitted:", formData);
    
    // For demo purposes, just show alert and close the modal
    alert("Thank you for your inquiry! We'll contact you soon.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Заявка за консултация">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">
            Име и фамилия
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 focus:border-green-500/50 outline-none rounded-lg text-zinc-200"
            placeholder="Вашето име"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
            Имейл
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 focus:border-green-500/50 outline-none rounded-lg text-zinc-200"
            placeholder="вашият@имейл.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-1">
            Телефон (незадължително)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 focus:border-green-500/50 outline-none rounded-lg text-zinc-200"
            placeholder="Телефонен номер"
          />
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-zinc-400 mb-1">
            Тип услуга
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 focus:border-green-500/50 outline-none rounded-lg text-zinc-200"
          >
            <option value="individual">Индивидуална терапия</option>
            <option value="couples">Семейно консултиране</option>
            <option value="group">Групова терапия</option>
            <option value="workshop">Участие в уъркшоп</option>
            <option value="other">Друго</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1">
            Съобщение
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 focus:border-green-500/50 outline-none rounded-lg text-zinc-200 resize-none"
            placeholder="Опишете накратко вашето запитване..."
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-zinc-300 hover:text-white transition-colors"
          >
            Отказ
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg shadow-green-800/20"
          >
            Изпращане
          </button>
        </div>
      </form>
    </Dialog>
  );
};

// Email signup component for free book
const FreeBookSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this email to your backend/API
    console.log("Email submitted:", email);
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 5000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-8 bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/40 p-4 rounded-lg max-w-md mx-auto relative"
    >
      <motion.div 
        className="absolute -top-3 -left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
        animate={{ 
          y: [0, -5, 0],
          scale: [1, 1.05, 1] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        Ограничена оферта
      </motion.div>
      
      <h3 className="text-lg font-bold text-green-500 mb-2">Получете безплатна електронна книга</h3>
      <p className="text-zinc-300 text-sm mb-4">
        Абонирайте се за нашия бюлетин и получете безплатно копие от моята въвеждаща книга за психология на ежедневието.
      </p>
      
      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-500/20 border border-green-500/30 text-green-300 p-3 rounded-lg text-center"
        >
          <p className="font-medium">Благодарим ви!</p>
          <p className="text-sm">Изпратихме линк за изтегляне на вашия имейл.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Вашият имейл адрес" 
            className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 focus:border-green-500/50 outline-none rounded-lg text-zinc-200 text-sm"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg shadow-green-800/20 whitespace-nowrap text-sm font-medium"
          >
            Изтегли книгата
          </button>
        </form>
      )}
    </motion.div>
  );
};

const Hero = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [bookAnimation, setBookAnimation] = useState(false);

  // Memoize the dialog toggle function to prevent unnecessary re-renders
  const toggleDialog = useCallback(() => {
    setIsDialogOpen(prev => !prev);
  }, []);
  
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const openConsultation = useCallback(() => {
    setIsConsultationOpen(true);
  }, []);

  const closeConsultation = useCallback(() => {
    setIsConsultationOpen(false);
  }, []);

  // Fixed book animation with proper interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBookAnimation(prev => !prev);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="text-slat-100 overflow-hidden py-16 md:py-28 relative" id="hero">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/5 via-transparent to-zinc-800/10 pointer-events-none" />
      
      {/* DotGrid with controlled opacity to prevent render issues */}
      <div className="opacity-30">
        <DotGrid />
      </div>
      
      <div className="relative">
        <div className="pointer-events-none relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:max-w-[60%]">
            <Reveal>
              <div className="flex items-center gap-4 mb-4 px-0">
                <button
                  onClick={toggleDialog}
                  className="cursor-pointer transition-transform hover:scale-105 relative group bg-transparent border-0 p-0"
                >
                  <Avatar size="lg" className="pointer-events-auto shadow-md border border-zinc-800 group-hover:border-green-500/50 transition-colors">
                    <AvatarImage 
                      src="/images/avatar.jpg" 
                      alt="Елис" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <AvatarFallback className="text-xl font-semibold text-green-500 bg-zinc-800">ЕД</AvatarFallback>
                  </Avatar>
                  {/* Simplified pulse effect to avoid rendering issues */}
                  <span className="absolute inset-0 rounded-full bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <div>
                  <h2 className="text-lg font-medium text-green-500">Елис Димитрова</h2>
                  <p className="text-sm text-zinc-400">Психолог & Автор</p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <h1 className="mb-6 mt-2 text-4xl font-medium !leading-[1.3] md:text-6xl">
                Здравейте, аз съм <span className="relative inline-block">
                  Елис<span className="text-green-500">.</span>
                  <motion.span 
                    className="absolute bottom-0 left-0 h-1 bg-green-500/30 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="mb-3 text-lg text-zinc-400">
                Аз съм <span className="font-semibold text-green-500">психолог и психотерапевт</span> с над 10 години опит.
                Помагам на хората да постигнат емоционално благополучие.
              </p>
            </Reveal>
            <Reveal>
              <p className="leading-relaxed max-w-xl text-sm text-zinc-300 md:text-base mb-6">
                Като дипломиран психолог и автор, помагам на хората да създадат осъзнат, мечтан живот.
              </p>
            </Reveal>
            <Reveal>
              <div className="flex flex-wrap gap-3 mt-2">
                <OutlineButton
                  className="before:bg-green-500 hover:text-white hover:border-green-500 bg-green-500 text-zinc-100 border-green-500 shadow-lg shadow-green-800/20 pointer-events-auto"
                  onClick={openConsultation}
                >
                  КОНСУЛТАЦИЯ
                </OutlineButton>
                <OutlineButton
                  className="before:bg-transparent hover:text-green-500 hover:border-green-500 bg-transparent text-zinc-100 border-zinc-400 pointer-events-auto"
                  onClick={() => {
                    try {
                      const booksSection = document.getElementById("books");
                      if (booksSection) {
                        booksSection.scrollIntoView({ behavior: "smooth" });
                      } else {
                        // Fallback if books section doesn't exist yet
                        const projectsSection = document.getElementById("projects");
                        if (projectsSection) {
                          projectsSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    } catch (error) {
                      console.error("Error scrolling to section:", error);
                    }
                  }}
                >
                  Моите Книги
                </OutlineButton>
              </div>
            </Reveal>
          </div>
          
          <div className="mt-8 md:mt-0 pointer-events-auto relative">
            {/* New book badge - perfectly centered above book */}
            <motion.div 
              className="absolute -top-14 left-0 right-0 mx-auto w-max z-10 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-bold px-5 py-2 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: 0
              }}
              // Add glowing effect with shadow animation
              whileInView={{
                boxShadow: [
                  "0px 0px 0px rgba(74, 222, 128, 0)",
                  "0px 0px 20px rgba(74, 222, 128, 0.7)",
                  "0px 0px 0px rgba(74, 222, 128, 0)"
                ]
              }}
              transition={{ 
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                duration: 0.5
              }}
            >
              НОВА КНИГА
            </motion.div>
            
            {/* Perfect advanced Book3D animation with physics-based animations */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                rotateZ: bookAnimation ? [0, 2, 0, -1, 0] : 0,
                y: bookAnimation ? [0, -12, -8, -10, 0] : 0
              }}
              transition={{ 
                opacity: { duration: 0.8, ease: "easeOut" },
                y: { 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: [0.4, 0.0, 0.2, 1],
                  times: [0, 0.2, 0.5, 0.8, 1]
                },
                rotateZ: { 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: [0.4, 0.0, 0.2, 1],
                  times: [0, 0.3, 0.5, 0.7, 1]
                }
              }}
              className="transform-gpu relative"
              style={{ 
                filter: "drop-shadow(0px 20px 50px rgba(0, 0, 0, 0.5))",
                transformStyle: "preserve-3d"
              }}
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0px 30px 60px rgba(0, 0, 0, 0.6))",
                transition: { duration: 0.3 } 
              }}
              onMouseEnter={() => setBookAnimation(true)}
              onMouseLeave={() => setBookAnimation(false)}
            >
              {/* Add subtle light reflection effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-md z-10 pointer-events-none" 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  backgroundPosition: ["0% 0%", "100% 100%"]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              <Book3D className="transform-gpu" />
            </motion.div>
          </div>
        </div>
        
        {/* Email signup form replacing testimonial */}
        <div className="mt-12">
          <FreeBookSignup />
        </div>
      </div>

      {/* Use AnimatePresence to properly handle dialog animation */}
      <AnimatePresence>
        {isDialogOpen && (
          <AvatarModal 
            isOpen={isDialogOpen} 
            onClose={closeDialog} 
          />
        )}
      </AnimatePresence>

      {/* Consultation form dialog */}
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={closeConsultation}
      />
    </section>
  );
};

export default Hero;
