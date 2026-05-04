import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Briefcase } from "lucide-react";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);
  const top = allJobs.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 my-20">
      {/* Section heading */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 text-xs font-medium mb-3">
            <Sparkles size={12} /> Hand-picked for you
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Latest <span className="text-gradient">job openings</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
            Fresh roles posted by verified companies. Apply early — the best ones go fast.
          </p>
        </div>
        <Link
          to="/Browse"
          className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-300 hover:gap-3 transition-all"
        >
          View all jobs <ArrowRight size={16} />
        </Link>
      </div>

      {top.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-4">
            <Briefcase className="text-purple-500" size={28} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">No openings yet</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Check back soon — new roles drop daily.</p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {top.map((job) => (
            <motion.div
              key={job._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
            >
              <JobCards job={job} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default LatestJobs;
