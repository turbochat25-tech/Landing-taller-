import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface Props {
  onClick: () => void;
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'nav';
}

export default function PremiumCTAButton({ onClick, text = '🚀 QUIERO MI CUPO', className = '', size = 'lg' }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Springs for the magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 120, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull: offset up to 10px from center
    const deltaX = (clientX - centerX) * 0.12;
    const deltaY = (clientY - centerY) * 0.12;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Nav height vs lg height classes
  const sizeClasses = {
    lg: 'py-4.5 px-10 text-xs sm:text-sm tracking-widest',
    md: 'py-3.5 px-6 text-xs tracking-wider',
    sm: 'py-2.5 px-4 text-[10px] tracking-wider',
    nav: 'py-2 px-4.5 text-[10px] sm:text-xs tracking-wider'
  };

  const roundedClasses = size === 'nav' || size === 'sm' ? 'rounded-xl' : 'rounded-2xl';

  return (
    <div className={`relative inline-block ${size === 'lg' ? 'w-full max-w-md' : ''} ${className}`}>
      {/* 1 & 3: Soft pulse aura / neon blur every 6-8s */}
      <motion.div
        className={`absolute -inset-0.5 ${roundedClasses} bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-400 opacity-60 blur-md pointer-events-none z-0`}
        animate={{
          scale: isHovered ? 1.05 : [1, 1.02, 1],
          opacity: isHovered ? 0.95 : [0.55, 0.75, 0.55]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Expanding halo element */}
      <motion.div
        className={`absolute inset-0 ${roundedClasses} border border-emerald-400/50 opacity-0 pointer-events-none z-0`}
        animate={{
          scale: [1, 1.3],
          opacity: [0.6, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 3,  // Total 7s cycle
          ease: "easeOut"
        }}
      />

      {/* Interactive Main Button */}
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          x: springX,
          y: springY,
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`
          relative z-10 w-full ${roundedClasses} font-display font-black uppercase text-white
          bg-neutral-950 border border-white/10 active:border-emerald-500/40 overflow-hidden cursor-pointer flex items-center justify-center gap-2.5 transition-colors duration-300
          ${sizeClasses[size]}
        `}
      >
        {/* Dynamic technology gradient background shift */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/20 via-neutral-950 to-emerald-950/20 opacity-100" />
        
        {/* Neon electric violet & premium emerald glowing inner border on hover */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/5 to-emerald-500/15 blur-[2px]" />
          <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-violet-400/80 to-transparent" />
        </div>

        {/* 2: Horizontal shimmering light scan */}
        <motion.div
          className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-30 pointer-events-none"
          initial={{ left: '-150%' }}
          animate={{
            left: '150%'
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 4.5, // Sweep across every ~7s total cycle
            ease: "easeInOut"
          }}
        />

        {/* Inner Content spacing & layout */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span>{text}</span>
          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1 text-emerald-400' : 'text-zinc-400'}`} />
        </span>
      </motion.button>
    </div>
  );
}
