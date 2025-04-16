import { useState } from "react";
import { SectionHeader } from "../util/SectionHeader";
import { BlogItem } from "./BlogItem";
import { motion, AnimatePresence } from "framer-motion";
import { BsPencilSquare } from "react-icons/bs";

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories from all blog posts
  const categories = ["Всички", ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];
  
  // Filter blog posts based on selected category
  const filteredPosts = selectedCategory && selectedCategory !== "Всички" 
    ? blogPosts.filter(post => post.tags.includes(selectedCategory))
    : blogPosts;

  return (
    <section className="section-wrapper" id="blog">
      <SectionHeader title="Блог" dir="l" />
      
      {/* Enhanced blog header with graphic design element */}
      <div className="relative mb-10">
        <div className="absolute -left-4 -top-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 max-w-2xl"
        >
          <h3 className="flex items-center gap-2 text-xl font-bold text-zinc-100 mb-3">
            <BsPencilSquare className="text-green-500 text-2xl" />
            <span>Мисли и идеи</span>
          </h3>
          <p className="text-zinc-300">
            В моя блог споделям размисли, практически съвети и професионални наблюдения от психологическата практика. 
            Статиите са насочени към подобряване на емоционалното благосъстояние и личностното развитие.
          </p>
        </motion.div>
      </div>

      {/* Category filters */}
      <div className="relative mb-12">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">Филтрирайте по тема</h4>
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

      {/* Blog posts grid with animations */}
      <div className="relative">
        {/* Grid background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <BlogItem {...post} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Show message when no posts match the filter */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-zinc-400 text-lg">Няма намерени статии по тази тема.</p>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mt-4 text-green-500 hover:underline"
            >
              Покажи всички статии
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Newsletter subscription CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-16 p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/30 rounded-lg text-center"
      >
        <h3 className="text-xl font-bold text-green-500 mb-3">Абонирайте се за нови публикации</h3>
        <p className="text-zinc-300 mb-5 max-w-2xl mx-auto">
          Получавайте известия за нови статии, видеа и ресурси директно във вашата поща. Без спам, само качествено съдържание за личностно развитие.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Вашият имейл адрес" 
            className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 focus:border-green-500/50 outline-none rounded-lg text-zinc-200"
          />
          <button 
            className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg shadow-green-800/20"
          >
            Абонирай се
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const blogPosts = [
  {
    title: "Ролята на емоционалната интелигентност в модерния свят",
    date: "25 май 2023",
    author: "Елис Петрова",
    excerpt:
      "Емоционалната интелигентност е ключова за успешното ни функциониране в обществото. В тази статия разглеждам какво представлява тя и как можем да я развием.",
    content: `<p>Емоционалната интелигентност включва способността да разпознаваме, разбираме и управляваме както собствените си емоции, така и емоциите на другите. Тя е ключов елемент за изграждането на здрави взаимоотношения, ефективна комуникация и личностно развитие.</p>
      <p>В динамичния свят, в който живеем днес, емоционалната интелигентност се превръща в необходимост, а не просто в предимство. Тя ни помага да се адаптираме към промените, да се справяме със стреса и да поддържаме психичното си благополучие.</p>
      <h3>Основни компоненти на емоционалната интелигентност</h3>
      <ul>
        <li><strong>Самоосъзнаване</strong> - способността да разпознаваме собствените си емоции и тяхното влияние върху мислите и поведението ни.</li>
        <li><strong>Саморегулация</strong> - умението да контролираме импулсивните чувства и да управляваме емоциите си по здравословен начин.</li>
        <li><strong>Мотивация</strong> - вътрешното желание да постигаме цели и да се усъвършенстваме.</li>
        <li><strong>Емпатия</strong> - способността да разбираме и споделяме чувствата на другите.</li>
        <li><strong>Социални умения</strong> - изграждане на здрави връзки и ефективна комуникация.</li>
      </ul>
      <p>Развиването на емоционална интелигентност е процес, който изисква време и практика. Ето няколко стратегии, които могат да помогнат:</p>
      <ol>
        <li>Практикувайте осъзнатост (mindfulness) - обръщайте внимание на настоящия момент без осъждане.</li>
        <li>Водете емоционален дневник - записвайте как се чувствате в различни ситуации и какво предизвиква тези емоции.</li>
        <li>Практикувайте активно слушане - фокусирайте се изцяло върху човека, с когото говорите, без да мислите за отговора си.</li>
        <li>Развивайте емпатия - опитвайте се да погледнете ситуациите от гледната точка на другите.</li>
      </ol>
      <p>В заключение, емоционалната интелигентност е критично умение за 21-ви век. Тя подобрява качеството на живота ни, помага ни да създаваме по-дълбоки взаимоотношения и да се справяме по-добре с предизвикателствата на живота.</p>`,
    tags: ["Емоционална интелигентност", "Психично здраве", "Личностно развитие", "Взаимоотношения", "Комуникация"],
    imageUrl: "project-imgs/example-project.jpg",
  },
  {
    title: "Техники за справяне със стреса в ежедневието",
    date: "12 март 2023",
    author: "Елис Петрова",
    excerpt:
      "Стресът е неизбежна част от съвременния живот, но съществуват ефективни стратегии за намаляване на негативното му влияние върху здравето ни.",
    content: `<p>Стресът се е превърнал в неразделна част от съвременния начин на живот. От претоварения работен график до личните отговорности и информационното претоварване - източниците на стрес са безбройни.</p>
      <p>Хроничният стрес може да има сериозни последици за физическото и психическото ни здраве, включително повишен риск от сърдечносъдови заболявания, депресия, тревожност и нарушения на съня.</p>
      <h3>Ефективни техники за управление на стреса</h3>
      <p>Добрата новина е, че съществуват проверени методи за справяне със стреса. Ето някои от най-ефективните:</p>
      <ul>
        <li><strong>Дихателни техники</strong> - дълбокото дишане активира парасимпатиковата нервна система, която отговаря за релаксацията.</li>
        <li><strong>Физическа активност</strong> - редовното движение намалява хормоните на стреса и стимулира производството на ендорфини.</li>
        <li><strong>Медитация и майндфулнес</strong> - практикуването на осъзнатост помага за намаляване на тревожността и подобрява способността за концентрация.</li>
        <li><strong>Балансирана диета</strong> - правилното хранене поддържа енергийните нива стабилни и подпомага имунната система.</li>
        <li><strong>Качествен сън</strong> - достатъчният сън е ключов за възстановяването на тялото и ума.</li>
      </ul>
      <p>Особено важно е да намерим техниките, които работят най-добре за нас индивидуално. Това, което помага на един човек, може да не е толкова ефективно за друг.</p>
      <h3>Създаване на антистрес рутина</h3>
      <p>Интегрирането на антистрес практики в ежедневието е ключово за дългосрочни резултати:</p>
      <ol>
        <li><strong>Започнете с малки стъпки</strong> - 5-10 минути медитация или разходка могат да направят голяма разлика.</li>
        <li><strong>Бъдете последователни</strong> - създайте навик, практикувайки техниката ежедневно.</li>
        <li><strong>Комбинирайте различни подходи</strong> - използвайте разнообразни техники според ситуацията.</li>
        <li><strong>Следете напредъка си</strong> - обръщайте внимание как се променя реакцията ви към стресорите.</li>
      </ol>
      <p>Запомнете, че управлението на стреса е умение, което се развива с практика. Бъдете търпеливи със себе си и празнувайте малките победи по пътя.</p>`,
    tags: ["Стрес", "Релаксация", "Ментално здраве", "Медитация", "Благосъстояние"],
    imageUrl: "project-imgs/example-project.jpg",
  },
  {
    title: "Изграждане на здравословни граници във взаимоотношенията",
    date: "7 януари 2023",
    author: "Елис Петрова",
    excerpt:
      "Здравословните граници са основата на балансираните взаимоотношения. Научете как да ги установите и поддържате, без да компрометирате собствените си нужди.",
    content: `<p>Границите в междуличностните взаимоотношения определят къде свършвате вие и къде започват другите. Те са невидими линии, които очертават какво е приемливо и комфортно за вас във всички видове взаимоотношения - романтични, приятелски, семейни и професионални.</p>
      <p>Много хора се борят с установяването на ясни граници от страх да не наранят другите, да не бъдат отхвърлени или от чувство за вина. Въпреки това, здравословните граници са от съществено значение за емоционалното благополучие.</p>
      <h3>Видове граници</h3>
      <ul>
        <li><strong>Физически</strong> - свързани с личното пространство, докосването и физическата интимност.</li>
        <li><strong>Емоционални</strong> - определят как, кога и с кого споделяте чувствата си.</li>
        <li><strong>Времеви</strong> - установяват как разпределяте времето си и с кого го прекарвате.</li>
        <li><strong>Интелектуални</strong> - касаят уважението към вашите мисли, идеи и убеждения.</li>
        <li><strong>Материални</strong> - свързани с вашите пари и притежания.</li>
      </ul>
      <h3>Как да установите здравословни граници</h3>
      <ol>
        <li><strong>Осъзнайте собствените си нужди</strong> - първата стъпка е да разберете какво е важно за вас и какво ви кара да се чувствате комфортно или некомфортно.</li>
        <li><strong>Практикувайте ясна комуникация</strong> - изразявайте границите си директно, но с уважение. Използвайте "аз-послания" вместо обвинения.</li>
        <li><strong>Започнете с малки стъпки</strong> - ако установяването на граници е ново за вас, започнете с по-малко емоционално натоварени ситуации.</li>
        <li><strong>Бъдете последователни</strong> - хората ще приемат вашите граници по-сериозно, ако сте последователни в прилагането им.</li>
        <li><strong>Подгответе се за съпротива</strong> - особено от хора, които са свикнали с предишните модели на взаимодействие.</li>
      </ol>
      <p>Установяването на здравословни граници не е егоистичен акт, а форма на самогрижа, която позволява по-автентични и балансирани взаимоотношения. Когато сте ясни относно вашите граници, вие вдъхвате доверие и уважение, което всъщност укрепва, а не отслабва вашите връзки с другите.</p>`,
    tags: ["Взаимоотношения", "Комуникация", "Самогрижа", "Емоционално здраве", "Лични граници"],
    imageUrl: "project-imgs/example-project.jpg",
  }
]; 