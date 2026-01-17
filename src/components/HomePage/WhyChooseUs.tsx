import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, ShoppingCart, FileText, Clock, TrendingUp, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Simplified Bureaucracy",
    description: "We break down complex government processes into easy, step-by-step guidance so we can navigate regulations without confusion.",
    color: "text-blue-600",
    icon: Users
  },
  {
    title: "Saves Time",
    description: "No more searching multiple websites or visiting offices repeatedly—everything you need is organized in one place.",
    color: "text-blue-600",
    icon: ShoppingCart
  },
  {
    title: " Reliable Information",
    description: "All documents, guides, and instructions are accurate, up to date, and tailored to Ethiopian business requirements.",
    color: "text-blue-600",
    icon: FileText
  },
  {
    title: "Direct Access to Experts",
    description: "Users can meet professional consultants who understand local laws, procedures, and challenges entrepreneurs face.",
    color: "text-blue-600",
    icon: Clock
  },
  {
    title: "Instant Answers Anytime",
    description: "Our AI assistant provides immediate support, helping users resolve questions without waiting for appointments.",
    color: "text-blue-600",
    icon: TrendingUp
  },
  {
    title: "Digital Document Hub",
    description: "Essential templates, forms, and business documents are ready for download, reducing the stress of finding the right materials.",
    color: "text-blue-600",
    icon: BarChart3
  }
];

const Whychooseus = () => {

  const navigate = useNavigate()

   const handleTrialClick = () => {
    navigate("/accountselection");
  }


  return (
    <section id="why" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Us?
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
             Do not miss out or be late to the future of Business.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
              onClick={handleTrialClick}
              className="bg-background text-primary px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whychooseus;