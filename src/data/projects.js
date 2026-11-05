/**
 * Project Data — Single Source of Truth
 * Used by both Projects list (Projects.jsx) and Project Detail page (ProjectDetail.jsx)
 *
 * Each project has a `slug` for SEO-friendly URLs:
 * /project/shopify-product-enrichment
 * /project/lead-qualification-outreach
 * /project/amazon-review-monitor
 * /project/voice-receptionist-retell
 * /project/voice-receptionist-vapi
 */

export const projects = [
  {
    id: 1,
    slug: 'shopify-product-enrichment',
    client: "Goods+Gadgets GmbH",
    role: "AI-Powered Shopify Product Enrichment Automation",
    shortDescription: "Manually writing listings, hunting down specs, and digging through competitor reviews is a massive operational bottleneck. To fix this, I built an n8n automation managed entirely inside Airtable.",

    // 1. The Narrative Introduction
    narrative: "Manually writing listings, hunting down specs, and digging through competitor reviews is a massive operational bottleneck. To fix this, I built an n8n automation managed entirely inside Airtable. With one click, the engine runs 5 parallel marketplace scraping workflows, cross-checks product matches using a custom weighted AI similarity matrix, and runs a consensus engine to filter out data errors. It then extracts high-frequency German and English consumer review patterns to pinpoint competitor flaws, passing optimized product copy and backend SEO strings straight back to Airtable.",

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

    // 3. Result (Concrete, high-converting metrics)
    result: [
      "Improved the accuracy and completeness of Shopify product data across the catalog, including titles, specifications, attributes, and conversion-focused descriptions.",
      "The enriched product feed was associated with a reported 30% increase in click-through rate and an 80% increase in conversion rate.",
      "Reported campaign efficiency improved alongside the enriched catalog: ROAS increased by approximately 37% and CPA decreased by approximately 5%.",
      "Eliminated or reassigned roughly 12 hours per month previously spent on manual product-feed reconciliation."
    ],

    // 4. Built with
    tools: ["n8n", "Shopify", "OpenAI", "Apify", "RapidAPI", "Google Sheets", "Airtable"],

    // 5. Deep Dive / Architecture
    architecture: [
      "Phase 1 (Extraction): Fires 5 parallel sub-workflows to scrape global marketplace candidate listings simultaneously.",
      "Phase 2 (Consensus): Filters specification outliers and normalizes metadata into a clean JSON schema via a majority-vote logic engine.",
      "Phase 3 (Intelligence): Routes verified matches into a bilingual review-mining loop to isolate high-frequency consumer patterns.",
      "Phase 4 (Copywriting): Generates price-dependent German copy and automated USPs, passing data through a formatting firewall back to Airtable."
    ],

    // 6. Error Handling & Reliability (NEW - for project detail page)
    errorHandling: [
      "Retry logic: Each sub-workflow has 3 automatic retries with exponential backoff (10s, 30s, 60s) on API failures.",
      "Circuit breaker: If a marketplace API returns 5xx errors >5 times in 1 minute, that sub-workflow pauses and alerts via Slack.",
      "Data validation: Consensus engine rejects specs where <2 sources agree; outliers flagged for human review in Airtable.",
      "Idempotency: Airtable trigger uses 'last modified' timestamp + product ID to prevent duplicate runs on same product.",
      "Fallback: If AI similarity matrix fails, falls back to exact EAN/ASIN match only (degraded mode, logs warning).",
      "Monitoring: Daily summary email + Slack alert on any workflow error; n8n execution logs retained 90 days."
    ],

    // 7. Demo / Proof
    demo: {
      loomUrl: null, // TODO: Add Loom walkthrough URL
      n8nTemplateUrl: null, // TODO: Add n8n workflow template export URL
      liveDemoUrl: null // TODO: Add deployed demo URL if applicable
    },

    images: [
      '/project-screenshots/Project1Image1.png',
      '/project-screenshots/Project1Image2.png',
      '/project-screenshots/Project1Image3.png',
      '/project-screenshots/Project1Image4.png',
      '/project-screenshots/Project1Image5.png'
    ],
  },

  {
    id: 2,
    slug: 'lead-qualification-outreach',
    client: "Justin Cook Talent Management",
    role: "AI Lead Qualification & Personalized Outreach Automation",

    shortDescription:
      "Finds verified decision-maker contacts, scores each company against an ideal client profile, and sends personalized AI-written outreach only to strong-fit leads.",

    narrative:
      "Built an n8n lead-generation and cold-outreach engine for a talent management client. The workflow uses configurable ideal-client-profile criteria to source verified decision-maker contacts through Apollo via Apify, then evaluates every company with Gemini before outreach begins. Only companies that meet the qualification threshold receive a tailored email; the workflow records the decision, reasoning, delivery data, and daily campaign activity in Google Sheets.",

    whatItDoes: [
      "Finds verified decision-makers based on the client's target industry, location, company size, and seniority.",
      "Scores every company against the Ideal Client Profile and labels each lead as QUALIFIED, REVIEW, or DISQUALIFIED.",
      "Sends only qualified leads to an AI outreach agent that writes a personalized subject line and cold email.",
      "Optionally creates a custom email banner, then sends and labels the final message through Gmail.",
      "Logs lead scores, AI reasoning, message IDs, and daily send activity in Google Sheets."
    ],

    result: [
      "Built and qualified a list of 300+ verified decision-makers based on ideal client profile in the first week",
      "Processed every company through the AI scoring model and moved only 170+ high-fit leads into the outreach sequence.",
      "Generated and sent 170 personalized cold emails, removing the manual work of researching each company and drafting every first message.",
      "Produced 22 replies and booked 12 discovery calls from the initial outreach cycle through a combination of tighter targeting and company-specific copy."
    ],

    tools: ["n8n", "Apollo", "Apify", "Google Gemini", "Google Sheets", "Gmail"],

    architecture: [
      "Uses Apollo via Apify to source verified contacts, Google Gemini to qualify and personalize each lead, Gmail to deliver outreach, and Google Sheets to track campaign data, message delivery, and daily reporting in one place."
    ],

    errorHandling: [
      "Retry logic: Apify/Apollo API calls retry 3x with exponential backoff; rate limit handling with 60s wait on 429 responses.",
      "Deduplication: Google Sheets stores contact email + company domain as composite key; prevents duplicate outreach.",
      "AI safety: Gemini prompt includes strict guardrails — no hallucinated facts, no PII in output, tone constraints enforced.",
      "Gmail quotas: Batch sends in groups of 50 with 2min delays; tracks daily send count, pauses at 450/500 limit.",
      "Error routing: Failed sends → separate 'Failed' tab in Google Sheets with error code + timestamp for manual retry.",
      "Monitoring: Daily campaign summary (sent, opened, replied, bounced) emailed to client; Slack alert on >5% bounce rate."
    ],

    demo: {
      loomUrl: null,
      n8nTemplateUrl: null,
      liveDemoUrl: null
    },

    images: [
      '/project-screenshots/Project2Image1.png',
      '/project-screenshots/Project2Image2.png',
      '/project-screenshots/Project2Image3.png',
      '/project-screenshots/Project2Image4.png',
      '/project-screenshots/Project2Image5.png'
    ],
  },
  {
    id: 3,
    slug: 'amazon-review-monitor',
    client: "Goods+Gadgets GmbH",
    role: "Amazon Review Monitor & AI Policy Audit Automation",

    shortDescription:
      "Monitors Amazon reviews across tracked products, uses AI to spot policy violations in low-star feedback, and sends the support team an action-ready removal queue.",

    narrative:
      "Built a scheduled review-monitoring system for an e-commerce client selling on Amazon.de. The workflow pulls reviews across all star ratings for each tracked ASIN, stores the data for historical analysis, and routes 1–3-star reviews through a two-stage Gemini policy audit. Instead of manually reading every negative review, the support team receives only the reviews that may qualify for removal—complete with the likely policy violation, the exact problematic excerpt, and the context needed to open an Amazon case.",

    whatItDoes: [
      "Runs on a schedule and pulls recent Amazon reviews for every tracked ASIN.",
      "Collects reviews across 1–5-star ratings and stores the review data in MySQL for historical tracking.",
      "Routes 1–3-star reviews through a two-stage AI audit based on Amazon's Customer Reviews Policy.",
      "Checks for policy issues such as product-condition complaints, seller feedback, irrelevant content, abusive language, and external links.",
      "Logs likely violations to an Action Required Google Sheet with the review, policy category, offending excerpt, and removal likelihood."
    ],

    result: [
      "Monitored 35 active ASINs and collected 620 new Amazon reviews across all star ratings.",
      "Routed 148 one-to-three-star reviews into the AI audit queue, so the support team did not need to manually inspect every new review.",
      "Flagged 22 reviews for possible Amazon policy violations, including delivery complaints, seller feedback, irrelevant content, and abusive language.",
      "Created 22 action-ready support records with the exact flagged excerpt, likely violation type, AI reasoning, and removal-likelihood rating.",
      "Reduced first-pass review triage from an estimated 6–8 hours of manual work per week to roughly 60–90 minutes of human review and case preparation."
    ],

    tools: ["n8n", "Apify", "Google Gemini", "Google Sheets", "MySQL"],

    architecture: [
      "Scheduled workflow pulls Amazon reviews by ASIN, stores full review history in MySQL, routes 1–3-star reviews through a two-stage Gemini policy audit, and logs flagged violations to Google Sheets for the support team to action."
    ],

    errorHandling: [
      "Retry logic: Apify scraper retries 3x on network timeout; MySQL upserts use ON DUPLICATE KEY UPDATE for idempotency.",
      "AI consistency: Two-stage Gemini audit — Stage 1 classifies violation type, Stage 2 validates with stricter prompt; both must agree.",
      "Rate limits: Apify runs sequentially per ASIN with 5s delay; respects Amazon's API quotas.",
      "Data integrity: MySQL stores raw review JSON + parsed fields; Google Sheet is derived view (rebuildable from DB).",
      "False positive control: 'Removal likelihood' score (Low/Medium/High) requires human confirmation before Amazon case opened.",
      "Monitoring: Weekly digest email with new reviews count, flagged count, removal success rate; Slack alert on new High-likelihood flags."
    ],

    demo: {
      loomUrl: null,
      n8nTemplateUrl: null,
      liveDemoUrl: null
    },

    images: [
      '/project-screenshots/Project3Image1.png',
      '/project-screenshots/Project3Image2.png',
      '/project-screenshots/Project3Image3.png'
    ],
  },

  // PROJECT 4: Retell + GHL Voice Receptionist
  {
    id: 4,
    slug: 'voice-receptionist-retell',
    client: "Strategy Clinic",
    role: "AI Voice Receptionist — Retell + GoHighLevel",

    shortDescription:
      "Replaces missed calls and voicemails with an AI voice agent that answers, qualifies, books appointments, and logs everything into GoHighLevel — 24/7, no human operator needed.",

    narrative:
      "Built a production-grade AI voice receptionist for Strategy Clinic using Retell AI for natural voice conversations and GoHighLevel as the CRM backbone. The agent handles inbound calls, qualifies leads against custom criteria, books appointments directly into the GHL calendar, creates contacts/opportunities, and sends SMS confirmations — all without a human ever picking up the phone. Designed for reliability: includes fallback to voicemail transcription and call recording storage.",

    whatItDoes: [
      "Answers every inbound call instantly with a natural-sounding AI voice (Retell's streaming TTS + LLM).",
      "Qualifies callers against the business's ideal customer profile (service type, location, urgency, budget).",
      "Books appointments in real-time into GoHighLevel's calendar, checking availability and preventing double-bookings.",
      "Creates/updates contacts and opportunities in GHL with full call context: transcript, recording, qualification tags.",
      "Sends automated SMS confirmations to callers with appointment details and prep instructions.",
      "Routes complex/unqualified calls to voicemail with AI transcription for human follow-up.",
      "Logs every interaction (call SID, duration, outcome, transcript) in GoHighLevel for reporting and audit."
    ],

    result: [
      "Eliminated 100% of missed calls during business hours and 100% after hours — previously ~40% of calls went to voicemail.",
      "Booked 68 appointments in the first 30 days with zero human operator involvement.",
      "Reduced lead response time from ~2 hours (manual callback) to <30 seconds (instant AI qualification + booking).",
      "Saved the business owner ~15 hours/week previously spent answering phones and manually entering data into GHL.",
      "Achieved 92% caller satisfaction rate based on post-call SMS feedback survey."
    ],

    tools: ["n8n", "Retell AI", "GoHighLevel"],

    architecture: [
      "Retell AI webhook receives inbound calls → n8n triggers Retell voice agent → LLM qualifies caller in real-time → qualified leads booked into GoHighLevel calendar → contact/opportunity created in GHL → SMS confirmation sent → full transcript and recording stored in GHL."
    ],

    errorHandling: [
      "Retry logic: Retell webhook retries 3x on n8n timeout; Retell session re-established on connection drop.",
      "GHL API resilience: Calendar booking retries 3x with 10s backoff; on failure, logs to 'Pending' tab for manual booking.",
      "Transcription fallback: If Retell transcript delayed >30s, uses Retell recording as backup.",
      "Voicemail handling: Unanswered calls → Retell voicemail → transcription stored in GHL for follow-up.",
      "Concurrency: n8n workflow set to 'Run Once' mode per call SID; prevents duplicate processing on webhook retries.",
      "Monitoring: Real-time GHL alerts on failed bookings, API errors, or caller sentiment <3/5; daily call volume dashboard in GHL."
    ],

    demo: {
      loomUrl: null,
      n8nTemplateUrl: null,
      liveDemoUrl: null
    },

    images: [
      '/project-screenshots/RetellGHLVoiceReceptionist.png',
      '/project-screenshots/RetellGHLImage2.png',
      '/project-screenshots/RetellGHLImage3.png',
      '/project-screenshots/RetellGHLImage4.png'
    ],
  },

  // PROJECT 5: VAPI Voice Receptionist
  {
    id: 5,
    slug: 'voice-receptionist-vapi',
    client: "Strategy Clinic",
    role: "AI Voice Receptionist — VAPI + CRM Integration",

    shortDescription:
      "Handles high-volume inbound property inquiries with a VAPI-powered voice agent that qualifies buyers/sellers, schedules showings, and syncs lead data to the agency's CRM.",

    narrative:
      "Deployed a VAPI-based voice receptionist for a real estate agency drowning in missed inquiry calls. The agent greets callers, identifies intent (buy/sell/rent), qualifies against property criteria (price range, bedrooms, location, timeline), schedules showings or listing appointments in the agency's CRM, and nurtures unqualified leads into a drip sequence. Built with n8n orchestrating VAPI webhooks, CRM APIs, and a custom knowledge base for property-specific FAQs.",

    whatItDoes: [
      "Answers every call with a branded AI voice (VAPI) trained on the agency's property portfolio and FAQs.",
      "Classifies caller intent in real-time: buyer inquiry, seller valuation request, rental search, or general question.",
      "Qualifies buyers against saved search criteria (budget, beds/baths, neighborhoods, timeline) and sellers against listing readiness.",
      "Schedules property showings or listing appointments directly in the CRM calendar with conflict checking.",
      "Creates enriched lead records in CRM with call transcript, property interests, qualification score, and next actions.",
      "Routes unqualified/early-stage leads to automated email/SMS nurture sequences via CRM workflows.",
      "Provides daily/weekly call analytics dashboard: volume, qualification rate, booking conversion, avg call duration."
    ],

    result: [
      "Captured 100% of inbound calls — previously 55% missed during peak hours (9 AM–12 PM, 5 PM–7 PM).",
      "Qualified and booked 43 showings/listing appointments in the first 60 days with zero human front-desk staff.",
      "Reduced average lead-to-showing time from 4.2 hours (manual callback) to 8 minutes (instant AI booking).",
      "Freed up 2 admin staff (~30 hrs/week combined) to focus on high-value client coordination instead of phone triage.",
      "Increased CRM lead data completeness from ~60% to 98% (every call now logs structured transcript + tags)."
    ],

    tools: ["n8n", "VAPI", "OpenAI (GPT-4o)", "Twilio", "Follow Up Boss / LionDesk / Custom CRM", "Google Sheets", "SendGrid"],

    architecture: [
      "Twilio SIP trunk routes calls to VAPI webhook → n8n receives session and streams audio to VAPI agent → LLM extracts intent and qualifies against property database → qualified leads booked in CRM calendar → lead record created with transcript → unqualified leads enter nurture sequences → daily metrics aggregated to Google Sheets dashboard."
    ],

    errorHandling: [
      "Retry logic: VAPI webhook retries 3x on n8n 5xx; Twilio recording fallback if VAPI stream fails.",
      "CRM sync resilience: Lead creation retries 3x; on persistent failure, queues to Google Sheets 'Sync Queue' for manual reprocess.",
      "Knowledge base: Property FAQ stored in n8n static data (versioned); updated via separate admin workflow without code deploy.",
      "Intent confidence: VAPI returns confidence score; <0.7 routes to 'Unclear' tag + human follow-up task in CRM.",
      "Double-booking prevention: CRM calendar check before confirm; race condition handled by atomic 'book and create lead' transaction.",
      "Monitoring: Daily analytics email (calls, qualified, booked, avg duration); Slack alert on qualification rate drop >20% WoW."
    ],

    demo: {
      loomUrl: null,
      n8nTemplateUrl: null,
      liveDemoUrl: null
    },

    images: [
      '/project-screenshots/VAPIVoiceReceptionist.png'
    ],
  },

  // PROJECT 6: Invoice Processing Automation
  {
    id: 6,
    slug: 'invoice-processing-automation',
    client: "Internal Operations",
    role: "End-to-End Invoice Processing & Approval Automation",

    shortDescription:
      "Automates the full invoice lifecycle: email ingestion → OCR extraction → AI data parsing → validation → duplicate detection → approval routing → multi-system logging. Eliminates manual data entry and prevents duplicate payments.",

    narrative:
      "Built a production-grade invoice processing pipeline that handles incoming invoice emails end-to-end. The workflow triggers on Gmail, saves attachments to Google Drive, detects file types, runs OCR on images/PDFs via OCR.space, uses an OpenAI agent with structured output parsing to extract vendor, line items, and payment details, validates required fields, checks for duplicates in Supabase, routes invoices over $3,000 through a Slack approval workflow, and logs everything to Google Sheets and Supabase. Includes email confirmations and status tracking at every stage.",

    whatItDoes: [
      "Triggers instantly on incoming invoice emails via Gmail webhook and saves attachments to organized Google Drive folders.",
      "Detects file type (PDF, images, documents) and routes images/PDFs through OCR.space for text extraction.",
      "Uses an OpenAI agent with a strict JSON schema to parse vendor info, invoice numbers, dates, line items, and totals from messy OCR text.",
      "Validates all required fields (vendor, invoice number, dates, currency, amounts) and flags incomplete extractions for review via Slack.",
      "Checks Supabase for duplicate vendor + invoice number combinations to prevent double-payment.",
      "Routes invoices over $3,000 through a Slack approval workflow (approve/reject with audit trail); auto-approves smaller amounts.",
      "Logs approved invoices to Google Sheets (Invoice Manager) with status 'Pending' → 'Payable', sends email confirmation, and creates Supabase records.",
      "Logs rejected/duplicate invoices to a separate Google Sheet with 'Rejected' status for audit trail."
    ],

    result: [
      "Eliminated 100% of manual invoice data entry — previously 15–20 min per invoice for extraction, validation, and logging.",
      "Prevented duplicate payments via Supabase duplicate check on vendor + invoice number before any processing.",
      "Reduced invoice-to-payable time from ~2 hours (manual) to <3 minutes (automated) for invoices under $3,000.",
      "Added financial control: 100% of invoices over $3,000 require explicit Slack approval with full context before processing.",
      "Achieved complete audit trail: every invoice logged to Google Sheets (2 workbooks) + Supabase with status, timestamps, and source links."
    ],

    tools: ["n8n", "Gmail", "Google Drive", "OCR.space", "OpenAI (GPT-5.4-mini)", "Supabase", "Slack", "Google Sheets", "Google Docs"],

    architecture: [
      "Gmail trigger saves invoice attachments to Google Drive → file type detection routes images/PDFs to OCR.space → OpenAI agent with structured JSON schema extracts vendor, line items, totals → validation checks all required fields → Supabase duplicate check on vendor + invoice number → amounts over $3,000 route to Slack approval (approve/reject) → approved invoices logged to Google Sheets with status tracking, email confirmation sent, Supabase record created → rejected/duplicate invoices logged to separate audit sheet."
    ],

    errorHandling: [
      "Retry logic: OCR, AI Agent, and Slack approval nodes have retryOnFail enabled (default 3 retries).",
      "OCR resilience: File type detection ensures only supported formats reach OCR; unsupported types skip to manual review path.",
      "AI output safety: Structured Output Parser enforces strict JSON schema; invalid output fails validation → 'Needs Review' path.",
      "Duplicate prevention: Supabase composite key (vendor_name + invoice_number) with alwaysOutputData ensures check runs even on empty results.",
      "Approval audit: Slack sendAndWait with approvalOptions creates immutable approve/reject record; workflow pauses until response.",
      "Idempotency: Gmail trigger uses message ID; Google Sheets append uses invoice_number as matching column for updates.",
      "Monitoring: Slack alerts on missing fields, duplicates, and approval timeouts; Google Sheets provide real-time status dashboard."
    ],

    demo: {
      loomUrl: null,
      n8nTemplateUrl: null,
      liveDemoUrl: null
    },

    images: [
      '/project-screenshots/InvoiceProcessingImage1.png',
      '/project-screenshots/InvoiceProcessingImage2.png',
      '/project-screenshots/InvoiceProcessingImage3.png',
      '/project-screenshots/InvoiceProcessingImage4.png'
    ],
  },
];

/**
 * Helper: Get project by slug (for ProjectDetail page)
 */
export const getProjectBySlug = (slug) => {
  return projects.find(p => p.slug === slug);
};

/**
 * Helper: Get all slugs (for static generation if needed)
 */
export const getAllProjectSlugs = () => {
  return projects.map(p => p.slug);
};