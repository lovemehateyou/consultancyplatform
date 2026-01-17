import { Card } from "@/components/ui/card";
import { 
  QrCode, 
  Smartphone, 
  Palette, 
  Clock, 
  Layers, 
  ShoppingCart,
  CreditCard,
  Globe,
  MessageCircle,
  UserPlus
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: ShoppingCart,
    title: "Collection of Digital Documents",
    description: "Access a curated library of essential business documents, templates, and guides tailored for Ethiopian entrepreneurs. Everything you need—organized, downloadable, and always up to date.",
    color: "text-blue-600"
  },
  {
    icon: QrCode,
    title: "Live Meeting with Professional Consultant ",
    description: "Book one-on-one sessions with experienced business consultants who walk you through processes, answer your questions, and provide personalized guidance for your business journey",
    color: "text-blue-600"
  },
  {
    icon: Palette,
    title: "On demand AI for Questions",
    description: "Get instant, reliable answers anytime using our built-in AI assistant. Whether you’re stuck on a regulation, form, or business step, you’ll receive clear guidance in seconds.",
    color: "text-blue-600"
  }
  
];

const FeaturesSection = () => {

  const navigate = useNavigate()

   const handleTrialClick = () => {
    navigate("/accountselection");
  }


  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Features
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300 group">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 p-8 rounded-2xl shadow-glow">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Restaurant?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Join hundreds of Ethiopian Businesses already using Us to have better  
            experiences and streamline operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
              onClick={handleTrialClick}
              className="bg-background text-primary px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-all duration-300">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;