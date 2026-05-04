import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Briefcase, MapPin, DollarSign, Clock, ArrowUpRight, Lock } from "lucide-react";
import { buildLogoUrl } from "@/utils/data";
import { toast } from "sonner";

const JobCards = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const logo = buildLogoUrl(job?.company?.logo);
  const initials = job?.company?.name?.slice(0, 2).toUpperCase() || "JP";
  const daysAgo = Math.floor((Date.now() - new Date(job?.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  const handleClick = () => {
    if (!user) {
      toast.error("Sign in to view job details", {
        description: "Create a free account or sign in to explore opportunities.",
        action: { label: "Sign In", onClick: () => navigate("/login") },
      });
      return;
    }
    navigate(`/description/${job._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-5 cursor-pointer hover:border-purple-300 dark:hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      {!user && (
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
          <Lock size={13} className="text-gray-400" />
        </div>
      )}

      {user && (
        <ArrowUpRight size={18} className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 group-hover:text-purple-500 group-hover:scale-110 transition-all" />
      )}

      <div className="flex items-center gap-3">
        {logo ? (
          <img src={logo} alt={job?.company?.name} className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-white/10" />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-orange-500 text-white font-bold flex items-center justify-center">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white capitalize truncate">
            {job?.company?.name || "Company"}
          </h3>
          <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPin size={11} /> {job?.location || "India"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white leading-snug line-clamp-1">{job?.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {job?.position && (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300">
            {job.position} {job.position > 1 ? "openings" : "opening"}
          </span>
        )}
        {job?.salary && (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300">
            <DollarSign size={11} /> {job.salary} LPA
          </span>
        )}
        {job?.jobType && (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 capitalize">
            <Briefcase size={11} /> {job.jobType}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-white/5">
        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <Clock size={12} /> {daysAgo === 0 ? "Posted today" : `${daysAgo}d ago`}
        </span>
        <span className={`text-xs font-semibold ${user ? "text-purple-600 dark:text-purple-300 group-hover:underline" : "text-gray-400"}`}>
          {user ? "View details →" : "Sign in to view"}
        </span>
      </div>
    </div>
  );
};

export default JobCards;
