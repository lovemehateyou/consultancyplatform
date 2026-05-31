import AuthLayout from "@/components/auth/AuthLayout";
import RegistrationForm from "../components/UserRegistrationForm";

const Registration = () => {
  return (
    <AuthLayout
      brandHeadline="Start your business journey with Meri."
      brandSubcopy="Create your account to access mentors, tools and resources tailored to you."
    >
      <RegistrationForm />
    </AuthLayout>
  );
};

export default Registration;
