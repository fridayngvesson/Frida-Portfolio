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
