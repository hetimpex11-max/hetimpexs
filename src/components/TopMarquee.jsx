import { motion } from 'framer-motion';

const solidText = 'HET IMPEX ✦ ';
const repeatedSolid = solidText.repeat(12);

export default function TopMarquee() {
  return (
    <section className="py-10 lg:py-14 bg-white overflow-hidden">
      <div className="w-full overflow-hidden">
        <motion.div
          animate={{ x: [0, '-40%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 20,
          }}
          className="whitespace-nowrap"
        >
          <span className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-charcoal inline-flex items-center gap-6">
            {repeatedSolid.split(' ✦ ').map((text, i, arr) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{text}</span>
                {i < arr.length - 1 && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                      fill="#BDC82E"
                    />
                  </svg>
                )}
              </span>
            ))}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
