import React from 'react';
import { ChevronDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/mock';
import { Button } from './ui/button';
import { portfolioAPI } from '../services/api';
import { useToast } from '../hooks/use-toast';

const Hero = () => {
  const { toast } = useToast();

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = async () => {
    try {
      const response = await portfolioAPI.downloadResume();
      toast({
        title: "Success!",
        description: response.message,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return <Github size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'mail':
        return <Mail size={20} />;
      default:
        return null;
    }
  };

  return (
    <section id="home" className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-lime-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-none">
            PAVITRA
            <span className="text-lime-400 block">BYALI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-2">
            {personalInfo.title}
          </p>
          <p className="text-lg text-lime-400 font-semibold tracking-wider">
            {personalInfo.tagline}
          </p>
        </div>

        {/* Bio */}
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          {personalInfo.bio}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={scrollToAbout}
            className="bg-lime-400 text-black hover:bg-lime-300 font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
          >
            Explore My Work
          </Button>
          <Button
            onClick={downloadResume}
            variant="outline"
            className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
          >
            <Download size={20} className="mr-2" />
            Download Resume
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-lime-400 transition-all duration-300 hover:scale-110"
              title={social.name}
            >
              {getSocialIcon(social.icon)}
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="text-gray-400 hover:text-lime-400 transition-colors duration-300 animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;