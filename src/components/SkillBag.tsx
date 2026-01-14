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
  type LucideIcon
} from "lucide-react";

const skills: Array<{ name: string; icon: LucideIcon; category: string }> = [
  { name: "Figma", icon: Palette, category: "design" },
  { name: "Adobe CC", icon: Layers, category: "design" },
  { name: "Procreate", icon: Paintbrush, category: "design" },
  { name: "Elementor", icon: Layout, category: "design" },
  { name: "React", icon: Code, category: "dev" },
  { name: "TypeScript", icon: FileCode, category: "dev" },
  { name: "JavaScript", icon: FileCode, category: "dev" },
  { name: "Node.js", icon: Database, category: "dev" },
  { name: "MongoDB", icon: Database, category: "dev" },
  { name: "Cursor", icon: MousePointer, category: "tools" },
  { name: "Lovable", icon: Heart, category: "tools" },
  { name: "Git", icon: GitBranch, category: "tools" },
  { name: "GitHub", icon: Github, category: "tools" },
  { name: "HTML/CSS", icon: Globe, category: "dev" },
  { name: "WordPress", icon: FileText, category: "tools" },
];

/**
 * Genererar positioner för ikonerna i en full regnbåge under väskan
 * @param index - Index för ikonen i skills-arrayen
 * @param existingPositions - Array med redan genererade positioner för kollisionsdetektering
 * @returns {x, y} - Position i pixlar relativt centrum
 */
const generateRandomPosition = (
  index: number,
  existingPositions: Array<{ x: number; y: number }> = []
): { x: number; y: number } => {
  // Full regnbåge: från -π till π (360 grader totalt, men vi ritar bara nedre halvan)
  // Detta ger en halvcirkelformad båge som går från vänster, nedåt, till höger
  const bågStart = -Math.PI; // Startar från vänster (-180 grader)
  const bågSlut = Math.PI; // Slutar till höger (180 grader)
  const bågVinkel = bågSlut - bågStart; // Total vinkel: 2π (360 grader)
  
  // Delar bågen jämnt mellan alla ikoner
  const angle = bågStart + (index / (skills.length - 1 || 1)) * bågVinkel;

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

  // Genererar alla positioner en gång när komponenten renderas
  // Detta säkerställer att positionerna är konsekventa och kollisionsdetektering fungerar
  const skillPositions = useMemo(() => {
    const positions: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < skills.length; i++) {
      // Använd alla tidigare genererade positioner för kollisionsdetektering
      const position = generateRandomPosition(i, positions);
      positions.push(position);
    }
    return positions;
  }, []); // Tom dependency array = körs bara en gång

  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            The Skill Bag
          </h2>
          <p className="font-body text-muted-foreground">
            Click the bag to reveal what's inside
          </p>
        </motion.div>

        {/* Container för väskan och ikonerna - min-h bestämmer hur mycket vertikalt utrymme */}
        {/* Höjd anpassad för bågen mellan rubriken och väskan */}
        <div className="relative flex justify-center items-center min-h-[500px]">
          {/* Floating Skills - Ikonerna som flyter ut från väskan */}
          <AnimatePresence>
            {isOpen &&
              skills.map((skill, index) => {
                // Använder den förgenererade positionen från useMemo
                const position = skillPositions[index];

                // Beräknar regnbågsfärg baserat på index
                // Delar 360 grader (full färgcirkel) jämnt mellan alla ikoner
                const hue = (index / skills.length) * 360;
                
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
                      // Regnbågsfärg på border och skugga vid hover - snabb transition
                      whileHover={{
                        border: `2px solid hsl(${hue}, 80%, 55%)`,
                        boxShadow: `0 10px 15px -3px hsla(${hue}, 80%, 55%, 0.4), 0 0 20px hsla(${hue}, 80%, 55%, 0.2)`,
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <skill.icon 
                        className="w-5 h-5 transition-colors duration-150"
                        style={{
                          color: hoveredIndex === index 
                            ? `hsl(${hue}, 80%, 50%)` 
                            : "hsl(var(--foreground))",
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
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg
              width="160"
              height="180"
              viewBox="0 0 160 180"
              fill="none"
              className="drop-shadow-lg"
            >
              {/* Bag Body */}
              <path
                d="M20 60 C20 60 10 170 80 170 C150 170 140 60 140 60 L20 60"
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />
              {/* Bag Top */}
              <ellipse
                cx="80"
                cy="60"
                rx="60"
                ry="15"
                fill="hsl(var(--secondary))"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />
              {/* Handles */}
              <path
                d="M50 55 Q50 25 80 25 Q110 25 110 55"
                fill="none"
                stroke="hsl(var(--charcoal-light))"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Accent Line */}
              <path
                d="M35 90 Q80 100 125 90"
                fill="none"
                stroke="hsl(var(--terracotta))"
                strokeWidth="2"
                opacity="0.6"
              />
            </svg>
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center pt-8"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            >
              <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                {isOpen ? "" : "Click me"}
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
            { label: "Design", color: "bg-terracotta" },
            { label: "Development", color: "bg-sage" },
            { label: "Tools", color: "bg-charcoal-light" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="font-body text-xs text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillBag;
