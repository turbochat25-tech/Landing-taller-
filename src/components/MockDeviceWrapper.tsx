import React, { useState } from 'react';
import { Wifi, Battery, Sparkles, Smartphone, ArrowRight, Layers } from 'lucide-react';
import ProfitFitnessDemo from './ProfitFitnessDemo';
import CopaFamily2026Demo from './CopaFamily2026Demo';
import Mundial2026Demo from './Mundial2026Demo';
import PequenosGourmetsDemo from './PequenosGourmetsDemo';

// High-fidelity capture imports for premium visual quality (as fallbacks)
import profitFitnessImg from '../assets/images/profit_fitness_mockup_1781845539931.jpg';
import copaFamilyImg from '../assets/images/copa_family_mockup_1781845556192.jpg';
import mundialImg from '../assets/images/mundial_2026_mockup_1781845570310.jpg';
import pequenosGourmetsImg from '../assets/images/pequenos_gourmets_mockup_1781845579894.jpg';

// Live High-Fidelity Capture URLs provided by the user (Google Drive raw direct URLs)
const REAL_CAPTURES: Record<string, { screen1: string; screen2: string; label1: string; label2: string }> = {
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
    label1: 'Planificador Semanal',
    label2: 'Menú Inteligente'
  }
};

interface Props {
  activeAppId: string;
  defaultViewMode?: 'screenshot' | 'interactive';
}

