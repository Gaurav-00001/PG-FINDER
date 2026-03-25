import { Home, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground py-16">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Home className="w-4 h-4 text-secondary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">
                Nivas<span className="text-secondary">Hub</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/50 leading-relaxed">
              India's smartest PG operating system. Find, book, and manage paying guest accommodations effortlessly.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/50">
              <li><a href="#properties" className="hover:text-secondary transition-colors">Find PG</a></li>
              <li><a href="#how-it-works" className="hover:text-secondary transition-colors">How It Works</a></li>
              <li><a href="#owners" className="hover:text-secondary transition-colors">For Owners</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/50">
              <li><a href="#" className="hover:text-secondary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/50">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                hello@123.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary" />
                +91 1234567890
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-0.5" />
                Uttarpradesh, India
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/30">
          © {new Date().getFullYear()} NivasHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
