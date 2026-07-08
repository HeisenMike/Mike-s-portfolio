import React from 'react';
import { config } from '../config';
import { ArrowRight, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#1C0C30]/40 via-violet-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium mb-8"
          >
            <Cpu size={14} className="text-violet-400 animate-pulse" />
            <span>{config.role}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[48px] md:text-[68px] font-bold leading-[1.05] tracking-tight mb-6"
          >
            Automating the Complex.<br />
            Connecting Everything with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-[#ff6b57]">
              n8n
            </span>.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-12 font-light"
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
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Explore My Work
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;