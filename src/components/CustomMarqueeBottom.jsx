import { motion } from 'framer-motion';

const bottomMarqueeItems = [
  'HET IMPEX', 'SHIELD CUT', 'BULLET CUT', 'HALF MOON', 'CRESCENT', 'CABOCHON', 'BRIOLETTE', 'LOZENGE', 'FLANDERS', 'EPAULETTE', 'TAPERED BAGUETTE', 'SQUARE EMERALD', 'ELONGATED CUSHION', 'ANTIQUE CUSHION', 'MOVAL', 'PORTRAIT CUT', 'STAR CUT', 'TRIANGLE CUT', 'FRENCH CUT', 'DUTCH MARQUISE', 'CUT-CORNER RECTANGULAR MIXED CUT'
];

// Duplicate for seamless looping
const duplicatedItems = [...bottomMarqueeItems, ...bottomMarqueeItems];

export default function CustomMarqueeBottom() {
  return (
    <section className="py-4 bg-white border-t border-gray-200 overflow-hidden">
      <div className="w-full overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ["-50%", 0] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="inline-block"
        >
          <span className="text-sm uppercase tracking-wider text-gray-600 inline-flex items-center gap-2">
            {duplicatedItems.map((item, index) => (
              <span key={index} className="inline-flex items-center gap-2">
                <span className={item === 'HET IMPEX' ? 'text-[#BDC82E] font-bold' : ''}>
                  {item}
                </span>
                <span>•</span>
              </span>
            ))}
          </span>
        </motion.div>
      </div>
    </section>
  );
}