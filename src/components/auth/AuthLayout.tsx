import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  /** Optional eyebrow shown above the heading inside the form panel */
  eyebrow?: string;
  /** Headline shown on the brand (left) panel */
  brandHeadline?: string;
  /** Sub-copy shown on the brand (left) panel */
  brandSubcopy?: string;
  /** Bullet points highlighted on the brand panel */
  highlights?: string[];
  /** Optional width cap for the form column */
  contentMaxWidth?: string;
}

const defaultHighlights = [
  "Connect with vetted business consultants",
  "Track your business goals in one place",
  "Curated resources from industry experts",
];

const AuthLayout = ({
  children,
  brandHeadline = "Build your business with confidence.",
  brandSubcopy = "Meri gives you the tools, mentors and resources to grow — all in one elegant workspace.",
  highlights = defaultHighlights,
  contentMaxWidth = "max-w-2xl",
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        {/* Brand panel */}
        <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary to-blue-700 p-12 text-primary-foreground">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_40%)]" />

          <Link to="/" className="relative z-10 inline-flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 backdrop-blur-sm">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-xl">Meri</span>
          </Link>

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight tracking-tight">{brandHeadline}</h2>
              <p className="text-base text-white/80 max-w-md">{brandSubcopy}</p>
            </div>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="relative z-10 text-xs text-white/60">
            © {new Date().getFullYear()} Meri. All rights reserved.
          </p>
        </aside>

        {/* Form panel */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className={`w-full ${contentMaxWidth}`}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
