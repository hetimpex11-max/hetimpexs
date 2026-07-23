import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import {
  Gem,
  Cpu,
  ShieldCheck,
  Handshake,
  Globe,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Gem,
    title: 'Deep-rooted diamond industry expertise',
  },
  {
    icon: Cpu,
    title: 'Modern manufacturing and technology-driven processes',
  },
  {
    icon: ShieldCheck,
    title: 'Consistent quality control and precision',
  },
  {
    icon: Handshake,
    title: 'Transparent and trustworthy business practices',
  },
  {
    icon: Globe,
    title: 'Global outlook with personalized service',
  },
  {
    icon: Users,
    title: 'Long-term partnership-focused approach',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function WhyChooseUs() {
  const [ref, isInView] = useInView();

  return (
    <section id="why-us" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Why Partner With Us
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white p-8 rounded-lg border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon size={24} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-charcoal leading-snug">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
