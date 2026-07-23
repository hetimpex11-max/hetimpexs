import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { X, Mail } from 'lucide-react';

const shapes = [
  {
    name: 'Round Brilliant Cut',
    image: '/shapes/round.webp',
    description: 'The most popular diamond shape, known for its exceptional brilliance and fire. Round brilliant cuts feature 57 or 58 facets that maximize light return, making them the perfect choice for engagement rings, earrings, and pendants.',
  },
  {
    name: 'Cushion Cut',
    image: '/shapes/cushion.webp',
    description: 'A timeless square or rectangular shape with rounded corners, offering a soft, romantic aesthetic. Cushion cuts combine vintage charm with modern brilliance, ideal for statement jewelry pieces.',
  },
  {
    name: 'Princess Cut',
    image: '/shapes/princess.webp',
    description: 'A modern square or rectangular shape with sharp, uncut corners. Princess cuts offer superior brilliance and a contemporary geometric appeal, making them a favorite for engagement rings.',
  },
  {
    name: 'Marquise Cut',
    image: '/shapes/marquise.webp',
    description: 'An elongated shape with pointed ends, creating an elegant, sophisticated look. Marquise cuts maximize carat weight and create the illusion of a larger stone, perfect for making a bold statement.',
  },
  {
    name: 'Emerald Cut',
    image: '/shapes/emerald.avif',
    description: 'A rectangular shape with step-cut facets that create a hall-of-mirrors effect. Emerald cuts offer understated elegance and exceptional clarity, ideal for those who appreciate refined sophistication.',
  },
  {
    name: 'Oval Cut',
    image: '/shapes/oval.avif',
    description: 'An elongated round shape that combines the brilliance of a round cut with an elegant silhouette. Oval cuts create the illusion of greater size and are perfect for engagement rings and fine jewelry.',
  },
  {
    name: 'Asscher Cut',
    image: '/shapes/asscher.webp',
    description: 'A square step-cut shape with cropped corners, offering a vintage Art Deco aesthetic. Asscher cuts feature exceptional clarity and a unique geometric beauty that appeals to discerning buyers.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

export default function ShopByShape() {
  const [ref, isInView] = useInView();
  const [selectedShape, setSelectedShape] = useState(null);

  const openModal = (shape) => {
    setSelectedShape(shape);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedShape(null);
    document.body.style.overflow = 'unset';
  };

  const handleContactClick = () => {
    closeModal();
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <section id="shapes" className="py-20 lg:py-28 bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        {/* Premium Typography Header Block */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 relative"
        >
          {/* Overline */}
          <p className="text-sm uppercase tracking-widest text-charcoal mb-6">
            Calibrated Natural Diamond Selections
          </p>

          {/* Massive Main Text - Serif Font */}
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-light text-charcoal tracking-tight leading-none">
            0.05 CTS — 3 CTS
          </h2>

          {/* Side Note - Bottom Right on Desktop, Centered on Mobile */}
          <p className="hidden md:block absolute bottom-0 right-0 text-sm italic text-charcoal text-opacity-80">
          </p>
          <p className="md:hidden text-sm italic text-charcoal text-opacity-80 mt-6 mb-8 md:mb-12">
            Ensuring reliability, consistency, and scalability.
          </p>
        </motion.div>

        {/* Shape Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 lg:gap-4 w-full"
        >
          {shapes.map((shape, index) => (
            <motion.button
               key={index}
               custom={index}
               variants={itemVariants}
               whileHover={{ scale: 1.05 }}
               onClick={() => openModal(shape)}
               className="flex flex-col items-center gap-3 cursor-pointer group bg-transparent border-none p-0"
             >
               <div className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center transition-all duration-500 overflow-hidden">
                 <img
                   src={shape.image}
                   alt={shape.name}
                   className="w-full h-full object-contain text-gray-300 group-hover:text-primary transition-colors duration-300"
                 />
               </div>
               <span className="text-xs md:text-sm lg:text-sm font-bold text-charcoal group-hover:text-primary transition-colors duration-300 uppercase tracking-wide text-center mt-3">
                 {shape.name}
               </span>
             </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedShape && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 z-10"
                aria-label="Close modal"
              >
                <X size={20} className="text-charcoal" />
              </button>

              <div className="p-8 md:p-10">
                {/* Shape Image */}
                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <img
                    src={selectedShape.image}
                    alt={selectedShape.name}
                    className="w-24 h-24 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal text-center mb-4">
                  {selectedShape.name}
                </h3>

                {/* Divider */}
                <div className="w-12 h-1 bg-primary mx-auto mb-6" />

                {/* Description */}
                <p className="text-gray-600 text-center leading-relaxed mb-6">
                  {selectedShape.description}
                </p>

                {/* Available Sizes */}
                <p className="text-center text-lg font-semibold text-charcoal mb-8">
                  Available Sizes: 0.05 Cts to 3 Cts
                </p>

                {/* CTA Button */}
                <button
                  onClick={handleContactClick}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Mail size={18} />
                  Contact Us
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
