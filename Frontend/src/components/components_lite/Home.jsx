import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";
import LatestJobs from "./LatestJobs";
import SignInGate from "./SignInGate";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Building2, Users, TrendingUp, ShieldCheck, Zap, Globe } from "lucide-react";

import deloitte from "../../assets/deloitte.png";
import infosys from "../../assets/infosys.jpg";
import microsoft from "../../assets/microsoft.jpg";
import tcs from "../../assets/tcs.png";

const companies = [
  { name: "TCS", img: tcs },
  { name: "Infosys", img: infosys },
  { name: "Microsoft", img: microsoft },
  { name: "Deloitte", img: deloitte },
  { name: "TCS", img: tcs },
  { name: "Infosys", img: infosys },
  { name: "Microsoft", img: microsoft },
  { name: "Deloitte", img: deloitte },
];

const WhyCard = ({ icon: Icon, title, desc, accent }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="flex flex-col gap-3 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all"
  >
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${accent}`}>
      <Icon size={20} />
    </div>
    <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
  </motion.div>
);

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") navigate("/admin/companies");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <Navbar />
      <Header />

      {/* ── COMPANIES MARQUEE ─────────────────────────────── */}
      <section className="relative overflow-hidden py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-white/5">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-10 pointer-events-none" />

        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-500 dark:text-purple-400 mb-2">Trusted by the best</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            Companies hiring through <span className="text-gradient">JobPortal</span>
          </h2>
        </div>

        <div className="flex overflow-hidden">
          <div className="flex gap-6 animate-carousel w-max">
            {[...companies, ...companies].map((co, i) => (
              <div key={i} className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-sm min-w-[170px]">
                <img src={co.img} alt={co.name} className="w-10 h-10 rounded-xl object-contain" />
                <span className="font-bold text-gray-800 dark:text-white text-sm">{co.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[
            { value: "500+", label: "Verified Companies", icon: Building2 },
            { value: "50K+", label: "Candidates Placed", icon: Users },
            { value: "10K+", label: "Active Roles", icon: TrendingUp },
            { value: "98%", label: "Satisfaction Rate", icon: ShieldCheck },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-5 px-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-sm text-center">
              <Icon size={20} className="text-purple-500 mb-1" />
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY JOBPORTAL ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">Why choose us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Everything you need to <span className="text-gradient">land your dream job</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <WhyCard icon={Zap} title="One-click Apply" desc="Your profile is your resume. Apply to any job instantly." accent="bg-gradient-to-br from-purple-500 to-indigo-500" />
          <WhyCard icon={ShieldCheck} title="Verified Listings" desc="Every job is manually reviewed. Zero spam, zero ghost jobs." accent="bg-gradient-to-br from-emerald-500 to-teal-500" />
          <WhyCard icon={TrendingUp} title="Smart Matches" desc="Our search matches your skills to the right roles." accent="bg-gradient-to-br from-orange-500 to-pink-500" />
          <WhyCard icon={Globe} title="Remote-first" desc="Filter by remote, hybrid, or on-site. Work from anywhere." accent="bg-gradient-to-br from-blue-500 to-cyan-500" />
        </div>
      </section>

      {/* ── LATEST JOBS (gated) ───────────────────────────── */}
      <div className="bg-gray-50 dark:bg-gray-900/30 border-y border-gray-100 dark:border-white/5">
        {!user ? (
          <SignInGate heading="Sign in to explore job openings" />
        ) : loading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-purple-500" size={24} />
            <span className="text-gray-500 dark:text-gray-400 text-sm">Finding the best roles for you…</span>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500 text-sm">Could not load jobs. Please refresh.</div>
        ) : (
          <LatestJobs />
        )}
      </div>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      {!user && (
        <section className="max-w-5xl mx-auto px-4 py-20">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.12),transparent_60%)]" />
            <h2 className="relative text-2xl md:text-4xl font-bold text-white tracking-tight">
              Ready to find your next opportunity?
            </h2>
            <p className="relative text-white/85 mt-3 max-w-xl mx-auto">
              Join 50,000+ candidates who found their dream job through JobPortal.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/Browse" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white text-purple-700 font-bold text-sm hover:scale-[1.03] transition-transform">
                Browse Jobs <ArrowRight size={16} />
              </Link>
              <Link to="/register" className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white/10 backdrop-blur text-white border border-white/30 font-semibold text-sm hover:bg-white/20 transition">
                Create Free Account
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;
