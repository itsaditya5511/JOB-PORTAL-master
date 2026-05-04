import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bookmark, Briefcase, MapPin, DollarSign, Clock, Users, Lock } from "lucide-react";
import { buildLogoUrl } from "@/utils/data";
import { toast } from "sonner";

const Job1 = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const logo = buildLogoUrl(job?.company?.logo);
  const initials = job?.company?.name?.slice(0, 2).toUpperCase() || "JP";
  const daysAgo = Math.floor((Date.now() - new Date(job?.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  const handleView = () => {
    if (!user) {
      toast.error("Sign in to view job details", {
        description: "Create a free account or sign in to explore and apply for jobs.",
        action: { label: "Sign In", onClick: () => navigate("/login") },
      });
      return;
    }
    navigate(`/description/${job?._id}`);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:border-purple-300 dark:hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
          <Clock size={11} /> {daysAgo === 0 ? "Posted today" : `${daysAgo}d ago`}
        </span>
        {user ? (
          <button className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors" aria-label="Save">
            <Bookmark size={16} />
          </button>
        ) : (
          <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5">
            <Lock size={14} className="text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4">
        {logo ? (
          <img src={logo} alt={job?.company?.name} className="w-14 h-14 rounded-xl object-cover border border-gray-100 dark:border-white/10" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-orange-500 text-white font-bold text-lg flex items-center justify-center">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white capitalize truncate">{job?.company?.name || "Company"}</h3>
          <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPin size={11} /> {job?.location || "India"}
          </p>
        </div>
      </div>

      <h2 className="font-bold text-lg text-gray-900 dark:text-white leading-snug line-clamp-1">{job?.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">{job?.description}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {job?.position && (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300">
            <Users size={11} /> {job.position}
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

      <div className="flex items-center gap-2 mt-5 pt-5 border-t border-gray-100 dark:border-white/5">
        <button
          onClick={handleView}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
        >
          {user ? "View Details" : "Sign In to View"}
        </button>
        <button
          onClick={handleView}
          className="flex-1 py-2.5 rounded-xl btn-gradient text-sm font-semibold"
        >
          {user ? "Apply Now" : "Sign In to Apply"}
        </button>
      </div>
    </div>
  );
};

export default Job1;
