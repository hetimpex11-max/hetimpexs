import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@het_impex',
    href: 'https://instagram.com/het_impex',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'HET IMPEX',
    href: 'https://linkedin.com/company/het-impex',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'HET IMPEX',
    href: 'https://www.facebook.com/profile.php?id=61583693554782',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <img src="/full-logo.png" alt="HET IMPEX" className="h-24 md:h-32 lg:h-40 w-auto object-contain mx-auto md:mx-0 mb-4" />
            <p className="text-gray-500 leading-relaxed">
              Crafting excellence in diamonds through experience, precision, and innovation.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-gray-600 text-sm">
                Mahidharpura, Surat, Gujarat, India
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <a
                href="tel:+918866753519"
                className="text-gray-600 text-sm hover:text-primary transition-colors duration-300"
              >
                +91 88667 53519
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <a
                href="mailto:hetimpex11@gmail.com"
                className="text-gray-600 text-sm hover:text-primary transition-colors duration-300"
              >
                hetimpex11@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-gray-600 text-sm">
                Monday – Saturday, 9:00 AM – 7:00 PM (IST)
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
              Connect With Us
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-gray-500 hover:text-primary transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-1">
              {socialLinks.map((social, index) => (
                <p key={index} className="text-sm text-gray-500">
                  <span className="font-medium text-charcoal">{social.name}:</span> {social.handle}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} HET IMPEX. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Crafted with precision in Surat, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
