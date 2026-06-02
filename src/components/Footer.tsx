import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Footer = () => {
  const navigate = useNavigate()

   const handleTrialClick = () => {
    navigate("/accountselection");
  }

  return (
    <footer className="bg-black text-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <img 
                src={Logo} 
                alt="ZMenus Logo" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Modern digital platform for Ethiopian.
            </p>
            <div className="flex space-x-2">
              <Button 
              onClick={handleTrialClick}
              variant="outline" size="sm" className="bg-transparent border-background/20 text-background hover:bg-background/10">
                Create an Account
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#features" className="hover:text-background transition-colors">Home</a></li>
              <li><a href="#pricing" className="hover:text-background transition-colors">WhatWeDo</a></li>
              <li><a href="#features" className="hover:text-background transition-colors">Features</a></li>
              <li><a href="#features" className="hover:text-background transition-colors">WhyChooseUs</a></li>
              <li><a href="#features" className="hover:text-background transition-colors">HowItWorks</a></li>
              <li><a href="#features" className="hover:text-background transition-colors">Contactus</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li><a href="#support" className="hover:text-background transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-background/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@meri.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+251 95 671 5491</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-background/60">
            © 2025 Meri. Made with ❤️ in Ethiopia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;