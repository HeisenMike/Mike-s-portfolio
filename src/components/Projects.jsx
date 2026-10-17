import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import workflowProjectImage from '../assets/workflow-project-1.png';
import workflowProjectImage2 from '../assets/workflow-project-2.png';
import workflowProjectImage3 from '../assets/workflow-project-3.png';

const projects = [
  {
    id: 1,
    client: "Goods+Gadgets GmbH",
    title: "AI-Powered Shopify Product Enrichment Automation",
    category: "Product Data Enrichment",
    shortDescription: "Turned scattered marketplace listing data and customer sentiment from Amazon, eBay, and Alibaba into structured, high-converting product pages at scale.",

    // 1. The Narrative Introduction
    narrative: "Manually writing listings, hunting down specs, and digging through competitor reviews eats up a massive amount of time. To solve this, I built an n8n automation that lets the client manage catalog audits and SEO updates directly inside Airtable. With one click, the system triggers 5 parallel scraping workflows, scores product matches using a custom AI similarity matrix, and runs a consensus check to catch typos. It then mines German and English reviews for real competitor flaws, feeding those insights into an automated copywriting agent to push optimized, marketplace-ready descriptions straight back into Airtable.",



    // 2. What it does
    whatItDoes: [
      "Triggers instantly when an operator selects a target product inside the Airtable user interface.",
      "Spawns 5 parallel extraction sub-workflows targeting Amazon EAN, Amazon ASIN, eBay, OTTO.de, and Alibaba simultaneously.",
      "Uses a weighted AI similarity matrix (40% image, 35% text meaning, 25% technical attributes) to output strict MATCH or REJECT verdicts.",
      "Executes a central Technical Specification Consensus Engine to establish majority-backed data baselines and isolate up to 10 key outliers.",
      "Harvests raw bilingual customer review arrays across German and English platforms, discarding single-mention noise.",
      "Determines product copy tonality dynamically (Sie-Form vs. Du-Form) based on individual product price thresholds.",
      "Formats final outputs into strict HTML block structures and sanitized comma-separated keyword fields before database delivery."
    ],

    // 3. Result (UPDATED: Concrete, high-converting metrics)

    result: [
      "First live deployment parsed the entire active catalog of 200+ products in 24 hours.",
      "Found exact match signals across competitor marketplaces for 70+ listings (including EANs and ASINs); remaining 130+ items with completely generic titles were automatically grouped and flagged for human mapping.",
      "AI evaluation layer successfully filtered out false-positive listings where a competitor used a similar title but a completely different brand or part number.",
      "Flagged existing catalog errors (including incorrect weights that were messing up checkout shipping rules and flat-out typos in dimensions).",
      "Scraped 10+ customer reviews across Amazon and eBay for each product, using an LLM to extract the top 3 product complaints—giving the copywriting team the exact objections to answer on the Shopify pages.",
      "Cut 10 to 12 hours of manual labor per week for client, automating the entire competitor pricing and specification routine."
    ],


    // 4. Built with
    tools: ["n8n", "OpenAI", "Apify", "RapidAPI", "Google Sheets", "Airtable"],

    // 5. Deep Dive / Architecture Paragraph (UPDATED: Reflecting success metrics)
    architecture: "The workflow initiates inside Airtable, where selecting a target product triggers Phase 1, splitting the pipeline into 5 parallel sub-workflows (Amazon EAN, Amazon ASIN, eBay, OTTO.de, and Alibaba) to harvest candidate data. In Phase 2, a central Technical Specification Consensus Engine aggregates these inputs to run a majority-vote verification. By ignoring marketplace metadata and standardizing all units, this core AI maps clean data profiles, flags conflicting splits, and ranks the 10 most significant specification outliers into a strict structural JSON schema. Phase 3 passes these records into a cross-border review-scraping loop to extract high-frequency praise and complaint patterns. In Phase 4, an E-Commerce Copywriting AI maps these raw insights to a strict data-driven conversion framework—dynamically adapting German tonality rules by price point and neutralizing rival weaknesses with an automated USP. Finally, a specialized Information Extractor serves as a structural formatting firewall, sanitizing the text dumps into valid comma-separated keywords and embedding specific HTML bold tags before updating Airtable for final client approval.",

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
  // NEW STATE: Tracks if the full-resolution lightbox is currently active
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        // If the lightbox is open, pressing Escape closes ONLY the lightbox first
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

                {/* NEW BUTTON: Triggers the lightboxOpen state on click */}
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
