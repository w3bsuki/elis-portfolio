import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Link from 'next/link';
import { MyLinks } from './Header';
import { ThemeToggle } from '../ui/theme-toggle';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'За мен', href: '#about' },
  { name: 'Проекти', href: '#projects' },
  { name: 'Услуги', href: '#services' },
  { name: 'Блог', href: '#blog' },
  { name: 'Контакт', href: '#contact' },
];

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={toggleMenu} 
        className="p-2 text-foreground/80 hover:text-green-500 transition-colors dark:hover:text-primary" 
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <HiX className="h-6 w-6" />
        ) : (
          <HiMenuAlt3 className="h-6 w-6" />
        )}
      </button>

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
              className="fixed top-0 right-0 h-full w-64 bg-background border-l border-border z-50 overflow-y-auto"
            >
              <div className="flex justify-end p-4">
                <button 
                  onClick={closeMenu} 
                  className="p-2 text-foreground/80 hover:text-green-500 transition-colors dark:hover:text-primary"
                  aria-label="Close menu"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>

              <nav className="px-6 py-4">
                <ul className="space-y-6">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 hover:text-green-500 transition-colors block py-2 dark:hover:text-primary"
                        onClick={closeMenu}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">Свържете се с мен</p>
                    <ThemeToggle />
                  </div>
                  <MyLinks />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 