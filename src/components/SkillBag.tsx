import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Layers, 
  Paintbrush, 
  Layout, 
  Code, 
  FileCode, 
  Database, 
  MousePointer, 
  Heart, 
  GitBranch, 
  Github, 
  Globe, 
  FileText,
  Box,
  Terminal,
  type LucideIcon
} from "lucide-react";

const skills: Array<{ name: string; icon: LucideIcon; category: string }> = [
  // THE AESTHETIC (Design & UX)
  { name: "Figma", icon: Palette, category: "The Aesthetic" },
  { name: "Adobe CC", icon: Layers, category: "The Aesthetic" },
  { name: "Procreate", icon: Paintbrush, category: "The Aesthetic" },
  { name: "Elementor", icon: Layout, category: "The Aesthetic" },
  { name: "Divi Theme Builder", icon: Box, category: "The Aesthetic" },

  // THE ENGINE (Development & Code)
  { name: "React", icon: Code, category: "The Engine" },
  { name: "TypeScript", icon: FileCode, category: "The Engine" },
  { name: "JavaScript", icon: FileCode, category: "The Engine" },
  { name: "HTML/CSS", icon: Globe, category: "The Engine" },
  { name: "Node.js", icon: Database, category: "The Engine" },
  { name: "MongoDB", icon: Database, category: "The Engine" },
  { name: "WordPress", icon: FileText, category: "The Engine" },

  // THE ESSENTIALS (Tools & Workflow)
  { name: "Cursor", icon: MousePointer, category: "The Essentials" },
  { name: "Lovable", icon: Heart, category: "The Essentials" },
  { name: "Git", icon: GitBranch, category: "The Essentials" },
  { name: "GitHub", icon: Github, category: "The Essentials" },
  { name: "VS Code", icon: Terminal, category: "The Essentials" },
];

// Kategorifärger - starka pastellfärger
const categoryColors: Record<string, { hue: number; bgClass: string }> = {
  "The Aesthetic": { 
    hue: 330, // Rosa/Magenta pastell
    bgClass: "bg-pink-400" 
  },
  "The Engine": { 
    hue: 200, // Blå pastell
    bgClass: "bg-blue-400" 
  },
  "The Essentials": { 
    hue: 140, // Grön pastell
    bgClass: "bg-green-400" 
  },
};

/**
 * Genererar positioner för ikonerna i en full regnbåge under väskan
 * @param index - Index för ikonen i den filtrerade arrayen
 * @param existingPositions - Array med redan genererade positioner för kollisionsdetektering
 * @param totalCount - Totalt antal skills som ska visas (för korrekt vinkelberäkning)
 * @returns {x, y} - Position i pixlar relativt centrum
 */
