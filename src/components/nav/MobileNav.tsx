import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiBars3 } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { NAV_LINKS } from '@/constants';
import { SideBarLink } from './SideBarLink';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary transition-colors ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <MdOutlineLightMode className="h-5 w-5" />
      ) : (
        <MdOutlineDarkMode className="h-5 w-5" />
      )}
    </button>
  );
};

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-foreground hover:bg-green-500 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <HiBars3 className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />

            {/* Menu panel */}
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-3/4 bg-background border-l border-border z-50 overflow-y-auto"
            >
              <div className="flex justify-end p-4">
                <button 
                  onClick={closeMenu} 
                  className="h-11 w-11 flex items-center justify-center rounded-md text-foreground/80 hover:text-green-500 hover:bg-secondary/80 transition-colors"
                  aria-label="Close menu"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 pt-0">
                <nav>
                  <ul className="flex flex-col space-y-6">
                    {NAV_LINKS.map((link) => (
                      <li key={link.route}>
                        <SideBarLink
                          label={link.label}
                          route={link.route}
                          icon={link.icon}
                          onClick={closeMenu}
                          className="text-lg py-3 px-4 flex items-center gap-3 rounded-md hover:bg-secondary/80 transition-colors font-medium"
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 