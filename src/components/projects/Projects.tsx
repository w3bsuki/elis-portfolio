import React, { useState, useRef, useEffect } from "react";
import { SectionHeader } from "../util/SectionHeader";
import { Project } from "./Project";
import { motion, AnimatePresence } from "framer-motion";
import { IoBookOutline } from "react-icons/io5";

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const booksRef = useRef<HTMLDivElement>(null);

  // Define categories for books
  const categories = ["Всички", "Психология", "Самопомощ", "Личностно развитие", "Семейство"];

  // Filter books based on selected category
  const filteredBooks = selectedCategory && selectedCategory !== "Всички" 
    ? books.filter(book => book.categories.includes(selectedCategory))
    : books;
    
  // Scroll to books section when category changes
  useEffect(() => {
    if (selectedCategory && booksRef.current) {
      const yOffset = -100; // Offset to account for header
      const y = booksRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, [selectedCategory]);

  return (
    <section className="section-wrapper" id="books">
      <SectionHeader title="Книги" dir="r" />
      
      {/* Enhanced book header with graphic design element */}
      <div className="relative mb-10">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-2xl"
        >
          <h3 className="flex items-center gap-2 text-xl font-bold text-foreground mb-3">
            <IoBookOutline className="text-green-500 dark:text-primary text-2xl" />
            <span>Моите публикации</span>
          </h3>
          <p className="text-foreground/80">
            Книгите са плод на дългогодишния ми опит като психолог и отразяват моето разбиране за човешката психика, взаимоотношенията и личностното развитие. Във всяка от тях споделям практически съвети, които можете да приложите в ежедневието си.
          </p>
        </motion.div>
      </div>

      {/* Enhanced filter categories */}
      <div className="relative mb-12">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Филтрирайте по категория</h4>
          <div className="w-20 h-1 bg-green-500/50 rounded-full mb-4"></div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category === "Всички" ? null : category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                (category === "Всички" && !selectedCategory) || selectedCategory === category
                  ? "bg-green-500 text-white font-medium shadow-lg shadow-green-800/20"
                  : "bg-secondary/80 text-foreground hover:bg-secondary border border-border hover:border-green-500/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Books grid with staggered animation */}
      <div ref={booksRef} className="relative">
        {/* Grid background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 dark:opacity-100 opacity-30" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-x-8 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Project {...book} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Show message when no books match the filter */}
        {filteredBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-muted-foreground text-lg">Няма намерени книги в тази категория.</p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-4 text-green-500 dark:text-primary hover:underline"
            >
              Покажи всички книги
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Reading recommendations CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-16 p-6 bg-gradient-to-br from-secondary/70 to-background/70 border border-border/50 rounded-lg text-center"
      >
        <h3 className="text-xl font-bold text-green-500 dark:text-primary mb-3">Нуждаете се от персонализирани препоръки за четене?</h3>
        <p className="text-foreground/80 mb-5 max-w-2xl mx-auto">
          Ако се интересувате от конкретна тема или търсите книга, която да ви помогне с определено предизвикателство, не се колебайте да се свържете с мен за лични препоръки.
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

const books = [
  {
    title: "Пътят към себе си",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://www.goodreads.com",
    projectLink: "https://www.amazon.com",
    tech: ["Психология", "Самопомощ"],
    categories: ["Психология", "Самопомощ"],
    description:
      "Книга, която ви води по пътя към откриване на истинското Аз и как да живеете автентичен и осъзнат живот.",
    modalContent: (
      <>
        <p>
          <strong>Пътят към себе си</strong> е моята първа книга, в която споделям как да открием истинските си желания и да живеем живот, верен на същността ни.
        </p>
        <p>
          В книгата изследвам връзката между нашите мисли, емоции и действия и как те формират реалността, която създаваме. Представям практически методи за:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Освобождаване от ограничаващи убеждения</li>
          <li>Развиване на емоционална интелигентност</li>
          <li>Намиране на вътрешен баланс и хармония</li>
          <li>Изграждане на здрави връзки със себе си и другите</li>
        </ul>
        <p>
          Тази книга е идеална за всеки, който иска да разбере себе си по-добре и да живее по-автентично и осъзнато.
        </p>
        <p>
          "Невероятно вдъхновяваща книга, която ми помогна да разбера себе си и да направя важни промени в живота си." - Мария К., читател
        </p>
      </>
    ),
  },
  {
    title: "Хармония в хаоса",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://www.goodreads.com",
    projectLink: "https://www.amazon.com",
    tech: ["Психология", "Личностно развитие"],
    categories: ["Психология", "Личностно развитие"],
    description:
      "Практически наръчник за намиране на спокойствие и баланс в забързаното ежедневие и трансформиране на стреса в сила.",
    modalContent: (
      <>
        <p>
          <strong>Хармония в хаоса</strong> е книга, създадена за съвременния човек, който се сблъсква ежедневно с предизвикателства, стрес и несигурност.
        </p>
        <p>
          В този труд разглеждам:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Техники за управление на стреса и тревожността</li>
          <li>Методи за създаване на здравословни ежедневни навици</li>
          <li>Практики за осъзнатост и присъствие в настоящия момент</li>
          <li>Стратегии за преобразуване на трудностите във възможности</li>
        </ul>
        <p>
          Книгата включва множество упражнения и практически съвети, които може да прилагате веднага в ежедневието си за по-спокоен и хармоничен живот.
        </p>
        <p>
          "Този наръчник се превърна в моя спасителна котва в най-трудните моменти. Препоръчвам го на всеки!" - Иван П., психотерапевт
        </p>
      </>
    ),
  },
  {
    title: "Любовта като пътешествие",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://www.goodreads.com",
    projectLink: "https://www.amazon.com",
    tech: ["Психология", "Семейство", "Взаимоотношения"],
    categories: ["Психология", "Семейство"],
    description:
      "Задълбочен анализ на любовните отношения, как да изградим здрава връзка, основана на взаимно уважение и разбиране.",
    modalContent: (
      <>
        <p>
          <strong>Любовта като пътешествие</strong> изследва дълбочината и сложността на любовните взаимоотношения, преминавайки отвъд първоначалното привличане към изграждането на трайна и пълноценна връзка.
        </p>
        <p>
          В книгата обсъждам:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Различните езици на любовта и как да разбираме партньора си</li>
          <li>Решаване на конфликти по здравословен начин</li>
          <li>Поддържане на интимност и връзка през различните етапи на отношенията</li>
          <li>Как да бъдем автентични, без да жертваме любовта си</li>
        </ul>
        <p>
          Книгата е подходяща както за двойки, търсещи да задълбочат връзката си, така и за хора, които искат да разберат по-добре динамиката на любовните отношения.
        </p>
        <p>
          "Тази книга спаси брака ми и ни помогна да открием отново любовта си един към друг." - Милена и Стоян, читатели
        </p>
      </>
    ),
  },
  {
    title: "Силата на промяната",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://www.goodreads.com",
    projectLink: "https://www.amazon.com",
    tech: ["Личностно развитие", "Самопомощ"],
    categories: ["Личностно развитие", "Самопомощ"],
    description:
      "Книга за това как да приемем промяната, да я използваме в своя полза и да израстваме през преходите в живота ни.",
    modalContent: (
      <>
        <p>
          <strong>Силата на промяната</strong> е посветена на едно от най-големите предизвикателства в живота - как да се справяме с промените, независимо дали са избрани от нас или наложени от обстоятелствата.
        </p>
        <p>
          В тази книга разглеждам:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Психологията на промяната и защо често ѝ се съпротивляваме</li>
          <li>Как да трансформираме страха от неизвестното в любопитство</li>
          <li>Стъпки за приемане и адаптиране към новите реалности</li>
          <li>Как да използваме промяната като катализатор за личностно израстване</li>
        </ul>
        <p>
          Книгата съдържа истински истории на хора, претърпели значителни промени в живота си и извлекли ценни поуки от тях.
        </p>
        <p>
          "След загубата на работата си мислех, че животът ми свършва. Тази книга ми показа как да превърна тази промяна в нов, по-добър начин на живот." - Георги М., читател
        </p>
      </>
    ),
  },
  {
    title: "Изкуството на щастието",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://www.goodreads.com",
    projectLink: "https://www.amazon.com",
    tech: ["Психология", "Самопомощ", "Личностно развитие"],
    categories: ["Психология", "Самопомощ", "Личностно развитие"],
    description:
      "Изследване на това какво наистина означава да бъдеш щастлив и практически съвети за създаване на повече радост в живота.",
    modalContent: (
      <>
        <p>
          <strong>Изкуството на щастието</strong> разглежда щастието не като крайна цел или моментно състояние, а като умение, което може да бъде развивано и практикувано ежедневно.
        </p>
        <p>
          В книгата обсъждам:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Научните изследвания за щастието и благополучието</li>
          <li>Практики за повишаване на позитивните емоции</li>
          <li>Връзката между благодарността и щастието</li>
          <li>Как да намерим смисъл и цел в живота си</li>
          <li>Ролята на взаимоотношенията в създаването на трайно щастие</li>
        </ul>
        <p>
          Включила съм множество упражнения и дневни практики, които помагат на читателите да култивират повече радост и удовлетворение в ежедневието си.
        </p>
        <p>
          "Следвам препоръките в тази книга вече шест месеца и мога да потвърдя, че моето цялостно усещане за щастие и благополучие е значително подобрено." - Елена Д., психолог
        </p>
      </>
    ),
  },
  {
    title: "Родителство с любов и граници",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://www.goodreads.com",
    projectLink: "https://www.amazon.com",
    tech: ["Психология", "Семейство", "Възпитание"],
    categories: ["Психология", "Семейство"],
    description:
      "Ръководство за родители, които искат да възпитават децата си с любов и уважение, като същевременно поставят здравословни граници.",
    modalContent: (
      <>
        <p>
          <strong>Родителство с любов и граници</strong> е насочена към родители, които искат да създадат здравословна и подкрепяща среда за развитието на децата си.
        </p>
        <p>
          В тази книга разглеждам:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Баланса между любов и дисциплина в родителството</li>
          <li>Как да комуникираме ефективно с децата от различни възрасти</li>
          <li>Поставяне на граници без да потискаме детската индивидуалност</li>
          <li>Справяне с трудни ситуации и конфликти</li>
          <li>Изграждане на емоционална интелигентност у децата</li>
        </ul>
        <p>
          Книгата включва множество практически съвети, базирани на съвременни психологически изследвания и реален опит.
        </p>
        <p>
          "Като самотен баща на две деца, тази книга беше откровение за мен. Помогна ми да разбирам по-добре децата си и да създам по-хармонична домашна среда." - Николай П., читател
        </p>
      </>
    ),
  },
];


