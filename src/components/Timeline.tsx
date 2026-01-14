import { motion } from "framer-motion";

const timelineItems = [
  {
    year: "2025",
    title: "Web Design Intern",
    organization: "Mira Media",
    description: "Här kombinerar jag design och utveckling genom att skapa wireframes i Figma och bygga WordPress-sidor med Elementor. Fokus ligger på att förbättra användarflöden och skapa en enhetlig visuell upplevelse.",
    current: true,
  },
  {
    year: "2024–2026",
    title: "Frontend Developer",
    organization: "KYH Stockholm",
    description: "En intensiv utbildning med fokus på modern webbutveckling. Här fördjupar jag mig i tekniker som React, JavaScript och TypeScript för att bygga skalbara och interaktiva applikationer.",
    current: false,
  },
  {
    year: "2021–2024",
    title: "Bachelor of Information Architecture",
    organization: "Borås University",
    description: "Min akademiska grund i struktur och användarbeteende. Här introducerades jag även för kodning i HTML, CSS, JavaScript och React.",
    current: false,
  },
  {
    year: "2020–2023",
    title: "E-commerce & Social Media Associate",
    organization: "City Gross AB",
    description: "Ansvarig för butikens sociala medier (Instagram/Facebook) samt drift och hantering av e-handelsorder kombinerat med kundservice.",
    current: false,
  },
  {
    year: "Previously",
    title: "Leadership & Sales Experience",
    organization: "Espresso House & Framtiden AB",
    description: "Mina år som barista, skiftledare och säljkoordinator gav mig en trygg grund i kommunikation, teamledarskap och att hantera kundrelationer i ett högt tempo.",
    current: false,
  },
];

const Timeline = () => {
  return (
    <section id="journey" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            The Journey
          </h2>
          <div className="font-body text-muted-foreground space-y-6 max-w-4xl">
  <p className="text-foreground font-medium uppercase tracking-wider text-sm">
    Om mig & min väg hit
  </p>
  
  <p>
    Jag har alltid gillat kombinationen av <span className="italic">struktur och kreativitet</span> – att förstå hur saker hänger ihop och sedan bygga något av det. Det ledde mig till en kandidatexamen i informationsarkitektur i Borås och vidare till frontend-utveckling på KYH i Stockholm.
  </p>

  <p>
    Innan jag klev in i tech-världen jobbade jag flera år med försäljning och ledarskap, bland annat som <span className="italic">skiftledare</span>. Det gav mig en stabil grund i att förstå vad kunder faktiskt vill ha och hur man förblir lösningsorienterad även i ett högt tempo.
  </p>

  <p>
    När jag inte <span className="italic">fördjupar mig i kod</span> håller jag kreativiteten vid liv genom sociala medier. Där utforskar jag visuellt berättande genom innehåll kring livsstil och video – ett sätt för mig att experimentera med design och kommunikation i andra format.
  </p>
</div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={item.year}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-background border-2 border-purple-700 md:-translate-x-1/2 mt-2">
                {item.current && (
                  <span className="absolute inset-0 rounded-full bg-purple-700 animate-ping opacity-50" />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 pl-8 md:pl-0 max-w-sm ${index % 2 === 0 ? "md:pr-16 md:text-right md:ml-auto" : "md:pl-16"}`}>
                <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {item.year}
                </span>
                <h3 className="font-heading text-xl md:text-2xl mt-2 mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-purple-700 mb-3">
                  {item.organization}
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
