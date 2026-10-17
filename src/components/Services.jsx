

import React from 'react';
import { Braces, Database, Webhook, Magnet, Users, Code2 } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react'
import { WorkflowSquare03Icon, ArtificialIntelligence04Icon } from '@hugeicons/core-free-icons';


const services = [
  {
    title: "Workflow Automation",
    description: "Leads get followed up, your pipeline stays current, and the boring daily stuff just happens. GoHighLevel or whatever CRM you’re on.",
    icon: (
      <HugeiconsIcon
        icon={WorkflowSquare03Icon}
        className="w-8 h-8 mb-2 text-violet-400" />
    )
  },
  {
    title: "AI That Does the Busywork",
    description: "I build AI agents that do the boring stuff for you, like fixing your Shopify catalog, feeding Google Shopping, chasing leads or handling bad reviews. If it’s repetitive, chances are I can build an agent for it.",
    icon: (
      <HugeiconsIcon
        icon={ArtificialIntelligence04Icon}
        className="w-8 h-8 mb-2 text-fuchsia-400" />
    )
  },
  {
    title: "We Don’t Have an Integration for That",
    description: "Heard that from a vendor? I build the missing piece. Custom API work so your tools finally work together, even the ones that were never meant to.",
    icon: <Webhook className="w-8 h-8 mb-2 text-[#ff6b57]" />
  },
  {
    title: "Reports and Dashboards",
    description: "Sales, stock, ad spend and returns, all in one place and updated on their own. You open one dashboard instead of five tabs.",
    icon: <Database className="w-8 h-8 mb-2 text-emerald-400" />
  },
  {
    title: "Stop Answering the Same Questions",
    description: "Same five questions, all day long. “What’s the price?” “Are you free Thursday?” “Where’s my project at?” My assistant answers them in WhatsApp, Slack, or wherever you chat.",
    icon: (
      <div className="relative w-11 h-11 mb-1 text-amber-400">
        <Magnet className="absolute left-0 bottom-0 w-6 h-6 -rotate-180 origin-center" />
        <Users className="absolute right-1 top-1 w-5 h-5" />
      </div>
    )
  },
  {
    title: "Automations That Don’t Break",
    description: "A quiet failure is worse than no automation at all. I build in automatic retries and alerts, so you hear about real problems right away.",
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
            Business Automation
          </h2>
          <p className="text-zinc-400 text-lg font-light">
            Custom workflows built around how your business actually runs. Set up once, then they just do their job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#16161c] p-8 rounded-xl border border-zinc-800"
            >
              <div className="mb-6 inline-block p-2 rounded-lg bg-zinc-900/80 border border-zinc-850">
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
