import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxBackground() {
  const containerRef = useRef(null);
  
  // Track scroll position globally for the background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Layer 1: Slowest moving, furthest back
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Layer 2: Mid-range
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  // Layer 3: Fastest moving, closest background element
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "300%"]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)] opacity-50" />
      
      {/* Abstract Shape 1 (Top Right) */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-[var(--accent-primary)]/5 rounded-full blur-[120px]"
      />
      
      {/* Abstract Shape 2 (Middle Left) */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/3 -left-64 w-[800px] h-[800px] bg-[var(--accent-secondary)]/5 rounded-full blur-[150px]"
      />

      {/* Abstract Shape 3 (Bottom Center) */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute top-3/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent-primary)]/10 rounded-full blur-[100px]"
      />
      
      {/* Subtle grid overlay to give 3D depth reference */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMCA0MGw0MCAwSDAweiBwaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGwwIDQwaDQwVjBIMHptMSAxbTM4IDB2MzhIMVYxeiIgZmlsbD0icmdiYSgxMDAsIDEwMCwgMTAwLCAwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-[0.3]" />
    </div>
  );
}
