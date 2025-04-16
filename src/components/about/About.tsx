import { AiOutlineArrowRight } from "react-icons/ai";
import { SectionHeader } from "../util/SectionHeader";
import Reveal from "../util/Reveal";
import { MyLinks } from "../nav/Header";
import { Stats } from "./Stats";
import { MdWorkOutline, MdSchool, MdLibraryBooks } from "react-icons/md";
import { motion } from "framer-motion";
import { memo } from "react";

// Timeline component with key career milestones - memoized to prevent unnecessary re-renders
const Timeline = memo(() => {
  const timelineItems = [
    {
      year: '2013',
      title: 'Дипломиране',
      description: 'СУ "Св. Климент Охридски", Психология',
      icon: <MdSchool className="text-green-500" />
    },
    {
      year: '2015',
      title: 'Старт на практика',
      description: 'Основаване на частна практика',
      icon: <MdWorkOutline className="text-green-500" />
    },
    {
      year: '2018',
      title: 'Първа книга',
      description: '"Пътят към себе си" - наръчник за себепознание',
      icon: <MdLibraryBooks className="text-green-500" />
    },
    {
      year: '2021',
      title: 'Втора книга',
      description: '"Житейската Психология" - стратегии за личностно развитие',
      icon: <MdLibraryBooks className="text-green-500" />
    }
  ];

  return (
    <div className="mt-8 space-y-6">
      <Reveal>
        <h3 className="text-lg font-medium text-green-500 mb-4">Професионален път</h3>
      </Reveal>
      
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-green-500/10" />
        
        {/* Timeline items */}
        {timelineItems.map((item, index) => (
          <Reveal key={`timeline-${index}`}>
            <motion.div 
              className="relative pl-16 mb-6"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * Math.min(index, 5), duration: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-zinc-800 border border-green-500/30 flex items-center justify-center z-10">
                {item.icon}
              </div>
              
              <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/20">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-500/10 text-green-500 mb-1">
                  {item.year}
                </span>
                <h4 className="text-zinc-200 font-medium">{item.title}</h4>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  );
});

Timeline.displayName = "Timeline";

// Resume download button as a separate component for optimization
const ResumeDownload = memo(() => {
  return (
    <Reveal>
      <div className="mt-6 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
        <h4 className="font-medium text-green-500 mb-3">Изтеглете CV</h4>
        <a 
          href="/resume.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-2 px-4 rounded-md transition-colors w-full"
        >
          <MdLibraryBooks />
          <span>Автобиография (PDF)</span>
        </a>
      </div>
    </Reveal>
  );
});

ResumeDownload.displayName = "ResumeDownload";

// Social links component for optimization
const SocialLinksSection = memo(() => {
  return (
    <Reveal>
      <div className="flex items-center gap-6 mt-6 p-3 border border-zinc-800/50 rounded-lg bg-zinc-900/30 backdrop-blur-sm">
        <div className="flex items-center gap-4 text-sm text-green-400">
          <span>Социални мрежи</span>
          <AiOutlineArrowRight />
        </div>
        <MyLinks />
      </div>
    </Reveal>
  );
});

SocialLinksSection.displayName = "SocialLinksSection";

export const About = () => {
  return (
    <section id="about" className="section-wrapper">
      <SectionHeader title="За мен" dir="l" />
      
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-4">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent z-0" />
              <p className="leading-relaxed text-zinc-300 relative z-10 p-4">
                <span className="bg-green-500 text-white py-2 px-3 rounded-md font-bold mr-3 float-left text-2xl shadow-lg shadow-green-500/20">
                  Е
                </span>
                лис е опитен психолог и писател с над 10 години професионален опит. Специализирана в когнитивно-поведенческа терапия, тя помага на клиентите си да преодоляват различни емоционални и психологически предизвикателства.
              </p>
            </div>
          </Reveal>
          
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              За мен любовта е смисълът на всичко, което правя! Вярвам, че всеки един от нас заслужава и може да създаде своя живот мечта! А аз ще се радвам да бъда част от този процес.
            </p>
          </Reveal>
          
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              Консултациите и семинарите които организирам са насочени към това да изградим здрава връзка със себе си, във връзките и взаимоотношенията си и със заобикалящия ни свят; личностно развитие, преодоляване на лоши навици и придобиване на нови, които ни служат за наше благо, здравословен начин на живот, хармония и щастие.
            </p>
          </Reveal>
          
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              Вярвам, че в живота няма случайни неща и щом си попаднал тук, то със сигурност има нещо полезно за теб!
            </p>
          </Reveal>
          
          {/* Use optimized components */}
          <SocialLinksSection />
          
          {/* Add the timeline component */}
          <Timeline />
        </div>
        
        <div className="md:sticky md:top-24 md:self-start">
          <Stats />
          <ResumeDownload />
        </div>
      </div>
    </section>
  );
};
