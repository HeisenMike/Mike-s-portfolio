import React from 'react';
import { Braces, Database, Webhook, Magnet, Users, Code2 } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { WorkflowSquare03Icon, ArtificialIntelligence04Icon, DashboardCircleEditIcon, WhatsappIcon } from '@hugeicons/core-free-icons';

const services = [
  {
    title: "Workflow Automation",
    description: "Leads get followed up, your pipeline stays current, and the boring daily stuff just happens. GoHighLevel or whatever CRM you're on.",
    icon: (
      <HugeiconsIcon
        icon={WorkflowSquare03Icon}
        className="w-8 h-8 mb-2 text-[var(--accent-violet)]" />
    ),
    tools: ["n8n", "GoHighLevel", "HubSpot"]
  },
  {
    title: "AI That Does the Busywork",
    description: "I build AI agents that do the boring stuff for you, like fixing your Shopify catalog, feeding Google Shopping, chasing leads or handling bad reviews. If it's repetitive, chances are I can build an agent for it.",
    icon: (
      <HugeiconsIcon
        icon={ArtificialIntelligence04Icon}
        className="w-8 h-8 mb-2 text-[var(--accent-fuchsia)]" />
    ),
    tools: ["OpenAI", "Claude", "Gemini"]
  },
  {
    title: "Missing Integration?",
    description: "Vendor said it can't be done? If the tool has an API, I can build the missing piece. No more exporting, re-uploading or retyping.",
    icon: <Webhook className="w-8 h-8 mb-2 text-[var(--accent-orange)]" />,
    tools: ["REST APIs", "Webhooks", "Node.js"]
  },
  {
    title: "Reports and Dashboards",
    description: "Sales, stock, ad spend and returns, all in one place and updated on their own. You open one dashboard instead of five tabs.",
    icon: (
      <HugeiconsIcon
        icon={DashboardCircleEditIcon}
        className="w-8 h-8 mb-2 text-[var(--accent-amber)]" />
    ),
    tools: ["Airtable", "Monday.com", "ClickUp"]
  },
  {
    title: "Stop Answering the Same Questions",
    description: "Same five questions, all day long. What's the price? Are you free Thursday? Where's my project at? My assistant answers them in WhatsApp, Slack, or wherever you chat.",
    icon: (
      <HugeiconsIcon
        icon={WhatsappIcon}
        className="w-8 h-8 mb-2 text-[var(--accent-emerald)]" />
    ),
    tools: ["WhatsApp Business", "Slack"]
  },
  {
    title: "Automations That Don't Break",
    description: "A quiet failure is worse than no automation at all. I build in automatic retries and alerts, so you hear about real problems right away.",
    icon: <Code2 className="w-8 h-8 mb-2 text-[var(--accent-sky)]" />,
    tools: ["Smart Error Skipping", "Auto-Retry Triggers", "Built-in Backup Routes"]

  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-16">
          <h2 className="text-[36px] md:text-[48px] text-[var(--text-primary)] font-bold tracking-tight mb-4">
            Business Automation
          </h2>
          <p className="text-[var(--text-secondary)] text-lg font-light">
            Custom workflows built around how your business actually runs. Set up once, then they just do their job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border-primary)] flex flex-col justify-between hover:border-[var(--accent-violet)]/50 hover:bg-[var(--bg-card-hover)] transition-all duration-300"
            >
              <div>
                <div className="mb-6 inline-flex items-center justify-center p-1 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
                  {React.cloneElement(service.icon, { className: service.icon.props.className, strokeWidth: 1.5 })}
                </div>
                <h3 className="text-lg text-[var(--text-primary)] font-semibold mb-3">{service.title}</h3>
                <p className="text-[var(--text-secondary)] font-light leading-relaxed text-sm mb-6">{service.description}</p>
              </div>

              {/* Tools Badges */}
              {service.tools && service.tools.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-primary)]/50">
                  {service.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-primary)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;