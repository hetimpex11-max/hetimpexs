import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [ref, isInView] = useInView();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirements: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name: formData.name,
      company: formData.company || null,
      email: formData.email,
      phone: formData.phone || null,
      subject: 'Inquiry from Website',
      message: formData.requirements
    };

    console.log('Inquiry payload:', payload);

    const { data, error } = await supabase
      .from('inquiries')
      .insert([payload])
      .select()
      .single();

    console.log('Inquiry result:', data, error);

    if (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry. Please try again.');
    } else {
      toast.success('Thank you! Your inquiry has been submitted successfully.');
      setFormData({ name: '', company: '', email: '', phone: '', requirements: '' });
    }

    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
            Let's Connect
          </h2>
          <div className="mt-4 w-16 h-1 bg-primary mx-auto" />
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Looking for a trusted diamond manufacturing and sourcing partner? Get in touch with our team to discuss your requirements, request quotations, or explore long-term business opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white border border-gray-100 rounded-lg p-8 lg:p-12"
        >
          <h3 className="text-2xl font-bold text-charcoal mb-2">
            Send Us Your Requirements
          </h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looking for a trusted diamond manufacturing and sourcing partner? Get in touch with our team to discuss your diamond requirements, request quotations, or explore long-term business opportunities.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-600 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-600 mb-2">
                Requirements / Message *
              </label>
              <textarea
                id="requirements"
                required
                rows={6}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
                placeholder="Tell us about your diamond requirements, specifications, quantities, or any questions you have..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white font-medium rounded hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
