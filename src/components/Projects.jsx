import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import workflowProjectImage from '../assets/workflow-project-1.png';
import workflowProjectImage2 from '../assets/workflow-project-2.png';
import workflowProjectImage3 from '../assets/workflow-project-3.png';

const ProjectModal = ({ project, onClose }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, lightboxOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 15 }}
          className="bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-2xl w-full max-w-[1200px] h-full max-h-[800px] md:h-[86vh] grid grid-cols-1 md:grid-cols-[1.3fr_1fr] overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >

          {/* LEFT COLUMN: Fixed Image Stage */}
          <div className="bg-black p-6 md:p-8 flex flex-col justify-center items-center h-full border-b md:border-b-0 md:border-r border-zinc-800 relative min-h-[300px]">
            {project.image ? (
              <div className="w-full h-full max-h-[360px] bg-zinc-900/30 rounded-xl border border-zinc-800 p-4 flex items-center justify-center relative overflow-hidden group">
                <img
                  src={project.image}
                  alt="Active flow screen display state"
                  className="max-w-full max-h-full object-contain rounded select-none shadow-md"
                />

                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute left-4 bottom-4 text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg shadow-lg cursor-pointer transition-colors"
                >
                  Open full size <ArrowUpRight size={13} className="text-violet-400" />
                </button>
              </div>
            ) : (
              <div className="text-zinc-600 text-sm font-light">
                No image visualization provided
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Independent Scrolling Text Sheet */}
          <div className="p-6 md:p-10 space-y-6 overflow-y-auto text-left h-full relative bg-zinc-950">

            {/* Close X Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Project Title Block */}
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 block mb-1">
                Project Details // {project.client}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>

            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              {project.narrative}
            </p>
          </div>

        </motion.div>
      </motion.div>

      {/* NEW: LIGHTBOX OVERLAY WINDOW (Renders completely on top of everything) */}
      <AnimatePresence>
        {lightboxOpen && project.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxOpen(false)} // Clicking backdrop closes full view
          >
            {/* Upper control overlay toolbar */}
            <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
              <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2.5 py-1.5 rounded-md border border-zinc-800 uppercase tracking-wider">
                Full-Size Workflow View
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Maximized display viewport image wrapper */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className="max-w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevents accidental closing when clicking image directly
            >
              <img
                src={project.image}
                alt="High resolution diagram workflow full view"
                className="max-w-full max-h-[85vh] object-contain rounded border border-zinc-800"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};



const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 bg-black border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-[48px] text-white font-heading font-bold mb-4">Projects</h2>
          <p className="text-gray-400 max-w-md">
            Click any project to see full details.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative h-52 overflow-hidden bg-gray-100 flex items-center justify-center">
                {project.image ? (
                  <img src={project.image} alt={project.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-gray-400 text-sm">Project image goes here</span>
                )}
                <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {project.category}
                </span>
              </div>

              <div className="p-5">
                <span className="text-xs text-zinc-400 uppercase tracking-widest font-medium">{project.client}</span>
                <h3 className="text-lg font-heading font-bold text-white mt-1 mb-2 leading-snug">{project.role}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{project.shortDescription}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                  View Details
                  <ExternalLink size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
