import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import SignInGate from "./SignInGate";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Briefcase, SlidersHorizontal, X } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }
    const q = searchedQuery.toLowerCase();
    setFilterJobs(
      allJobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(q) ||
          job.description?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q) ||
          job.company?.name?.toLowerCase().includes(q)
      )
    );
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Page header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
              <Briefcase className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Jobs</h1>
              {user && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {filterJobs.length} role{filterJobs.length !== 1 ? "s" : ""} available
                </p>
              )}
            </div>
          </div>
          {user && (
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 text-sm font-medium"
            >
              {filterOpen ? <X size={16} /> : <SlidersHorizontal size={16} />}
              {filterOpen ? "Close" : "Filters"}
            </button>
          )}
        </div>
      </div>

      {/* Gated content */}
      {!user ? (
        <SignInGate heading="Sign in to filter and explore jobs" />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <aside className={`md:w-72 ${filterOpen ? "block" : "hidden md:block"}`}>
              <FilterCard />
            </aside>
            <div className="flex-1 min-w-0">
              {filterJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-5">
                    <Briefcase className="text-purple-500" size={36} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">No jobs match your filters</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Try adjusting them to see more results.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {filterJobs.map((job) => (
                    <motion.div key={job._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                      <Job1 job={job} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
