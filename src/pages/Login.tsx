import Navbar from "@/components/Navbar";
import LoginForm from "../components/LoginForm";

const Registration = () => {
  const handleRegistration = (data: any) => {
    console.log("Registration data:", data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center p-4 py-8">
        <LoginForm onSubmit={handleRegistration} />
      </div>
    </div>
  );
};

export default Registration;
