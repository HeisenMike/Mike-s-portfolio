import React from 'react';
import { config } from '../config';
import { Linkedin, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 bg-black border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="text-2xl text-white font-heading mb-6">{config.name}</div>
            <div className="flex gap-4">
              <a href={config.bookingUrl} className="btn bg-white text-black hover:bg-white">Book a Call</a>
              <a href={config.socials.email} className="btn btn-secondary">Send Email</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-heading mb-4">Location</h3>
              <p className="text-white">Remote Work Worldwide</p>
              <p className="text-white">Based in the Philippines</p>
            </div>
            <div>
              <h3 className="text-white font-heading mb-4">Socials</h3>
              <div className="flex gap-4">
                <a href={config.socials.linkedin} className="text-white hover:text-black transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href={config.socials.whatsapp} className="text-white hover:text-black transition-colors" aria-label="WhatsApp">
                  <MessageCircle size={24} />
                </a>
                <a href={config.socials.email} className="text-white hover:text-black transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 text-sm text-gray-200">
          © {new Date().getFullYear()} {config.name}. {config.role}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
