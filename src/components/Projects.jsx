import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-[48px] text-[var(--text-primary)] font-heading font-bold mb-4">Projects</h2>
          <p className="text-[var(--text-secondary)] max-w-md">
            Click any project to see the full case study with architecture, error handling, and results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.slug}`}
              className="group block"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl overflow-hidden shadow-sm hover:border-[var(--accent-violet)]/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden bg-[var(--bg-tertiary)] flex items-center justify-center">
                  {project.images?.[0] ? (
                    <img
                      src={project.images[0]}
                      alt={`${project.role} - Preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
                    View Case Study
                    <ExternalLink size={14} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;