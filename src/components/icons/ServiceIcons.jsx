import React from 'react';

/**
 * Custom Service Icons
 * Each icon is designed to be unique to your brand and service offering.
 * All icons use currentColor for seamless theming (light/dark mode).
 * Size: 32x32 viewBox, stroke-width: 1.5 for consistency.
 */

// 1. Workflow Automation — Gears connected in a flow
export const WorkflowAutomationIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Left gear */}
    <circle cx="10" cy="16" r="6" />
    <circle cx="10" cy="16" r="2" />
    <path d="M10 4v2M10 26v2M4 16h2M26 16h2M5.6 5.6l1.4 1.4M23.6 23.6l1.4 1.4M5.6 26.4l1.4-1.4M23.6 8.4l1.4-1.4" />
    {/* Connection line */}
    <path d="M16 16h4" strokeDasharray="4 4" opacity="0.6" />
    {/* Right gear (smaller) */}
    <circle cx="24" cy="16" r="4" />
    <circle cx="24" cy="16" r="1.5" />
    <path d="M24 13v2M24 21v2M20 16h2M28 16h2M21.2 13.2l1.1 1.1M26.8 26.8l1.1 1.1M21.2 24.8l1.1-1.1M26.8 15.2l1.1-1.1" />
    {/* Sparkles indicating automation */}
    <path d="M17 9l1 2 2 0-1.5 1.5 0.5 2-2-1 0 2 2 0-1.5-1.5 1-2-2 0" strokeWidth="1" opacity="0.8" />
    <path d="M27 6l0.5 1 1 0-0.75 0.75 0.25 1-1-0.5 0 1 1 0-0.75-0.75 0.5-1-1 0" strokeWidth="1" opacity="0.6" transform="scale(0.6) translate(8, 10)" />
  </svg>
);

// 2. AI That Does the Busywork — Brain with sparkles/wand
export const AIBusyworkIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Brain outline */}
    <path d="M16 3C9 3 4 7 4 12c0 3.5 2 6.5 5 8.5 1.5 1 3.5 1.5 5.5 1.5s4-0.5 5.5-1.5c3-2 5-5 5-8.5C28 7 23 3 16 3z" />
    {/* Brain hemispheres */}
    <path d="M16 3v2M16 27v2" strokeWidth="1" />
    {/* Left hemisphere folds */}
    <path d="M9 10c2-1 4-1 6 0M9 14c2 0 4 0 6 0M9 18c2 1 4 1 6 0" strokeWidth="1" />
    {/* Right hemisphere folds */}
    <path d="M17 10c2-1 4-1 6 0M17 14c2 0 4 0 6 0M17 18c2 1 4 1 6 0" strokeWidth="1" />
    {/* AI sparkles on top */}
    <path d="M14 4l1 2 2 0-1.5 1.5 0.5 2-2-1 0 2 2 0-1.5-1.5 1-2-2 0" strokeWidth="1.2" />
    <path d="M18 4l1 2 2 0-1.5 1.5 0.5 2-2-1 0 2 2 0-1.5-1.5 1-2-2 0" strokeWidth="1" opacity="0.6" transform="translate(2, -1)" />
  </svg>
);

// 3. Missing Integration — Puzzle piece + API connection
export const MissingIntegrationIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Puzzle piece - left part */}
    <path d="M8 10v12c0 3 2 5 5 5h4" />
    <path d="M17 15c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5" />
    <path d="M20.5 10c1.5 0 3 1.5 3 3.5" />
    {/* Puzzle piece - right part (detached) */}
    <path d="M24 10h4c3 0 5 2 5 5v4" strokeDasharray="6 4" opacity="0.5" />
    <path d="M27 15c0-2-1.5-3.5-3.5-3.5s-3.5 1.5-3.5 3.5" strokeDasharray="6 4" opacity="0.5" />
    {/* Connection arrows */}
    <path d="M18 20l3-3 3 3" strokeWidth="1.2" />
    <path d="M21 17v6" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    {/* Code brackets indicating API */}
    <path d="M6 20l3 3-3 3" strokeWidth="1.5" opacity="0.7" />
    <path d="M26 12l3 3-3 3" strokeWidth="1.5" opacity="0.7" />
  </svg>
);

// 4. Reports and Dashboards — Bar chart with trend line
export const ReportsDashboardsIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Y axis */}
    <path d="M6 26v-18" />
    {/* X axis */}
    <path d="M6 26h20" />
    {/* Bars */}
    <rect x="9" y="18" width="5" height="8" rx="1" />
    <rect x="16" y="12" width="5" height="14" rx="1" />
    <rect x="23" y="15" width="5" height="11" rx="1" />
    {/* Trend line connecting tops */}
    <path d="M11.5 18l4.5-6 4.5 3 4.5-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    {/* Dots on trend line */}
    <circle cx="11.5" cy="18" r="1.5" fill="currentColor" stroke="var(--bg-primary)" strokeWidth="2" />
    <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="var(--bg-primary)" strokeWidth="2" />
    <circle cx="20.5" cy="15" r="1.5" fill="currentColor" stroke="var(--bg-primary)" strokeWidth="2" />
    <circle cx="25" cy="12" r="1.5" fill="currentColor" stroke="var(--bg-primary)" strokeWidth="2" />
  </svg>
);

