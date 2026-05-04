import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT, buildLogoUrl } from "@/utils/data";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  ArrowLeft, Briefcase, MapPin, DollarSign, Users, Calendar,
  Clock, CheckCircle2, AlertCircle, Loader2, Building2, Sparkles, Tag,
} from "lucide-react";

const InfoTile = ({ icon: Icon, label, value, color = "purple" }) => {
  const colors = {
    purple: "text-purple-600 bg-purple-50 dark:text-purple-300 dark:bg-purple-500/10",
    blue: "text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-500/10",
    emerald: "text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10",
    orange: "text-orange-600 bg-orange-50 dark:text-orange-300 dark:bg-orange-500/10",
    pink: "text-pink-600 bg-pink-50 dark:text-pink-300 dark:bg-pink-500/10",
    indigo: "text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-500/10",
  };
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-500/30 transition-all">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <p className="text-sm font-bold text-gray-900 dark:text-white">{value || "—"}</p>
      </div>
    </div>
  );
};

const Description = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (a) => a.applicant === user?._id || a.applicant?._id === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please sign in to apply");
      return navigate("/login");
    }
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...(singleJob.applications || []), { applicant: user._id }],
          })
        );
        toast.success("Application submitted!", {
          description: "The recruiter will review your profile shortly.",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (a) => a.applicant === user?._id || a.applicant?._id === user?._id
            ) || false
          );
        } else {
          setError("Failed to fetch job details.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.response?.data?.message || "Failed to load this job.");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="animate-spin text-purple-500" size={36} />
        </div>
      </div>
    );
  }

  if (error || !singleJob) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="max-w-md mx-auto py-32 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-5">
            <AlertCircle className="text-red-500" size={36} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Job not available
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{error || "This job may have been removed."}</p>
          <button
            onClick={() => navigate("/Browse")}
            className="mt-6 px-6 py-2.5 rounded-xl btn-gradient text-sm font-semibold"
          >
            Browse other jobs
          </button>
        </div>
      </div>
    );
  }

  const logo = buildLogoUrl(singleJob.company?.logo);
  const initials = singleJob.company?.name?.slice(0, 2).toUpperCase() || "—";
  const daysAgo = Math.floor((Date.now() - new Date(singleJob.createdAt).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 mb-6 transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm"
        >
          {/* Gradient strip */}
          <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500" />

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6 justify-between">
              <div className="flex items-start gap-5">
                {logo ? (
                  <img src={logo} alt={singleJob.company?.name} className="w-20 h-20 rounded-2xl object-cover border border-gray-100 dark:border-white/10 shadow" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {initials}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-purple-600 dark:text-purple-300">
                    <Building2 size={13} /> <span className="capitalize">{singleJob.company?.name || "Unknown"}</span>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <Clock size={13} /> {daysAgo === 0 ? "Posted today" : `${daysAgo}d ago`}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1.5">
                    {singleJob.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-medium">
                      <Briefcase size={12} /> {singleJob.jobType}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                      <DollarSign size={12} /> {singleJob.salary} LPA
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-medium">
                      <MapPin size={12} /> {singleJob.location}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`whitespace-nowrap px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all ${
                  isApplied
                    ? "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 cursor-default"
                    : "btn-gradient hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isApplied ? (<><CheckCircle2 size={16} /> Applied</>) : (<><Sparkles size={16} /> Apply Now</>)}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <InfoTile icon={Users} label="Openings" value={singleJob.position} color="purple" />
          <InfoTile icon={Briefcase} label="Experience" value={singleJob.experienceLevel != null ? `${singleJob.experienceLevel} yrs` : "—"} color="indigo" />
          <InfoTile icon={DollarSign} label="Salary" value={`${singleJob.salary} LPA`} color="emerald" />
          <InfoTile icon={Users} label="Applicants" value={singleJob.applications?.length || 0} color="orange" />
        </div>

        {/* Description + sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Tag size={16} className="text-purple-500" /> About this role
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-line">
              {singleJob.description || "No description provided."}
            </p>

            {singleJob.requirements?.length > 0 && (
              <>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mt-6 mb-3">Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  {singleJob.requirements.map((req, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs font-medium border border-gray-200 dark:border-white/10"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6 h-fit">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Job overview</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                <Calendar size={15} className="mt-0.5 text-purple-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Posted on</p>
                  <p className="font-medium">{singleJob.createdAt?.split("T")[0]}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                <MapPin size={15} className="mt-0.5 text-purple-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Location</p>
                  <p className="font-medium">{singleJob.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                <Briefcase size={15} className="mt-0.5 text-purple-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Job type</p>
                  <p className="font-medium capitalize">{singleJob.jobType}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                <Building2 size={15} className="mt-0.5 text-purple-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Company</p>
                  <p className="font-medium capitalize">{singleJob.company?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Description;
