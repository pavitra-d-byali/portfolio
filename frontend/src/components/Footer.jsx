import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-lime-400">
              Pavitra<span className="text-white">.dev</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              {personalInfo.tagline} - Building the future with AI and innovative technology solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => document.querySelector(`#${link.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-lime-400 transition-colors text-left text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Get In Touch</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">{personalInfo.location}</p>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="text-gray-400 hover:text-lime-400 transition-colors block"
              >
                {personalInfo.email}
              </a>
              <a 
                href={`tel:${personalInfo.phone}`}
                className="text-gray-400 hover:text-lime-400 transition-colors block"
              >
                {personalInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} {personalInfo.displayName}. All rights reserved.
            </div>

            {/* Made with love */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="text-red-400" size={16} />
              <span>using</span>
              <Code className="text-lime-400" size={16} />
              <span>and</span>
              <Coffee className="text-yellow-400" size={16} />
            </div>

            {/* Tech Stack */}
            <div className="text-gray-400 text-sm">
              Built with React & Tailwind CSS
            </div>
          </div>
        </div>

        {/* Additional Footer Note */}
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-xs">
            This portfolio showcases my journey as an AI/ML engineering student. 
            Currently seeking internship opportunities and exciting projects to contribute to.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;