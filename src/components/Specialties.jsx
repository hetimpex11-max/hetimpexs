import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Gem, Circle } from 'lucide-react';

const specialties = [
  {
    icon: Gem,
    title: 'Precision Round Cut Diamonds',
    description: 'Expertly crafted round brilliant diamonds with exceptional fire, brilliance, and scintillation. Each stone is cut to exacting proportions for maximum light performance.',
  },
  {
    icon: Circle,
    title: 'Premium Chakri Shape Diamonds',
    description: 'Distinctive Chakri (rose cut) diamonds with a timeless, romantic aesthetic. Our master cutters bring out the unique character and soft glow of these elegant stones.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Specialties() {
  const [ref, isInView] = useInView();

  return (
    <section id="specialties" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Our Specialties
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto" />
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We specialize in two core diamond shapes, each representing the pinnacle of craftsmanship and quality.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {specialties.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white border border-gray-100 rounded-lg p-8 lg:p-10 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-8 group-hover:bg-primary/20 transition-colors duration-500">
                <item.icon size={32} className="text-primary" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl lg:text-2xl font-bold text-charcoal mb-4 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm">Learn More</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
