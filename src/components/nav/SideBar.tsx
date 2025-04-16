import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SideBarLink } from "./SideBarLink";

export const SideBar = () => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll(".section-wrapper");

    const options = {
      threshold: 0.3,
    };

    const callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setSelected(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section) => observer.observe(section));
  }, []);

  return (
    <motion.nav
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="no-scrollbar bg-background h-screen sticky top-0 left-0 z-20 flex flex-col items-center overflow-y-scroll border-r border-border/50"
    >
      <span className="shrink-0 text-xl font-black leading-[1] size-10 flex items-center justify-center my-4 text-foreground">
        Е<span className="text-green-500 dark:text-primary">.</span>
      </span>
      <SideBarLink
        selected={selected}
        setSelected={setSelected}
        value="about"
        href="#about"
      >
        За мен
      </SideBarLink>
      <SideBarLink
        selected={selected}
        setSelected={setSelected}
        value="projects"
        href="#projects"
      >
        Проекти
      </SideBarLink>
      <SideBarLink
        selected={selected}
        setSelected={setSelected}
        value="services"
        href="#services"
      >
        Услуги
      </SideBarLink>
      <SideBarLink
        selected={selected}
        setSelected={setSelected}
        value="blog"
        href="#blog"
      >
        Блог
      </SideBarLink>
      <SideBarLink
        selected={selected}
        setSelected={setSelected}
        value="contact"
        href="#contact"
      >
        Контакт
      </SideBarLink>
    </motion.nav>
  );
};
