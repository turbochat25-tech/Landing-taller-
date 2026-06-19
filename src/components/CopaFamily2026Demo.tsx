import React, { useState } from 'react';
import { Trophy, Calendar, Sparkles, Plus, Award, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Team {
  name: string;
  pld: number; // played
  w: number;   // won
  d: number;   // drawn
  l: number;   // lost
  gf: number;  // goals for
  ga: number;  // goals against
  pts: number;
}

export default function CopaFamily2026Demo() {
  // We keep a simple list of teams. We let user change scores of match and update positions live!
  const [teams, setTeams] = useState<Record<string, Team>>({
    'Tíos FC': { name: 'Tíos FC', pld: 3, w: 2, d: 1, l: 0, gf: 8, ga: 3, pts: 7 },
    'Primos Unidos': { name: 'Primos de Sangre', pld: 3, w: 1, d: 2, l: 0, gf: 6, ga: 5, pts: 5 },
    'Yernos & Cuñados': { name: 'Yernos & Cuñados', pld: 3, w: 1, d: 1, l: 1, gf: 5, ga: 4, pts: 4 },
    'Los Sobrinos': { name: 'Los Sobrinos FC', pld: 3, w: 0, d: 0, l: 3, gf: 2, ga: 9, pts: 0 },
  });

  const [matchScore1, setMatchScore1] = useState(2);
  const [matchScore2, setMatchScore2] = useState(1);
  const [matchSubmitted, setMatchSubmitted] = useState(false);

  const handleSubmitScore = () => {
    if (matchSubmitted) return; // only allow submit once in demo simulation

    setTeams(prev => {
      const copy = { ...prev };
      
      // Update Yernos & Cuñados vs Los Sobrinos
      const yernos = { ...copy['Yernos & Cuñados'] };
      const sobrinos = { ...copy['Los Sobrinos'] };

      yernos.pld += 1;
      sobrinos.pld += 1;
      yernos.gf += matchScore1;
      yernos.ga += matchScore2;
      sobrinos.gf += matchScore2;
      sobrinos.ga += matchScore1;

      if (matchScore1 > matchScore2) {
        yernos.w += 1;
        yernos.pts += 3;
        sobrinos.l += 1;
      } else if (matchScore1 === matchScore2) {
        yernos.d += 1;
        yernos.pts += 1;
        sobrinos.d += 1;
        sobrinos.pts += 1;
      } else {
        sobrinos.w += 1;
        sobrinos.pts += 3;
        yernos.l += 1;
      }

      copy['Yernos & Cuñados'] = yernos;
      copy['Los Sobrinos'] = sobrinos;
      return copy;
    });

    setMatchSubmitted(true);
  };

  const handleReset = () => {
    setTeams({
      'Tíos FC': { name: 'Tíos FC', pld: 3, w: 2, d: 1, l: 0, gf: 8, ga: 3, pts: 7 },
      'Primos Unidos': { name: 'Primos de Sangre', pld: 3, w: 1, d: 2, l: 0, gf: 6, ga: 5, pts: 5 },
      'Yernos & Cuñados': { name: 'Yernos & Cuñados', pld: 3, w: 1, d: 1, l: 1, gf: 5, ga: 4, pts: 4 },
      'Los Sobrinos': { name: 'Los Sobrinos FC', pld: 3, w: 0, d: 0, l: 3, gf: 2, ga: 9, pts: 0 },
    });
    setMatchScore1(2);
    setMatchScore2(1);
    setMatchSubmitted(false);
  };

  // Sort teams by points, then gd, then gf
  const sortedTeams = (Object.values(teams) as Team[]).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    const ga_gd = a.gf - a.ga;
    const gb_gd = b.gf - b.ga;
    if (gb_gd !== ga_gd) return gb_gd - ga_gd;
    return b.gf - a.gf;
  });

  return (
    <div className="bg-[#0b1329] text-white rounded-t-[32px] rounded-b-[40px] h-[580px] flex flex-col overflow-y-auto overflow-x-hidden font-sans select-none border border-blue-500/20">
      {/* Top Mobile Bar */}
      <div className="sticky top-0 bg-[#0b1329]/95 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-white">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-tight">Copa Family 2026</h4>
            <p className="text-[10px] text-blue-400 font-mono tracking-wider">PANEL DE TORNEO</p>
          </div>
        </div>
        <button 
          onClick={handleReset} 
          className="text-[9px] font-mono text-blue-400 hover:text-blue-200 border border-blue-500/25 px-2 py-0.5 rounded bg-blue-500/5 cursor-pointer uppercase"
        >
          Reiniciar
        </button>
      </div>

      <div className="p-5 space-y-5 flex-1">
        {/* Live Positions Table */}
        <div className="bg-[#172554]/40 rounded-2xl p-4 border border-blue-500/20">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Tabla de Posiciones
            </h5>
            <span className="text-[9px] text-[#93c5fd] font-mono whitespace-nowrap">Grupo Único</span>
          </div>

          <div className="overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#94a3b8] border-b border-white/5 pb-2 text-[10px] uppercase font-mono">
                  <th className="py-1.5 font-normal">Equipo</th>
                  <th className="py-1.5 font-normal text-center">PJ</th>
                  <th className="py-1.5 font-normal text-center">DG</th>
                  <th className="py-1.5 font-normal text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {sortedTeams.map((team, idx) => {
                  const dg = team.gf - team.ga;
                  const isLeader = idx === 0;
                  return (
                    <motion.tr
                      layout
                      key={team.name}
                      className={`border-b border-white/5 transition-all ${
                        isLeader ? 'bg-blue-500/10 text-blue-200 font-medium' : 'text-slate-350'
                      }`}
                    >
                      <td className="py-2.5 flex items-center gap-1.5">
                        <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-mono ${
                          idx === 0 ? 'bg-amber-400 text-black font-bold' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="truncate max-w-[110px]">{team.name}</span>
                        {isLeader && <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300 animate-pulse inline-block" />}
                      </td>
                      <td className="py-2.5 text-center font-mono">{team.pld}</td>
                      <td className="py-2.5 text-center text-slate-400 font-mono">
                        {dg > 0 ? `+${dg}` : dg}
                      </td>
                      <td className={`py-2.5 text-center font-mono font-bold ${
                        isLeader ? 'text-blue-400' : 'text-white'
                      }`}>{team.pts}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Load Live Match score */}
        <div className="bg-[#111c44]/70 rounded-2xl p-4 border border-white/5">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Partido en Curso (Fecha 4)
            </h5>
            <span className="text-[10px] text-[#ef4444] font-mono animate-pulse font-bold bg-rose-500/10 px-1.5 py-0.5 rounded-full">
              EN VIVO
            </span>
          </div>

          <div className="bg-[#0b1329] p-4 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 text-center space-y-1">
                <div className="text-xs font-bold text-slate-200 truncate">Yernos & Cuñados</div>
                <div className="flex items-center justify-center gap-1">
                  <button 
                    disabled={matchSubmitted}
                    onClick={() => setMatchScore1(prev => Math.max(0, prev - 1))}
                    className="p-1 rounded bg-[#1e293b] hover:bg-[#334155] border border-white/5 disabled:opacity-40"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-lg font-bold font-mono text-white">{matchScore1}</span>
                  <button 
                    disabled={matchSubmitted}
                    onClick={() => setMatchScore1(prev => prev + 1)}
                    className="p-1 rounded bg-[#1e293b] hover:bg-[#334155] border border-white/5 disabled:opacity-40"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <span className="text-xs text-slate-500 font-mono font-bold px-2">VS</span>

              <div className="flex-1 text-center space-y-1">
                <div className="text-xs font-bold text-slate-200 truncate">Los Sobrinos FC</div>
                <div className="flex items-center justify-center gap-1">
                  <button 
                    disabled={matchSubmitted}
                    onClick={() => setMatchScore2(prev => Math.max(0, prev - 1))}
                    className="p-1 rounded bg-[#1e293b] hover:bg-[#334155] border border-white/5 disabled:opacity-40"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-lg font-bold font-mono text-white">{matchScore2}</span>
                  <button 
                    disabled={matchSubmitted}
                    onClick={() => setMatchScore2(prev => prev + 1)}
                    className="p-1 rounded bg-[#1e293b] hover:bg-[#334155] border border-white/5 disabled:opacity-40"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmitScore}
              disabled={matchSubmitted}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase transition-all flex items-center justify-center gap-2 ${
                matchSubmitted 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white shadow-lg shadow-blue-500/25 cursor-pointer'
              }`}
            >
              {matchSubmitted ? (
                <>
                  <Check className="w-3.5 h-3.5" /> ¡Tabla Actualizada!
                </>
              ) : (
                'Registrar Marcador en Vivo'
              )}
            </button>
          </div>
        </div>

        {/* Dynamic feature highlight */}
        <div className="bg-[#1e293b]/70 rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">¿Por qué es especial?</div>
          <p className="text-[11px] text-slate-350 leading-relaxed font-light">
            Cualquier integrante de la liga familiar puede ver este fixture. En el taller aprenderás cómo permitir que solo los <span className="text-blue-300 font-medium">Capitanes autorizados</span> editen marcadores, usando lógica de permisos inteligentes sin tocar código.
          </p>
        </div>
      </div>
    </div>
  );
}
