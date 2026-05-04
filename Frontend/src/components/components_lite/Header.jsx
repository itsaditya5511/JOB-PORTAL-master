import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search, Briefcase, MapPin, TrendingUp, Users, Building2, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Stat = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-3 px-5 py-4 rounded-2xl glass">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-white shadow-md">
      <Icon size={20} />
    </div>
    <div className="text-left">
      <p className="text-xl font-bold text-gray-900 dark:text-white leading-none">{value}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{label}</p>
    </div>
  </div>
);

const Header = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/Browse");
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-purple-50/40 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center animate-fadeIn">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
          <Sparkles size={14} /> 10,000+ jobs from verified companies
        </span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.05] tracking-tight">
          Find the right{" "}
          <span className="text-gradient animate-gradient-x">job</span>
          <br />
          that fits <span className="text-gradient-cool">your life</span>
        </h1>

        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
          Explore thousands of opportunities, connect with top companies, and build a career
          you're proud of — all in one place.
        </p>

        {/* Search Bar */}
        <div className="mt-10 mx-auto max-w-3xl glass-strong rounded-2xl p-2 shadow-xl flex flex-col md:flex-row items-stretch gap-2">
          <div className="flex items-center gap-2 px-4 flex-1 min-h-[48px]">
            <Briefcase className="text-purple-500 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Job title, keyword, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchjobHandler()}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
            />
          </div>

          <div className="hidden md:block w-px bg-gray-300/60 dark:bg-white/10 my-2" />

          <div className="flex items-center gap-2 px-4 md:w-56 min-h-[48px]">
            <MapPin className="text-purple-500 shrink-0" size={18} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchjobHandler()}
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
            />
          </div>

          <Button
            onClick={searchjobHandler}
            className="rounded-xl btn-gradient px-6 py-3 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Quick search tags */}
        <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Trending:</span>
          {["Remote", "Frontend", "Data", "Designer", "Product"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setQuery(t);
                dispatch(setSearchedQuery(t));
                navigate("/Browse");
              }}
              className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Stat icon={Briefcase} value="10K+" label="Active job listings" />
          <Stat icon={Building2} value="500+" label="Verified companies" />
          <Stat icon={Users} value="50K+" label="Candidates hired" />
        </div>
      </div>
    </section>
  );
};

export default Header;
