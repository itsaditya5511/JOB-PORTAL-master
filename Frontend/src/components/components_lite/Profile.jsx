import React, { useState } from "react";
import Navbar from "./Navbar";
import { Pen, FileText, Briefcase, Mail, Phone, MapPin, CheckCircle, Clock, XCircle, Camera } from "lucide-react";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector, useDispatch } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";
import { buildResumeUrl, buildPhotoUrl, USER_API_ENDPOINT } from "@/utils/data";
import { motion } from "framer-motion";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";

const StatusBadge = ({ status }) => {
  const map = {
    accepted: { cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300", icon: CheckCircle },
    rejected: { cls: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300", icon: XCircle },
    pending: { cls: "bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300", icon: Clock },
  };
  const cfg = map[status?.toLowerCase()] || map.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${cfg.cls}`}>
      <Icon size={11} /> {status || "Pending"}
    </span>
  );
};

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { allAppliedJobs } = useSelector((store) => store.job);

  const isResume = Boolean(user?.profile?.resume);
  const photoSrc = buildPhotoUrl(user?.profile?.profilePhoto);
  const initials = user?.fullname?.slice(0, 2).toUpperCase() || "U";

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    try {
      setUploading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/upload-photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile photo updated!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* ── Main Profile Card ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden"
        >
          {/* Banner */}
          <div className="h-28 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_60%,white,transparent_60%)]" />
          </div>

          {/* Avatar over banner */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 mb-6">
              <div className="relative w-fit">
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt="profile"
                    className="w-28 h-28 rounded-3xl object-cover border-4 border-white dark:border-gray-900 shadow-xl"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-600 to-orange-500 text-white font-bold text-4xl flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-xl">
                    {initials}
                  </div>
                )}
                {/* Camera button */}
                <label className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  {uploading ? (
                    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera size={16} className="text-purple-600 dark:text-purple-300" />
                  )}
                  <input type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handlePhotoUpload} />
                </label>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-sm font-semibold self-start sm:self-auto mt-4 sm:mt-0"
              >
                <Pen size={15} /> Edit Profile
              </button>
            </div>

            {/* Name + bio */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.fullname}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
              {user?.profile?.bio || (
                <span className="italic text-gray-400 dark:text-gray-500">No bio yet — click Edit Profile to add one.</span>
              )}
            </p>

            {/* Contact pills */}
            <div className="flex flex-wrap gap-3 mt-5">
              {user?.email && (
                <a href={`mailto:${user.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-700 dark:text-gray-300 hover:border-purple-300 hover:text-purple-700 dark:hover:text-purple-300 transition">
                  <Mail size={14} className="text-purple-500" /> {user.email}
                </a>
              )}
              {user?.phoneNumber && (
                <a href={`tel:${user.phoneNumber}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-700 dark:text-gray-300 hover:border-purple-300 hover:text-purple-700 dark:hover:text-purple-300 transition">
                  <Phone size={14} className="text-purple-500" /> {user.phoneNumber}
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Skills + Resume row ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
          >
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                <Briefcase size={16} className="text-purple-600 dark:text-purple-300" />
              </div>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((skill, i) => (
                  <span key={i}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 text-sm font-medium">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No skills added yet.</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
          >
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                <FileText size={16} className="text-blue-600 dark:text-blue-300" />
              </div>
              Resume
            </h2>
            {isResume ? (
              <a href={buildResumeUrl(user.profile.resume)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-500/20 transition">
                <FileText size={15} /> View {user.profile.resumeOriginalname}
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-sm text-gray-400 italic mb-3">No resume uploaded yet.</p>
                <button onClick={() => setOpen(true)}
                  className="text-xs text-purple-600 dark:text-purple-300 hover:underline">
                  Upload via Edit Profile →
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Applied Jobs ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
        >
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
              <Briefcase size={16} className="text-orange-600 dark:text-orange-300" />
            </div>
            Applied Jobs
            {allAppliedJobs?.length > 0 && (
              <span className="ml-auto px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 text-xs font-bold">
                {allAppliedJobs.length}
              </span>
            )}
          </h2>

          {allAppliedJobs?.length > 0 ? (
            <div className="space-y-3">
              {allAppliedJobs.map((item) => (
                <div key={item._id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-orange-400 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                    {item.job?.company?.name?.slice(0, 2).toUpperCase() || "JP"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{item.job?.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{item.job?.company?.name}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-400">{item.createdAt?.split("T")[0]}</span>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm italic">You haven't applied to any jobs yet.</p>
            </div>
          )}
        </motion.div>
      </div>

      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
