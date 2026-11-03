import React from 'react';
import { config } from '../config';
import { ArrowRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import AutomationFlow from './AutomationFlow';

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#1C0C30]/40 via-violet-900/10 to-transparent rounded-full blur-[140px] pointer-events-none dark:block hidden" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none dark:block hidden" />
      {/* Light mode glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-200/30 via-fuchsia-200/20 to-transparent rounded-full blur-[140px] pointer-events-none light:block dark:hidden" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-fuchsia-200/20 rounded-full blur-[100px] pointer-events-none light:block dark:hidden" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-12rem)]">

          {/* LEFT COLUMN: Content */}
          <div className="max-w-xl lg:max-w-none">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)] text-sm font-medium mb-8"
            >
              <Cpu size={14} className="text-[var(--accent-violet)] animate-pulse" />
              <span>{config.role}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[48px] md:text-[68px] font-bold leading-[1.05] tracking-tight mb-6 text-[var(--text-primary)]"
            >
              I fix business problems.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-violet)] via-[var(--accent-fuchsia)] to-[var(--accent-orange)]">
                Automation
              </span>{' '}
              is just how.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-12 font-light"
            >
              {config.description}
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="#projects"
                className="btn btn-primary"
              >
                Explore My Work
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Animated Automation Flow */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <AutomationFlow className="max-w-[600px] mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;