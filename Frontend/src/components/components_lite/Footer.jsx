import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 
      text-gray-300 py-16 mt-24 border-t border-purple-500/20 overflow-hidden">

      {/* Neon Glow Background */}
      <div className="absolute inset-0 bg-purple-600/10 blur-[120px] animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold 
            bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 
            bg-clip-text text-transparent 
            drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
            JobPortal
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Connecting talented professionals with top companies.  
            Find jobs, build careers, and grow your future with us.
          </p>

          <div className="flex gap-5 text-gray-300">
            <a href="#" className="hover:text-purple-400 hover:scale-110 transition">
              <Linkedin />
            </a>
            <a href="#" className="hover:text-purple-400 hover:scale-110 transition">
              <Github />
            </a>
            <a href="mailto:support@jobportal.com" className="hover:text-purple-400 hover:scale-110 transition">
              <Mail />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/browse" className="hover:text-purple-400 transition">Browse Jobs</Link></li>
            <li><Link to="/companies" className="hover:text-purple-400 transition">Companies</Link></li>
            <li><Link to="/register" className="hover:text-purple-400 transition">Create Account</Link></li>
            <li><Link to="/login" className="hover:text-purple-400 transition">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Contact Us</h3>
          <p className="text-gray-400 flex items-center gap-2">
            <Mail size={18} /> support@jobportal.com
          </p>
          <p className="text-gray-400 flex items-center gap-2">
            <Phone size={18} /> +91 98765 43210
          </p>
          <p className="text-gray-400">
            24/7 Support for Job Seekers & Recruiters
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="relative mt-12 border-t border-gray-700/50 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} JobPortal. All rights reserved.

        <div className="mt-3 flex justify-center gap-4">
          <Link to="/PrivacyPolicy" className="hover:text-purple-400 transition">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link to="/TermsofService" className="hover:text-purple-400 transition">
            Terms of Service
          </Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
