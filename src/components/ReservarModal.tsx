import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, CreditCard, Ticket, Clock, Mail, ShieldCheck, ArrowRight, Star } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  price?: string;
}

export default function ReservarModal({ isOpen, onClose, price = '24.99' }: Props) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: 'card',
    newsletter: true
  });
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });

  const [simulatedTicket, setSimulatedTicket] = useState({
    ticketId: 'TKT-IA-992F',
    seatNum: 42,
    date: '10, 11 y 12 de Julio, 2026',
    time: '15:00 (Hora Local)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasErrors = false;
    const newErrors = { name: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre completo';
      hasErrors = true;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Success simulation!
    setSimulatedTicket({
      ticketId: 'TKT-IA-' + Math.floor(1000 + Math.random() * 9000),
      seatNum: Math.floor(40 + Math.random() * 45),
      date: '10, 11 y 12 de Julio, 2026',
      time: '15:00 (Hora de tu país)'
    });
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl w-full max-w-lg relative overflow-hidden z-10 shadow-2xl max-h-[90vh] flex flex-col font-sans"
      >
        {/* Subtle top glow ring */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-950 to-emerald-500" />

        {/* Header */}
        <div className="p-6 pb-2 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-bold">
              Inscripción Garantizada
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 text-zinc-400 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 pt-2 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {step === 'form' ? (
              <motion.div
                key="form-step"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-black text-white font-display tracking-tight">
                    Reserva tu Cupo en Vivo
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    Completa tu información de contacto para recibir los enlaces de acceso de Zoom y el acceso de por vida a la plataforma de grabaciones.
                  </p>
                </div>

                {/* Price tag summary */}
                <div className="bg-neutral-900/50 rounded-2xl p-4 border border-neutral-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Inversión única</span>
                    <p className="text-xs text-zinc-300 font-medium">Taller Completo + 15 Días Soporte</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 line-through mr-1.5 font-mono">$199.00 USD</span>
                    <span className="text-xl font-extrabold text-white font-display">${price} USD</span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 font-medium font-mono uppercase">1. Tu Nombre Completo</label>
                    <input 
                      type="text"
                      placeholder="Ej. Christian Framer"
                      value={formData.name}
                      onChange={(e) => {
                        setErrors(p => ({ ...p, name: '' }));
                        setFormData(p => ({ ...p, name: e.target.value }));
                      }}
                      className={`w-full p-3 rounded-xl bg-neutral-900 text-sm text-white placeholder-zinc-600 border transition-all outline-none ${
                        errors.name ? 'border-rose-500' : 'border-neutral-800 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/20'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-rose-400">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 font-medium font-mono uppercase">2. Correo de Acceso</label>
                    <input 
                      type="email"
                      placeholder="ejemplo@gmail.com"
                      value={formData.email}
                      onChange={(e) => {
                        setErrors(p => ({ ...p, email: '' }));
                        setFormData(p => ({ ...p, email: e.target.value }));
                      }}
                      className={`w-full p-3 rounded-xl bg-neutral-900 text-sm text-white placeholder-zinc-600 border transition-all outline-none ${
                        errors.email ? 'border-rose-500' : 'border-neutral-800 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/20'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-400">{errors.email}</p>}
                    <p className="text-[10px] text-zinc-500">Aquí enviaremos el enlace privado al taller en vivo y las grabaciones.</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-300 font-medium font-mono uppercase">3. Método de Pago Simulado</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'card', label: 'Tarjeta', desc: 'Secure Pay' },
                        { id: 'paypal', label: 'PayPal', desc: 'Instant' },
                        { id: 'crypto', label: 'Crypto', desc: 'Binance' }
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, paymentMethod: method.id }))}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            formData.paymentMethod === method.id
                              ? 'bg-white text-black border-white font-bold'
                              : 'bg-neutral-900 border-neutral-850 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <p className="text-xs">{method.label}</p>
                          <p className="text-[8px] opacity-70 font-mono">{method.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer pt-1 select-none">
                    <input 
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData(p => ({ ...p, newsletter: e.target.checked }))}
                      className="mt-1 accent-violet-500"
                    />
                    <span className="text-[10px] text-zinc-400 leading-normal">
                      Acepto recibir alertas de WhatsApp y correo antes de que inicie la grabación. No enviamos spam. Su información está 100% encriptada con SSL.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-violet-600 to-emerald-500 py-3.5 px-6 rounded-xl text-xs font-black tracking-widest uppercase hover:opacity-90 active:scale-[0.98] transition-all text-white flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10 cursor-pointer"
                    >
                      <span>Simular Compra e Inscribirme</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Footer security badges */}
                <div className="flex justify-center items-center gap-6 text-[10px] text-zinc-500 border-t border-neutral-900 pt-4 font-mono">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Encriptación SSL 256bits
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" /> Acceso garantizado de por vida
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale:1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-center py-4"
              >
                {/* Simulated Success Ticket */}
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/25">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white font-display tracking-tight">
                    ¡Pre-Reserva Confirmada!
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Hemos registrado tu inscripción simulada para <span className="text-white font-bold">{formData.name}</span>. Se ha enviado un correo confirmando tu cupo ficticio a <span className="text-white font-mono">{formData.email}</span>.
                  </p>
                </div>

                {/* Ticket Component Graphic */}
                <div className="bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden relative text-left">
                  {/* Decorative ticket cutouts */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0a0a0a] rounded-full border border-neutral-800" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0a0a0a] rounded-full border border-neutral-800" />

                  {/* Header */}
                  <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 p-4 border-b border-dashed border-neutral-800 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-violet-400" /> TALLER IA LIVE PASS
                    </span>
                    <span className="text-[9px] font-mono bg-violet-500/25 text-violet-300 px-2 py-0.5 rounded-full font-bold">
                      {simulatedTicket.ticketId}
                    </span>
                  </div>

                  {/* Main Ticket Info */}
                  <div className="p-4 space-y-3.5 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-zinc-500 font-mono uppercase block">Asistente inscrito</span>
                        <span className="text-zinc-200 font-semibold text-xs truncate block">{formData.name}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 font-mono uppercase block">Identificación del asiento</span>
                        <span className="text-emerald-400 font-mono font-bold block">Fila A / Asiento #{simulatedTicket.seatNum}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] text-zinc-500 font-mono uppercase block">Fecha del Taller</span>
                        <span className="text-zinc-200 block font-medium">{simulatedTicket.date}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 font-mono uppercase block">Hora Internacional</span>
                        <span className="text-zinc-200 block font-mono">{simulatedTicket.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Barcode representation */}
                  <div className="bg-neutral-955/90 p-4 pt-1 flex flex-col items-center justify-center border-t border-neutral-850/80">
                    <div className="w-full h-8 flex justify-between items-stretch opacity-60 max-w-[200px] mt-1">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-zinc-200 shrink-0" 
                          style={{
                            width: (i % 3 === 0 ? '3px' : i % 5 === 0 ? '1px' : '2px'),
                            opacity: (i % 7 === 0 ? 0.3 : 1)
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase mt-1 tracking-widest">
                      * CODIGO SIMULADOR DE ACCESO *
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-[11px] text-left text-zinc-400 space-y-1">
                    <span className="text-white font-semibold">¿Qué sigue ahora?</span>
                    <p>1. Recibirás un correo cargado con instrucciones ficticias de Zoom.</p>
                    <p>2. Agrega las fechas a tu calendario personal para el directo.</p>
                    <p>3. Prepárate para el directo de {simulatedTicket.date}.</p>
                  </div>

                  <button
                    onClick={() => {
                      setStep('form');
                      onClose();
                    }}
                    className="w-full bg-white hover:bg-zinc-100 text-black py-3 px-6 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
                  >
                    Cerrar e interactuar con más Apps
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
