import React, { useState } from 'react';
import { HelpCircle, Star, Sparkles, Swords, RefreshCw, Trophy, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Mundial2026Demo() {
  const [qf1, setQf1] = useState<string | null>(null); // Argentina vs France
  const [qf2, setQf2] = useState<string | null>(null); // USA vs Spain
  const [sf1, setSf1] = useState<string | null>(null); // Winner 1 vs Winner 2
  const [champion, setChampion] = useState<string | null>(null);

  const resetPredictions = () => {
    setQf1(null);
    setQf2(null);
    setSf1(null);
    setChampion(null);
  };

  const handleSelectQf1 = (team: string) => {
    setQf1(team);
    setSf1(null);
    setChampion(null);
  };

  const handleSelectQf2 = (team: string) => {
    setQf2(team);
    setSf1(null);
    setChampion(null);
  };

  const handleSelectSf1 = (team: string) => {
    setSf1(team);
    setChampion(null);
  };

  const handleSelectChampion = (team: string) => {
    setChampion(team);
  };

  return (
    <div className="bg-[#1c0d02] text-white rounded-t-[32px] rounded-b-[40px] h-[580px] flex flex-col overflow-y-auto overflow-x-hidden font-sans select-none border border-amber-500/20">
      {/* Top Mobile Bar */}
      <div className="sticky top-0 bg-[#1c0d02]/95 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-amber-500/10 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-black">
            <Trophy className="w-4 h-4 text-black font-extrabold" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-tight">Simulador Mundial 2026</h4>
            <p className="text-[10px] text-amber-400 font-mono tracking-wider">MODO PRONÓSTICO (PRODE)</p>
          </div>
        </div>
        <button 
          onClick={resetPredictions}
          className="text-[9px] font-mono text-amber-400 hover:text-amber-200 border border-amber-500/25 px-2 py-0.5 rounded bg-amber-500/5 cursor-pointer uppercase flex items-center gap-1"
        >
          <RefreshCw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {/* Intro */}
        <div className="text-center space-y-1">
          <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-mono font-bold uppercase border border-amber-500/20">
            Fase de Eliminatorias
          </span>
          <h5 className="text-xs text-slate-300 font-light mt-1">Completa tu pronóstico seleccionando al ganador de cada llave</h5>
        </div>

        {/* Phase 1: Quarter Finals (Simulated) */}
        <div className="space-y-4">
          <div className="text-left text-[10px] font-mono text-amber-500 tracking-wider uppercase font-bold border-b border-amber-500/10 pb-1">
            1. Cuartos de Final
          </div>

          <div className="space-y-3">
            {/* Match 1 */}
            <div className="bg-[#2d1808]/70 p-3 rounded-xl border border-white/5 space-y-2">
              <div className="text-[9px] text-slate-400 font-mono text-center flex items-center justify-center gap-1">
                <Swords className="w-2.5 h-2.5" /> LLAVE A
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectQf1('Argentina 🇦🇷')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    qf1 === 'Argentina 🇦🇷'
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'border-white/5 bg-[#1c0d02] text-slate-200 hover:bg-[#2d1808]'
                  }`}
                >
                  <p className="text-xs">Argentina 🇦🇷</p>
                </button>
                <button
                  onClick={() => handleSelectQf1('Francia 🇫🇷')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    qf1 === 'Francia 🇫🇷'
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'border-white/5 bg-[#1c0d02] text-slate-200 hover:bg-[#2d1808]'
                  }`}
                >
                  <p className="text-xs">Francia 🇫🇷</p>
                </button>
              </div>
            </div>

            {/* Match 2 */}
            <div className="bg-[#2d1808]/70 p-3 rounded-xl border border-white/5 space-y-2">
              <div className="text-[9px] text-slate-400 font-mono text-center flex items-center justify-center gap-1">
                <Swords className="w-2.5 h-2.5" /> LLAVE B
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectQf2('EEUU 🇺🇸')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    qf2 === 'EEUU 🇺🇸'
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'border-white/5 bg-[#1c0d02] text-slate-200 hover:bg-[#2d1808]'
                  }`}
                >
                  <p className="text-xs">EE.UU. 🇺🇸</p>
                </button>
                <button
                  onClick={() => handleSelectQf2('España 🇪🇸')}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    qf2 === 'España 🇪🇸'
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'border-white/5 bg-[#1c0d02] text-slate-200 hover:bg-[#2d1808]'
                  }`}
                >
                  <p className="text-xs">España 🇪🇸</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2: Semi Finals */}
        <AnimatePresence>
          {qf1 && qf2 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-3"
            >
              <div className="text-left text-[10px] font-mono text-amber-500 tracking-wider uppercase font-bold border-b border-amber-500/10 pb-1">
                2. Semifinal
              </div>

              <div className="bg-[#2d1808]/70 p-3 rounded-xl border border-amber-500/15 text-center space-y-2">
                <p className="text-[9px] text-slate-400 font-mono text-center">EL GANADOR VA A LA GRAN FINAL</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelectSf1(qf1)}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      sf1 === qf1
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'border-white/5 bg-[#1c0d02] text-slate-200'
                    }`}
                  >
                    <p className="text-xs">{qf1}</p>
                  </button>
                  <button
                    onClick={() => handleSelectSf1(qf2)}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      sf1 === qf2
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'border-white/5 bg-[#1c0d02] text-slate-200'
                    }`}
                  >
                    <p className="text-xs">{qf2}</p>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: Choose Champion */}
        <AnimatePresence>
          {sf1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-4 text-black text-center relative overflow-hidden"
            >
              {/* Confetti effect or glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300/30 via-transparent to-transparent opacity-80" />
              <div className="relative z-10 space-y-2">
                <span className="text-[9px] font-mono font-bold tracking-widest bg-black/10 px-2 py-0.5 rounded-full inline-block">
                  CAMPEÓN PREDICHO
                </span>
                <h4 className="text-lg font-black tracking-tight">{sf1}</h4>
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold bg-black text-amber-400 py-1.5 px-4 rounded-xl max-w-xs mx-auto">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>¡Predicción Guardada!</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Box */}
        <div className="bg-[#2d1808]/70 p-3.5 rounded-xl border border-white/5 text-[11px] text-slate-350 leading-relaxed font-light">
          Este tipo de aplicaciones virales generaron <span className="font-semibold text-amber-400">millones de visitas</span> en torneos anteriores. Con el taller sabrás conectar marcadores con APIs externas y actualizar las llaves de miles de usuarios al mismo tiempo.
        </div>
      </div>
    </div>
  );
}
