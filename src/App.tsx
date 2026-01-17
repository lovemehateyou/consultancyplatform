import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home";

import ConsultancyRegistration from "./pages/consultantRegistration";
import UserRegistrationForm from "./components/UserRegistrationForm";
import LoginForm from "./components/LoginForm";
import NotFound from "./pages/NotFound";
//User side pages
import Dashboard from "./pages/userPages/userDashboard";
import Library from "./pages/userPages/userLibrary";
import Profile from "./pages/userPages/userManagement";
import Consultancy from "./pages/userPages/LiveConsultancy";
import ConsultantProfile from "./pages/userPages/ConsultantProfile";
import History from "./pages/userPages/userHistory";
import AccountSelection from "./components/accountSelection";

// Consultancy side pages
import CHistory from "./pages/consultantPages/consultantHistory";
import CLibrary from "./pages/consultantPages/consultantLibrary";
import CProfile from "./pages/consultantPages/consultancyManagement";
import ConsultantOverview from "./pages/consultantPages/consultantOverview";
import ConsultantWorkSchedule from "./pages/consultantPages/consultantWorkSchedule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/accountselection" element={<AccountSelection />} />
          <Route path="/consultancyregistration" element={<ConsultancyRegistration />} />
          <Route path="/userregistration" element={<UserRegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Userdashboard" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/consultant/:id" element={<ConsultantProfile />} />
          <Route path="/history" element={<History />} />
          {/* Adding the consultant routes */}
          <Route path="/consultantdashboard" element={<ConsultantOverview />} />
          <Route path="/consultanthistory" element={<CHistory />} />
          <Route path="/consultantlibrary" element={<CLibrary />} />
          <Route path="/consultantprofile" element={<CProfile />} />
          <Route path="/consultantworkschedule" element={<ConsultantWorkSchedule />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
