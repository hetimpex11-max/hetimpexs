import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Loose Diamonds', href: '#diamonds' },
  { name: 'Custom Jewelry', href: '#custom' },
  { name: 'Process', href: '#process' },
  { name: 'Quality', href: '#quality' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`absolute top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent'
      } border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24 lg:h-28">
          {/* Logo - Left on desktop, centered on mobile */}
          <div className="flex-1 flex justify-center md:justify-start">
            <a href="/" className="flex items-center">
              <img
                src="/full-logo.png"
                alt="HET IMPEX"
                className="h-24 md:h-32 lg:h-36 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white font-sans text-xs md:text-sm tracking-widest uppercase font-medium hover:text-amber-400 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-base font-medium text-white hover:text-amber-400 transition-colors tracking-widest uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
