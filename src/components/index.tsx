import React from "react";
import { SideBar } from "./nav/SideBar";
import { Header } from "./nav/Header";
import Hero from "./hero/Hero";
import { About } from "./about/About";
import { Projects } from "./projects/Projects";
import { Services } from "./services/Services";
import { Contact } from "./contact/Contact";
import { Blog } from "./blog/Blog";
import { ScrollProgressBar } from "./nav/ScrollProgressBar";
import { BackToTop } from "./nav/BackToTop";

export const HomPage = () => {
  return (
    <div className="grid grid-cols-[0px_1fr] md:grid-cols-[54px_1fr]">
      {/* Sidebar - visible only on tablet and desktop */}
      <div className="hidden md:block">
        <SideBar />
      </div>
      
      <main>
        {/* Scroll progress indicator */}
        <ScrollProgressBar />
        
        {/* Header - visible on all devices */}
        <Header />
        
        {/* Main content */}
        <div className="mx-auto max-w-5xl px-4 md:px-8 space-y-32 pb-24">
          <Hero />
          <About />
          <Projects />
          <Services />
          <Blog />
          <Contact />
        </div>
        
        {/* Back to top button */}
        <BackToTop />
      </main>
    </div>
  );
};