export default function MockDeviceWrapper({ activeAppId, defaultViewMode = 'screenshot' }: Props) {
  // Local state to toggle between premium screenshot and interactive React simulator
  const [viewMode, setViewMode] = useState<'screenshot' | 'interactive'>(defaultViewMode);
  const [activeScreenTab, setActiveScreenTab] = useState<'screen1' | 'screen2'>('screen1');

  // Reset to defaultViewMode when activeAppId changes so Hero stays alive
  React.useEffect(() => {
    setViewMode(defaultViewMode);
  }, [activeAppId, defaultViewMode]);

  // Select active simulator component
  const renderSimulator = () => {
    switch (activeAppId) {
      case 'profit-fitness':
        return <ProfitFitnessDemo />;
      case 'copor-family-2026':
      case 'copa-family-2026':
        return <CopaFamily2026Demo />;
      case 'mundial-2026':
        return <Mundial2026Demo />;
      case 'pequenos-gourmets':
        return <PequenosGourmetsDemo />;
      default:
        return <ProfitFitnessDemo />;
    }
  };

  // Select active capture image
  const getAppScreenshot = () => {
    const caps = REAL_CAPTURES[activeAppId];
    if (caps) {
      return activeScreenTab === 'screen1' ? caps.screen1 : caps.screen2;
    }
    
    // Fallbacks to local files if key doesn't match
    switch (activeAppId) {
      case 'profit-fitness':
        return profitFitnessImg;
      case 'copa-family-2026':
        return copaFamilyImg;
      case 'mundial-2026':
        return mundialImg;
      case 'pequenos-gourmets':
        return pequenosGourmetsImg;
      default:
        return profitFitnessImg;
    }
  };

  const getGlowColor = () => {
    switch (activeAppId) {
      case 'profit-fitness':
        return 'rgba(16, 185, 129, 0.25)';
      case 'copa-family-2026':
        return 'rgba(59, 130, 246, 0.25)';
      case 'mundial-2026':
        return 'rgba(245, 158, 11, 0.25)';
      case 'pequenos-gourmets':
        return 'rgba(236, 72, 153, 0.25)';
      default:
        return 'rgba(16, 185, 129, 0.25)';
    }
  };

  const currentAppCaps = REAL_CAPTURES[activeAppId] || { label1: 'Pantalla 1', label2: 'Pantalla 2' };

  return (
    <div className="relative mx-auto max-w-[340px] w-full transition-all duration-500">
      {/* Outer ambient glow reflecting the app's aesthetic */}
      <div 
        className="absolute inset-0 rounded-[48px] blur-[60px] opacity-70 transition-all duration-700 -z-10"
        style={{ backgroundColor: getGlowColor() }}
      />

      {/* Segmented Controller: Interactive vs Real Capture */}
      <div className="flex items-center justify-between p-1 bg-neutral-950/80 border border-white/5 rounded-full mb-4 max-w-[300px] mx-auto relative z-20 shadow-xl backdrop-blur-md">
        <button
          onClick={() => setViewMode('screenshot')}
          className={`flex-1 py-1.5 px-3.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            viewMode === 'screenshot'
              ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Captura Real</span>
        </button>
        <button
          onClick={() => setViewMode('interactive')}
          className={`flex-1 py-1.5 px-3.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            viewMode === 'interactive'
              ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulador</span>
        </button>
      </div>

      {/* Decorative physical buttons on mock phone boundary */}
      <div className="absolute top-[140px] -left-1 w-[3px] h-[40px] bg-neutral-800 rounded-r-sm" />
      <div className="absolute top-[190px] -left-1 w-[3px] h-[55px] bg-neutral-800 rounded-r-sm" />
      <div className="absolute top-[255px] -left-1 w-[3px] h-[55px] bg-neutral-800 rounded-r-sm" />
      <div className="absolute top-[155px] -right-1 w-[3px] h-[65px] bg-neutral-800 rounded-l-sm" />

      {/* Main device frame */}
      <div className="bg-neutral-900 border-[10px] border-neutral-950 rounded-[46px] shadow-2xl overflow-hidden relative border-solid ring-1 ring-white/10">
        
        {/* Dynamic Notch / Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-black h-5 w-28 rounded-full z-20 flex items-center justify-center">
          {/* Mock Camera lens reflection */}
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 absolute left-3 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-900/40" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 absolute right-6" />
        </div>

        {/* Top iOS Info Bar */}
        <div className="h-9 bg-transparent relative z-10 flex items-center justify-between px-6 text-[10px] font-medium text-white/80 select-none">
          <span className="font-mono">10:49</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-white/90" />
            <span className="text-[8px] font-mono tracking-tight text-white/70">5G</span>
            <Battery className="w-4 h-3 text-white/90" />
          </div>
        </div>

        {/* Simulated Web View App Sandbox */}
        <div className="relative h-[560px] bg-neutral-950 overflow-y-auto scrollbar-thin">
          {viewMode === 'screenshot' ? (
            <div className="w-full h-full relative overflow-hidden flex flex-col justify-start">
              {/* Internal Mini-Screen Selector for multiple captures */}
              <div className="absolute top-2 inset-x-2 z-30 flex gap-1 p-0.5 bg-neutral-950/85 backdrop-blur-md rounded-lg border border-white/5 shadow-lg">
                <button
                  onClick={() => setActiveScreenTab('screen1')}
                  className={`flex-1 py-1 px-1.5 rounded-md text-[9px] font-bold transition-all cursor-pointer truncate ${
                    activeScreenTab === 'screen1'
                      ? 'bg-neutral-800 text-white border border-white/10 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {currentAppCaps.label1}
                </button>
                <button
                  onClick={() => setActiveScreenTab('screen2')}
                  className={`flex-1 py-1 px-1.5 rounded-md text-[9px] font-bold transition-all cursor-pointer truncate ${
                    activeScreenTab === 'screen2'
                      ? 'bg-neutral-800 text-white border border-white/10 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {currentAppCaps.label2}
                </button>
              </div>

              {/* Display capture complete and readable */}
              <div className="w-full h-full pt-10 overflow-y-auto">
                <img 
                  src={getAppScreenshot()} 
                  alt="High-fidelity capture of App"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain object-top min-h-full transition-all duration-350 animate-in fade-in"
                  key={`${activeAppId}-${activeScreenTab}`}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full select-none">
              {renderSimulator()}
            </div>
          )}
        </div>

        {/* Simulated iOS Home Indicator/Swipe Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-white/40 h-1 w-28 rounded-full z-20" />
      </div>

      {/* Prompt overlay helper indicating interaction */}
      <div className="mt-4 text-center">
        <p className="text-[11px] font-mono text-slate-400 bg-neutral-900/80 backdrop-blur-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping inline-block" />
          <span>
            {viewMode === 'screenshot' 
              ? `Captura Real: ${activeScreenTab === 'screen1' ? currentAppCaps.label1 : currentAppCaps.label2}` 
              : 'Interactúa con el simulador real'}
          </span>
        </p>
      </div>
    </div>
  );
}
