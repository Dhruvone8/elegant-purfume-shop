import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-luxury-cream min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl text-luxury-black mb-4">Get in Touch</h1>
          <p className="text-gray-600">We would love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="bg-white p-8 shadow-md border-t-4 border-luxury-gold">
              <h3 className="font-serif text-2xl mb-6">Boutique</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-4">
                  <MapPin className="text-luxury-gold shrink-0" />
                  <p>123 Luxury Avenue, Fashion District,<br/>Mumbai, Maharashtra 400001</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-luxury-gold shrink-0" />
                  <p>+91 83697 49375</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-luxury-gold shrink-0" />
                  <p>concierge@elegance.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 shadow-md">
              <h3 className="font-serif text-2xl mb-6">Opening Hours</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-4">
                  <Clock className="text-luxury-gold shrink-0" />
                  <div>
                    <p><span className="font-bold">Mon - Fri:</span> 10:00 AM - 9:00 PM</p>
                    <p><span className="font-bold">Sat - Sun:</span> 11:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 shadow-lg rounded-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2">First Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-luxury-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2">Last Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-luxury-gold transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-luxury-gold transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Message</label>
                <textarea rows="5" className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-luxury-gold transition-colors"></textarea>
              </div>

              <button className="w-full bg-luxury-black text-white font-bold py-4 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 uppercase tracking-widest">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;