const generateRandomPosition = (
  index: number,
  existingPositions: Array<{ x: number; y: number }> = [],
  totalCount: number = skills.length
): { x: number; y: number } => {
  // Full regnbåge: från -π till π (360 grader totalt, men vi ritar bara nedre halvan)
  // Detta ger en halvcirkelformad båge som går från vänster, nedåt, till höger
  const bågStart = -Math.PI; // Startar från vänster (-180 grader)
  const bågSlut = Math.PI; // Slutar till höger (180 grader)
  const bågVinkel = bågSlut - bågStart; // Total vinkel: 2π (360 grader)
  
  // Delar bågen jämnt mellan alla ikoner baserat på faktiskt antal
  const angle = bågStart + (index / (totalCount - 1 || 1)) * bågVinkel;

  // Radie från centrum för bågen - större för full regnbåge
  const baseRadius = 200; // Ökad radie för större båge
  
  // Minimum avstånd mellan ikoner i pixlar - ökat för att förhindra överlappning
  const minDistance = 100;
  
  // Beräknar position längs bågen
  // För en regnbåge mellan texten "Click the bag..." och väskan:
  // X varierar från -radius till +radius (vänster till höger)
  // Y ska vara ovanför väskan (negativt) men under texten
  let baseX = Math.sin(angle) * baseRadius;
  // Använder abs(cos) för att få bara den övre halvan av cirkeln (ovanför väskan)
  // -40px offset för att bågen ska vara mellan texten och väskan
  // Justera offset-värdet för att flytta bågen närmare eller längre från väskan
  let baseY = -Math.abs(Math.cos(angle)) * baseRadius - 40; // Mellan texten och väskan

  // Förbättrad kollisionsdetektering - justerar positionen om kollision
  let x = baseX;
  let y = baseY;
  let attempts = 0;
  const maxAttempts = 50;
  
  while (attempts < maxAttempts) {
    let hasCollision = false;
    
    // Kontrollerar kollision med alla befintliga positioner
    for (const pos of existingPositions) {
      const distance = Math.sqrt(
        Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2)
      );
      if (distance < minDistance) {
        hasCollision = true;
        // Justerar positionen bort från kollisionen
        const angleToCollision = Math.atan2(y - pos.y, x - pos.x);
        const pushDistance = minDistance - distance + 5; // Push bort med lite extra
        x += Math.cos(angleToCollision) * pushDistance;
        y += Math.sin(angleToCollision) * pushDistance;
        break;
      }
    }
    
    if (!hasCollision) {
      break;
    }
    
    attempts++;
  }

  return { x, y };
};

