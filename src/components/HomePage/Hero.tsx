import { Link } from "react-router-dom";
import Media from "../../assets/Media.png";

const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-0 py-16 lg:py-24">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Welcome to</p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900">
            Me<span className="text-primary">Ri</span>
          </h1>
        </div>

        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">

          <div className="order-1 lg:order-2">
            <div className="bg-slate-50 rounded-[36px] shadow-[0_30px_80px_rgba(15,23,42,0.08)] p-8">
              <img
                src={Media}
                alt="People collaborating"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Scale <span className="text-primary">With Confidence</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-lg">
              The consultancy platform that helps Ethiopian founders move from idea to
              operations. Meri gives you the playbook, partners, and paperwork for
              launching fast and growing with clarity.
            </p>
            <Link
              to="/accountselection"
              className="inline-flex items-center justify-center bg-[#5651FF] hover:bg-[#433AE6] text-white font-semibold rounded-2xl px-8 py-4 text-lg shadow-lg shadow-indigo-200 transition-colors"
            >
              Get Started Free
            </Link>

            <div className="flex items-center gap-8 md:gap-12 pt-6">
              <div>
                <p className="text-4xl font-black text-slate-900">10+</p>
                <p className="text-sm text-slate-500 mt-2 leading-snug">
                  Customers already scaling with Meri
                </p>
              </div>
              <span className="h-16 w-px bg-slate-200" />
              <div>
                <p className="text-4xl font-black text-slate-900">240+</p>
                <p className="text-sm text-slate-500 mt-2 leading-snug">
                  Documents for reference & support
                </p>
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </section>
  );
};

export default HeroSection;