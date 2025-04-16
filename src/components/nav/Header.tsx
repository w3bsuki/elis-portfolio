import Link from "next/link";
import React from "react";
import { SiCodepen, SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { OutlineButton } from "../buttons/OutlineButton";
import { MobileNav } from "./MobileNav";

export const Header = () => {
  return (
    <header className="h-[72px] px-4 flex items-center justify-between sticky top-0 z-20 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800/50">
      <div className="flex items-center gap-4">
        <span className="text-xl font-black hidden md:flex">
          Елис<span className="text-green-500">.</span>
        </span>
        <div className="hidden md:block">
          <MyLinks />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <OutlineButton 
          className="hidden md:flex before:bg-green-500 hover:text-white hover:border-green-500"
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
      className="text-zinc-300 hover:text-green-400 transition-colors"
      href="https://www.linkedin.com"
      target="_blank"
      rel="nofollow"
      aria-label="LinkedIn Profile"
    >
      <SiLinkedin />
    </Link>
    <Link
      className="text-zinc-300 hover:text-green-400 transition-colors"
      href="https://www.github.com"
      target="_blank"
      rel="nofollow"
      aria-label="GitHub Profile"
    >
      <SiGithub />
    </Link>
    <Link
      className="text-zinc-300 hover:text-green-400 transition-colors"
      href="https://www.x.com"
      target="_blank"
      rel="nofollow"
      aria-label="X (Twitter) Profile"
    >
      <SiX />
    </Link>
    <Link
      className="text-zinc-300 hover:text-green-400 transition-colors"
      href="https://www.codepen.io"
      target="_blank"
      rel="nofollow"
      aria-label="CodePen Profile"
    >
      <SiCodepen />
    </Link>
  </div>
);
