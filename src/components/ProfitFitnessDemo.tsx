import React, { useState } from 'react';
import { Dumbbell, Flame, Target, Trophy, CheckCircle, Apple, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProfitFitnessDemo() {
  const [weight, setWeight] = useState(72);
  const [goal, setGoal] = useState<'perder' | 'mantener' | 'ganar'>('ganar');
  const [completedWorkouts, setCompletedWorkouts] = useState<Record<string, boolean>>({
    '1': true,
    '2': false,
    '3': false,
  });

  const calculateCalories = () => {
    let base = weight * 22 * 1.4; // assume active multiplier
    if (goal === 'perder') base -= 400;
    if (goal === 'ganar') base += 350;
    const cals = Math.round(base);
    const protein = Math.round(weight * 2);
    const fat = Math.round((cals * 0.25) / 9);
    const carbs = Math.round((cals - (protein * 4) - (fat * 9)) / 4);

    return { cals, protein, fat, carbs };
  };

  const { cals, protein, fat, carbs } = calculateCalories();

  const toggleWorkout = (id: string) => {
    setCompletedWorkouts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const workouts = [
    { id: '1', name: 'Press de Banca Plano', specs: '4 series x 8-10 reps', muscle: 'Pecho' },
    { id: '2', name: 'Sentadilla Hacka', specs: '3 series x 12 reps', muscle: 'Piernas' },
    { id: '3', name: 'Remo con barra inclinada', specs: '4 series x 10 reps', muscle: 'Espalda' }
  ];

  const totalCompleted = Object.values(completedWorkouts).filter(Boolean).length;
  const progressPercent = Math.round((totalCompleted / workouts.length) * 100);

  return (
    <div className="bg-[#0f172a] text-white rounded-t-[32px] rounded-b-[40px] h-[580px] flex flex-col overflow-y-auto overflow-x-hidden font-sans select-none border border-emerald-500/20">
      {/* Top Mobile Bar */}
      <div className="sticky top-0 bg-[#0f172a]/95 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-black">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-tight">Profit Fitness</h4>
            <p className="text-[10px] text-emerald-400 font-mono tracking-wider">MODO SIMULADOR</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
          <Flame className="w-3 h-3 text-emerald-500 animate-pulse" />
          <span>7D Streak</span>
        </div>
      </div>

      {/* Main App Canvas */}
      <div className="p-5 space-y-6 flex-1">
        {/* Step 1: Weight & Goal Configurator */}
        <div className="bg-[#1e293b]/70 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          
          <h5 className="text-xs font-semibold text-emerald-400 mb-3 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> 1. Ajustes del Perfil
          </h5>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-400">Peso Actual</span>
                <span className="text-xs font-bold font-mono text-emerald-400">{weight} kg</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="120" 
                value={weight} 
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-2">Objetivo Personal</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'perder', label: 'Perder', desc: 'Déficit' },
                  { id: 'mantener', label: 'Mantener', desc: 'Balance' },
                  { id: 'ganar', label: 'Ganar', desc: 'Superávit' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id as any)}
                    className={`p-2 rounded-xl border text-center transition-all text-[11px] ${
                      goal === item.id 
                        ? 'bg-emerald-500 text-black font-semibold border-emerald-400 shadow-lg shadow-emerald-500/20' 
                        : 'border-white/5 bg-[#0f172a]/60 hover:bg-[#0f172a] text-slate-300'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className={`text-[8px] opacity-70 ${goal === item.id ? 'text-emerald-950 font-medium' : 'text-slate-500'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Interactive Smart Calculations */}
        <div className="bg-[#1e293b]/70 rounded-2xl p-4 border border-emerald-500/10 relative overflow-hidden">
          <h5 className="text-xs font-semibold text-emerald-400 mb-3.5 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Apple className="w-3.5 h-3.5" /> 2. Macros Calculados con IA
          </h5>

          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="col-span-4 bg-[#0f172a]/80 p-3 rounded-xl border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">Total Sugerido</div>
                <div className="text-lg font-black text-emerald-400 font-mono">{cals} <span className="text-xs font-normal text-white">kcal</span></div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            
            <div className="bg-[#0f172a] p-2 rounded-xl text-center border border-white/5">
              <div className="text-[8px] text-slate-400 mb-0.5">Proteína</div>
              <div className="text-xs font-bold text-white font-mono">{protein}g</div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div className="col-span-2 bg-[#0f172a] p-2 rounded-xl text-center border border-white/5">
              <div className="text-[8px] text-slate-400 mb-0.5">Carbohidratos</div>
              <div className="text-xs font-bold text-white font-mono">{carbs}g</div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '50%' }} />
              </div>
            </div>

            <div className="bg-[#0f172a] p-2 rounded-xl text-center border border-white/5">
              <div className="text-[8px] text-slate-400 mb-0.5">Grasas</div>
              <div className="text-xs font-bold text-white font-mono">{fat}g</div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 italic text-center">
            *Fórmulas automáticas calculadas dinámicamente según peso y nivel de déficit.
          </div>
        </div>

        {/* Step 3: Interactive Workout Checklist */}
        <div className="bg-[#1e293b]/70 rounded-2xl p-4 border border-white/5">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5" /> 3. Rutina Interactiva
            </h5>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
              {progressPercent}% listo
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mb-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="space-y-2.5">
            {workouts.map((workout) => (
              <div 
                key={workout.id}
                onClick={() => toggleWorkout(workout.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  completedWorkouts[workout.id]
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-150'
                    : 'bg-[#0f172a]/80 border-white/5 text-slate-200 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg border transition-all ${
                    completedWorkouts[workout.id] 
                      ? 'bg-emerald-500 border-emerald-400 text-black' 
                      : 'border-white/10 text-slate-400'
                  }`}>
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className={`text-[11px] block transition-all font-medium ${completedWorkouts[workout.id] ? 'line-through text-slate-400' : ''}`}>
                      {workout.name}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono">{workout.specs}</span>
                  </div>
                </div>
                <span className="text-[8px] bg-[#1e293b] text-slate-300 border border-white/5 px-2 py-0.5 rounded-md font-mono uppercase">
                  {workout.muscle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-black flex justify-between items-center relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/20 rounded-full" />
          <div className="relative z-10 space-y-1">
            <div className="text-xs font-bold leading-tight">¿Ves lo fácil que es crear esto?</div>
            <div className="text-[9px] opacity-90">Aprenderás a conectar esta misma lógica con bases de datos estables en la nube.</div>
          </div>
          <Trophy className="w-8 h-8 text-black opacity-82 relative z-10 shrink-0" />
        </div>
      </div>
    </div>
  );
}
