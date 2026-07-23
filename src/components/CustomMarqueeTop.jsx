import { motion } from 'framer-motion';

const topMarqueeItems = [
  'HET IMPEX', 'ROUND BRILLIANT', 'PRINCESS', 'CUSHION', 'EMERALD', 'OVAL', 'PEAR', 'MARQUISE', 'RADIANT', 'ASSCHER', 'HEART', 'TRILLION', 'BAGUETTE', 'KITE', 'HEXAGON', 'OCTAGON', 'ROSE CUT', 'OLD MINE CUT', 'OLD EUROPEAN CUT', 'PORTUGUESE CUT', 'JUBILEE CUT'
];

// Duplicate for seamless looping
const duplicatedItems = [...topMarqueeItems, ...topMarqueeItems];

export default function CustomMarqueeTop() {
  return (
    <section className="py-4 bg-white border-b border-gray-200 overflow-hidden">
      <div className="w-full overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: [0, "-50%"] }}
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