import React, { useState } from 'react';
import { config } from '../config';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="static top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-zinc-900">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-[32px] text-white font-heading font-bold uppercase text-left tracking-tight">
          {config.name}
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {config.navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${link.name === 'CV' ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a href={config.bookingUrl} className="btn bg-white text-black px-5 py-2 rounded-md text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-zinc-900 absolute w-full">
          <div className="flex flex-col p-6 gap-4">
            {config.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-zinc-400 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href={config.bookingUrl}
              className="btn bg-white text-black px-5 py-3 rounded-md text-center font-semibold hover:bg-zinc-200"
              onClick={() => setIsOpen(false)}
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
