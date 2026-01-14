import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface ParticleNetworkProps {
  className?: string;
}

const ParticleNetwork = ({ className = "" }: ParticleNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Starta utanför skärmen
  const hueRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  // Konfiguration
  const PARTICLE_COUNT = 50; // Antal partiklar (justerbart för prestanda)
  const CONNECTION_DISTANCE = 120; // Max avstånd för linjer mellan partiklar
  const MOUSE_CONNECTION_DISTANCE = 150; // Max avstånd för linjer till muspekaren
  const PARTICLE_SPEED = 0.5; // Hastighet för partiklar
  const LINE_OPACITY = 0.15; // Opacitet för linjer (låg för minimalism)
  const PARTICLE_OPACITY = 0.4; // Opacitet för partiklar

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sätt canvas-storlek
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initiera partiklar
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
          radius: Math.random() * 2 + 1,
        });
      }
    };
    initParticles();

    // Muspekaren tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Nollställ muspekaren när den lämnar fönstret
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Intersection Observer för att pausa animationen när den inte är synlig
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Rensa canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Uppdatera regnbågsfärg (cyklar från 0 till 360)
      hueRef.current = (hueRef.current + 0.5) % 360;

      // Uppdatera och rita partiklar
      particlesRef.current.forEach((particle) => {
        // Uppdatera position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce vid kanterna
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Håll partiklar inom canvas
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });

      // Rita linjer mellan närliggande partiklar
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            // Beräkna opacitet baserat på avstånd (närmare = mer opak)
            const opacity = (1 - distance / CONNECTION_DISTANCE) * LINE_OPACITY;
            
            // Regnbågsfärg med gradient baserat på avstånd
            const hue = (hueRef.current + (distance / CONNECTION_DISTANCE) * 60) % 360;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Rita linjer till muspekaren om den är nära
        const p = particlesRef.current[i];
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_CONNECTION_DISTANCE) {
          const opacity = (1 - distance / MOUSE_CONNECTION_DISTANCE) * LINE_OPACITY * 1.5;
          const hue = (hueRef.current + (distance / MOUSE_CONNECTION_DISTANCE) * 60) % 360;
          
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Rita partikeln
        const particleHue = (hueRef.current + (i / particlesRef.current.length) * 60) % 360;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particleHue}, 70%, 60%, ${PARTICLE_OPACITY})`;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleNetwork;

