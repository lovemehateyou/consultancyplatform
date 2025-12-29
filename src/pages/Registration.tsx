import RegistrationForm from "@/components/RegistrationForm";

const Registration = () => {
  const handleRegistration = (data: any) => {
    console.log("Registration data:", data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <RegistrationForm onSubmit={handleRegistration} />
    </div>
  );
};

export default Registration;
