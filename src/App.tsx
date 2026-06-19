import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  TrendingUp, 
  Smartphone, 
  BookOpen, 
  Calendar, 
  Clock, 
  HelpCircle, 
  Menu,
  ChevronDown,
  Gift,
  ShieldCheck,
  Star,
  Zap,
  CheckCircle2,
  Users,
  Target,
  FileText,
  AlertCircle,
  ExternalLink,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APPS_DATA, PROBLEM_COMPARISON, WHAT_YOU_WILL_LEARN, FAQ_DATA } from './data/appsData';
import MockDeviceWrapper from './components/MockDeviceWrapper';
import ReservarModal from './components/ReservarModal';
import PremiumCTAButton from './components/PremiumCTAButton';
import LibraryShowcase from './components/LibraryShowcase';

// High-fidelity Framer-style mockup imports
import profitFitnessImg from './assets/images/profit_fitness_mockup_1781845539931.jpg';
import copaFamilyImg from './assets/images/copa_family_mockup_1781845556192.jpg';
import mundialImg from './assets/images/mundial_2026_mockup_1781845570310.jpg';
import pequenosGourmetsImg from './assets/images/pequenos_gourmets_mockup_1781845579894.jpg';

// Live high-fidelity vertical app screenshots mapping to keep layouts completely intact and readable
const REAL_CAPTURES_MAPPING: Record<string, { screen1: string; screen2: string; label1: string; label2: string }> = {
  'profit-fitness': {
    screen1: 'https://lh3.googleusercontent.com/d/16fhhmRuvcDQ17_PnxE2F-cXhPBMlSj7w',
    screen2: 'https://lh3.googleusercontent.com/d/1vuKtpXBjmpVDCCTLvcTFxwmOP8PX42Fg',
    label1: 'Home & Reto',
    label2: 'Rutinas & Macros'
  },
  'copa-family-2026': {
    screen1: 'https://lh3.googleusercontent.com/d/1ouzullH3Ww5_ds7Z-8n3E1XIEMBc4xdd',
    screen2: 'https://lh3.googleusercontent.com/d/17SVeY34Hykw83c1LQMk2L0our--oSnjm',
    label1: 'Fixture & Partidos',
    label2: 'Tabla de Posiciones'
  },
  'mundial-2026': {
    screen1: 'https://lh3.googleusercontent.com/d/17SVeY34Hykw83c1LQMk2L0our--oSnjm',
    screen2: 'https://lh3.googleusercontent.com/d/1USC36e4Z3Q69Moxv8c-fr0nZQ1U5IaAd',
    label1: 'Posiciones',
    label2: 'Control de Álbum'
  },
  'pequenos-gourmets': {
    screen1: 'https://lh3.googleusercontent.com/d/1yplMXtT1_cZqROm77Y6ikI8tD3PVaSdg',
    screen2: 'https://lh3.googleusercontent.com/d/1UujhDgmstWOBzQ6ovEu2NmEDL4obAUBO',
    label1: 'Planificador de Menú',
    label2: 'Menú Inteligente'
  }
};

