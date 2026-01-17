import { Link } from "react-router-dom";
import Media from "../../assets/Media.png";

const HeroSection = () => {
  return (
    <section className="bg-white" id="home">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-0 py-8 lg:py-6">

        <div className="text-center">
          <p className="text-md uppercase text-slate-400">Welcome to</p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900">
            Me<span className="text-blue-600">Ri</span>
          </h1>
        </div>

        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">

            <div className="scale-75 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <img
                src={Media}
                alt="People collaborating"
                className="w-full h-full object-cover"
              />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">
              Scale 
              <br/>
              <span className="text-primary">
                With Confidence
              </span>
            </h2>
            <p className="text-base text-slate-500 max-w-lg">
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
                <p className="text-2xl font-black text-slate-900">10+</p>
                <p className="text-base text-slate-500 mt-2 leading-snug">
                  Customers already scaling with Meri
                </p>
              </div>
              <span className="h-16 w-px bg-slate-200" />
              <div>
                <p className="text-2xl font-black text-slate-900">240+</p>
                <p className="text-base text-slate-500 mt-2 leading-snug">
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