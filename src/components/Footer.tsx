import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-24 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              className="relative cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.2 },
                scale: { duration: 0.6, delay: 0.2 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.1,
                y: 0,
                rotate: [0, -3, 3, -3, 0],
              }}
            >
              <motion.img 
                src="/profile-pic.png" 
                alt="Profile" 
                className="w-24 h-24 md:w-40 md:h-40 rounded-2xl object-cover border-2 border-border shadow-2xl"
                style={{
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 15px 30px rgba(0, 0, 0, 0.2)'
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl mb-4">
            Ska vi jobba ihop?
          </h2>
          <p className="font-body text-muted-foreground mb-12 max-w-md mx-auto">
          Jag tar snart examen och letar efter en plats där jag kan få fortsätta utvecklas och bidra med min kombo av design och kod. Om ni söker en driven junior som gillar att lära sig nytt, hör gärna av er!
          </p>

          {/* Contact Links */}
          <div className="flex justify-center gap-8 mb-16">
            <motion.a
              href="mailto:fridayngvesson1@gmail.com"
              className="group flex flex-col items-center gap-2"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                <Mail size={20} className="group-hover:text-white transition-colors" />
              </div>
              <span className="font-body text-xs text-muted-foreground group-hover:text-purple-700 transition-colors">
                Email
              </span>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/frida-yngvesson"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                <Linkedin size={20} className="group-hover:text-white transition-colors" />
              </div>
              <span className="font-body text-xs text-muted-foreground group-hover:text-purple-700 transition-colors">
                LinkedIn
              </span>
            </motion.a>

            <motion.a
              href="https://github.com/fridayngvesson"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                <Github size={20} className="group-hover:text-white transition-colors" />
              </div>
              <span className="font-body text-xs text-muted-foreground group-hover:text-purple-700 transition-colors">
                GitHub
              </span>
            </motion.a>
          </div>

          {/* Email Display */}
          <p className="font-body text-sm text-muted-foreground mb-8">
            fridayngvesson1@gmail.com
          </p>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="font-body text-xs text-muted-foreground">
              © {new Date().getFullYear()} Frida Yngvesson. Crafted with love💜, but also with Lovable and Cursor ;)
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
