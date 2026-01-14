import { motion } from "framer-motion";
import ParticleNetwork from "./ParticleNetwork";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden">
      {/* Canvas bakgrund med partikelnätverk */}
      <ParticleNetwork />
      
      {/* Innehåll med z-index för att ligga ovanför canvas */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-purple-700 font-body text-sm tracking-[0.3em] uppercase mb-6">
            Web Designer & Developer
          </p>
        </motion.div>

        <motion.h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Frida Yngvesson
        </motion.h1>

        <motion.p
          className="font-heading text-2xl md:text-3xl lg:text-4xl text-charcoal-light italic mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          26 år • Baserad i Stockholm • Från Linköping
        </motion.p>

        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          Jag är en kreativ utvecklare som rör mig fritt mellan design och kod. Genom att blanda min akademiska grund i informationsarkitektur med ett nyfiket förhållningssätt till nya verktyg, skapar jag moderna webbupplevelser med användaren i centrum.
          </p>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-purple-700 rounded-full animate-pulse" />
            <p className="font-body text-sm text-foreground tracking-wide">
              Web Design Intern at <span className="font-medium">Mira Media</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <a
            href="#skills"
            className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Explore</span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-0.5"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