// 5. Stop Answering the Same Questions — Chat bubble with checkmark + clock
export const ChatAssistantIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Chat bubble */}
    <path d="M6 6h20a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H8l-4 4v-4H6a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
    {/* Checkmark inside bubble */}
    <path d="M10 16l3 3 6-6" strokeWidth="2" />
    {/* Clock indicating 24/7 */}
    <circle cx="22" cy="20" r="4" strokeWidth="1.2" />
    <path d="M22 18v2l1.5 1.5" strokeWidth="1.2" />
    {/* Small sparkles for AI */}
    <path d="M6 10l0.5 1 1 0-0.75 0.75 0.25 1-1-0.5 0 1 1 0-0.75-0.75 0.5-1-1 0" strokeWidth="0.8" opacity="0.6" transform="scale(0.5) translate(-2, 4)" />
  </svg>
);

// 6. Automations That Don't Break — Shield with refresh/circuit
export const ReliableAutomationsIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Shield outline */}
    <path d="M16 3L6 8v10c0 5 4 9 10 9s10-4 10-9V8L16 3z" />
    {/* Refresh/circuit arrow inside shield */}
    <path d="M16 10a4 4 0 0 1 4 4" />
    <path d="M20 14l-2 2-2-2" />
    {/* Checkmark for success */}
    <path d="M10 16l2 2 5-5" strokeWidth="2" />
    {/* Circuit nodes on shield edge */}
    <circle cx="9" cy="10" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="23" cy="10" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="9" cy="20" r="1" fill="currentColor" opacity="0.6" />
    <circle cx="23" cy="20" r="1" fill="currentColor" opacity="0.6" />
  </svg>
);

// 7. Voice AI (Bonus - for future services) — Phone with sound waves + sparkle
export const VoiceAIIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Phone handset */}
    <path d="M16 4a6 6 0 0 0-6 6v8a6 6 0 0 0 12 0V10a6 6 0 0 0-6-6z" />
    <path d="M10 6v-2a2 2 0 0 1 4 0v2" />
    {/* Sound waves */}
    <path d="M22 16c0 3-2 5-4 5" strokeWidth="1.2" />
    <path d="M24 13c0 5-3 8-6 8" strokeWidth="1" />
    <path d="M26 10c0 7-5 11-10 11" strokeWidth="0.8" opacity="0.5" />
    {/* AI sparkle */}
    <path d="M8 6l1 2 2 0-1.5 1.5 0.5 2-2-1 0 2 2 0-1.5-1.5 1-2-2 0" strokeWidth="1" opacity="0.8" transform="scale(0.6) translate(-4, 2)" />
  </svg>
);

// 8. Data Enrichment (Bonus) — Database with wand/magic
export const DataEnrichmentIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    {/* Database cylinder */}
    <ellipse cx="16" cy="8" rx="10" ry="3" />
    <path d="M6 8v16" />
    <path d="M26 8v16" />
    <ellipse cx="16" cy="24" rx="10" ry="3" />
    {/* Database layers */}
    <ellipse cx="16" cy="14" rx="10" ry="3" strokeWidth="0.8" opacity="0.4" />
    <ellipse cx="16" cy="20" rx="10" ry="3" strokeWidth="0.8" opacity="0.4" />
    {/* Magic wand */}
    <path d="M8 6l8 8" strokeWidth="2" />
    <path d="M16 6l-4 4M16 6l4 4" strokeWidth="1.5" />
    <circle cx="16" cy="6" r="2" strokeWidth="1.5" />
    {/* Sparkles */}
    <path d="M6 10l0.5 1 1 0-0.75 0.75 0.25 1-1-0.5 0 1 1 0-0.75-0.75 0.5-1-1 0" strokeWidth="0.8" opacity="0.7" transform="scale(0.5) translate(0, 2)" />
  </svg>
);

// Icon map for easy lookup
export const serviceIcons = {
  'Workflow Automation': WorkflowAutomationIcon,
  'AI That Does the Busywork': AIBusyworkIcon,
  'Missing Integration?': MissingIntegrationIcon,
  'Reports and Dashboards': ReportsDashboardsIcon,
  'Stop Answering the Same Questions': ChatAssistantIcon,
  "Automations That Don't Break": ReliableAutomationsIcon,
  'Voice AI': VoiceAIIcon,
  'Data Enrichment': DataEnrichmentIcon,
};

export default serviceIcons;