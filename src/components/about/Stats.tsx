import Reveal from "../util/Reveal";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";
import { memo } from "react";

// Enhanced interactive version of the Chip component with hover effects
const InteractiveChip = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-100/80 dark:bg-zinc-800/70 border border-green-500/40 text-zinc-700 dark:text-zinc-300 backdrop-blur-sm shadow-sm hover:border-green-500/70 hover:bg-zinc-200/90 dark:hover:bg-zinc-800/90 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 cursor-pointer"
    >
      {children}
    </motion.div>
  );
});

InteractiveChip.displayName = "InteractiveChip";

// Group of skills as a separate component to prevent render issues
const SkillGroup = memo(({ title, icon, skills }: { 
  title: string;
  icon: JSX.Element;
  skills: string[];
}) => {
  return (
    <Reveal>
      <div>
        <h4 className="flex items-center mb-3 border-b border-zinc-200/60 dark:border-zinc-700/30 pb-2">
          {icon}
          <span className="font-medium ml-2 text-zinc-800 dark:text-zinc-200">{title}</span>
        </h4>
        <div className="flex flex-wrap gap-2 mb-5">
          {skills.map((skill, index) => (
            <InteractiveChip key={`skill-${index}`}>{skill}</InteractiveChip>
          ))}
        </div>
      </div>
    </Reveal>
  );
});

SkillGroup.displayName = "SkillGroup";

export const Stats = memo(() => {
  // Define skills data outside of the render to avoid recreating arrays
  const professionalSkills = [
    "Психологическо консултиране",
    "Лични консултации",
    "Семейно консултиране",
    "Личностно развитие",
    "Мотивационен говорител",
    "Емоционална интелигентност",
    "Семинари",
    "Работилници"
  ];
  
  const approachSkills = [
    "Себепознание",
    "Хармония",
    "Здравословен начин на живот",
    "Медитация",
    "Позитивна психология",
    "Хуманистична психология",
    "Творческа терапия",
    "Емоционално благополучие"
  ];

  return (
    <div className="relative p-4 bg-zinc-50/60 dark:bg-zinc-800/20 rounded-lg border border-zinc-200/60 dark:border-zinc-700/30">
      <SkillGroup 
        title="Професионални умения"
        icon={<AiFillHeart className="text-green-500 text-xl" />}
        skills={professionalSkills}
      />
      
      <SkillGroup 
        title="Теми и подходи"
        icon={<AiFillStar className="text-green-500 text-xl" />}
        skills={approachSkills}
      />
      
      {/* Visual accent element for better aesthetics */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-xl -z-10" />
    </div>
  );
});

Stats.displayName = "Stats";
