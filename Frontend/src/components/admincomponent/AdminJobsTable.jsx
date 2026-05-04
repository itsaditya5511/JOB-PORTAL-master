import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Edit2, Eye, Briefcase, MapPin, DollarSign,
  Users, Calendar, ChevronRight
} from "lucide-react";
import { buildLogoUrl } from "@/utils/data";

const typeBadge = (type) => {
  const map = {
    "full-time": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    "part-time": "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300",
    remote: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    contract: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
    internship: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  };
  const key = type?.toLowerCase() || "";
  return map[key] || "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-gray-300";
};

const JobRow = ({ job, navigate }) => {
  const logo = buildLogoUrl(job?.company?.logo);
  const initials = job?.company?.name?.slice(0, 2).toUpperCase() || "—";
  const date = job.createdAt?.split("T")[0] || "—";

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-5 hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-200 dark:hover:border-purple-500/30 transition-all">
      <div className="flex items-start gap-4">
        {/* Company logo */}
        {logo ? (
          <img src={logo} alt={job?.company?.name} className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-white/10 flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">{job.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{job?.company?.name || "—"}</p>
            </div>
            {/* Action buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => navigate(`/admin/companies/${job._id}`)}
                title="Edit"
                className="p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                <Edit2 size={15} />
              </button>
              <button
                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                title="View Applicants"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-medium hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors"
              >
                <Users size={13} /> Applicants
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            {job.jobType && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${typeBadge(job.jobType)}`}>
                {job.jobType}
              </span>
            )}
            {job.location && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                <MapPin size={11} /> {job.location}
              </span>
            )}
            {job.salary && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                <DollarSign size={11} /> {Number(job.salary).toLocaleString("en-IN")} LPA
              </span>
            )}
            {job.experienceLevel != null && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                <Briefcase size={11} /> {job.experienceLevel}yr exp
              </span>
            )}
            {job.position && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
                <Users size={11} /> {job.position} opening{job.position > 1 ? "s" : ""}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 ml-auto">
              <Calendar size={11} /> {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (!allAdminJobs) return;
    const filtered = searchJobByText
      ? allAdminJobs.filter(
          (j) =>
            j.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
            j?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        )
      : allAdminJobs;
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  if (!allAdminJobs) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-gray-200 dark:bg-white/5" />
        ))}
      </div>
    );
  }

  if (filterJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-5">
          <Briefcase className="text-indigo-500" size={36} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">No jobs found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          {searchJobByText
            ? `No results for "${searchJobByText}".`
            : "Post your first job to start receiving applicants."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filterJobs.map((job) => (
        <JobRow key={job._id} job={job} navigate={navigate} />
      ))}
    </div>
  );
};

export default AdminJobsTable;
