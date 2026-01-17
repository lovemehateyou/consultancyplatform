import ConsultantHeader from "./ConsultantHeader";
import AboutMeCard from "./AboutMeCard";
import AvailabilitySchedule from "./AvailabilitySchedule";
import TestimonialsSection from "./TestimonialsSection";
import ConsultantReview from "./ConsultantReview";

const consultantData = {
  name: "Olivia Rhye",
  title: "Financial Consultant",
  initials: "OR",
  about: "Product designer passionate about creating intuitive user experiences. I love solving complex problems through simple, elegant design solutions.",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
};

const scheduleData = [
  { day: "Monday", startTime: "2:30Am", endTime: "4:00Am", available: true },
  { day: "Monday", startTime: "2:30Am", endTime: "4:00AM", available: false },
];

const ConsultantProfileContent = () => {
  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      <ConsultantHeader 
        name={consultantData.name}
        title={consultantData.title}
        initials={consultantData.initials}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <AboutMeCard
          description={consultantData.about}
          email={consultantData.email}
          phone={consultantData.phone}
          location={consultantData.location}
        />
        <AvailabilitySchedule schedule={scheduleData} />
      </div>
      
      <TestimonialsSection />
      
      <ConsultantReview />
    </div>
  );
};

export default ConsultantProfileContent;
