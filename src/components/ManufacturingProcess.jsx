import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Leaf, Scissors, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Leaf,
    title: 'Ethical Sourcing & Rough Selection',
    description: 'We source our rough diamonds from trusted, conflict-free suppliers, ensuring every stone meets the highest ethical standards. Our relationships with miners and traders across the globe allow us to access the finest rough materials.',
  },
  {
    number: '02',
    icon: Scissors,
    title: 'High-Tech Precision Cutting & Polishing',
    description: 'Our master craftsmen in Surat employ state-of-the-art technology alongside time-honored techniques to cut and polish each diamond to perfection. We specialize in Round Brilliant and Chakri (Rose Cut) shapes, bringing out maximum brilliance and fire.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Uncompromising Quality Grading',
    description: 'Before any diamond leaves our facility, it undergoes rigorous quality inspection. We evaluate cut, color, clarity, and carat weight with precision, ensuring only stones that meet our exacting standards reach our clients.',
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function ManufacturingProcess() {
  const [ref, isInView] = useInView();

  return (
    <section id="process" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Precision Manufacturing Process
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto" />
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From rough to radiant, every diamond undergoes a journey of precision and care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left side - Video container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <video
              src="/manufacturing.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              poster="/manufacturing-poster.png"
              className="w-full rounded-xl shadow-2xl border border-gray-800 object-cover aspect-video"
            />
          </motion.div>

          {/* Right side - 3-step timeline */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={stepVariants}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-full bg-gray-200 mt-2" />
                  )}
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex-1 bg-white border border-gray-100 rounded-lg p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon size={20} className="text-primary" strokeWidth={1.5} />
                    <h3 className="text-lg font-bold text-charcoal">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
