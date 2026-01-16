import { motion } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "WordPress Website for Client",
    description: "Utvecklad i Divi Theme Builder (Wordpress) med design i Figma. Genom wireframing, UI/UX och användartester skapades en genomarbetad webbdesign för kunden.",
    tags: ["WordPress", "Figma", "UI/UX", "Divi"],
    size: "medium",
    image: "/aby-profile.png", // Fallback bild
    video: undefined, // Lägg till video-sökväg här, t.ex. "/video1.mp4"
    url: "https://atif.se/", // Lägg till projektlänk här, t.ex. "https://example.com"
  },
  {
    id: 2,
    title: "Airbnb Fullstack Clone",
    description: "En komplett bokningsplattform byggd med React, Node.js och MongoDB. Innehåller autentisering och bestående datalagring.",
    tags: ["React", "Node.js", "MongoDB", "Auth"],
    size: "medium",
    image: "/Naturly-mockup.png", // Fallback bild
    video: undefined, // Lägg till video-sökväg här, t.ex. "/video2.mp4"
    url: "https://www.figma.com/design/bq09zcTw8h8RhV6BSgr65n/AirBnb---Projekt?node-id=1003-2&t=AHtc3FHl6wLQl4aG-1", // Lägg till projektlänk här
  },
  {
    id: 3,
    title: "Mino Zero - Motion Concept",
    description: "Ett hobbyprojekt skapat i Figma för att utforska avancerad prototypning och animation. Fokus låg på 'Smart Animate', produktpresentation och dynamiska övergångar för att skapa en engagerande landningssida.",
    tags: ["Figma", "Motion Design", "Prototyping", "UI/UX"],
    size: "medium",
    image: "/mino-profile.png", // En snygg skärmdump som fallback
    video: "/mino-video.mp4",
    url: "https://www.figma.com/design/vdokq34l5hznjZPOd77Oso/Ino?node-id=0-1&p=f&t=6djMLqI82E6LmGYN-0", // Lägg till projektlänk här
  }, 
  {
    id: 4,
    title: "AI Game Companion – Concept",
    description:
      "Ett pågående hobbyprojekt där jag utforskade hur en webbaserad guide kan hjälpa spelare att navigera i ett komplext spel. Projektet är inte färdigställt utan skapades som ett experiment med moderna frontend-verktyg och AI-assisterade arbetsflöden, med fokus på lärande och utforskande.",
    tags: ["React", "AI Concepts", "Lovable", "Cursor"],
    size: "medium",
    image: "/project4.png", // Fallback bild
    video: undefined, // Lägg till video-sökväg här, t.ex. "/video4.mp4"
    url: "https://dreamlight-companion.netlify.app/" // Lägg till projektlänk här
  },
  {
    id: 5,
    title: "Elementor Implementation Project",
    description: "Ett projekt där jag utgick från en inspirationsdesign och omsatte den till en fullt fungerande webbsida i WordPress med Elementor. Fokus låg på teknisk implementation, pixel-perfect design och responsivitet.",
    tags: ["WordPress", "Elementor", "Web Implementation", "Design-to-Web"],
    size: "medium",
    image: "/lunar-align-profile.png", 
    video: "/lunar-align-vid.mp4", 
    url: undefined, // Lägg till projektlänk här
  },
  {
    id: 6,
    title: "Elementor Implementation Project",
    description: "Ett projekt där jag återskapade en befintlig webbplats byggd i WordPress med Elementor som övning. Fokus låg på struktur, layout, responsivitet och att förstå hur färdiga Elementor-lösningar är uppbyggda.",
    tags: ["WordPress", "Elementor", "Web Implementation", "Design-to-Web"],
    size: "medium",
    image: "/flygandepizza-mockup.png", 
    video: undefined, 
    url: "https://www.flygandepizzan.se/", // Lägg till projektlänk här
  },
  
];

// Komponent för att hantera video-playback vid hover
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.video) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && project.video) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Återställ till början
    }
  };

  const CardWrapper = project.url ? motion.a : motion.article;
  const cardProps = project.url 
    ? {
        href: project.url,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <CardWrapper
      key={project.id}
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer ${
        project.size === "large" ? "md:col-span-2" : ""
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...cardProps}
    >
      {/* Bakgrund - Video eller bild */}
      <div className="absolute inset-0 z-0">
        {project.video ? (
          <>
            {/* Video som spelas vid hover */}
            <video
              ref={videoRef}
              src={project.video}
              className={`w-full h-full object-contain transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              muted
              loop
              playsInline
              preload="metadata"
            />
            {/* Fallback bild som visas när videon inte spelas */}
            <img
              src={project.image}
              alt={project.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-0" : "opacity-30"
              }`}
            />
          </>
        ) : (
          // Om ingen video finns, visa bara bilden
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {/* Gradient overlay för bättre läsbarhet - försvinner vid hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-card/70 via-card/50 to-card/70 group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      {/* Innehåll med z-index för att ligga ovanför bakgrunden - försvinner vid hover */}
      <div className={`relative z-10 p-8 md:p-12 opacity-100 group-hover:opacity-0 transition-opacity duration-500 ${project.size === "large" ? "md:py-16" : ""}`}>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs tracking-wider uppercase px-3 py-1 bg-secondary rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className={`font-heading mb-4 ${
          project.size === "large" 
            ? "text-2xl md:text-3xl lg:text-4xl" 
            : "text-xl md:text-2xl"
        }`}>
          {project.title}
        </h3>

        <p className="font-body text-muted-foreground leading-relaxed max-w-xl">
          {project.description}
        </p>

        <motion.div
          className="mt-8 inline-flex items-center gap-2 text-sm font-body text-foreground group-hover:text-primary transition-colors"
          whileHover={{ x: 4 }}
        >
          <span>{project.url ? "View Project" : "Coming Soon"}</span>
          {project.url && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.div>
      </div>
    </CardWrapper>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            Selected Work
          </h2>
          <p className="font-body text-muted-foreground max-w-xl">
            A collection of projects showcasing design thinking, technical implementation, and creative exploration.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
