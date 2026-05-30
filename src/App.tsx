import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";

import ConsultancyRegistration from "./pages/consultantRegistration";
import UserRegistrationPersonal from "./pages/userRegistrationPersonal";
import UserRegistrationBusiness from "./pages/userRegistrationBusiness";
import LoginForm from "./components/LoginForm";
import NotFound from "./pages/NotFound";
//User side pages
import Dashboard from "./pages/userPages/userDashboard";
import Library from "./pages/userPages/userLibrary";
import Profile from "./pages/userPages/userManagement";
import Consultancy from "./pages/userPages/LiveConsultancy";
import ConsultantProfile from "./pages/userPages/ConsultantProfile";
import History from "./pages/userPages/userHistory";
import UserNotifications from "./pages/userPages/userNotifications";
import UserGoals from "./pages/userPages/userGoals";
import AccountSelection from "./components/accountSelection";

// Consultancy side pages
import CHistory from "./pages/consultantPages/consultantHistory";
import CLibrary from "./pages/consultantPages/consultantLibrary";
import CProfile from "./pages/consultantPages/consultancyManagement";
import ConsultantOverview from "./pages/consultantPages/consultantOverview";
import ConsultantWorkSchedule from "./pages/consultantPages/consultantWorkSchedule";
import ConsultantNotifications from "./pages/consultantPages/consultantNotifications";

// Admin side pages
import AdminOverview from "./pages/Admin/adminOverview";
import UserManagement from "./pages/Admin/userManagement";
import UploadLibrary from "./pages/Admin/adminUploadLibrary";
import TaskManagement from "./pages/Admin/taskManagement";
import AdminConsultancyManagement from "./pages/Admin/adminConsultancyManagement";
import ConsultantReviewsPage from "./pages/Admin/consultantReviews";
import TransactionManagement from "./pages/Admin/TransactionManagement";
import AiFilesPage from "./pages/Admin/aiFiles";
import BookingPaymentReturn from "./pages/bookingPaymentReturn";
import ChatWidget from "./components/shared/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/accountselection" element={<AccountSelection />} />
          <Route path="/consultancyregistration" element={<ConsultancyRegistration />} /> */}
          <Route path="/userregistration" element={<UserRegistrationPersonal />} />
          <Route path="/userregistration/business" element={<UserRegistrationBusiness />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Userdashboard" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/consultant/:id" element={<ConsultantProfile />} />
          <Route path="/history" element={<History />} />
          <Route path="/notifications" element={<UserNotifications />} />
          <Route path="/goals" element={<UserGoals />} />
          {/* Adding the consultant routes */}
          <Route path="/consultantdashboard" element={<ConsultantOverview />} />
          <Route path="/consultanthistory" element={<CHistory />} />
          <Route path="/consultantlibrary" element={<CLibrary />} />
          <Route path="/consultantprofile" element={<CProfile />} />
          <Route path="/consultantworkschedule" element={<ConsultantWorkSchedule />} />
          <Route path="/consultantnotifications" element={<ConsultantNotifications />} />
          {/* Admin routes */}
          <Route path="/admin/overview" element={<AdminOverview />} />
          <Route path="/admin/usermanagement" element={<UserManagement />} />
          <Route path="/admin/usermanagement/consultants/:consultantId/reviews" element={<ConsultantReviewsPage />} />
          <Route path="/admin/uploadlibrary" element={<UploadLibrary />} />
          <Route path="/admin/taskmanagement" element={<TaskManagement />} />
          <Route path="/admin/consultancy" element={<AdminConsultancyManagement />} />
          <Route path="/admin/transactions" element={<TransactionManagement />} />
          <Route path="/admin/ai-files" element={<AiFilesPage />} />
          <Route path="/booking-payment/return" element={<BookingPaymentReturn />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
