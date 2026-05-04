import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Sparkles, ArrowRight, Briefcase, Building2, Users } from "lucide-react";

const PREVIEW_JOBS = [
  { title: "Senior Frontend Engineer", company: "TCS", type: "Full-time", salary: "18 LPA" },
  { title: "Data Scientist", company: "Infosys", type: "Remote", salary: "22 LPA" },
  { title: "Backend Developer", company: "Microsoft", type: "Hybrid", salary: "30 LPA" },
];

const SignInGate = ({ heading = "Discover your next opportunity" }) => (
  <div className="relative max-w-7xl mx-auto px-4 py-16">
    {/* Blurred preview cards */}
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pointer-events-none select-none">
        {PREVIEW_JOBS.map((j, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-5 opacity-40 blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-orange-400 mb-3" />
            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded-full w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 dark:bg-white/5 rounded-full w-1/2 mb-4" />
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-blue-100 dark:bg-blue-500/10 rounded-full" />
              <div className="h-6 w-16 bg-orange-100 dark:bg-orange-500/10 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Lock overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl p-10 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-500/30">
            <Lock className="text-white" size={28} />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {heading}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 leading-relaxed">
            Sign in to browse thousands of verified job listings, track your applications, and connect with top companies.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6 text-center">
            {[
              { icon: Briefcase, value: "10K+", label: "Jobs" },
              { icon: Building2, value: "500+", label: "Companies" },
              { icon: Users, value: "50K+", label: "Hired" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <Icon size={18} className="text-purple-500 mx-auto mb-1" />
                <p className="text-base font-bold text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              to="/login"
              className="flex-1 py-3 rounded-xl btn-gradient text-sm font-semibold flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={16} />
            </Link>
            <Link
              to="/register"
              className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition flex items-center justify-center gap-2"
            >
              <Sparkles size={15} /> Create Account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default SignInGate;
