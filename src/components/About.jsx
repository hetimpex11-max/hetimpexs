import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Quote } from 'lucide-react';

const paragraphVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function About() {
  const [ref, isInView] = useInView();

  const paragraphs = [
    "At HET IMPEX, diamonds are more than a business—they are a legacy built on trust, craftsmanship, and a deep understanding of the global diamond industry. Founded in Surat, the world's leading diamond manufacturing hub, HET IMPEX combines generations of industry expertise with a modern vision for the future.",
    "Under the leadership of Shaileshbhai, whose extensive experience in diamond manufacturing and trade has been built over decades, the company has established a reputation for quality, reliability, and long-term business relationships. His deep-rooted knowledge of the diamond trade, combined with an unwavering commitment to excellence, forms the foundation of everything we do.",
    "",
    "We specialize in sourcing and manufacturing high-quality diamonds for jewelry manufacturers, retailers, wholesalers, and diamond professionals worldwide. Every stone is carefully selected and processed with strict attention to quality, ensuring exceptional brilliance and craftsmanship. Our mission is simple: to become a trusted global partner for businesses seeking reliable diamond solutions, transparent communication, and uncompromising quality.",
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Our Legacy & Vision
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary" />
        </motion.div>

        <div className="space-y-8">
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={paragraphVariants}
              className="text-base md:text-lg text-gray-600 leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-12 p-8 border-l-4 border-primary bg-primary/5 rounded-r-lg"
        >
          <Quote className="text-primary mb-4" size={32} />
          <p className="text-lg text-charcoal italic leading-relaxed">
            "Our commitment to quality and integrity has been the cornerstone of HET IMPEX for decades. As we embrace the future, we remain dedicated to the same principles that built our reputation precision, trust, and an unwavering pursuit of excellence in every diamond we craft."
          </p>
          <p className="mt-4 font-semibold text-charcoal">— Shailesh G, HET IMPEX</p>
        </motion.div>
      </div>
    </section>
  );
}
