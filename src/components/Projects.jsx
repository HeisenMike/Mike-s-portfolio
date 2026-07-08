import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Wrench, BarChart2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import workflowProjectImage from '../assets/workflow-project-1.png';
import workflowProjectImage2 from '../assets/workflow-project-2.png';
import workflowProjectImage3 from '../assets/workflow-project-3.png';

const projects = [
  {
    id: 1,
    client: "Goods+Gadgets GmbH",
    role: "AI-Powered Shopify Product Enrichment Workflow",
    category: "Product Data Enrichment",
    shortDescription: "Built an AI-powered Shopify enrichment workflow that gathers competitor data, validates product matches, analyzes reviews, and generates reliable product insights at scale.",
    fullDescription:
      "Built an AI-powered Shopify product enrichment automation for an ecommerce retail client, designed to improve product data, SEO content, and marketplace research at scale.\n\n" +
      "The workflow retrieves product rows and API credentials from Google Sheets, then searches matching competitor products across Amazon, eBay, Alibaba, and Otto.de using ASINs, EANs, product titles, and brand signals. AI agents validate product similarity, filter poor matches, consolidate technical specifications, and identify majority-backed product details while flagging outlier data for review.\n\n" +
      "The system also gathers customer reviews from Shopify and competitor marketplaces, then analyzes recurring praise, complaints, and product positioning opportunities. The result is an automated enrichment pipeline that turns scattered marketplace data into reliable product insights for stronger Shopify product pages, better search visibility, and faster ecommerce operations.",
    tools: ["n8n", "Apify", "RapidAPI", "Google Sheets", "Airtable"],
    results: [
      "Automated competitor product discovery across Amazon, eBay, Alibaba, and Otto.de using ASIN, EAN, title, and brand signals.",
      "Used AI similarity scoring and consensus analysis to validate matches, consolidate product specifications, and flag unreliable data.",
      "Mined marketplace reviews to surface recurring customer praise, complaints, and SEO-focused product positioning opportunities."
    ],
    image: workflowProjectImage,
  },
  {
    id: 2,
    client: "Justin Cook Talent Management",
    role: "Apollo AI Lead Scoring & Cold Outreach Automation",
    category: "Lead Generation Automation",
    shortDescription: "AI workflow that finds verified B2B leads, scores them against an ideal client profile, and generates personalized cold outreach emails.",
    fullDescription: "Built a fully automated B2B lead generation and outreach pipeline for a talent management client, designed to identify high-fit prospects and engage them with personalized cold emails at scale.\n\n" +
      "The workflow starts by scraping verified leads from Apollo via Apify, filtered by industry, company size, location, and seniority. Each lead is then scored by an AI agent against a defined Ideal Client Profile across three weighted dimensions: company relevance, ICP match, and partnership value. Only leads scoring 70 or above are passed to the outreach stage.\n\n" +
      "Qualified leads trigger a second AI agent that writes a personalized cold email referencing the company's industry, size, and pain points — with a low-friction CTA. Emails are sent via Gmail, thread IDs are captured for follow-up tracking, and all results are logged back to Google Sheets. A daily reporting sheet tracks messages sent, responses, and follow-up counts per campaign.",
    tools: ["n8n", "Apify", "Google Sheets", "Gmail"],
    results: ["Scraped and filtered verified B2B leads from Apollo using industry, company size, location, and seniority signals via Apify.", "AI-scored every lead against a weighted Ideal Client Profile — only companies scoring 70+ across relevance, ICP match, and partnership value proceed to outreach.", "Auto-generated personalized cold emails per lead using Google Gemini, with thread tracking and daily campaign reporting logged back to Google Sheets."],
    image: workflowProjectImage2,
  },
  {
    id: 3,
    client: "Goods+Gadgets GmbH",
    role: "Amazon Review Monitor & AI Policy Audit Automation",
    category: "E-commerce Review Management",
    shortDescription: "Built a scheduled automation that scrapes Amazon.de reviews by star rating, runs each low-star review through an AI policy audit, and surfaces removable violations directly to the support team.",
    fullDescription: "Built an automated Amazon review monitoring and compliance pipeline for a German e-commerce client, designed to protect product ratings by identifying reviews that violate Amazon's Customer Reviews Policy.\n\n" +
      "The workflow runs on a schedule and pulls the latest reviews across all five star ratings for every tracked ASIN on Amazon.de using the Apify review scraper. Low-star reviews (1★ to 3★) are routed through a two-stage AI audit powered by Google Gemini: the first stage detects potential violations across 10 policy categories, and the second stage classifies the strongest violation and extracts the exact offending snippet with a policy citation.\n\n" +
      "Reviews that pass the violation check are flagged with a removal likelihood score — Highly Likely, Likely, or Low — and automatically logged to an Action Required sheet with all the context a support agent needs to open an Amazon case. All reviews across every star rating are simultaneously stored in a MySQL database for historical tracking and trend analysis. The result is a hands-off compliance monitor that catches policy-violating reviews faster than any manual process could.",
    tools: ["n8n", "Apify", "Google Sheets", "MySQL"],
    results: ["Scraped Amazon.de reviews across all five star ratings per ASIN on a recurring schedule, storing every review in MySQL for historical tracking and trend analysis.", "Ran 1★–3★ reviews through a two-stage AI audit (Google Gemini) that detects policy violations across 10 categories and assigns a removal likelihood score — Highly Likely, Likely, or Low.", "Automatically surfaced flagged reviews to the support team via an Action Required sheet, complete with the offending snippet, violation category, Amazon policy citation, and case status."],
    image: workflowProjectImage3,
  },
];

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 md:h-72 w-full flex-shrink-0 bg-gray-100 flex items-center justify-center">
          {project.image ? (
            <img src={project.image} alt={project.client} className="w-full h-full object-cover" />
          ) : (
            <span className="text-zinc-500 text-sm">Project image goes here</span>
          )}
          <span className="absolute top-4 left-4 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Tag size={11} />
            {project.category}
          </span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 md:p-8">
          <div className="mb-6">
            <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">{project.client}</span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1 leading-tight">
              {project.role}
            </h3>
          </div>

          <p className="text-zinc-300 leading-relaxed mb-8 whitespace-pre-line">
            {project.fullDescription}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Wrench size={16} className="text-gray-500" />
                <span className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">Tools Used</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, i) => (
                  <span key={i} className="bg-white border border-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 size={16} className="text-gray-500" />
                <span className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">Key Highlights</span>
              </div>
              <ul className="space-y-2">
                {project.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 text-center bg-white text-black font-semibold py-3 px-6 rounded-xl hover:bg-white transition-colors"
            >
              Work With Me
            </a>
            <button
              onClick={onClose}
              className="flex-1 text-center border border-gray-200 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
