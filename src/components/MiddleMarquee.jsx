import { motion } from 'framer-motion';

const text = 'SPECIALIZED IN MANUFACTURING HIGH-QUALITY DIAMONDS ✦ ';
const repeated = text.repeat(12);

export default function MiddleMarquee() {
  return (
    <section className="py-10 lg:py-14 bg-white overflow-hidden">
      <div className="w-full overflow-hidden">
        <motion.div
          animate={{ x: ['-50%', 0] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
          className="whitespace-nowrap"
        >
          <span
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight inline-block"
            style={{
              WebkitTextStroke: '1px #1A1A1A',
              color: 'transparent',
            }}
          >
            {repeated}
            {repeated}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
