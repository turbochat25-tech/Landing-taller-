import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface AppCover {
  id: string;
  title: string;
  category: string;
  image: string;
  tag: string;
  color: string;
  glow: string;
}

const APP_COVERS: AppCover[] = [
  {
    id: 'inmobiliaria',
    title: 'Portal Inmobiliario Premium',
    category: 'SaaS Inmobiliario',
    image: 'https://lh3.googleusercontent.com/d/11SK03LSdLtbJ9rJTLjJviCuo7maDnw38',
    tag: 'Filtros Pro & Mapa',
    color: 'from-blue-500 to-indigo-600',
    glow: 'rgba(59, 130, 246, 0.4)'
  },
  {
    id: 'profit-fitness',
    title: 'Profit Fitness Advisor',
    category: 'SaaS de Salud & Deporte',
    image: 'https://lh3.googleusercontent.com/d/1R1gsO9ZHvGmLMUmD4YZh3cazyEuw2q23',
    tag: 'Inteligencia de Macros',
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.4)'
  },
  {
    id: 'copa-family',
    title: 'Copa Family 2026',
    category: 'Plataforma Deportiva Familiar',
    image: 'https://lh3.googleusercontent.com/d/15cv1IYQwwAVUNjsdbhZGHyaC0jcalC08',
    tag: 'Fixture & Puntos',
    color: 'from-purple-500 to-indigo-600',
    glow: 'rgba(139, 92, 246, 0.4)'
  },
  {
    id: 'pet-care',
    title: 'Pet Care Monitor',
    category: 'Gestión de Mascotas',
    image: 'https://lh3.googleusercontent.com/d/18PpF514ucBRQ_0gbGeWrH2Vl9XX0soF9',
    tag: 'Veterinaria Express',
    color: 'from-amber-500 to-orange-600',
    glow: 'rgba(245, 158, 11, 0.4)'
  },
  {
    id: 'gastos-familiar',
    title: 'Control de Gastos Familiar',
    category: 'Fintech Personal',
    image: 'https://lh3.googleusercontent.com/d/1Lt31LXoj43FGEMIsxPiw5XbKnTnrIaqC',
    tag: 'Flujo de Caja Real',
    color: 'from-pink-500 to-rose-600',
    glow: 'rgba(236, 72, 153, 0.4)'
  },
  {
    id: 'pequenos-gourmet',
    title: 'Pequeños Gourmets',
    category: 'Planificador de Nutrición Infantil',
    image: 'https://lh3.googleusercontent.com/d/1WUI5tcH2jUSV-FKugp6q3VEl1A4Pr12e',
    tag: 'Menús Interactivos',
    color: 'from-violet-500 to-fuchsia-600',
    glow: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: 'mundial-2026',
    title: 'Mundial 2026 Hub',
    category: 'Tracker de Resultados de Catar',
    image: 'https://lh3.googleusercontent.com/d/174-yaw8XIr6f0kXHMQnM7ZN-fGToNT1w',
    tag: 'Estadísticas en Tiempo Real',
    color: 'from-emerald-400 to-emerald-600',
    glow: 'rgba(52, 211, 153, 0.4)'
  }
];

