import { Link } from "wouter";
import { Mail, Phone } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import logoImage from "@assets/8744b600090576cf954cd28c58a9ebb3_1760464629738.webp";

export default function Footer() {
  return (
    <footer className="bg-[hsl(210,15%,25%)] text-white py-6 header-3d">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 mb-4">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={logoImage} 
                alt="Singularity Housing" 
                className="h-14 w-auto object-contain logo-3d"
                data-testid="img-footer-logo"
              />
              <h3 className="text-xl text-[#e8e8e8] font-extrabold text-3d-footer" data-testid="text-footer-title">Singularity Housing</h3>
            </div>
            <p className="text-white/80 text-sm">
              Restoring dignity through innovative housing solutions for vulnerable populations.
            </p>
          </div>

          <div className="md:text-right">
            <h4 className="font-semibold mb-2">Contact</h4>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-white/80 md:justify-end">
                <Mail className="h-4 w-4" />
                <a href="mailto:singularityhousing@gmail.com" className="hover:text-white transition-colors" data-testid="link-email">
                  singularityhousing@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80 md:justify-end">
                <Phone className="h-4 w-4" />
                <div>
                  <a href="tel:352-275-1712" className="hover:text-white transition-colors" data-testid="link-phone-1">
                    352-275-1712
                  </a>
                  <span>, </span>
                  <a href="tel:352-890-6300" className="hover:text-white transition-colors" data-testid="link-phone-2">
                    352-890-6300
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/80 md:justify-end">
                <SiLinkedin className="h-4 w-4" />
                <a href="https://www.linkedin.com/in/ericedmonddavis/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-testid="link-linkedin">
                  Eric Davis on LinkedIn
                </a>
              </div>
              <p className="text-white/80" data-testid="text-address">2730 NW 39TH Ave, Gainesville, FL 32605</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/70">
            <p>© 2025 Singularity Housing, LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
