import { motion } from 'framer-motion';

const topText = 'PREMIUM MANUFACTURERS OF ROUND & CHAKRI DIAMONDS • ';
const middleText = 'SPECIALIZED IN MANUFACTURING HIGH-QUALITY DIAMONDS ✦ ';
const bottomText = 'HET IMPEX ✦ ';

const repeatedTop = topText.repeat(10);
const repeatedMiddle = middleText.repeat(10);
const repeatedBottom = bottomText.repeat(10);

export default function Marquee() {
  return (
    <section className="py-10 lg:py-14 bg-white overflow-hidden">
      <div className="w-full space-y-8">
        {/* Top Marquee - Wavy/Curved Text - Left to Right */}
        <div className="w-full overflow-hidden">
          <svg viewBox="0 0 3000 100" className="w-full h-14 lg:h-16" preserveAspectRatio="none">
            <defs>
              <path
                id="wavyPath"
                d="M0,50 C150,10 300,90 450,50 C600,10 750,90 900,50 C1050,10 1200,90 1350,50 C1500,10 1650,90 1800,50 C1950,10 2100,90 2250,50 C2400,10 2550,90 2700,50 C2850,10 3000,90 3000,50"
                fill="none"
              />
            </defs>
            <motion.text
              animate={{ x: [0, -1500] }}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration: 20,
              }}
              className="text-xs lg:text-sm font-medium uppercase tracking-[0.2em]"
              fill="#BDC82E"
            >
              <textPath href="#wavyPath" startOffset="0%">
                {repeatedTop}
              </textPath>
              <textPath href="#wavyPath" startOffset="50%">
                {repeatedTop}
              </textPath>
            </motion.text>
          </svg>
        </div>

        {/* Middle Marquee - Outlined Text - Right to Left */}
        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: [-1500, 0] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 25,
            }}
            className="whitespace-nowrap"
            style={{
              WebkitTextStroke: '1px #1A1A1A',
              color: 'transparent',
            }}
          >
            <span className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight inline-block">
              {repeatedMiddle}
              {repeatedMiddle}
            </span>
          </motion.div>
        </div>

        {/* Bottom Marquee - Solid Text with Star Separators - Left to Right */}
        <div className="w-full overflow-hidden">
          <motion.div
            animate={{ x: [0, -1500] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 18,
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
