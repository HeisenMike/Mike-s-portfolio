import { useState, useEffect } from 'react';
import { X, ExternalLink, ArrowUpRight, Wrench, BarChart2, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const ProjectModal = ({ project, onClose }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = project.images ?? [];
  const activeImage = images[activeImageIndex];

  const showPreviousImage = () => {
    setActiveImageIndex((index) => (index - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((index) => (index + 1) % images.length);
  };

  useEffect(() => {
    setActiveImageIndex(0);
    setLightboxOpen(false);
  }, [project.id]);

  useEffect(() => {
    images.forEach((image) => {
      const preload = new Image();
      preload.src = image;
    });
  }, [project.id]);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, lightboxOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 15 }}
          className="bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-2xl w-full max-w-[1200px] h-full max-h-[800px] md:h-[86vh] grid grid-cols-1 md:grid-cols-[1.3fr_1fr] overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >

          {/* LEFT COLUMN: Fixed Image Stage */}
          <div className="bg-[var(--bg-primary)] p-2 md:p-3 flex flex-col justify-start items-center h-full border-b md:border-b-0 md:border-r border-[var(--border-primary)] relative min-h-[300px]">
            {activeImage ? (
              <div className="w-full flex-1 min-h-0 bg-[var(--bg-tertiary)]/30 rounded-xl border border-[var(--border-primary)] p-2 md:p-3 flex items-start justify-center relative overflow-hidden group">
                <img
                  src={activeImage}
                  alt="Active flow screen display state"
                  decoding="async"
                  className="max-w-full max-h-full object-contain rounded select-none shadow-md"
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      aria-label="Show previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-card)]/90 p-2 text-[var(--text-secondary)] shadow-lg transition-colors hover:text-[var(--text-primary)]"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      aria-label="Show next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-card)]/90 p-2 text-[var(--text-secondary)] shadow-lg transition-colors hover:text-[var(--text-primary)]"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <span className="absolute right-3 top-3 rounded-md border border-[var(--border-primary)] bg-[var(--bg-card)]/90 px-2 py-1 text-xs font-medium text-[var(--text-secondary)]">
                      {activeImageIndex + 1} / {images.length}
                    </span>
                  </>
                )}

                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute left-4 bottom-4 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-primary)] px-3 py-1.5 rounded-lg shadow-lg cursor-pointer transition-colors"
                >
                  Open full size <ArrowUpRight size={13} className="text-[var(--accent-violet)]" />
                </button>
              </div>
            ) : (
              <div className="text-[var(--text-muted)] text-sm font-light">
                No image visualization provided
              </div>
            )}
            {project.tools && project.tools.length > 0 && (
              <div className="mt-3 w-full shrink-0 border-t border-[var(--border-primary)] pt-3">
                <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  <Tag className="w-3.5 h-3.5 text-[var(--accent-sky)]" />
                  Built with
                </h4>

                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-primary)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Independent Scrolling Text Sheet */}
          <div className="p-6 md:p-10 space-y-8 overflow-y-auto text-left h-full relative bg-[var(--bg-primary)]">

            {/* Close X Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors z-20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Project Title Block */}
            <div className="space-y-6 pr-1">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                  Project Details // {project.client}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                  {project.title || project.role}
                </h3>
              </div>

              {/* 1. Core Narrative Block */}
              <p className="text-[var(--text-secondary)] text-sm md:text-base font-light leading-relaxed">
                {project.narrative || project.fullDescription}
              </p>

              {/* 2. Mechanics Check List (Renders conditionally if whatItDoes array exists) */}
              {project.whatItDoes && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-[var(--accent-violet)]" /> What It Does
                  </h4>
                  <ul className="space-y-2">
                    {project.whatItDoes.map((item, idx) => (
                      <li key={idx} className="text-sm font-light text-[var(--text-secondary)] leading-relaxed flex items-start gap-2.5">
                        <span className="text-[var(--accent-violet)] mt-2 block h-1 w-1 shrink-0 rounded-full bg-[var(--accent-violet)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. Outcomes Check List */}
              {project.result && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-2">
                    <BarChart2 className="w-3.5 h-3.5 text-[var(--accent-emerald)]" /> Results
                  </h4>
                  <ul className="space-y-2">
                    {project.result.map((item, idx) => (
                      <li key={idx} className="text-sm font-light text-[var(--text-secondary)] leading-relaxed flex items-start gap-2.5">
                        <span className="text-[var(--accent-emerald)] mt-2 block h-1 w-1 shrink-0 rounded-full bg-[var(--accent-emerald)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              {/* 4. System Architecture / Flow Deep-dive (Now with a clean intro sentence) */}
              {project.architecture && project.architecture.length > 0 && (
                <div className="pt-6 border-t border-[var(--border-primary)] space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                      How It All Works
                    </h4>

                    {project.architectureIntro && (
                      <p className="text-sm font-light text-[var(--text-secondary)] leading-relaxed">
                        {project.architectureIntro}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 pl-1">
                    {project.architecture.map((step, idx) => {
                      // Safely splits the string at the first colon to isolate the phase label
                      const parts = step.split(':');
                      const label = parts[0];
                      const description = parts.slice(1).join(':'); // Glues back anything after the first colon

                      return (
                        <li key={idx} className="text-sm font-light text-[var(--text-secondary)] leading-relaxed flex items-start gap-2.5">
                          <span className="text-[var(--accent-violet)] mt-2 block h-1 w-1 shrink-0 rounded-full bg-[var(--accent-violet)]" />
                          <div>
                            {description ? (
                              <>
                                <strong className="text-[var(--text-primary)] font-medium">
                                  {label}:
                                </strong>
                                {description}
                              </>
                            ) : (
                              step
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>

        </motion.div>
      </motion.div>

      {/* LIGHTBOX OVERLAY WINDOW LAYER */}
      {lightboxOpen && activeImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-card)] px-2.5 py-1.5 rounded-md border border-[var(--border-primary)] uppercase tracking-wider">
              Full-Size Workflow View
            </span>

            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="max-w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="High resolution diagram workflow full view"
              decoding="async"
              className="max-w-full max-h-[85vh] object-contain rounded border border-[var(--border-primary)]"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPreviousImage();
                  }}
                  aria-label="Show previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-card)]/90 p-3 text-[var(--text-secondary)] shadow-lg transition-colors hover:text-[var(--text-primary)]"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNextImage();
                  }}
                  aria-label="Show next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-card)]/90 p-3 text-[var(--text-secondary)] shadow-lg transition-colors hover:text-[var(--text-primary)]"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-[48px] text-[var(--text-primary)] font-heading font-bold mb-4">Projects</h2>
          <p className="text-[var(--text-secondary)] max-w-md">
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
              className="group cursor-pointer bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl overflow-hidden shadow-sm hover:border-[var(--accent-violet)]/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden bg-[var(--bg-tertiary)] flex items-center justify-center">
                {project.images?.[0] ? (
                  <img src={project.images[0]} alt={project.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-[var(--text-muted)] text-sm">Project image goes here</span>
                )}
                <span className="absolute top-3 left-3 bg-[var(--bg-primary)]/80 text-[var(--text-primary)] text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {project.category}
                </span>
              </div>

              <div className="p-5">
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-medium">{project.client}</span>
                <h3 className="text-lg font-heading font-bold text-[var(--text-primary)] mt-1 mb-2 leading-snug">{project.role}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">{project.shortDescription}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[var(--text-primary)] group-hover:gap-2 transition-all">
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