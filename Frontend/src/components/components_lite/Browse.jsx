import React, { useEffect, useMemo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Job1 from "./Job1";
import SignInGate from "./SignInGate";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { Search, Briefcase, X } from "lucide-react";

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (!searchedQuery?.trim()) return allJobs;
    const q = searchedQuery.toLowerCase();
    return allJobs.filter(
      (j) =>
        j.title?.toLowerCase().includes(q) ||
        j.description?.toLowerCase().includes(q) ||
        j.location?.toLowerCase().includes(q) ||
        j.company?.name?.toLowerCase().includes(q)
    );
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center shadow-md">
              <Search className="text-white" size={18} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {searchedQuery ? "Search results" : "Browse all jobs"}
            </h1>
          </div>
          {user && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filtered.length} {filtered.length === 1 ? "job" : "jobs"} found
              {searchedQuery && (
                <>
                  {" "}for{" "}
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 font-medium">
                    "{searchedQuery}"
                    <button onClick={() => dispatch(setSearchedQuery(""))} aria-label="Clear" className="hover:text-purple-800">
                      <X size={12} />
                    </button>
                  </span>
                </>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Content — gated */}
      {!user ? (
        <SignInGate heading="Sign in to browse all job listings" />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-5">
            <Briefcase className="text-purple-500" size={36} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">No jobs found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {searchedQuery ? "Try a different keyword or clear the filter." : "Check back soon — new roles drop daily."}
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((job) => (
              <motion.div key={job._id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
                <Job1 job={job} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Browse;
