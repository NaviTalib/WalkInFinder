import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Heart, Code2, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-white text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center group focus:outline-none">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 340 75" 
                className="h-9 w-auto"
              >
                <defs>
                  <linearGradient id="footerBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
                <g transform="translate(6, 6)">
                  <rect x="0" y="0" width="63" height="63" rx="16" fill="url(#footerBrandGrad)" />
                  <circle cx="26.5" cy="25" r="9" fill="none" stroke="white" strokeWidth="4" />
                  <line x1="33" y1="32" x2="44" y2="43" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="26.5" cy="25" r="3" fill="white" opacity="0.4" />
                </g>
                <text x="84" y="38" fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontSize="27" fontWeight="800" fill="#0f172a" letterSpacing="-0.5">
                  WalkIn<tspan fill="#4f46e5">Finder</tspan>
                </text>
                <text x="86" y="56" fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" fontSize="11.5" fontWeight="700" fill="#64748b" letterSpacing="1.8">
                  VERIFIED DRIVES
                </text>
              </svg>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your trusted platform to discover verified walk-in interviews, corporate job drives, and career growth opportunities near you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Quick Links</h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-indigo-600 transition">Home Dashboard</Link>
              </li>
              <li>
                <Link to="/post" className="hover:text-indigo-600 transition">Post a Walk-in Drive</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-indigo-600 transition">My Profile</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-600 transition">Sign In / Register</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Support & Inquiries</h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-indigo-600 flex-shrink-0" />
                <a 
                  href="https://navi-talib.vercel.app/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-indigo-600 transition underline underline-offset-2"
                >
                  Contact Developer
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-indigo-600 flex-shrink-0" />
                <span>Global Remote / Tech Hub</span>
              </li>
            </ul>
          </div>

          {/* Developer Credit Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">About The Developer</h3>
            <p className="text-sm text-gray-500">
              This application is designed, built, and maintained by Navi Talib.
            </p>
            <div>
              <a 
                href="https://navi-talib.vercel.app/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-100 transition border border-indigo-100"
              >
                <Code2 size={17} />
                <span>Portfolio & Profile</span>
                <ExternalLink size={14} className="opacity-70" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {currentYear} WalkInFinder. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Designed & Developed with <Heart size={13} className="text-red-500 fill-red-500" /> by <span className="font-semibold text-gray-700">Navi Talib</span>.
          </p>
        </div>

      </div>
    </footer>
  );
}