const SkillBag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtrera skills baserat på vald kategori
  const filteredSkills = useMemo(() => {
    if (!selectedCategory) {
      return skills; // Visa alla om ingen kategori är vald
    }
    return skills.filter(skill => skill.category === selectedCategory);
  }, [selectedCategory]);

  // Genererar positioner för filtrerade skills
  const skillPositions = useMemo(() => {
    const positions: Array<{ x: number; y: number }> = [];
    const totalCount = filteredSkills.length;
    for (let i = 0; i < totalCount; i++) {
      const position = generateRandomPosition(i, positions, totalCount);
      positions.push(position);
    }
    return positions;
  }, [filteredSkills]);

  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          animate={{
            filter: isOpen ? "blur(4px)" : "blur(0px)",
            opacity: isOpen ? 0.5 : 1,
          }}
          style={{
            transition: "filter 0.3s ease, opacity 0.3s ease",
          }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            The Skill Bag
          </h2>
          <p className="font-body text-muted-foreground">
          A look at the tools I use to design and build.
          </p>
        </motion.div>

        {/* Container för väskan och ikonerna - min-h bestämmer hur mycket vertikalt utrymme */}
        {/* Höjd anpassad för bågen mellan rubriken och väskan */}
        <div className="relative flex justify-center items-center min-h-[500px]">
          {/* Floating Skills - Ikonerna som flyter ut från väskan */}
          <AnimatePresence>
            {isOpen &&
              filteredSkills.map((skill, index) => {
                // Använder den förgenererade positionen från useMemo
                const position = skillPositions[index];

                // Använder kategorifärg istället för regnbågsfärg
                const categoryColor = categoryColors[skill.category] || categoryColors["The Aesthetic"];
                const hue = categoryColor.hue;
                
                return (
                  <motion.div
                    key={skill.name}
                    className="absolute cursor-pointer select-none z-30"
                    // Animation när ikonen visas
                    // initial: startar osynlig och liten vid centrum (x:0, y:50)
                    initial={{ opacity: 0, scale: 0, x: 0, y: 50 }}
                    // animate: flyttar till sin slutposition med full opacitet
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: position.x, // Horisontell position från generateRandomPosition
                      y: position.y, // Vertikal position från generateRandomPosition
                    }}
                    // exit: animation när ikonen försvinner (samma som initial)
                    exit={{ opacity: 0, scale: 0, x: 0, y: 50 }}
                    // Spring-animation för mjuk rörelse
                    // stiffness: hur hård fjädern är (högre = snabbare)
                    // damping: hur mycket den dämpas (högre = mindre studs)
                    // delay: varje ikon väntar lite längre (index * 0.05 sekunder)
                    transition={{
                      // Initial animation (när ikonen visas)
                      default: {
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.05,
                      },
                      // Snabb transition för hover (scale) - direkt utan delay
                      scale: {
                        duration: 0.15, // 150ms - mycket snabb
                        ease: "easeOut",
                      },
                    }}
                    whileHover={{ scale: 1.1 }} // Förstorar vid hover (10% större)
                  >
                    {/* Innehållskortet för varje ikon */}
                    <motion.div
                      className="bg-card border border-border rounded-xl px-4 py-3 shadow-sm transition-all flex items-center gap-2 group"
                      // Flytande animation: rör sig upp och ner kontinuerligt
                      // y: [0, -5, 0] betyder: starta på 0, gå till -5px upp, tillbaka till 0
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        y: {
                          duration: 2 + Math.random() * 2, // 2-4 sekunder per cykel
                          repeat: Infinity, // Upprepa för evigt
                          delay: index * 0.1, // Olika delay för varje ikon
                        },
                        // Snabb transition för hover-effekter (border och boxShadow)
                        border: { duration: 0.15 },
                        boxShadow: { duration: 0.15 },
                      }}
                      // Kategorifärg på border och skugga vid hover
                      whileHover={{
                        border: `2px solid hsl(${hue}, 70%, 60%)`,
                        boxShadow: `0 10px 15px -3px hsla(${hue}, 70%, 60%, 0.4), 0 0 20px hsla(${hue}, 70%, 60%, 0.2)`,
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <skill.icon 
                        className="w-5 h-5 transition-colors duration-150"
                        style={{
                          color: hoveredIndex === index 
                            ? `hsl(${hue}, 70%, 55%)` 
                            : `hsl(${hue}, 60%, 50%)`, // Kategorifärg även när inte hover
                        }}
                      />
                      <span className="font-body text-sm font-medium text-foreground whitespace-nowrap">
                        {skill.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
          </AnimatePresence>

          {/* The Bag - Väskan i centrum */}
          {/* z-20: lägre än ikonerna (z-30) så ikonerna hamnar framför */}
          <motion.button
            className="relative z-20 focus:outline-none group"
            onClick={() => {
              setIsOpen(!isOpen);
              // När väskan öppnas, visa alla skills (återställ kategori)
              if (!isOpen) {
                setSelectedCategory(null);
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/my-bag.png"
              alt="Skill Bag"
              className="drop-shadow-lg"
              style={{ width: '240px', height: 'auto' }}
            />
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center pt-8"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            >
              <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                {isOpen ? "" : "Peek inside"}
              </span>
            </motion.div>
          </motion.button>
        </div>

        {/* Legend */}
        <motion.div
          className="flex justify-center gap-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: "The Aesthetic", category: "The Aesthetic" },
            { label: "The Engine", category: "The Engine" },
            { label: "The Essentials", category: "The Essentials" },
          ].map((item) => {
            const categoryColor = categoryColors[item.category];
            const hue = categoryColor.hue;
            return (
              <motion.button
                key={item.label}
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => {
                  // Toggle: om samma kategori klickas, visa alla
                  if (selectedCategory === item.category) {
                    setSelectedCategory(null);
                  } else {
                    setSelectedCategory(item.category);
                  }
                  // Öppna väskan om den inte redan är öppen
                  if (!isOpen) {
                    setIsOpen(true);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span 
                  className="w-2 h-2 rounded-full transition-opacity"
                  style={{
                    backgroundColor: `hsl(${hue}, 70%, 60%)`,
                    opacity: selectedCategory === item.category ? 1 : 0.6,
                  }}
                />
                <span 
                  className={`font-body text-xs transition-colors ${
                    selectedCategory === item.category 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                  style={{
                    color: selectedCategory === item.category 
                      ? `hsl(${hue}, 70%, 50%)` 
                      : undefined,
                  }}
                >
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillBag;
