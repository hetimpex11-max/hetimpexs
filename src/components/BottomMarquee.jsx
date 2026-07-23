import { motion } from 'framer-motion';

const middleText = 'SPECIALIZED IN MANUFACTURING HIGH-QUALITY DIAMONDS ✦ ';
const bottomText = 'HET IMPEX ✦ ';

const repeatedMiddle = middleText.repeat(12);
const repeatedBottom = bottomText.repeat(12);

export default function BottomMarquee() {
  return (
    <section className="py-12 lg:py-16 bg-white overflow-hidden">
      <div className="w-full space-y-6">
        {/* Middle Layer - Outlined Text - Right to Left */}
        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: ['-45%', 0] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 22,
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
              {repeatedMiddle}
              {repeatedMiddle}
            </span>
          </motion.div>
        </div>

        {/* Bottom Layer - Solid Text with Star Separators - Left to Right */}
        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: [0, '-30%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 20,
            }}
            className="whitespace-nowrap"
          >
            <span className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-charcoal inline-flex items-center gap-6">
              {repeatedBottom.split(' ✦ ').map((text, i, arr) => (
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
      </div>
    </section>
  );
}
