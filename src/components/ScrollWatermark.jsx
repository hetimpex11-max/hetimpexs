import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollWatermark() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 3000], ['-20%', '20%']);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        style={{ x }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap select-none"
      >
        <span className="text-[18vw] font-black tracking-tighter text-charcoal opacity-[0.03] leading-none">
          HET IMPEX
        </span>
      </motion.div>
    </div>
  );
}
