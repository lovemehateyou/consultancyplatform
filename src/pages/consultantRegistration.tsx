import AuthLayout from "@/components/auth/AuthLayout";
import RegistrationForm from "../components/ConsultantRegistrationForm";

const Registration = () => {
  return (
    <AuthLayout
      brandHeadline="Grow your consultancy with Meri."
      brandSubcopy="Reach new clients, manage your practice, and showcase your expertise on one platform."
      highlights={[
        "Get matched with motivated clients",
        "Manage availability and bookings",
        "Build a verified consultant profile",
      ]}
    >
      <RegistrationForm />
    </AuthLayout>
  );
};

export default Registration;
