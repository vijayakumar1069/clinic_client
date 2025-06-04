import React from 'react'
import ContactInfoItem from './ContactInfoItem';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-8 md:py-12 scroll-mt-16  bg-default_bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div
            
          
            className="md:w-1/2 mb-4 md:mb-0"
          >
            <h2 className="text-2xl md:text-2xl font-medium mb-3">
              Get in Touch
            </h2>
            <p className="text-text_color mb-8">
              Have questions about BigHil? Our team is here to help you get
              started and make the most of our platform.
            </p>

            <div className="mb-8">
              <ContactInfoItem
                icon={<MapPin size={16} />}
                text="123 Business Avenue, Tech Park, CA 94107"
              />
              <ContactInfoItem
                icon={<Phone size={16} />}
                text="+1 (555) 123-4567"
              />
              <ContactInfoItem
                icon={<Mail size={16} />}
                text="support@bighil.com"
              />
            </div>

            
          </div>

          <ContactForm/>
        </div>
      </div>
    </section>
  );
}

export default ContactSection