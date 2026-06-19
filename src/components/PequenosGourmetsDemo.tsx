import React, { useState } from 'react';
import { Apple, Heart, Sliders, AlertTriangle, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PequenosGourmetsDemo() {
  const [ageRange, setAgeRange] = useState<'6' | '9' | '12'>('6');
  const [avoidAllergens, setAvoidAllergens] = useState<Record<string, boolean>>({
    'Lácteos': false,
    'Huevo': false,
    'Frutos Secos': true,
  });

  const menusByAge = {
    '6': {
      title: 'Papillas & Cortes BLW Iniciales',
      text: 'Texturas súper suaves y cortes grandes y alargados (del tamaño de un dedo de un adulto) para que el bebé pueda agarrarlos fácilmente con sus puños.',
      meals: [
        { name: 'Bastones de Zanahoria al vapor', safeCut: 'Corte alargado, suave al presionar con dos dedos', isSafe: true },
        { name: 'Puré rústico de calabaza y pollo', safeCut: 'Textura triturada espesa con cuchara pre-cargada', isSafe: true },
        { name: 'Aguacate maduro en gajos', safeCut: 'Gajos rebozados en semillas sésamo molidas (Omitir si hay alergia)', isSafe: !avoidAllergens['Sésamo'] }
      ]
    },
    '9': {
      title: 'Consolidación & Pinza Fina',
      text: 'Se introduce el agarre en pinza (dedo índice y pulgar). Los alimentos se trocean en bocados pequeños y blandos fáciles de masticar sin dientes.',
      meals: [
        { name: 'Mini hamburguesas de pavo y brócoli', safeCut: 'Bocados pequeños del tamaño de un guisante', isSafe: true },
        { name: 'Fideos de sémola muy cocidos', safeCut: 'Textura muy blanda, fáciles de aplastar con las encías', isSafe: !avoidAllergens['Lácteos'] },
        { name: 'Tortita de plátano y avena', safeCut: 'Tiras finas de fácil masticación (Contiene huevo)', isSafe: !avoidAllergens['Huevo'] }
      ]
    },
    '12': {
      title: 'Transición a Menú Familiar',
      text: 'El bebé ya puede comer casi lo mismo que el resto de la familia, adaptando ligeramente los niveles de sal y los cortes peligrosos (uvas, frutos secos secos).',
      meals: [
        { name: 'Arroz cremoso con verduras picadas', safeCut: 'Textura granulada, ideal para fomentar uso de cubiertos', isSafe: true },
        { name: 'Albóndigas de pescado blanco al horno', safeCut: 'Desmenuzado fino para inspeccionar espinas', isSafe: true },
        { name: 'Yogur natural con compota de manzana', safeCut: 'Tazón con cuchara (Contiene lactosa)', isSafe: !avoidAllergens['Lácteos'] }
      ]
    }
  };

  const selectedMenu = menusByAge[ageRange];
  const activeMeals = selectedMenu.meals.filter(m => m.isSafe);

  const toggleAllergen = (al: string) => {
    setAvoidAllergens(p => ({ ...p, [al]: !p[al] }));
  };

  return (
    <div className="bg-[#1c0a13] text-white rounded-t-[32px] rounded-b-[40px] h-[580px] flex flex-col overflow-y-auto overflow-x-hidden font-sans select-none border border-pink-500/20">
      {/* Top Mobile Bar */}
      <div className="sticky top-0 bg-[#1c0a13]/95 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-pink-500/15 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center text-white">
            <Apple className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-tight">Pequeños Gourmets</h4>
            <p className="text-[10px] text-pink-400 font-mono tracking-wider">GUÍA PATERNIDAD SAAS</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[10px] font-mono">
          <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
          <span>Baby BLW</span>
        </div>
      </div>

      <div className="p-5 space-y-5 flex-1">
        {/* Step 1: Select Age Range */}
        <div className="bg-[#361326]/40 p-4 rounded-xl border border-pink-500/10 space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-pink-400 uppercase flex items-center gap-1">
            <Sliders className="w-3 h-3" /> 1. Edad del Bebé
          </span>
          
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: '6', title: '6-8 Meses', desc: 'Iniciación' },
              { id: '9', title: '9-11 Meses', desc: 'Consolidado' },
              { id: '12', title: '12+ Meses', desc: 'Menú Fam' }
            ].map(range => (
              <button
                key={range.id}
                onClick={() => setAgeRange(range.id as any)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  ageRange === range.id
                    ? 'bg-pink-500 text-white border-pink-400 font-bold shadow-lg shadow-pink-500/25'
                    : 'bg-[#1c0a13]/75 border-white/5 text-slate-350 hover:bg-[#361326]/20'
                }`}
              >
                <div className="text-[11px] font-bold">{range.title}</div>
                <div className={`text-[8px] opacity-70 ${ageRange === range.id ? 'text-pink-100' : 'text-slate-500'}`}>{range.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Intelligent Allergen Avoidance */}
        <div className="bg-[#1c0a13]/60 p-4 rounded-xl border border-white/5 space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#f472b6] uppercase flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[#f472b6]" /> 2. Filtro de Alérgenos
          </span>

          <div className="flex gap-2flex flex-wrap gap-1.5">
            {Object.keys(avoidAllergens).map(allergen => (
              <button
                key={allergen}
                onClick={() => toggleAllergen(allergen)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  avoidAllergens[allergen]
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-[#361326]/20 text-slate-400 border-white/5 hover:border-white/10'
                }`}
              >
                {avoidAllergens[allergen] ? 'Evitar ' : 'Incluir '} {allergen}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Meals Suggestions based on toggles */}
        <div className="bg-[#361326]/40 p-4 rounded-xl border border-pink-500/10 space-y-3">
          <h5 className="text-xs font-semibold text-pink-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            Recetas sugeridas para {ageRange === '6' ? '6 meses' : ageRange === '9' ? '9-11 meses' : '1 año o más'}
          </h5>
          <p className="text-[10px] text-slate-400 leading-normal">{selectedMenu.text}</p>

          <div className="space-y-2 mt-2">
            <AnimatePresence mode="popLayout">
              {activeMeals.map((meal) => (
                <motion.div
                  key={meal.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="bg-[#1c0a13]/80 p-3 rounded-xl border border-white/5 flex items-start justify-between gap-3 text-left"
                >
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold text-slate-100">{meal.name}</p>
                    <p className="text-[9px] text-[#f472b6] font-mono leading-tight flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5 text-pink-400 shrink-0" /> {meal.safeCut}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-1" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom micro-copy */}
        <div className="bg-[#361225] p-3.5 rounded-xl border border-pink-500/15 text-[11px] text-slate-350 leading-relaxed font-light">
          Este mercado se vende a nivel mundial. Los padres aman la practicidad de consultar en su móvil qué y cómo dar de comer sin miedos. En el taller construirás esta misma experiencia modular adaptable a cualquier nicho infantil.
        </div>
      </div>
    </div>
  );
}
