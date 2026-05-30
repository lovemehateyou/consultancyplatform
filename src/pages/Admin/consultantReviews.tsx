import { useParams } from "react-router-dom";
import AdminDashboardLayout from "@/components/Admin/AdminDashboard/DashboardLayout";
import ConsultantReviewsSection from "@/components/Admin/adminConsultancyManagement/ConsultantReviewsSection";

const ConsultantReviewsPage = () => {
  const { consultantId } = useParams();

  return (
    <AdminDashboardLayout>
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <ConsultantReviewsSection consultantId={consultantId} />
      </main>
    </AdminDashboardLayout>
  );
};

export default ConsultantReviewsPage;