import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Jenny Wilson",
    company: "Grower.io",
    initials: "JW",
    rating: 5,
    testimonial: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
  },
  {
    name: "Devon Lane",
    company: "DLDesign.co",
    initials: "DL",
    rating: 5,
    testimonial: "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
  },
];

const TestimonialsSection = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">
        Consultants Testimonials
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
