import React from 'react';
import { Braces, Database, Cpu, Webhook, Magnet, Users, Code2 } from 'lucide-react';

const services = [
  {
    title: "AI Agent Workflows",
    description: "Put AI to work inside n8n to automate your workflows, handle repetitive data tasks, and scale your operations.",
    icon: <Cpu className="w-8 h-8 mb-2 text-violet-400" />
  },
  {
    title: "REST API Integration",
    description: "Sync enriched product data, customer reviews, and custom endpoints across all your marketplaces flawlessly in real time.",
    icon: <Braces className="w-8 h-8 mb-2 text-fuchsia-400" />
  },
  {
    title: "Custom Webhooks & Events",
    description: "Connect dynamic external tools to your workflows using custom webhooks that listen, filter, and route live event data automatically.",
    icon: <Webhook className="w-8 h-8 mb-2 text-[#ff6b57]" />
  },
  {
    title: "Automated Data Syncing",
    description: "We build automated workflows to instantly connect and move your data between business tools, keeping all your records clean and up to date without manual typing.",
    icon: <Database className="w-8 h-8 mb-2 text-emerald-400" />
  },
  {
    title: "Intelligent Lead Enrichment",
    description: "Qualify, score, and enrich lead profiles dynamically before inserting into sales pipelines.",
    icon: (
      <div className="relative w-11 h-11 mb-1 text-amber-400">
        <Magnet className="absolute left-0 bottom-0 w-6 h-6 -rotate-180 origin-center" />
        <Users className="absolute right-1 top-1 w-5 h-5" />
      </div>
    )
  },
  {
    title: "Error & Exception Handling",
    description: "I build smart retry rules and backup paths into your automations, ensuring your workflows automatically handle exceptions, fix themselves, and keep running without breaking.",
    icon: <Code2 className="w-8 h-8 mb-2 text-sky-400" />
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[#0E0E12] border-t border-zinc-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#0E0E12] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-16">
          <h2 className="text-[36px] md:text-[48px] text-white font-bold tracking-tight mb-4">
            n8n Solutions
          </h2>
          <p className="text-zinc-400 text-lg font-light">
            Custom workflows engineered to connect platforms, orchestrate intelligence, and run on autopilot.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#16161c] p-8 rounded-xl border border-zinc-800"
            >
              <div className="mb-6 inline-block p-3 rounded-lg bg-zinc-900/80 border border-zinc-850">
                {React.cloneElement(service.icon, { className: service.icon.props.className, strokeWidth: 1.5 })}
              </div>
              <h3 className="text-lg text-white font-semibold mb-3">{service.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
