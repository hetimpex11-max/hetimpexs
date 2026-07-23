import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Do you offer custom sorting based on specific requirements?',
    answer: 'Yes, we provide fully customized sorting services tailored to your exact specifications. Whether you need specific size ranges, color grades, clarity levels, or shape preferences, our team can sort and present your diamonds exactly as required. We work closely with each client to understand their unique needs and deliver accordingly.',
  },
  {
    question: 'What are your minimum order requirements?',
    answer: 'Our minimum order requirements vary depending on the product category and specifications. For standard inventory items, we typically accommodate orders starting from 0.50 carats. For custom manufacturing or special requests, we discuss quantities on a case-by-case basis to ensure feasibility and competitive pricing. Please reach out with your specific requirements for a detailed discussion.',
  },
  {
    question: 'How do you handle international shipping and logistics?',
    answer: 'We partner with trusted international courier and logistics providers to ensure secure, insured, and timely delivery of your diamonds worldwide. All shipments are fully tracked and insured from our Surat facility to your designated location. We handle all export documentation, customs clearance support, and provide real-time tracking updates throughout the transit process.',
  },
  {
    question: 'What payment terms and methods do you accept?',
    answer: 'We offer flexible and secure payment terms tailored to build long-term trust with our partners. For new clients, we typically require a 50% advance with the balance against shipping documents. For established relationships, we offer net payment terms. We accept wire transfers, letters of credit (LC), and other secure international payment methods. All transactions are conducted with full transparency and documentation.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, isInView] = useInView();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto" />
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our diamond sourcing, manufacturing, and export services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/20"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                <span className="text-base md:text-lg font-semibold text-charcoal pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10"
                >
                  <ChevronDown size={18} className="text-primary" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-500 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
