import React, { useState, useEffect, useRef } from "react";
import { SectionHeader } from "../util/SectionHeader";
import { Service } from "./Service";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter } from "react-icons/fa";

export const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Define categories
  const categories = ["Всички", "Индивидуални", "Групови", "Онлайн", "На живо"];

  // Filter services based on selected category
  const filteredServices = selectedCategory && selectedCategory !== "Всички" 
    ? services.filter(service => service.categories.includes(selectedCategory))
    : services;

  // Scroll to services when category changes
  useEffect(() => {
    if (selectedCategory && servicesRef.current) {
      const yOffset = -100; // Offset to account for header
      const y = servicesRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, [selectedCategory]);

  return (
    <section className="section-wrapper" id="services">
      <SectionHeader title="Услуги" dir="l" />

      {/* Enhanced category filter */}
      <div className="relative mb-12">
        <div className="absolute -left-2 -top-2 w-12 h-12 bg-green-500/10 rounded-full blur-xl -z-10" />
        
        <div className="flex items-center gap-3 mb-4">
          <FaFilter className="text-green-500" />
          <h3 className="text-lg font-medium text-zinc-200">Филтрирайте по категория</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category === "Всички" ? null : category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                (category === "Всички" && !selectedCategory) || selectedCategory === category
                  ? "bg-green-500 text-white font-medium shadow-lg shadow-green-800/20"
                  : "bg-zinc-800/70 text-zinc-300 hover:bg-zinc-700/80 border border-zinc-700/50 hover:border-green-500/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Services grid with staggered animation */}
      <div ref={servicesRef} className="relative">
        {/* Grid background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-x-8 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Service {...service} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Show message when no services match the filter */}
        {filteredServices.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-zinc-400 text-lg">Няма намерени услуги в тази категория.</p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-4 text-green-500 hover:underline"
            >
              Покажи всички услуги
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Call to action section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-16 p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/30 rounded-lg text-center"
      >
        <h3 className="text-xl font-bold text-green-500 mb-3">Нуждаете се от персонализирана услуга?</h3>
        <p className="text-zinc-300 mb-5 max-w-2xl mx-auto">
          Ако не виждате точно това, от което се нуждаете, или имате специфични изисквания, свържете се с мен за индивидуално решение.
        </p>
        <button 
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors shadow-lg shadow-green-800/20"
        >
          Свържете се с мен
        </button>
      </motion.div>
    </section>
  );
};

const services = [
  {
    title: "Индивидуални консултации",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://calendly.com",
    projectLink: "https://zoom.us",
    tech: ["Индивидуални", "На живо"],
    categories: ["Индивидуални", "На живо"],
    description:
      "Персонализирани сесии, фокусирани върху вашите конкретни нужди и цели, с професионална подкрепа и насоки по пътя на личностното ви развитие.",
    modalContent: (
      <>
        <p>
          <strong>Индивидуалните консултации</strong> предлагат сигурно и подкрепящо пространство, където можете да изследвате вашите мисли, емоции и предизвикателства с професионална подкрепа.
        </p>
        <p>
          По време на сесиите ще работим върху:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Идентифициране на основни житейски предизвикателства и тяхното преодоляване</li>
          <li>Развиване на емоционална осъзнатост и регулация</li>
          <li>Подобряване на взаимоотношенията с околните</li>
          <li>Повишаване на самочувствието и себеувереността</li>
        </ul>
        <p>
          Всяка сесия е с продължителност 50 минути и се провежда в уютна и конфиденциална обстановка в моя офис в центъра на града.
        </p>
        <p>
          "Работата с Елис ми помогна да погледна на проблемите си от нова перспектива и да открия в себе си сила, която не съм подозирал, че притежавам." - Мартин Д., клиент
        </p>
      </>
    ),
  },
  {
    title: "Онлайн терапевтични сесии",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://calendly.com",
    projectLink: "https://zoom.us",
    tech: ["Индивидуални", "Онлайн"],
    categories: ["Индивидуални", "Онлайн"],
    description:
      "Гъвкави онлайн консултации, предоставящи професионална психологическа подкрепа от комфорта на вашия дом, с фокус върху вашите нужди и цели.",
    modalContent: (
      <>
        <p>
          <strong>Онлайн терапевтичните сесии</strong> предлагат същата професионална подкрепа като присъствените консултации, но с предимството на гъвкавостта и удобството да се включите от всяко място.
        </p>
        <p>
          Тези сесии са идеални за:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Хора с натоварен график или ограничена мобилност</li>
          <li>Клиенти, които живеят в други градове или държави</li>
          <li>Ситуации, в които предпочитате комфорта на познатата ви среда</li>
          <li>Продължаване на терапевтичната работа при пътуване</li>
        </ul>
        <p>
          Сесиите се провеждат чрез сигурна видео платформа, гарантираща поверителност на разговорите. Продължителността на всяка сесия е 50 минути.
        </p>
        <p>
          "Онлайн сесиите с Елис са толкова ефективни, колкото и присъствените. Ценя възможността да продължа работата с нея, дори когато съм в командировка." - Петя К., клиент
        </p>
      </>
    ),
  },
  {
    title: "Групови терапевтични сесии",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://calendly.com",
    projectLink: "https://zoom.us",
    tech: ["Групови", "На живо"],
    categories: ["Групови", "На живо"],
    description:
      "Терапевтични групи, създаващи подкрепяща общност, където можете да споделяте преживявания, да получавате обратна връзка и да израствате заедно с другите.",
    modalContent: (
      <>
        <p>
          <strong>Груповите терапевтични сесии</strong> предлагат уникална възможност за личностно развитие чрез взаимодействие с други хора, споделящи подобни предизвикателства.
        </p>
        <p>
          Предимствата на груповата терапия включват:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Възможност да видите, че не сте сами с вашите проблеми</li>
          <li>Получаване на различни перспективи и обратна връзка</li>
          <li>Развиване на социални умения в безопасна среда</li>
          <li>Изграждане на подкрепяща общност</li>
        </ul>
        <p>
          Групите се състоят от 6-8 участници и се провеждат веднъж седмично с продължителност 90 минути. Всяка група има специфичен фокус (напр. управление на тревожност, изграждане на здравословни взаимоотношения и др.).
        </p>
        <p>
          "Груповата терапия ми помогна да се почувствам по-малко сама и да открия нови начини за справяне с предизвикателствата. Подкрепата от групата е безценна." - Анна П., участник
        </p>
      </>
    ),
  },
  {
    title: "Онлайн групови уъркшопи",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://calendly.com",
    projectLink: "https://zoom.us",
    tech: ["Групови", "Онлайн"],
    categories: ["Групови", "Онлайн"],
    description:
      "Интерактивни онлайн уъркшопи по конкретни теми, предоставящи практически инструменти и техники за личностно развитие в достъпен формат.",
    modalContent: (
      <>
        <p>
          <strong>Онлайн груповите уъркшопи</strong> съчетават образователния елемент с практически упражнения, предоставяйки ви конкретни инструменти и техники, които можете да приложите веднага в живота си.
        </p>
        <p>
          Текущите уъркшоп теми включват:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Управление на стреса и тревожността в ежедневието</li>
          <li>Изграждане на здравословни граници във взаимоотношенията</li>
          <li>Емоционална интелигентност - разпознаване и управление на емоциите</li>
          <li>Повишаване на самочувствието и изграждане на позитивен Аз-образ</li>
        </ul>
        <p>
          Уъркшопите се провеждат онлайн с продължителност 2-3 часа и включват интерактивни елементи, дискусии и материали, които получавате след събитието.
        </p>
        <p>
          "Уъркшопът за управление на стреса беше изключително полезен. Научих конкретни техники, които прилагам всеки ден и вече забелязвам положителна промяна." - Иван С., участник
        </p>
      </>
    ),
  },
  {
    title: "Семинари за организации",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://calendly.com",
    projectLink: "https://zoom.us",
    tech: ["Групови", "На живо"],
    categories: ["Групови", "На живо"],
    description:
      "Специализирани психологически семинари за организации, фокусирани върху подобряване на екипната комуникация, емоционална интелигентност и благополучие на работното място.",
    modalContent: (
      <>
        <p>
          <strong>Семинарите за организации</strong> са разработени специално за подобряване на психологическия климат в екипите, повишаване на продуктивността и благосъстоянието на служителите.
        </p>
        <p>
          Предлагам семинари в следните области:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Превенция на професионалното прегаряне (burnout)</li>
          <li>Ефективна комуникация и разрешаване на конфликти</li>
          <li>Управление на стреса на работното място</li>
          <li>Емоционална интелигентност в професионална среда</li>
          <li>Изграждане на устойчивост и адаптивност към промени</li>
        </ul>
        <p>
          Семинарите се адаптират според нуждите на вашата организация и могат да бъдат проведени както на място във вашия офис, така и онлайн. Продължителността варира от половин до цял ден.
        </p>
        <p>
          "Семинарът за превенция на професионалното прегаряне беше изключително ценен за нашия екип. Елис предостави практични инструменти и техники, които вече прилагаме с видим резултат." - Георги П., HR мениджър
        </p>
      </>
    ),
  },
  {
    title: "Менторство за личностно развитие",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://calendly.com",
    projectLink: "https://zoom.us",
    tech: ["Индивидуални", "Онлайн"],
    categories: ["Индивидуални", "Онлайн"],
    description:
      "Персонализирана програма за личностно развитие с дългосрочен фокус, комбинираща редовни сесии, практически задачи и продължителна подкрепа за постигане на значима трансформация.",
    modalContent: (
      <>
        <p>
          <strong>Менторството за личностно развитие</strong> е 3-месечна програма, разработена да ви съпътства в процеса на задълбочена лична трансформация и постигане на конкретни житейски цели.
        </p>
        <p>
          Програмата включва:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Първоначална двучасова сесия за задълбочена оценка и планиране</li>
          <li>Ежеседмични 60-минутни сесии (общо 12 сесии)</li>
          <li>Персонализирани практически задачи между сесиите</li>
          <li>Неограничена поддръжка по имейл през целия период</li>
          <li>Комплект материали и ресурси, съобразени с вашите цели</li>
        </ul>
        <p>
          Менторството е подходящо за хора, които са готови за сериозна работа върху себе си и искат не просто подкрепа, а конкретни резултати и трайна промяна.
        </p>
        <p>
          "Тримесечната програма с Елис беше повратна точка в живота ми. За първи път почувствах, че наистина напредвам и трансформирам негативните модели, които ме държаха назад години наред." - Димитър Н., клиент
        </p>
      </>
    ),
  },
]; 