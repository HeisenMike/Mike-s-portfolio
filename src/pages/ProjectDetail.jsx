import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  ArrowUpRight,
  Wrench,
  BarChart2,
  Tag,
  ChevronLeft,
  ChevronRight,
  Shield,
  Video,
  Code,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, getProjectBySlug } from '../data/projects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = project?.images ?? [];
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
  }, [slug]);

  useEffect(() => {
    images.forEach((image) => {
      const preload = new Image();
      preload.src = image;
    });
  }, [slug]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        showPreviousImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  // SEO: Update document title
  useEffect(() => {
    if (project) {
      document.title = `${project.role} | ${project.client} | Michael Estrella`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Project",
    "name": project.role,
    "description": project.narrative,
    "client": project.client,
    "category": project.category,
    "tools": project.tools,
    "images": images.map(img => `https://michaelestrella.com${img}`),
    "url": `https://michaelestrella.com/project/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {/* Back Link + Hero */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] border-b border-[var(--border-primary)]">
          <div className="container mx-auto max-w-6xl">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-colors mb-8 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start"
            >
              {/* Left: Image Gallery */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
                  {activeImage ? (
                    <img
                      src={activeImage}
                      alt={`${project.role} - Screen ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                      No visualization available
                    </div>
                  )}
                </div>

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={showPreviousImage}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--bg-card)]/90 backdrop-blur border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-lg transition-colors"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={showNextImage}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--bg-card)]/90 backdrop-blur border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-lg transition-colors"
                    >
                      <ChevronRight size={22} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === activeImageIndex
                              ? 'bg-[var(--accent-violet)] w-6'
                              : 'bg-[var(--text-muted)]/50 hover:bg-[var(--text-muted)]'
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Open Full Size Button */}
                {activeImage && (
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute right-4 bottom-4 z-10 px-4 py-2 rounded-lg bg-[var(--bg-card)]/90 backdrop-blur border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium flex items-center gap-1.5 shadow-lg transition-colors"
                  >
                    <ArrowUpRight size={14} className="text-[var(--accent-violet)]" />
                    View Full Size
                  </button>
                )}

                {/* Tools Tags below image */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] text-[var(--text-secondary)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Project Info */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent-violet)]/20 text-[var(--accent-violet)] text-xs font-medium uppercase tracking-wider mb-4">
                    {project.category}
                  </span>
                  <p className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-wider mb-2">{project.client}</p>
                  <h1 className="text-[42px] md:text-[56px] font-bold leading-[1.1] tracking-tight text-[var(--text-primary)]">
                    {project.role}
                  </h1>
                </div>

                <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-light max-w-xl">
                  {project.shortDescription}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border-primary)]">
                  <div className="text-center p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
                    <div className="text-3xl font-bold text-[var(--accent-emerald)]">{project.result.length}</div>
                    <div className="text-xs text-[var(--text-muted)]">Key Results</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
                    <div className="text-3xl font-bold text-[var(--accent-violet)]">{project.tools.length}</div>
                    <div className="text-xs text-[var(--text-muted)]">Tools Used</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
                    <div className="text-3xl font-bold text-[var(--accent-amber)]">{project.architecture.length}</div>
                    <div className="text-xs text-[var(--text-muted)]">Architecture Phases</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container mx-auto max-w-6xl px-6 py-16 space-y-20">

          {/* 1. The Narrative */}
          <section className="space-y-6" id="overview">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">The Problem & Solution</h2>
            <div className="prose prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed">
              <p>{project.narrative}</p>
            </div>
          </section>

          {/* 2. What It Does */}
          <section className="space-y-6 border-t border-[var(--border-primary)] pt-12" id="what-it-does">
            <div className="flex items-center gap-3">
              <Wrench className="w-6 h-6 text-[var(--accent-violet)]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">What It Does</h2>
            </div>
            <ul className="space-y-4">
              {project.whatItDoes.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--accent-violet)]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-violet)]/20 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-[var(--accent-violet)]" />
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-base">{item}</p>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* 3. Results */}
          <section className="space-y-6 border-t border-[var(--border-primary)] pt-12" id="results">
            <div className="flex items-center gap-3">
              <BarChart2 className="w-6 h-6 text-[var(--accent-emerald)]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Results</h2>
            </div>
            <ul className="space-y-4">
              {project.result.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--accent-emerald)]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-emerald)]/20 flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-5 h-5 text-[var(--accent-emerald)]" />
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-base">{item}</p>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* 4. Architecture */}
          <section className="space-y-6 border-t border-[var(--border-primary)] pt-12" id="architecture">
            <div className="flex items-center gap-3">
              <Tag className="w-6 h-6 text-[var(--accent-sky)]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">System Architecture</h2>
            </div>

            <div className="space-y-4">
              {project.architecture.map((step, idx) => {
                const parts = step.split(':');
                const label = parts[0];
                const description = parts.slice(1).join(':');

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative pl-12 pb-8 border-l-2 border-[var(--border-primary)] last:border-0 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[var(--accent-violet)] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{idx + 1}</span>
                    </div>
                    <div className="ml-4">
                      {description ? (
                        <>
                          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{label}</h3>
                          <p className="text-[var(--text-secondary)] leading-relaxed">{description}</p>
                        </>
                      ) : (
                        <p className="text-[var(--text-secondary)] leading-relaxed">{step}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 5. Error Handling & Reliability (NEW) */}
          <section className="space-y-6 border-t border-[var(--border-primary)] pt-12" id="reliability">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[var(--accent-sky)]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">Error Handling & Reliability</h2>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Production-grade automations need to handle failures gracefully. Here's how this workflow ensures reliability:
            </p>
            <ul className="space-y-4">
              {project.errorHandling.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--accent-sky)]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-sky)]/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[var(--accent-sky)]" />
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-base">{item}</p>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* 6. Demo / Proof */}
          {(project.demo.loomUrl || project.demo.n8nTemplateUrl || project.demo.liveDemoUrl) && (
            <section className="space-y-6 border-t border-[var(--border-primary)] pt-12" id="demo">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-[var(--accent-amber)]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">See It In Action</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {project.demo.loomUrl && (
                  <a
                    href={project.demo.loomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--accent-amber)]/30 hover:bg-[var(--bg-card-hover)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[var(--accent-amber)]/20 flex items-center justify-center flex-shrink-0">
                      <Video className="w-6 h-6 text-[var(--accent-amber)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">Video Walkthrough</h3>
                      <p className="text-xs text-[var(--text-muted)]">Loom • {project.demo.loomUrl.length > 50 ? 'External Link' : 'Watch Demo'}</p>
                    </div>
                    <ExternalLink className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--accent-amber)] transition-colors" />
                  </a>
                )}
                {project.demo.n8nTemplateUrl && (
                  <a
                    href={project.demo.n8nTemplateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--accent-violet)]/30 hover:bg-[var(--bg-card-hover)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[var(--accent-violet)]/20 flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-[var(--accent-violet)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">n8n Template</h3>
                      <p className="text-xs text-[var(--text-muted)]">Importable workflow JSON</p>
                    </div>
                    <ExternalLink className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--accent-violet)] transition-colors" />
                  </a>
                )}
                {project.demo.liveDemoUrl && (
                  <a
                    href={project.demo.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--accent-emerald)]/30 hover:bg-[var(--bg-card-hover)] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[var(--accent-emerald)]/20 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-[var(--accent-emerald)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">Live Demo</h3>
                      <p className="text-xs text-[var(--text-muted)]">Deployed workflow instance</p>
                    </div>
                    <ExternalLink className="ml-auto text-[var(--text-muted)] group-hover:text-[var(--accent-emerald)] transition-colors" />
                  </a>
                )}
              </div>
              {(!project.demo.loomUrl && !project.demo.n8nTemplateUrl && !project.demo.liveDemoUrl) && (
                <div className="text-center py-12 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl">
                  <p className="text-[var(--text-secondary)] mb-4">Demo materials coming soon</p>
                  <p className="text-[var(--text-muted)] text-sm">Loom walkthrough, n8n template export, and live demo links will be added here.</p>
                </div>
              )}
            </section>
          )}

        </div>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)]">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Have a similar problem?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-xl mx-auto">
              Let's talk about how automation can solve it for your business.
            </p>
            <Link
              to="/#hero"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors text-lg"
            >
              Book a Discovery Call
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* Footer minimal */}
        <footer className="py-8 px-6 border-t border-[var(--border-primary)]">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-muted)]">
            <p>© {new Date().getFullYear()} Michael Estrella. n8n & AI Automation Specialist.</p>
            <div className="flex items-center gap-4">
              <a href="/#projects" className="hover:text-[var(--accent-violet)] transition-colors">← All Projects</a>
              <a href="#overview" className="hover:text-[var(--accent-violet)] transition-colors">↑ Top</a>
            </div>
          </div>
        </footer>

        {/* LIGHTBOX */}
        {lightboxOpen && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 p-4"
            onClick={() => setLightboxOpen(false)}
          >
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

            <div className="max-w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={activeImage}
                alt={`${project.role} - Full size view`}
                decoding="async"
                className="max-w-full max-h-[85vh] object-contain rounded border border-zinc-800"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); showPreviousImage(); }}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-950/90 p-3 text-zinc-300 shadow-lg transition-colors hover:text-white"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); showNextImage(); }}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-950/90 p-3 text-zinc-300 shadow-lg transition-colors hover:text-white"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </article>
    </>
  );
};

export default ProjectDetail;