import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Journey", href: "#journey" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6 transition-colors duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md" : ""
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#" className="font-heading text-lg">
            FY
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:fridayngvesson1@gmail.com"
              className="font-body text-sm px-4 py-2 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-5 h-0.5 bg-foreground"
              animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-foreground"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-foreground"
              animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="font-heading text-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="mailto:fridayngvesson1@gmail.com"
                className="font-body text-lg px-6 py-3 bg-foreground text-background rounded-full mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
