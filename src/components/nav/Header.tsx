import Link from "next/link";
import React from "react";
import { SiCodepen, SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { OutlineButton } from "../buttons/OutlineButton";
import { MobileNav, ThemeToggle } from "./MobileNav";

export const Header = () => {
  return (
    <header className="h-[72px] px-4 flex items-center justify-between sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center gap-4">
        <span className="text-xl font-black hidden md:flex">
          Елис<span className="text-green-500 dark:text-primary">.</span>
        </span>
        <div className="hidden md:block">
          <MyLinks />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <ThemeToggle className="hidden md:flex" />
        <OutlineButton 
          className="hidden md:flex before:bg-green-500 hover:text-white hover:border-green-500 dark:before:bg-primary dark:hover:border-primary"
          onClick={() => window.open("/resume.pdf")}
        >
          CV
        </OutlineButton>
        <MobileNav />
      </div>
    </header>
  );
};

export const MyLinks = () => (
  <div className="flex items-center text-lg gap-4">
    <Link
      className="text-foreground/80 hover:text-green-400 transition-colors dark:hover:text-primary"
      href="https://www.linkedin.com"
      target="_blank"
      rel="nofollow"
      aria-label="LinkedIn Profile"
    >
      <SiLinkedin />
    </Link>
    <Link
      className="text-foreground/80 hover:text-green-400 transition-colors dark:hover:text-primary"
      href="https://www.github.com"
      target="_blank"
      rel="nofollow"
      aria-label="GitHub Profile"
    >
      <SiGithub />
    </Link>
    <Link
      className="text-foreground/80 hover:text-green-400 transition-colors dark:hover:text-primary"
      href="https://www.x.com"
      target="_blank"
      rel="nofollow"
      aria-label="X (Twitter) Profile"
    >
      <SiX />
    </Link>
    <Link
      className="text-foreground/80 hover:text-green-400 transition-colors dark:hover:text-primary"
      href="https://www.codepen.io"
      target="_blank"
      rel="nofollow"
      aria-label="CodePen Profile"
    >
      <SiCodepen />
    </Link>
  </div>
);
