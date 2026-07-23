import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Link } from 'react-router-dom';

export default function CustomJewellery() {
  const [ref, isInView] = useInView();

  return (
    <section id="custom-jewellery" className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-white">
      {/* Background Image */}
      <img
        src="/hero.png"
        alt="Custom Jewellery"
        className="absolute inset-0 w-full h-full object-cover object-left md:object-[10%_center] z-0"
      />

      {/* Content Layout - Floating on the Right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex justify-end">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full md:w-[45%] lg:w-[38%] flex flex-col items-center text-center"
        >
          {/* Overline */}
          <p className="text-xs md:text-sm uppercase tracking-widest text-[#1A1A1A] font-bold mb-4">
            SOMETHING NEW, ETERNAL BANDS
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1A1A1A] tracking-tight leading-tight mb-16">
            Your Promise,<br/>Our Forever Ring
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">
                 Your vision to life. HET IMPEX crafts premium diamonds into your custom masterpiece.
          </p>

          {/* Stacked Buttons */}
          <div className="flex flex-col w-full gap-4">
            <Link
              to="/customize"
              className="w-full px-8 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold text-sm uppercase tracking-wider rounded hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 text-center"
            >
              EXPLORE CUSTOM DESIGNS
            </Link>
            <button className="w-full px-8 py-4 text-[#1A1A1A] font-bold text-sm uppercase tracking-wider rounded hover:bg-gray-100 transition-all duration-300">
              BOOK A CONSULTATION
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
