import React, { useState } from 'react';
import { config } from '../config';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="static top-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-sm border-b border-[var(--border-primary)]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-[32px] text-[var(--text-primary)] font-heading font-bold uppercase text-left tracking-tight">
          {config.name}
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {config.navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${link.name === 'CV' ? 'text-[var(--text-muted)] hover:text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a href={config.bookingUrl} className="btn btn-primary px-5 py-2 rounded-md text-sm font-semibold">
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[var(--bg-primary)] border-t border-[var(--border-primary)] absolute w-full left-0 top-full">
          <div className="flex flex-col p-6 gap-4">
            {config.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <a
              href={config.bookingUrl}
              className="btn btn-primary px-5 py-3 rounded-md text-center font-semibold"
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