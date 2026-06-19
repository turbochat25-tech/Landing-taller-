import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Rocket, ArrowRight } from 'lucide-react';

interface Props {
  onClick?: () => void;
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'nav';
}

export default function PremiumCTAButton({ onClick, text, className = '', size = 'lg' }: Props) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Default values
  const checkoutUrl = "https://app.takenos.com/pay/99e824aa-9cfd-431c-b043-3c6a0365c112";
  
  // Custom text per size if not provided
  let buttonText = text;
  if (!buttonText) {
    if (size === 'nav' || size === 'sm') {
      buttonText = "🚀 INSCRIBIRME";
    } else {
      buttonText = "🚀 INSCRIBIRME POR $24.99";
    }
  }

  // Springs for the magnetic hover effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 120, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull: offset up to 8px from center
    const deltaX = (clientX - centerX) * 0.08;
    const deltaY = (clientY - centerY) * 0.08;
    
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
    lg: 'py-4 px-8 text-xs xs:text-sm sm:text-base tracking-widest font-black',
    md: 'py-3.5 px-6 text-xs sm:text-sm tracking-wider font-extrabold',
    sm: 'py-2 px-3 text-[10px] sm:text-xs tracking-wider font-extrabold',
    nav: 'py-2 px-4.5 text-[10.5px] sm:text-xs tracking-wider font-extrabold'
  };

  const roundedClasses = size === 'nav' || size === 'sm' ? 'rounded-xl' : 'rounded-2xl';

  return (
    <div className={`relative inline-block ${size === 'lg' ? 'w-full max-w-md' : ''} ${className}`}>
      
      {/* 1. Pulse neon aura glow */}
      <motion.div
        className={`absolute -inset-1 ${roundedClasses} bg-gradient-to-r from-[#10b981] via-[#6366f1] to-[#8b5cf6] blur-xl pointer-events-none z-0`}
        animate={{
          scale: isHovered ? 1.08 : [1, 1.04, 1],
          opacity: isHovered ? 0.95 : [0.55, 0.8, 0.55]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 2. Secondary expanding white star halo effect */}
      <motion.div
        className={`absolute inset-0 ${roundedClasses} border border-[#10b981]/60 opacity-0 pointer-events-none z-0`}
        animate={{
          scale: [1, 1.25],
          opacity: [0.75, 0]
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeOut"
        }}
      />

      {/* Premium Magnetic CTA Link */}
      <motion.a
        ref={buttonRef}
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          x: springX,
          y: springY,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className={`
          relative z-10 w-full ${roundedClasses} font-display uppercase text-black
          bg-gradient-to-r from-[#10b981] via-[#5bef9b] via-[#818cf8] to-[#8b5cf6] 
          border border-white/40 shadow-[0_12px_40px_rgba(16,185,129,0.35),inset_0_1px_2px_rgba(255,255,255,0.6)]
          overflow-hidden cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300
          ${sizeClasses[size]}
        `}
      >
        {/* Shimmer sweep line effect */}
        <motion.div
          className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-30 pointer-events-none"
          initial={{ left: '-150%' }}
          animate={{
            left: '150%'
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeInOut"
          }}
        />

        {/* Hover inner highlight glow */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-white/10 blur-[1px]" />
        </div>

        {/* Inner Content with icon */}
        <span className="relative z-10 flex items-center justify-center gap-2 font-black">
          <span>{buttonText}</span>
          {size !== 'nav' && size !== 'sm' ? (
            <Rocket className={`w-4 h-4 text-black transition-transform duration-300 ${isHovered ? 'translate-y-[-2px] translate-x-[2px]' : ''}`} />
          ) : (
            <ArrowRight className={`w-3.5 h-3.5 text-black transition-transform duration-300 ${isHovered ? 'translate-x-0.5' : ''}`} />
          )}
        </span>
      </motion.a>
    </div>
  );
}
