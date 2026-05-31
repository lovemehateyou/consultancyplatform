import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      brandHeadline="Welcome back to Meri."
      brandSubcopy="Pick up right where you left off — your business workspace is ready."
      contentMaxWidth="max-w-md"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