export default function App() {
  const [activeApp, setActiveApp] = useState<string>('profit-fitness');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 44, seconds: 12 });
  const [showStickyCTA, setShowStickyCTA] = useState<boolean>(false);

  // Urgency Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 3, minutes: 0, seconds: 0 }; // Reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Persistent mobile bottom sticky bar scroll activator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenReservar = () => {
    setIsModalOpen(true);
  };

  const selectedAppData = APPS_DATA.find(a => a.id === activeApp) || APPS_DATA[0];

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => prev === idx ? null : idx);
  };

  return (
    <div id="landing-root" className="min-h-screen bg-[#03010a] text-[#fafafa] font-sans antialiased overflow-x-hidden selection:bg-violet-950/80 selection:text-white relative">
      {/* Global Background glow & subtle ambient auroras across the entire page */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-gradient-to-b from-indigo-500/[0.04] via-transparent to-transparent pointer-events-none -z-20" />
      <div className="absolute top-[1800px] right-0 w-[800px] h-[800px] bg-emerald-500/[0.015] rounded-full blur-[160px] pointer-events-none -z-20" />
      <div className="absolute top-[3200px] left-0 w-[800px] h-[800px] bg-violet-600/[0.012] rounded-full blur-[160px] pointer-events-none -z-20" />
      <div className="absolute top-[4800px] right-10 w-[700px] h-[700px] bg-indigo-500/[0.015] rounded-full blur-[150px] pointer-events-none -z-20" />
      <div className="absolute bottom-[1000px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-emerald-500/[0.012] rounded-full blur-[180px] pointer-events-none -z-20" />

      {/* Top urgence banner */}
      <div className="bg-gradient-to-r from-[#0d071a] via-black to-[#031409] border-b border-white/5 text-center py-2 px-4 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs font-semibold tracking-wider text-white">
          <span className="flex items-center gap-1.5 justify-center text-zinc-350">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            🔥 ¡OFERTA EXPIRA PRONTO! — TALLER EN VIVO: 10, 11 Y 12 DE JULIO
          </span>
          <div className="flex items-center gap-3">
            <span className="opacity-80 text-zinc-400">Cupos limitados. La oferta expira en:</span>
            <span className="font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 font-bold">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Header / Premium Navigation Bar */}
      <header className="sticky top-0 z-40 bg-black/75 backdrop-blur-xl border-b border-white/5 transition-all">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center transition-all group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-450 text-lg font-black font-display tracking-tighter relative z-10">
                IA
              </span>
            </div>
            <div>
              <span className="block font-display font-extrabold text-sm tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                CREA Y VENDE APPS CON IA
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 block">
                BUILD & SELL MICROSAAS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-zinc-400 bg-neutral-900/40 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
            <a href="#aplicaciones" className="hover:text-white transition-colors relative group py-1">
              <span>Aplicaciones reales</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-400 transition-all group-hover:w-full" />
            </a>
            <a href="#comparativa" className="hover:text-white transition-colors relative group py-1">
              <span>El Secreto</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-400 transition-all group-hover:w-full" />
            </a>
            <a href="#contenido" className="hover:text-white transition-colors relative group py-1">
              <span>¿Qué aprenderás?</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-400 transition-all group-hover:w-full" />
            </a>
            <a href="#como-funciona" className="hover:text-white transition-colors relative group py-1">
              <span>Cómo funciona</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-400 transition-all group-hover:w-full" />
            </a>
            <a href="#faqs" className="hover:text-white transition-colors relative group py-1">
              <span>Preguntas frecuentes</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-emerald-400 transition-all group-hover:w-full" />
            </a>
          </div>

          <div>
            <PremiumCTAButton 
              size="nav"
              className="shadow-lg shadow-violet-500/5"
            />
          </div>
        </nav>
      </header>

      {/* SECCIÓN 1 - HERO */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-28 md:pt-24 md:pb-36 overflow-hidden px-5 sm:px-6">
        {/* Ambient background glows / Aurora with deeper, high-end tech blurs */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-indigo-500/[0.12] rounded-full blur-[120px] sm:blur-[180px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-500/[0.08] rounded-full blur-[110px] sm:blur-[160px] pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[120px] sm:h-[180px] bg-gradient-to-r from-violet-600/[0.06] to-emerald-500/[0.06] rounded-full blur-[100px] sm:blur-[160px] pointer-events-none -z-10" />
        
        {/* Dynamic technology spotlight beam from top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-violet-500/[0.03] to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />

        {/* Framer Grid Background Overlay with precise radial vignette masking */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,#000_65%,transparent_100%)] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,#000_65%,transparent_100%)] pointer-events-none -z-10" />
 
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-neutral-900/60 border border-white/[0.06] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11.5px] xs:text-[12px] sm:text-xs font-mono font-bold tracking-wider uppercase text-zinc-400">
                Aprende a vender tecnología de alto valor percibido
              </span>
            </div>
  
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-[36px] xs:text-[40px] sm:text-5xl md:text-6xl font-black font-display tracking-tight leading-[1.1] sm:leading-[1.08] text-white">
                Crea, publica y vende <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-350 to-emerald-400 drop-shadow-[0_2px_15px_rgba(139,92,246,0.2)]">aplicaciones web</span> con IA sin saber programar
              </h1>
              <p className="text-[18px] xs:text-[19px] sm:text-lg text-zinc-400 leading-relaxed max-w-2xl font-light">
                Aprende a construir aplicaciones reales para complementar tus productos digitales, diferenciarte de la competencia o venderlas directamente por internet.
              </p>
            </div>
  
            {/* Quick Pricing block with enhanced Linear-like dark glass */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0a0715]/95 to-[#120f26]/95 border border-white/[0.12] max-w-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.9)] hover:border-violet-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#10b981] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#8b5cf6]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/[0.04] via-transparent to-violet-500/[0.04] opacity-100" />
              
              <div className="space-y-2 relative z-10">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  🔥 PRECIO DE LANZAMIENTO
                </span>
                <p className="text-[13.5px] sm:text-[13px] text-zinc-300 font-medium">
                  Acceso al taller en vivo + grabaciones + soporte 15 días
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end justify-center shrink-0 relative z-10 border-t sm:border-t-0 sm:border-l border-white/5 pt-3 sm:pt-0 sm:pl-5 space-y-1">
                <span className="text-xs text-zinc-500 line-through font-mono uppercase tracking-widest block">
                  ANTES: $199 USD
                </span>
                <span className="text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300 tracking-tight leading-none drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] block">
                  HOY: $24.99 USD
                </span>
              </div>
            </div>

            {/* Hero CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <PremiumCTAButton 
                size="lg" 
                className="w-full sm:w-auto shrink-0 select-none" 
              />
              
              <a 
                href="#aplicaciones" 
                className="text-[14px] sm:text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-widest text-center py-3 sm:py-4.5 sm:px-4 flex items-center justify-center gap-1.5 transition-all group cursor-pointer"
              >
                <span>Ver demostraciones interactivas</span>
                <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-emerald-400" />
              </a>
            </div>

            {/* Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 sm:gap-y-3 pt-3.5 sm:pt-4 border-t border-neutral-900">
              {[
                'Taller práctico en vivo y paso a paso',
                'Grabaciones completas incluidas de por vida',
                'Grupo privado de soporte durante 15 días',
                'Estrategias de venta avanzadas sin seguidores',
                'Uso de herramientas gratuitas y accesibles'
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[14px] sm:text-xs text-zinc-350 hover:text-white transition-colors">
                  <div className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Column: Clickable Floating Collage surrounding Device */}
          <div className="lg:col-span-5 relative flex flex-col justify-center items-center mt-4 sm:mt-8 lg:mt-0">
            
            {/* The interactive device mockup containing the current active app simulator */}
            <div className="relative z-10 w-full flex justify-center">
              <MockDeviceWrapper activeAppId={activeApp} defaultViewMode="interactive" />
            </div>

            {/* Floating App Selectors/Cards Collage arranged around the simulator */}
            {/* 1. Profit Fitness (Emerald) - Left Top */}
            <motion.div
              style={{ x: -160, y: -260 }}
              onClick={() => setActiveApp('profit-fitness')}
              className={`absolute hidden xl:flex flex-col items-start gap-2 p-3 bg-neutral-950/90 border rounded-2xl w-[190px] cursor-pointer text-left transition-all backdrop-blur-md z-20 ${
                activeApp === 'profit-fitness' 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 scale-105 shadow-xl shadow-emerald-500/10' 
                  : 'border-neutral-800 hover:border-neutral-700 hover:scale-102 hover:-translate-y-1'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 uppercase font-bold px-1.5 py-0.5 rounded">
                  Salud
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <h5 className="text-[11px] font-extrabold text-white">Profit Fitness</h5>
              <p className="text-[9px] text-zinc-500 leading-tight">Rutinas con macros recalculados dinámicamente.</p>
              <span className="text-[8px] text-emerald-400 uppercase font-mono mt-1 font-bold">● CLIC PARA ABRIR</span>
            </motion.div>

            {/* 2. Copa Family 2026 (Violet) - Right Top */}
            <motion.div
              style={{ x: 160, y: -190 }}
              onClick={() => setActiveApp('copa-family-2026')}
              className={`absolute hidden xl:flex flex-col items-start gap-2 p-3 bg-neutral-950/90 border rounded-2xl w-[190px] cursor-pointer text-left transition-all backdrop-blur-md z-20 ${
                activeApp === 'copa-family-2026' 
                  ? 'border-violet-500 ring-2 ring-violet-500/20 scale-105 shadow-xl shadow-violet-500/10' 
                  : 'border-neutral-800 hover:border-neutral-700 hover:scale-102 hover:-translate-y-1'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-mono text-violet-400 bg-violet-500/15 uppercase font-bold px-1.5 py-0.5 rounded">
                  Deportes
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              </div>
              <h5 className="text-[11px] font-extrabold text-white">Copa Family 2026</h5>
              <p className="text-[9px] text-zinc-500 leading-tight">Fixture de torneo y posiciones automáticas.</p>
              <span className="text-[8px] text-violet-400 uppercase font-mono mt-1 font-bold">● CLIC PARA ABRIR</span>
            </motion.div>

            {/* 3. Mundial 2026 (Emerald) - Left Bottom */}
            <motion.div
              style={{ x: -160, y: -40 }}
              onClick={() => setActiveApp('mundial-2026')}
              className={`absolute hidden xl:flex flex-col items-start gap-2 p-3 bg-neutral-950/90 border rounded-2xl w-[190px] cursor-pointer text-left transition-all backdrop-blur-md z-20 ${
                activeApp === 'mundial-2026' 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 scale-105 shadow-xl shadow-emerald-500/10' 
                  : 'border-neutral-800 hover:border-neutral-700 hover:scale-102 hover:-translate-y-1'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 uppercase font-bold px-1.5 py-0.5 rounded">
                  Entretenimiento
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h5 className="text-[11px] font-extrabold text-white">Mundial 2026</h5>
              <p className="text-[9px] text-zinc-500 leading-tight">Simulador de llaves con liga compartida.</p>
              <span className="text-[8px] text-emerald-400 uppercase font-mono mt-1 font-bold">● CLIC PARA ABRIR</span>
            </motion.div>

            {/* 4. Pequeños Gourmets (Violet) - Right Bottom */}
            <motion.div
              style={{ x: 160, y: 70 }}
              onClick={() => setActiveApp('pequenos-gourmets')}
              className={`absolute hidden xl:flex flex-col items-start gap-2 p-3 bg-neutral-950/90 border rounded-2xl w-[190px] cursor-pointer text-left transition-all backdrop-blur-md z-20 ${
                activeApp === 'pequenos-gourmets' 
                  ? 'border-violet-500 ring-2 ring-violet-500/20 scale-105 shadow-xl shadow-violet-500/10' 
                  : 'border-neutral-800 hover:border-neutral-700 hover:scale-102 hover:-translate-y-1'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[9px] font-mono text-violet-400 bg-violet-500/15 uppercase font-bold px-1.5 py-0.5 rounded">
                  Infantil
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              </div>
              <h5 className="text-[11px] font-extrabold text-white">Pequeños Gourmets</h5>
              <p className="text-[9px] text-zinc-500 leading-tight">Cortes y recetas BLW guiados por edad.</p>
              <span className="text-[8px] text-violet-400 uppercase font-mono mt-1 font-bold">● CLIC PARA ABRIR</span>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECCIÓN CREST: BANDA DE CREDIBILIDAD TRANSICIONAL */}
      <section className="py-10 sm:py-16 border-y border-white/[0.06] bg-gradient-to-r from-[#03010a] via-[#090615] to-[#03010a] px-5 sm:px-6 relative overflow-hidden">
        {/* Subtle decorative top/bottom glowing thin border lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent pointer-events-none" />
        
        {/* Subtle dot matrix pattern to reduce empty space and feel high-tech */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.2px,transparent_1.2px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-10 lg:gap-16">
            <div className="space-y-2 sm:space-y-3 max-w-sm shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[9px] font-mono tracking-widest font-extrabold uppercase bg-emerald-500/10 text-emerald-400 px-3.5 py-1 rounded-full border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                PRODUCCIÓN REALÍSIMA
              </span>
              <h3 className="text-[26px] xs:text-[28px] sm:text-3xl font-black font-display text-white tracking-tight leading-tight uppercase">
                Aplicaciones reales.<br />
                <span className="text-zinc-500 block sm:inline">No conceptos.</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
              <div className="p-4 sm:p-5 bg-white/[0.015] border border-white/[0.05] rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                <div className="absolute right-3 top-2 text-[26px] text-zinc-800/10 font-mono font-black select-none group-hover:text-emerald-500/10 transition-all">01</div>
                <p className="text-[28px] sm:text-3xl font-black text-white font-display tracking-tight leading-none group-hover:text-emerald-400 transition-colors">+4</p>
                <p className="text-[11.5px] sm:text-[10px] uppercase font-mono tracking-wider text-zinc-400 mt-2 font-medium">Aplicaciones funcionales</p>
                <div className="w-8 h-[2px] bg-emerald-500/50 rounded mt-3 group-hover:w-full transition-all duration-300" />
              </div>
              <div className="p-4 sm:p-5 bg-white/[0.015] border border-white/[0.05] rounded-2xl relative overflow-hidden group hover:border-blue-500/30 hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                <div className="absolute right-3 top-2 text-[26px] text-zinc-800/10 font-mono font-black select-none group-hover:text-blue-500/10 transition-all">02</div>
                <p className="text-[28px] sm:text-3xl font-black text-white font-display tracking-tight leading-none group-hover:text-blue-400 transition-colors">100%</p>
                <p className="text-[11.5px] sm:text-[10px] uppercase font-mono tracking-wider text-zinc-400 mt-2 font-medium">Publicadas en internet</p>
                <div className="w-8 h-[2px] bg-blue-500/50 rounded mt-3 group-hover:w-full transition-all duration-300" />
              </div>
              <div className="p-4 sm:p-5 bg-white/[0.015] border border-white/[0.05] rounded-2xl relative overflow-hidden group hover:border-amber-500/30 hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                <div className="absolute right-3 top-2 text-[26px] text-zinc-800/10 font-mono font-black select-none group-hover:text-amber-500/10 transition-all">03</div>
                <p className="text-[28px] sm:text-3xl font-black text-white font-display tracking-tight leading-none group-hover:text-amber-400 transition-colors">Listas</p>
                <p className="text-[11.5px] sm:text-[10px] uppercase font-mono tracking-wider text-zinc-400 mt-2 font-medium">Para compartir o vender</p>
                <div className="w-8 h-[2px] bg-amber-500/50 rounded mt-3 group-hover:w-full transition-all duration-300" />
              </div>
              <div className="p-4 sm:p-5 bg-white/[0.015] border border-white/[0.05] rounded-2xl relative overflow-hidden group hover:border-pink-500/30 hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                <div className="absolute right-3 top-2 text-[26px] text-zinc-800/10 font-mono font-black select-none group-hover:text-pink-500/10 transition-all">04</div>
                <p className="text-[28px] sm:text-3xl font-black text-white font-display tracking-tight leading-none group-hover:text-pink-400 transition-colors">IA Tech</p>
                <p className="text-[11.5px] sm:text-[10px] uppercase font-mono tracking-wider text-zinc-400 mt-2 font-medium">Construidas sin programar</p>
                <div className="w-8 h-[2px] bg-pink-500/50 rounded mt-3 group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 - APLICACIONES REALES (SaaS Premium Showcase) */}
      <section id="aplicaciones" className="pb-16 pt-10 sm:pb-28 sm:pt-16 border-b border-white/[0.06] bg-gradient-to-b from-[#03010b] via-[#050310] to-[#03010a] px-5 sm:px-6 relative overflow-hidden">
        {/* Subtle decorative grid lines and dot pattern to resemble Stripe/Framer premium canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1.2px,transparent_1.2px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[160px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-violet-600/[0.025] rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex text-[11.5px] sm:text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/15 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.06)]">
              SOFTWARE REAL EN PRODUCCIÓN
            </span>
            <h2 className="text-[35px] sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight uppercase">
              Aprende a Crear Productos Web Premium
            </h2>
            <p className="text-zinc-400 text-[16px] sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              No perderás tiempo con plantillas de prueba. Desarrollarás plataformas reales con diseños de primer nivel, adaptables e integrados con su lógica de negocio.
            </p>
          </div>

          <div className="space-y-10">
            
            {/* 1. FLAGSHIP PRODUCT SHOWCASE: PROFIT FITNESS (Premium Launch Page Vibe with Beautiful Neon Emission) */}
            <div className={`group rounded-3xl p-5 sm:p-6 lg:p-10 transition-all duration-350 relative overflow-hidden border ${
              activeApp === 'profit-fitness'
                ? 'border-emerald-500/30 bg-gradient-to-b from-[#030a05] via-neutral-900/60 to-black/95 ring-1 ring-emerald-500/10 shadow-[0_0_80px_rgba(16,185,129,0.08),inset_0_1px_1.5px_rgba(255,255,255,0.04)]'
                : 'border-white/5 bg-gradient-to-b from-neutral-900/15 via-neutral-900/5 to-neutral-950/90 hover:border-emerald-500/25 hover:shadow-[0_0_40px_rgba(16,185,129,0.05)]'
            }`}>
              
              {/* Backlight emerald aura mimicking high tech product launches */}
              <div className="absolute right-0 bottom-0 top-0 w-full lg:w-[60%] bg-emerald-500/[0.05] group-hover:bg-emerald-500/[0.07] rounded-full blur-[150px] transition-all duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center relative z-10">
                
                {/* Left Description Side - Highly focused premium copy (30%) */}
                <div className="lg:col-span-4 space-y-5 sm:space-y-6 text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10.5px] sm:text-[9px] font-mono tracking-widest font-extrabold uppercase bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/25">
                      EL PROYECTO INSIGNIA PEAK
                    </span>
                    {activeApp === 'profit-fitness' && (
                      <span className="flex items-center gap-1.5 text-[10.5px] sm:text-[9px] font-mono text-emerald-400 uppercase font-black bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 select-none animate-pulse">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        Simulado
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[28px] sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight leading-none uppercase">
                      Profit Fitness
                    </h3>
                    <p className="text-zinc-400 text-[14.5px] sm:text-sm font-normal leading-relaxed">
                      Aplicación fitness premium con seguimiento de retos, planes calóricos detallados, medidores de macros e hidratación y progresión inteligente.
                    </p>
                  </div>

                  {/* Visual Tag Badges (Unified premium typography and backgrounds) */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 px-3 py-1 rounded-xl">
                      🏋️ Fitness
                    </span>
                    <span className="text-[10px] font-bold text-zinc-300 bg-neutral-900 border border-white/5 px-3 py-1 rounded-xl">
                      📱 PWA
                    </span>
                    <span className="text-[10px] font-bold text-zinc-300 bg-neutral-900 border border-white/5 px-3 py-1 rounded-xl">
                      ⚡ Gamificación
                    </span>
                    <span className="text-[10px] font-bold text-zinc-300 bg-neutral-900 border border-white/5 px-3 py-1 rounded-xl">
                      🤖 IA
                    </span>
                  </div>

                  {/* Action buttons - Keeping Demo and Simulator but styling more beautifully */}
                  <div className="pt-2 flex flex-wrap gap-2.5">
                    <button
                      onClick={() => {
                        setActiveApp('profit-fitness');
                        document.getElementById('landing-root')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        activeApp === 'profit-fitness'
                          ? 'bg-emerald-500 text-black font-black shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:brightness-110'
                          : 'bg-neutral-900/90 border border-white/5 text-zinc-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>{activeApp === 'profit-fitness' ? 'En Simulador' : 'Simular'}</span>
                    </button>
                    <a
                      href="https://profit-fitness.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                      <span>Abrir Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Large Image Side - Deep product showcase (70%) */}
                <div className="lg:col-span-8 bg-[#030303] p-4 sm:p-6 lg:p-10 rounded-2xl border border-white/10 shadow-inner relative flex items-center justify-center h-[380px] sm:h-[480px] overflow-hidden">
                  {/* Neon emission backglow radiating directly underneath the mockups */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-emerald-500/10 blur-[60px] pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />
                  
                  {/* Floating abstract decorative tags to look premium and tech */}
                  <div className="absolute top-4 left-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest hidden sm:inline-block">
                    [ MODULAR // PRODUCTION V01 ]
                  </div>
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-emerald-400 uppercase bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/30 select-none hidden sm:inline-block animate-pulse">
                    LIVE CONNECTION ESTABLISHED
                  </div>

                  {/* Two detailed, interactive screen mockups for Profit Fitness */}
                  <div className="flex w-full h-full gap-5 sm:gap-10 justify-center items-center">
                    
                    {/* Screen 1 */}
                    <div className="relative flex-1 max-w-[210px] h-[92%] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.1)] transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 select-none">
                      {/* Premium display light glaze */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 pointer-events-none z-10" />
                      <div className="flex-1 overflow-hidden p-2 flex items-center justify-center bg-neutral-950">
                        <img 
                          src="https://lh3.googleusercontent.com/d/16fhhmRuvcDQ17_PnxE2F-cXhPBMlSj7w" 
                          alt="Profit Fitness Home Screen" 
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain rounded-xl shadow-md group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      <div className="py-2.5 bg-[#080808] text-[9.5px] font-mono tracking-widest text-emerald-400 text-center font-bold border-t border-white/5 uppercase select-none shrink-0 truncate px-2 relative">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full inline-block mr-1.5 animate-ping" />
                        Retos & Progreso
                      </div>
                    </div>

                    {/* Screen 2 */}
                    <div className="relative flex-1 max-w-[210px] h-[92%] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.1)] transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 select-none">
                      {/* Premium display light glaze */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 pointer-events-none z-10" />
                      <div className="flex-1 overflow-hidden p-2 flex items-center justify-center bg-neutral-950">
                        <img 
                          src="https://lh3.googleusercontent.com/d/1vuKtpXBjmpVDCCTLvcTFxwmOP8PX42Fg" 
                          alt="Profit Fitness Macros Screen" 
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain rounded-xl shadow-md group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      <div className="py-2.5 bg-[#080808] text-[9.5px] font-mono tracking-widest text-emerald-400 text-center font-bold border-t border-white/5 uppercase select-none shrink-0 truncate px-2 relative">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full inline-block mr-1.5 animate-ping" />
                        Plan de Nutrición
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* 2. SECONDARY APPLICATIONS GRID (Stunning High-End Showcases taking up 70% space) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* CARD: COPA FAMILY 2026 (Refined Violet Showcase) */}
              <div className="group rounded-3xl p-5 sm:p-6 transition-all duration-350 flex flex-col justify-between hover:-translate-y-1.5 border relative overflow-hidden border-white/[0.05] bg-gradient-to-b from-[#0e0a1c]/25 via-neutral-950/85 to-[#03010c] hover:border-violet-500/35 hover:shadow-[0_0_50px_rgba(139,92,246,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)]">
                {/* Violet ambient aura */}
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-violet-500/[0.03] group-hover:bg-violet-500/[0.05] rounded-full blur-[80px] pointer-events-none transition-all duration-300" />
                
                <div className="space-y-6 flex flex-col h-full justify-between relative z-10">
                  {/* Bottom Text Meta Portion */}
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10.5px] sm:text-[9px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-0.5 rounded-full border bg-violet-500/10 border-violet-500/25 text-violet-400">
                        Gestor Deportivo
                      </span>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <h4 className="text-[20px] sm:text-lg font-black text-white tracking-tight group-hover:text-violet-300 transition-colors uppercase leading-none">
                        Copa Family 2026
                      </h4>
                      <p className="text-zinc-400 text-[14.5px] sm:text-sm font-normal leading-relaxed">
                        Sistema para torneos, rankings y gestión de resultados.
                      </p>
                    </div>

                    {/* App Visual Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        ⚽ Torneos
                      </span>
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        📊 Rankings
                      </span>
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        🏆 Resultados
                      </span>
                    </div>
                  </div>

                  {/* Premium Showcase Image directly placed and styled */}
                  <div className="bg-gradient-to-b from-[#0c021c] to-[#040404] p-1.5 rounded-2xl border border-white/5 shadow-inner h-[290px] sm:h-[320px] flex items-center justify-center relative overflow-hidden select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                    
                    {/* Shadow Backing Aura */}
                    <div className="absolute w-36 h-36 bg-violet-500/10 blur-[40px] pointer-events-none" />
                    
                    <img 
                      src="https://lh3.googleusercontent.com/d/1QnAOQtPWLL1Hi6VKdohmTAT_UZGw8b7V" 
                      alt="Copa Family 2026 Premium Showcase" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.03] rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* CARD: MUNDIAL 2026 (Refined Emerald Showcase) */}
              <div className="group rounded-3xl p-5 sm:p-6 transition-all duration-350 flex flex-col justify-between hover:-translate-y-1.5 border relative overflow-hidden border-white/[0.05] bg-gradient-to-b from-[#030d06]/25 via-neutral-950/85 to-[#03010c] hover:border-emerald-500/35 hover:shadow-[0_0_50px_rgba(16,185,129,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)]">
                {/* Emerald ambient aura */}
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-emerald-500/[0.03] group-hover:bg-emerald-500/[0.05] rounded-full blur-[80px] pointer-events-none transition-all duration-300" />
                
                <div className="space-y-6 flex flex-col h-full justify-between relative z-10">
                  {/* Top Text Portion */}
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10.5px] sm:text-[9px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-0.5 rounded-full border bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
                        Gamificación
                      </span>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <h4 className="text-[20px] sm:text-lg font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors uppercase leading-none">
                        Mundial 2026
                      </h4>
                      <p className="text-zinc-400 text-[14.5px] sm:text-sm font-normal leading-relaxed">
                        Aplicación interactiva para seguimiento y control del álbum mundialista.
                      </p>
                    </div>

                    {/* App Visual Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        🌎 Mundial
                      </span>
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        📱 PWA
                      </span>
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        🎮 Gamificación
                      </span>
                    </div>
                  </div>

                  {/* Premium Showcase Image directly placed and styled */}
                  <div className="bg-gradient-to-b from-[#03150a] to-[#040404] p-1.5 rounded-2xl border border-white/5 shadow-inner h-[290px] sm:h-[320px] flex items-center justify-center relative overflow-hidden select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                    
                    {/* Shadow Backing Aura */}
                    <div className="absolute w-36 h-36 bg-emerald-500/10 blur-[40px] pointer-events-none" />
                    
                    <img 
                      src="https://lh3.googleusercontent.com/d/1xsDOzoEBGZOux8VihtVLosyo6jsDz3Jq" 
                      alt="Mundial 2026 Premium Showcase" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.03] rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* CARD: PEQUEÑOS GOURMETS (Refined Violet Showcase) */}
              <div className="group rounded-3xl p-5 sm:p-6 transition-all duration-350 flex flex-col justify-between hover:-translate-y-1.5 border relative overflow-hidden border-white/[0.05] bg-gradient-to-b from-[#0e0a1c]/25 via-neutral-950/85 to-[#03010c] hover:border-violet-500/35 hover:shadow-[0_0_50px_rgba(139,92,246,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)]">
                {/* Violet ambient aura */}
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-violet-500/[0.03] group-hover:bg-violet-500/[0.05] rounded-full blur-[80px] pointer-events-none transition-all duration-300" />
                
                <div className="space-y-6 flex flex-col h-full justify-between relative z-10">
                  {/* Top Text Portion */}
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10.5px] sm:text-[9px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-0.5 rounded-full border bg-violet-500/10 border-violet-500/25 text-violet-400">
                        Nutrición & Crianza
                      </span>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <h4 className="text-[20px] sm:text-lg font-black text-white tracking-tight group-hover:text-violet-300 transition-colors uppercase leading-none">
                        Pequeños Gourmets
                      </h4>
                      <p className="text-zinc-400 text-[14.5px] sm:text-sm font-normal leading-relaxed">
                        Planificador inteligente de alimentación infantil.
                      </p>
                    </div>

                    {/* App Visual Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        👶 Crianza
                      </span>
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        🥗 Nutrición
                      </span>
                      <span className="text-[11.5px] sm:text-[10px] font-bold text-white bg-neutral-950/80 border border-white/5 px-2.5 py-1 rounded-lg">
                        📱 PWA
                      </span>
                    </div>
                  </div>

                  {/* Premium Showcase Image directly placed and styled */}
                  <div className="bg-gradient-to-b from-[#0c021c] to-[#040404] p-1.5 rounded-2xl border border-white/5 shadow-inner h-[290px] sm:h-[320px] flex items-center justify-center relative overflow-hidden select-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                    
                    {/* Shadow Backing Aura */}
                    <div className="absolute w-36 h-36 bg-violet-500/10 blur-[40px] pointer-events-none" />
                    
                    <img 
                      src="https://lh3.googleusercontent.com/d/1LsieTUpKhMnGbxnWw8-wcfWfMaNuOFrM" 
                      alt="Pequeños Gourmets Premium Showcase" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.03] rounded-xl"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div className="p-5 sm:p-8 rounded-3xl bg-neutral-900/25 border border-white/5 text-center max-w-4xl mx-auto space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <span className="relative z-10 text-[11.5px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              ¡No requieres pagar dominios ni servidores sofisticados!
            </span>
            <p className="relative z-10 text-[14.5px] sm:text-sm text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed">
              En el taller en vivo aprenderás a clonar y adaptar estas plantillas modulares a cualquier tipo de negocio. Te llevarás listos el dominio, el certificado de seguridad y la pasarela de pagos simulada o real.
            </p>
          </div>
        </div>
      </section>

      <LibraryShowcase />

      {/* SECCIÓN 3 - EL PROBLEMA & COMPARATIVA */}
      <section id="comparativa" className="py-12 sm:py-24 border-t border-white/[0.06] bg-gradient-to-b from-[#03010b] via-[#05030f] to-[#03010b] px-5 sm:px-6 relative overflow-hidden">
        {/* Decorative Grid matching Framer/Apple feel */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/[0.01] rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-violet-600/[0.05] rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[13.5px] sm:text-xs font-mono font-bold tracking-widest text-red-400 uppercase bg-red-950/25 px-3 py-1 rounded-full border border-red-900/30">
              EL ESCENARIO REAL DEL MERCADO
            </span>
            <h2 className="text-[35px] sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              La mayoría vende exactamente lo mismo
            </h2>
            <p className="text-zinc-450 text-[16px] sm:text-base font-light">
              La era de los infoproductos aburridos y estáticos se está terminando. Los clientes modernos ignoran los archivos PDF gigantes y prefieren experiencias interactivas ágiles.
            </p>
          </div>

          {/* Side by side comparison layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* Left Box: Muted Unproductive traditional offer */}
            <div className="bg-[#0c0a15]/30 border border-white/[0.05] rounded-3xl p-5 sm:p-8 space-y-6 relative overflow-hidden group shadow-2xl backdrop-blur-md">
              <div className="space-y-3">
                <span className="text-[10.5px] sm:text-[9px] font-mono text-zinc-500 uppercase font-black bg-neutral-900 px-2.5 py-0.5 rounded border border-white/5">
                  La oferta aburrida (Bajo valor estático)
                </span>
                <h4 className="text-[20px] sm:text-lg font-bold text-zinc-400 transition-colors group-hover:text-zinc-300 font-display">Contenido en PDF y videos estáticos</h4>
                <p className="text-[14.5px] sm:text-xs text-zinc-500 font-light leading-relaxed">
                  Contiene información valiosa, pero al requerir tanto esfuerzo del usuario para implementarse, produce baja retención y es muy difícil de comercializar por más de $15 USD.
                </p>
              </div>

              <div className="space-y-3.5 border-t border-white/5 pt-6">
                {PROBLEM_COMPARISON.left.items.map((item, id) => (
                  <div key={id} className="flex items-start gap-3 text-[14px] sm:text-xs text-zinc-500">
                    <span className="text-rose-500 mt-0.5 shrink-0 block">✕</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Premium Interactive glowing workshop proposal */}
            <div className="bg-gradient-to-br from-[#0c0520]/80 to-[#04020a]/95 border border-violet-500/40 rounded-3xl p-5 sm:p-8 space-y-6 relative overflow-hidden group shadow-[0_0_80px_rgba(139,92,246,0.12),inset_0_1px_1.5px_rgba(255,255,255,0.04)] backdrop-blur-md">
              {/* Corner ambient violet glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-violet-600/20 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-500/5 opacity-50 pointer-events-none" />

              <div className="space-y-3">
                <span className="text-[10.5px] sm:text-[9px] font-mono text-violet-300 uppercase font-black bg-violet-500/10 px-2.5 py-0.5 rounded border border-violet-500/25 inline-flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> la oferta premium (Valor percibido 10X)
                </span>
                <h4 className="text-[20px] sm:text-lg font-bold text-white transition-colors group-hover:text-violet-300 font-display">Combinación: Infoproducto + Aplicación Interactiva</h4>
                <p className="text-[14.5px] sm:text-xs text-zinc-400 font-light leading-relaxed">
                  Ofreces la información junto con una herramienta interactiva personalizada que calcula, traza y planifica en su móvil. Sus retornos son inmediatos y puedes cobrar recurrencias mensuales.
                </p>
              </div>

              <div className="space-y-3.5 border-t border-white/5 pt-6 relative z-10">
                {PROBLEM_COMPARISON.right.items.map((item, id) => (
                  <div key={id} className="flex items-start gap-3 text-[14px] sm:text-xs text-zinc-200 font-medium font-sans">
                    <span className="text-emerald-400 mt-0.5 shrink-0 block">✔</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="text-center pt-8 max-w-3xl mx-auto">
            <p className="text-[21px] sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-350 to-emerald-350 tracking-tight">
              "Las aplicaciones permiten diferenciar cualquier producto digital."
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4 - LO QUE APRENDERÁS */}
      <section id="contenido" className="py-12 sm:py-24 border-t border-white/[0.06] bg-gradient-to-b from-[#03010b] via-[#04020a] to-[#03010b] px-5 sm:px-6 relative overflow-hidden">
        {/* Subtle grid of Section 4 */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-violet-600/[0.02] rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[13.5px] sm:text-xs font-mono font-bold tracking-widest text-[#10b981] uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              TEMARIO PRÁCTICO DETALLADO
            </span>
            <h2 className="text-[35px] sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Lo que podrás hacer después del taller
            </h2>
            <p className="text-zinc-400 text-[16px] sm:text-base font-light">
              Dividido en fases incrementales para asegurar que pases de la idea abstracta a tu pasarela de pagos funcionando de la forma más rápida y amena posible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_YOU_WILL_LEARN.map((item) => (
              <div 
                key={item.number}
                className="bg-white/[0.015] border border-white/[0.05] p-5 sm:p-6 rounded-3xl transition-all duration-300 hover:border-emerald-500/35 hover:bg-white/[0.035] hover:shadow-[0_0_50px_rgba(16,185,129,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)] relative group backdrop-blur-md"
              >
                {/* Float line indicators like Framer layout */}
                <div className="absolute top-4 right-4 text-xs font-mono font-bold text-neutral-700 transition-colors group-hover:text-emerald-400">
                  {item.number}
                </div>

                <div className="space-y-3">
                  <h4 className="text-[18px] sm:text-base font-bold text-white tracking-tight group-hover:text-emerald-300 transition-all font-display">
                    {item.title}
                  </h4>
                  <p className="text-zinc-400 text-[14px] sm:text-xs leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4 select-none">
            <PremiumCTAButton 
              size="lg"
              className="w-full max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 - CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-12 sm:py-24 border-t border-white/[0.06] bg-gradient-to-b from-[#03010b] via-[#05030f] to-[#03010a] px-5 sm:px-6 relative overflow-hidden">
        {/* Subtle grid of Section 5 */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/[0.025] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
        
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[13.5px] sm:text-xs font-mono font-bold tracking-widest text-[#10b981] uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              EL SISTEMA DE 4 PASOS
            </span>
            <h2 className="text-[35px] sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              ¿Cómo funciona el proceso?
            </h2>
            <p className="text-zinc-400 text-[16px] sm:text-base font-light">
              Desde el concepto básico en tu mente hasta el depósito de las primeras ventas de forma 100% automatizada.
            </p>
          </div>

          {/* Connection line progress design layout */}
          <div className="relative max-w-4xl mx-auto">
            {/* Horizontal glowing line for desktop */}
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500 via-indigo-600/30 to-[#10b981] opacity-60 -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10 text-center">
              {[
                { step: 'Paso 1', title: 'Idea', icon: '💡', desc: 'Conceptualizamos el micro-producto y seleccionamos tu nicho altamente monetizable.' },
                { step: 'Paso 2', title: 'Construcción', icon: '🛠️', desc: 'Conectamos la lógica No-Code y armamos el estimador interactivo con la IA.' },
                { step: 'Paso 3', title: 'Publicación', icon: '🚀', desc: 'Lanzamos la web de forma internacional con subdominio seguro gratuito.' },
                { step: 'Paso 4', title: 'Ventas', icon: '💳', desc: 'Integramos la pasarela y encendemos las campañas automáticas de bajo presupuesto.' }
              ].map((p, idx) => (
                <div key={idx} className="space-y-4 group">
                  {/* Circle number */}
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#0a0815] border border-white/[0.07] text-lg flex items-center justify-center font-display font-bold shadow-lg shadow-violet-500/5 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 text-white relative">
                    <span>{p.icon}</span>
                    <span className="absolute -bottom-2 text-[8px] font-mono tracking-widest uppercase bg-neutral-950 px-1.5 py-0.5 rounded text-zinc-400 border border-white/[0.08]">
                      {p.step}
                    </span>
                  </div>

                  <div className="space-y-1.5 px-4">
                    <h4 className="text-[18px] sm:text-base font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">{p.title}</h4>
                    <p className="text-zinc-400 text-[14px] sm:text-xs leading-relaxed font-light">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6 - QUÉ INCLUYE */}
      <section className="py-12 sm:py-24 border-t border-white/[0.06] bg-gradient-to-b from-[#03010b] via-[#04020a] to-[#03010b] px-5 sm:px-6 relative overflow-hidden">
        {/* Subtle grid of Section 6 */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-violet-600/[0.035] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[13.5px] sm:text-xs font-mono font-bold tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
              VALOR AGREGADO COMPLETO
            </span>
            <h2 className="text-[35px] sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              ¿Qué obtienes exactamente al inscribirte?
            </h2>
            <p className="text-zinc-400 text-[16px] sm:text-base font-light leading-relaxed">
              No dejes nada al azar. Además del aula en directo, tendrás todos los recursos complementarios necesarios para ejecutar tu idea sin retrasos de ningún tipo.
            </p>

            <div className="pt-2 select-none">
              <PremiumCTAButton 
                size="md"
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {[
              { title: 'Acceso completo al taller en vivo', desc: 'Entrenamiento en directo paso a paso con opción de hacer preguntas en vivo.' },
              { title: 'Grabaciones divididas con acceso garantizado para siempre', desc: 'Visualiza las clases desde cualquier dispositivo a tu propio ritmo cuantas veces quieras.' },
              { title: 'Base de datos y plantillas de las 4 aplicaciones', desc: 'No empieces en blanco. Clona directo en tu cuenta las apps mostradas aquí.' },
              { title: 'Video-guías y material complementario en PDF', desc: 'Láminas, diagramas lógicos, prompts de redacción para Meta Ads y creativos de IA.' },
              { title: 'Grupo privado de soporte durante 15 días', desc: 'Resuelve dudas técnicas o de venta directamente con el mentor del curso.' }
            ].map((inc, i) => (
              <div 
                key={i} 
                className="bg-white/[0.015] border border-white/[0.05] p-4 sm:p-5 rounded-2xl flex items-start gap-4 transition-all duration-300 hover:border-violet-500/35 hover:bg-white/[0.035] hover:shadow-[0_0_40px_rgba(139,92,246,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)] backdrop-blur-md"
              >
                <div className="w-5 h-5 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="text-[15.5px] sm:text-sm font-semibold text-white tracking-tight font-display">{inc.title}</h4>
                  <p className="text-zinc-400 text-[14px] sm:text-xs leading-relaxed font-light">{inc.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECCIÓN 7 - PREGUNTAS FRECUENTES (FAQ Accordion) */}
      <section id="faqs" className="py-12 sm:py-24 border-t border-white/[0.06] bg-gradient-to-b from-[#03010b] via-[#05030f] to-[#03010a] px-5 sm:px-6 relative overflow-hidden">
        {/* Subtle grid of Section 7 */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[145px] pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[13.5px] sm:text-xs font-mono font-bold tracking-widest text-[#a855f7] uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              DESPEJA CUALQUIER DUDA
            </span>
            <h2 className="text-[35px] sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Preguntas frecuentes
            </h2>
            <p className="text-zinc-400 text-[14px] sm:text-sm font-light">
              Respondemos con total transparencia a las interrogantes más comunes sobre nuestro entrenamiento.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white/[0.01] ${isOpen ? 'border-purple-500/35 shadow-[0_0_25px_rgba(168,85,247,0.07)]' : 'border-white/[0.04]'}`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 flex justify-between items-center text-left hover:bg-white/[0.02] transition-all cursor-pointer"
                  >
                    <span className="text-[15.5px] sm:text-sm font-bold text-white pr-4 font-display">
                      {faq.question}
                    </span>
                    <span className={`p-1 rounded-lg bg-neutral-950 border border-white/5 text-zinc-450 transition-transform ${isOpen ? 'rotate-180 text-purple-400 border-purple-500/30' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-6 pt-0 text-[14.5px] sm:text-xs text-zinc-400 leading-relaxed font-light border-t border-neutral-900/80">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center p-6 bg-[#0a0816]/40 border border-dashed border-purple-550/25 rounded-3xl max-w-2xl mx-auto space-y-2 backdrop-blur-md">
            <p className="text-[13.5px] sm:text-xs text-zinc-400 font-medium">¿Tienes otra consulta específica o requieres asistencia de pago local?</p>
            <p className="text-[13.5px] sm:text-xs text-zinc-500 font-mono">Contáctanos vía correo privado: <span className="text-white hover:underline cursor-pointer">turbochat25@gmail.com</span></p>
          </div>
        </div>
      </section>

      {/* SECCIÓN NUEVA: ¿QUÉ TENDRÁS AL TERMINAR EL TALLER? */}
      <section className="py-12 sm:py-24 border-t border-white/[0.06] bg-gradient-to-b from-[#03010b] via-[#04020a] to-[#03010b] px-5 sm:px-6 relative overflow-hidden">
        {/* Subtle decorative grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1.2px,transparent_1.2px)] [background-size:22px_22px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-violet-500/[0.03] rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11.5px] sm:text-xs font-mono tracking-widest text-violet-400 font-extrabold uppercase bg-violet-400/10 border border-violet-400/20 px-3 py-1 rounded-full">
              Resultados Prácticos y Reales
            </span>
            <h2 className="text-[35px] sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              ¿Qué tendrás al terminar el taller?
            </h2>
            <p className="text-zinc-400 text-[16px] sm:text-base font-light leading-relaxed">
              No dejes nada al azar. Además del aula en directo, tendrás todos los recursos complementarios necesarios para ejecutar tu idea sin retrasos de ningún tipo.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="group bg-white/[0.015] border border-white/[0.05] p-5 sm:p-8 rounded-3xl relative transition-all duration-300 hover:border-violet-500/35 hover:bg-white/[0.035] hover:shadow-[0_0_30px_rgba(139,92,246,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-violet-500/0 via-violet-500/40 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] sm:text-lg font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors font-display">
                  Aplicación funcional
                </h3>
                <p className="text-zinc-400 text-[14px] sm:text-sm leading-relaxed font-light">
                  Tendrás una aplicación completamente operativa creada por ti orientada a tu objetivo.
                </p>
                {/* Visual miniature capture showcase complete and readable */}
                <div className="relative mt-4 h-32 bg-neutral-950 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center p-2 gap-2 select-none">
                  <img src="https://lh3.googleusercontent.com/d/16fhhmRuvcDQ17_PnxE2F-cXhPBMlSj7w" alt="App functional screen 1" referrerPolicy="no-referrer" className="h-full rounded-md object-contain border border-white/10" />
                  <img src="https://lh3.googleusercontent.com/d/1yplMXtT1_cZqROm77Y6ikI8tD3PVaSdg" alt="App functional screen 2" referrerPolicy="no-referrer" className="h-full rounded-md object-contain border border-white/10" />
                  <img src="https://lh3.googleusercontent.com/d/1ouzullH3Ww5_ds7Z-8n3E1XIEMBc4xdd" alt="App functional screen 3" referrerPolicy="no-referrer" className="h-full rounded-md object-contain border border-white/10" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/[0.015] border border-white/[0.05] p-5 sm:p-8 rounded-3xl relative transition-all duration-300 hover:border-emerald-500/35 hover:bg-white/[0.035] hover:shadow-[0_0_30px_rgba(16,185,129,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] sm:text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors font-display">
                  Publicada en internet
                </h3>
                <p className="text-zinc-400 text-[14px] sm:text-sm leading-relaxed font-light">
                  Tu aplicación quedará accesible desde cualquier dispositivo con un enlace web público.
                </p>
                {/* Visual browser mockup displaying real App with custom route */}
                <div className="relative mt-4 h-32 bg-[#0c0c0c] rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-start select-none">
                  <div className="bg-neutral-900 border-b border-white/5 px-2 py-1.5 flex items-center gap-1 select-none shrink-0 w-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                    <div className="bg-black/30 text-[7px] text-zinc-500 px-2 py-0.2 rounded border border-white/5 font-mono truncate w-[130px] text-left select-none">
                      profitfitness.vercel.app
                    </div>
                  </div>
                  <div className="flex-1 w-full flex items-start justify-center p-1 overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/d/1vuKtpXBjmpVDCCTLvcTFxwmOP8PX42Fg" alt="Active published app" referrerPolicy="no-referrer" className="w-[110px] rounded border border-white/10 shadow-lg object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/[0.015] border border-white/[0.05] p-5 sm:p-8 rounded-3xl relative transition-all duration-300 hover:border-violet-500/35 hover:bg-white/[0.035] hover:shadow-[0_0_30px_rgba(139,92,246,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-violet-500/0 via-violet-500/40 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] sm:text-lg font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors font-display">
                  Lista para vender
                </h3>
                <p className="text-zinc-400 text-[14px] sm:text-sm leading-relaxed font-light">
                  Podrás utilizarla para complementar tus infoproductos o monetizarla directamente.
                </p>
                {/* Micro monetization box showing premium value metrics */}
                <div className="relative mt-4 h-32 bg-neutral-950 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-center items-center p-3 select-none text-center">
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/25 rounded text-[7px] font-mono font-bold text-emerald-400">
                    SUSCRIPCIÓN ACTIVA
                  </div>
                  <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">Mundial 2026 Pro</p>
                  <p className="text-lg font-black font-display text-white tracking-tight leading-none mb-2">USD 14.99<span className="text-[10px] text-zinc-500 font-light"> / mes</span></p>
                  <div className="w-full h-8 flex items-center justify-center p-1 overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/d/1USC36e4Z3Q69Moxv8c-fr0nZQ1U5IaAd" alt="Selling model layout" referrerPolicy="no-referrer" className="h-full rounded border border-white/5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white/[0.015] border border-white/[0.05] p-5 sm:p-8 rounded-3xl relative transition-all duration-300 hover:border-emerald-500/35 hover:bg-white/[0.035] hover:shadow-[0_0_30px_rgba(16,185,129,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] sm:text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors font-display">
                  Sin programar
                </h3>
                <p className="text-zinc-400 text-[14px] sm:text-sm leading-relaxed font-light">
                  Aprenderás utilizando herramientas modernas sin necesidad de conocimientos técnicos avanzados.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group bg-white/[0.015] border border-white/[0.05] p-5 sm:p-8 rounded-3xl relative transition-all duration-300 hover:border-violet-500/35 hover:bg-white/[0.035] hover:shadow-[0_0_30px_rgba(139,92,246,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-violet-500/0 via-violet-500/40 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] sm:text-lg font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors font-display">
                  Sin contratar desarrolladores
                </h3>
                <p className="text-zinc-400 text-[14px] sm:text-sm leading-relaxed font-light">
                  No dependerás de terceros para crear o modificar tus proyectos.
                </p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="group bg-white/[0.015] border border-white/[0.05] p-5 sm:p-8 rounded-3xl relative transition-all duration-300 hover:border-emerald-500/35 hover:bg-white/[0.035] hover:shadow-[0_0_30px_rgba(16,185,129,0.08),inset_0_1px_1px_rgba(255,255,255,0.02)] overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-[20px] sm:text-lg font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors font-display">
                  Proceso replicable
                </h3>
                <p className="text-zinc-400 text-[14px] sm:text-sm leading-relaxed font-light">
                  Podrás aplicar el mismo sistema para crear aplicaciones en distintos nichos y mercados.
                </p>
              </div>
            </div>

          </div>

          {/* Highlighted Quote */}
          <div className="pt-8 text-center max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-neutral-900/30 via-violet-950/20 to-neutral-900/30 p-5 sm:p-10 rounded-3xl border border-violet-500/10 shadow-lg relative overflow-hidden group">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-violet-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              
              <p className="text-[21px] sm:text-[22px] md:text-2xl font-semibold tracking-tight text-white leading-relaxed text-balance">
                "Tu objetivo no será aprender tecnología. Tu objetivo será terminar con una aplicación real publicada y lista para generar valor."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN 8 - OFERTA FINAL & FOOTER */}
      <section className="py-12 sm:py-24 border-t border-white/[0.06] bg-gradient-to-b from-[#03010b] via-[#05030f] to-[#010005] px-5 sm:px-6 relative text-center overflow-hidden">
        {/* Subtle grid of Section 8 */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Glow behind final CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/[0.12] rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 relative z-10">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-extrabold uppercase">
              <Gift className="w-3.5 h-3.5 text-violet-400" /> ¡GARANTÍA DE COMPRA SIN RIESGOS!
            </div>
            <h2 className="text-[35px] sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Comienza a crear aplicaciones web con IA
            </h2>
            <p className="text-zinc-400 text-[16.5px] sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Únete a las decenas de alumnos que ya están transformando su manera de ofrecer valor y cobrando recurrentemente por su propia tecnología No-Code.
            </p>
          </div>

          {/* Pricing Box Wrap */}
          <div className="relative bg-gradient-to-tr from-[#0a0618]/98 via-[#0e0a24]/98 to-[#160f38]/98 p-6 sm:p-10 rounded-3xl border border-white/[0.12] max-w-lg mx-auto space-y-8 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(139,92,246,0.2),0_0_20px_rgba(16,185,129,0.15),inset_0_1px_2.5px_rgba(255,255,255,0.12)] backdrop-blur-xl overflow-hidden group hover:border-[#10b981]/30 transition-all duration-300">
            
            {/* Dynamic decorative line spotlights */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#10b981] to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent" />
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider">
                🔥 PRECIO DE LANZAMIENTO
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Taller Crea y Vende Apps con IA
              </h3>
            </div>

            {/* Massive pricing block */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-5 sm:p-6 text-center space-y-2 relative z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
              <div className="text-xs sm:text-sm text-zinc-500 line-through font-mono tracking-widest uppercase">
                ANTES: $199.00 USD
              </div>
              <div className="space-y-1">
                <div className="text-[44px] xs:text-[48px] sm:text-5xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-450 via-[#10b981] to-emerald-300 tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                  $24.99 USD
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block tracking-wider uppercase font-medium">
                  Abono único · Acceso oficial inmediato
                </span>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-3 text-left pt-2">
              {[
                'Taller en vivo (Fase práctica directa)',
                'Grabaciones de por vida en HD',
                'Plantillas y base de datos de las 4 aplicaciones',
                'Canal de soporte privado por 15 días tras el taller'
              ].map((ch, id) => (
                <div key={id} className="flex items-center gap-2.5 text-[14px] sm:text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{ch}</span>
                </div>
              ))}
            </div>

            <div className="select-none pt-2 relative z-10">
              <PremiumCTAButton 
                size="lg"
                className="w-full"
              />
            </div>

            <p className="text-[10px] text-zinc-500 leading-normal">
              * Compra totalmente segura. Si en los primeros 15 días posteriores al taller decides que no es para ti, te reembolsamos el 100% de tu dinero de manera automática.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors cursor-pointer">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Registro seguro cifrado
            </span>
            <span className="flex items-center gap-1.5 hover:text-zinc-400 transition-colors cursor-pointer">
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400/20" /> 4.9/5 Calificación General
            </span>
          </div>

        </div>

        {/* Footer legal credits */}
        <footer className="mt-24 pt-8 border-t border-neutral-900/60 text-zinc-600 text-[11px] font-mono flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
          <p>© 2026 CREA Y VENDE APPS CON IA. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#landing-root" className="hover:text-zinc-450 transition-colors">Volver arriba</a>
            <span className="text-neutral-800">|</span>
            <span className="text-zinc-500">Inspirado en los mejores estándares SaaS modernos</span>
          </div>
        </footer>
      </section>

      {/* Booking Checkout Modal (Controlled State) */}
      <AnimatePresence>
        {isModalOpen && (
          <ReservarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sticky Bottom Mobile CTA */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-white/10 p-3 pb-safe flex items-center justify-center shadow-[0_-15px_35px_rgba(0,0,0,0.95)]"
          >
            {/* Elegant glowing indicator line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#10b981] via-[#818cf8] to-transparent" />
            
            <a 
              href="https://app.takenos.com/pay/99e824aa-9cfd-431c-b043-3c6a0365c112"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 rounded-xl font-display font-black text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#10b981] via-[#5bef9b] via-[#818cf8] to-[#8b5cf6] border border-white/30 shadow-[0_0_20px_rgba(16,185,129,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.4)] active:scale-95 duration-100 transition-all flex items-center justify-center gap-2"
            >
              <span>$24.99 USD · INSCRIBIRME AHORA</span>
              <Rocket className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
