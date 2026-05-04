import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, buildResumeUrl } from "@/utils/data";
import {
  FileText, Mail, Phone, Calendar, CheckCircle, XCircle,
  Clock, Users, ExternalLink, Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

const STATUS_MAP = {
  pending: {
    label: "Pending",
    cls: "bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300",
    icon: Clock,
  },
  reviewing: {
    label: "Reviewing",
    cls: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    icon: Clock,
  },
  shortlisted: {
    label: "Shortlisted",
    cls: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    icon: CheckCircle,
  },
  hired: {
    label: "Hired",
    cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    cls: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
    icon: XCircle,
  },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_MAP[status?.toLowerCase()] || STATUS_MAP.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.cls}`}>
      <Icon size={12} /> {cfg.label}
    </span>
  );
};

const getInitials = (name) =>
  name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";

const avatarColors = [
  "from-purple-500 to-indigo-500",
  "from-pink-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-red-500",
];

const ApplicantCard = ({ item, idx, onStatusChange }) => {
  const [loading, setLoading] = useState(null);
  const resumeUrl = item?.applicant?.profile?.resume
    ? buildResumeUrl(item.applicant.profile.resume)
    : null;
  const date = item?.createdAt?.split("T")[0] || "—";
  const currentStatus = item?.status || "pending";
  const color = avatarColors[idx % avatarColors.length];
  const initials = getInitials(item?.applicant?.fullname);

  const handleStatus = async (status) => {
    setLoading(status);
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${item._id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(`Marked as ${status}`, {
          description: `${item.applicant?.fullname}'s application is now ${status}.`,
        });
        onStatusChange(item._id, status);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: idx * 0.05 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-200 dark:hover:border-purple-500/30 transition-all"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-white font-bold text-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
                {item?.applicant?.fullname || "Unknown"}
              </h3>
              <StatusBadge status={currentStatus} />
            </div>
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
              <Calendar size={12} /> Applied {date}
            </span>
          </div>

          {/* Contact row */}
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-purple-500 shrink-0" />
              <span className="truncate">{item?.applicant?.email}</span>
            </span>
            {item?.applicant?.phoneNumber && (
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-purple-500 shrink-0" />
                {item.applicant.phoneNumber}
              </span>
            )}
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <FileText size={14} /> View Resume <ExternalLink size={12} />
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-gray-400">
                <FileText size={14} /> No resume uploaded
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex-wrap">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">Update status:</span>

            {[
              { value: "shortlisted", label: "Shortlist", cls: "border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-500/30 dark:text-blue-300 dark:hover:bg-blue-500/10" },
              { value: "accepted", label: "Accept", cls: "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:bg-emerald-500/10" },
              { value: "rejected", label: "Reject", cls: "border-red-200 text-red-700 hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10" },
            ].map(({ value, label, cls }) => {
              const isActive = currentStatus === value;
              const isLoading = loading === value;
              return (
                <button
                  key={value}
                  onClick={() => handleStatus(value)}
                  disabled={!!loading || isActive}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold transition-all disabled:cursor-not-allowed ${
                    isActive
                      ? "opacity-40 cursor-default"
                      : `${cls} hover:scale-[1.02] active:scale-[0.98]`
                  }`}
                >
                  {isLoading ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : value === "accepted" ? (
                    <CheckCircle size={13} />
                  ) : value === "rejected" ? (
                    <XCircle size={13} />
                  ) : (
                    <Clock size={13} />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();

  const handleStatusChange = (applicationId, newStatus) => {
    if (!applicants?.applications) return;
    const updated = {
      ...applicants,
      applications: applicants.applications.map((app) =>
        app._id === applicationId ? { ...app, status: newStatus } : app
      ),
    };
    dispatch(setAllApplicants(updated));
  };

  const apps = applicants?.applications || [];

  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-5">
          <Users className="text-purple-500" size={36} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">No applicants yet</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-xs">
          Share this job listing to start receiving applications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {apps.map((item, idx) => (
        <ApplicantCard
          key={item._id}
          item={item}
          idx={idx}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default ApplicantsTable;
