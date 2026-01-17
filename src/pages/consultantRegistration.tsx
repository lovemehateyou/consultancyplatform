import Navbar from "@/components/Navbar";
import RegistrationForm from "../components/ConsultantRegistrationForm";

const Registration = () => {
  const handleRegistration = (data: any) => {
    console.log("Registration data:", data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-center p-4 py-8">
        <RegistrationForm onSubmit={handleRegistration} />
      </div>
    </div>
  );
};

export default Registration;
