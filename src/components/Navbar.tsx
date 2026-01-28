import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import Logo from "@/assets/Logo.png";

type UserRole = "user" | "consultant" | "admin";

const ROLE_ROUTES: Record<UserRole, string> = {
  user: "/userDashboard",
  consultant: "/consultantDashboard",
  admin: "/adminDashboard",
};

const getRoleFromCookie = (): UserRole | null => {
  if (typeof document === "undefined") return null;
  const cookieChunk = document.cookie
    .split("; ")
    .find((segment) => segment.startsWith("userInfo="));
  if (!cookieChunk) return null;

  const [, rawValue = ""] = cookieChunk.split("=");
  if (!rawValue) return null;

  try {
    let decoded = decodeURIComponent(rawValue);
    if (decoded.startsWith("j:")) {
      decoded = decoded.slice(2);
    }
    const parsed = JSON.parse(decoded);
    return parsed?.role ?? null;
  } catch (error) {
    console.error("Failed to parse userInfo cookie", error);
    return null;
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const { dashboardHref, isAuthenticated } = useMemo(() => {
    const resolvedRole = (user?.role as UserRole | undefined) ?? getRoleFromCookie();
    if (!resolvedRole) {
      return { dashboardHref: null, isAuthenticated: false };
    }
    return { dashboardHref: ROLE_ROUTES[resolvedRole], isAuthenticated: true };
  }, [user?.role]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'What We Do', href: '#wedo' },
    { name: 'Why Us', href: '#why' },
    { name: 'How It Works', href: '#how' },
    { name: 'Contact us', href: '#support' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="ZMenus" className="h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-sm font-montserrat font-medium transition-colors hover:text-primary text-black"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && dashboardHref ? (
              <Link to={dashboardHref}>
                <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Go to Dashboard</span>
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/userregistration">
                  <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-black/10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="block py-2 text-sm font-montserrat font-medium transition-colors hover:text-primary text-black"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              {isAuthenticated && dashboardHref ? (
                <Link to={dashboardHref} className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="block">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/accountselection" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;