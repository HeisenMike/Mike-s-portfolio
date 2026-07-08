import React from 'react';
import aboutPhoto from '../assets/About-photo.png';

const About = () => {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: '#471a1d' }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-[40%_60%] gap-12 items-stretch">
          <div className="md:order-2 order-2 h-full rounded-2xl overflow-hidden">
            {/* Personal image */}
            <img src={aboutPhoto} alt="About me" className="w-full h-full object-cover object-top" />
          </div>
          <div className="md:order-1 order-1 rounded-2xl p-8 md:p-12 bg-black">
            <h2 className="text-[34px] text-white font-heading font-bold mb-6 leading-tight">About Me</h2>
            <p className="text-gray-300 text-base leading-relaxed mb-8">
              I spent over a decade in high-pressure operations where broken processes meant lost revenue and manual tasks pulled focus from what mattered: serving clients and scaling growth.<br /><br />I saw businesses losing efficiency simply because their software didn't talk to each other. So I started building custom systems to handle the repetitive work, freeing teams to focus on performance.<br /><br />That shift ignited my passion for automation. Now, as an n8n & AI Automation Specialist, I help businesses design production-grade backend workflows, orchestrate complex APIs, and build automations that make life easier for company owners. Using n8n, I build secure, scalable pipelines that run on autopilot.<br /><br />
              If you are losing revenue to process bottlenecks or feel buried in daily operational tasks, let's fix that. I build resilient workflows that work around the clock so you don't have to.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