export default function LibraryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Swipe gesture detection references
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const length = APP_COVERS.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  };

  // Update window width for dynamic spacing calculations
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous loop interval: 3 seconds as requested
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, activeIndex]);

  // Handle keyboard arrow keys for premium desktop experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Swipe handlers for dynamic responsive manual swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
    setIsHovered(true); // Pause auto-rotation temporarily during interaction
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false); // Resume auto-rotation
    if (!touchStartX.current || !touchEndX.current) return;
    const difference = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // pixels

    if (difference > swipeThreshold) {
      handleNext();
    } else if (difference < -swipeThreshold) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Space calculation based on responsiveness
  const getSpacing = () => {
    if (windowWidth > 1024) return 230; // wide desktop display spacing
    if (windowWidth > 768) return 160;  // tablet spacing
    if (windowWidth > 480) return 110;  // wide mobile spacing
    return 78;                          // compact mobile spacing
  };

  const spacing = getSpacing();

  return (
    <section 
      id="biblioteca-digital" 
      className="py-16 sm:py-28 border-t border-white/[0.06] bg-gradient-to-b from-[#03010a] via-[#060413] to-[#03010b] px-5 sm:px-6 relative overflow-hidden text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Absolute background visual details - Stripe & Framer premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1.3px,transparent_1.3px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Elegant ambient auroras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/[0.035] rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-emerald-500/[0.025] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-[10%] w-[500px] h-[500px] bg-indigo-500/[0.025] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Thin line spotlight beams */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* Superior Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="text-[11.5px] sm:text-[10px] font-mono tracking-widest text-violet-400 uppercase font-bold">
              Biblioteca Digital Premium
            </span>
          </div>
          <h2 className="text-[28px] xs:text-[32px] sm:text-4xl md:text-5xl font-black font-display tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            Ecosistema de Aplicaciones creadas con IA
          </h2>
          <p className="text-[15px] sm:text-sm text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Explora las portadas interactivas de las aplicaciones reales construidas por nuestros estudiantes. Cada proyecto representa un SaaS monetizable y completamente publicado en internet.
          </p>
        </div>

        {/* The 3D Book Shelf / Coverflow container with swipe capability */}
        <div 
          className="relative w-full h-[380px] xs:h-[420px] sm:h-[480px] md:h-[520px] flex items-center justify-center overflow-visible select-none py-4 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* Depth perspective layer wrapping */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center" style={{ perspective: 1200 }}>
            {APP_COVERS.map((app, idx) => {
              // High performance cyclic absolute offset finding
              let diff = idx - activeIndex;
              while (diff < -Math.floor(length / 2)) diff += length;
              while (diff > Math.floor(length / 2)) diff -= length;

              const absDiff = Math.abs(diff);
              const isActive = absDiff === 0;

              // Smooth responsive 3D coverflow transforms
              let scale = 1.0;                  // Target scale central card
              let rotateY = 0;                  // Y-axis 3D angle depth 
              let opacity = 1.0;                // Transparency
              let blurVal = 0;                  // Soft out-of-focus backdrop filter

              if (!isActive) {
                if (absDiff === 1) {
                  scale = 0.81;
                  rotateY = diff > 0 ? -28 : 28;
                  opacity = 0.75;
                  blurVal = 1.5;
                } else if (absDiff === 2) {
                  scale = 0.65;
                  rotateY = diff > 0 ? -42 : 42;
                  opacity = 0.32;
                  blurVal = 3.5;
                } else {
                  // Fully fade opposite sides of the loop to prevent snapping when crossing
                  scale = 0.5;
                  rotateY = diff > 0 ? -45 : 45;
                  opacity = 0;
                  blurVal = 5;
                }
              }

              const zIndex = 30 - absDiff * 5;
              const xOffset = diff * spacing;

              return (
                <motion.div
                  key={app.id}
                  className="absolute w-[185px] xs:w-[210px] sm:w-[250px] md:w-[275px] h-[280px] xs:h-[320px] sm:h-[380px] md:h-[420px] rounded-2.5xl cursor-pointer select-none origin-center"
                  style={{
                    zIndex,
                    filter: `blur(${blurVal}px)`
                  }}
                  animate={{
                    x: xOffset,
                    scale,
                    rotateY,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 22,
                    mass: 0.8
                  }}
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Glowing halo behind active cover card */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 rounded-2.5xl transition-all duration-700 pointer-events-none -z-10 blur-[30px]"
                      style={{
                        background: `radial-gradient(circle, ${app.glow} 0%, transparent 70%)`
                      }}
                    />
                  )}

                  {/* High fidelity vertical card design */}
                  <div className={`relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isActive 
                      ? 'border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.06)]' 
                      : 'border-white/5 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)]'
                  } bg-neutral-900 group`}>
                    
                    {/* Background glow and subtle dots inside card */}
                    <div className="absolute inset-0 bg-neutral-950 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:10px_10px] z-10 pointer-events-none" />
                    
                    {/* The main vertical app screenshot */}
                    <div className="absolute inset-x-1 top-1 bottom-14 rounded-xl overflow-hidden bg-[#0c0919]">
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
                      )}
                      <img 
                        src={app.image} 
                        alt={app.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>

                    {/* Bottom layout label metadata */}
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-[#090712] border-t border-white/[0.04] px-4 flex items-center justify-between z-20">
                      <div className="text-left truncate max-w-[70%]">
                        <p className="text-[12px] sm:text-[11px] font-bold text-white tracking-wide truncate group-hover:text-violet-300 transition-colors">
                          {app.title}
                        </p>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 font-semibold truncate leading-none mt-0.5">
                          {app.category}
                        </p>
                      </div>
                      <span className="shrink-0 text-[8.5px] font-mono uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.5 rounded-full">
                        {app.tag}
                      </span>
                    </div>

                    {/* Left vertical ribbon for inactive status indicator */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/[0.42] backdrop-blur-[0.5px] group-hover:bg-black/[0.25] transition-colors duration-300 pointer-events-none z-15" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel indicators & buttons controls */}
        <div className="flex flex-col items-center gap-6 relative z-10">
          
          {/* Navigation Controls buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-[#0c0a1b]/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/40 hover:bg-[#120f2b] transition-all cursor-pointer shadow-lg shadow-black/40 hover:shadow-violet-500/5 group animate-none"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Middle labels */}
            <div className="px-5 py-1.5 rounded-full bg-[#0a0815]/80 border border-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] min-w-[140px] text-center">
              <span className="text-xs font-mono font-medium tracking-widest text-zinc-400">
                {activeIndex + 1} <span className="text-zinc-600">/</span> {length}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-[#0c0a1b]/60 flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/40 hover:bg-[#120f2b] transition-all cursor-pointer shadow-lg shadow-black/40 hover:shadow-violet-500/5 group animate-none"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Dots timeline */}
          <div className="flex items-center gap-2">
            {APP_COVERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx 
                    ? 'w-7 bg-gradient-to-r from-violet-500 to-indigo-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]' 
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
