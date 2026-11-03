import React from 'react';
import { config } from '../config';
import { Linkedin, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 bg-[var(--bg-primary)] border-t border-[var(--border-primary)]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="text-2xl text-[var(--text-primary)] font-heading mb-6">{config.name}</div>
            <div className="flex gap-4">
              <a href={config.bookingUrl} className="btn btn-primary">Book a Call</a>
              <a href={config.socials.email} className="btn btn-secondary">Send Email</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[var(--text-primary)] font-heading mb-4">Location</h3>
              <p className="text-[var(--text-secondary)]">Remote Work Worldwide</p>
              <p className="text-[var(--text-secondary)]">Based in the Philippines</p>
            </div>
            <div>
              <h3 className="text-[var(--text-primary)] font-heading mb-4">Socials</h3>
              <div className="flex gap-4">
                <a href={config.socials.linkedin} className="text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-colors" aria-label="LinkedIn">
                  <Linkedin size={24} />
                </a>
                <a href={config.socials.whatsapp} className="text-[var(--text-secondary)] hover:text-[var(--accent-emerald)] transition-colors" aria-label="WhatsApp">
                  <MessageCircle size={24} />
                </a>
                <a href={config.socials.email} className="text-[var(--text-secondary)] hover:text-[var(--accent-sky)] transition-colors" aria-label="Email">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-primary)] text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} {config.name}. {config.role}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;