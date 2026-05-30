import TestimonialCard from "./TestimonialCard";

export type TestimonialItem = {
  id: string;
  name: string;
  company: string;
  initials: string;
  rating: number;
  testimonial: string;
  avatarUrl?: string | null;
};

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  isLoading?: boolean;
}

const TestimonialsSection = ({ testimonials, isLoading = false }: TestimonialsSectionProps) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">
        Consultants Testimonials
      </h2>

      {isLoading ? (
        <div className="bg-card border border-border rounded-lg p-6 text-muted-foreground">
          Loading testimonials...
        </div>
      ) : testimonials.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6 text-muted-foreground">
          No reviews yet.
        </div>
      )}
    </div>
  );
};

export default TestimonialsSection;
