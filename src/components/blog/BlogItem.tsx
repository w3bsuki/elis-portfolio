import { useAnimation, useInView, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BlogModal } from "./BlogModal";
import { BiCalendar, BiUser, BiTimeFive, BiBookOpen } from "react-icons/bi";

interface Props {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  imageUrl: string;
}

export const BlogItem = ({
  title,
  date,
  author,
  excerpt,
  content,
  tags,
  imageUrl,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Calculate estimated reading time based on content length
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const textLength = content.split(" ").length;
    const readingTime = Math.ceil(textLength / wordsPerMinute);
    return readingTime < 1 ? 1 : readingTime;
  };
  
  const readingTime = calculateReadingTime();

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <>
      <motion.article
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.6 }}
        className="border border-zinc-800/60 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Image side */}
          <div 
            className="relative cursor-pointer h-56 md:h-full overflow-hidden group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setIsOpen(true)}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#2B2B2B_1px,transparent_1px)] [background-size:8px_8px] opacity-25 z-0"></div>
            
            {/* Image */}
            <div className="absolute inset-0 z-10">
              <img
                src={imageUrl}
                alt={`Изображение към статията ${title}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
                style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent"></div>
            </div>
            
            {/* Hover overlay */}
            <div 
              className="absolute inset-0 z-20 flex items-center justify-center bg-green-500/20 backdrop-blur-sm opacity-0 transition-opacity duration-300 ease-in-out"
              style={{ opacity: hovered ? 0.8 : 0 }}
            >
              <span className="bg-green-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
                <BiBookOpen /> Прочети статията
              </span>
            </div>
            
            {/* Tags overlay */}
            <div className="absolute bottom-4 left-4 z-30 flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-zinc-900/80 backdrop-blur-sm border border-green-500/30 text-green-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Content side */}
          <div className="md:col-span-2 p-6 relative">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-xl -z-10"></div>
            
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-zinc-400">
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
            
            <h3 className="text-xl sm:text-2xl font-bold mb-3 text-zinc-100 hover:text-green-400 transition-colors cursor-pointer" onClick={() => setIsOpen(true)}>
              {title}
            </h3>
            
            <p className="text-zinc-300 mb-5 line-clamp-3">{excerpt}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {tags.length > 2 && (
                  <span className="text-xs text-zinc-500">
                    +{tags.length - 2} още
                  </span>
                )}
              </div>
              
              <button
                onClick={() => setIsOpen(true)}
                className="group inline-flex items-center gap-1 font-medium text-green-500 hover:text-green-400 transition-colors"
              >
                Прочети повече 
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </motion.article>
      
      <BlogModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={title}
        date={date}
        author={author}
        content={content}
        tags={tags}
        imageUrl={imageUrl}
      />
    </>
  );
}; 