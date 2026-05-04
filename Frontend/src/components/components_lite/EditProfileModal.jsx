import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT, buildPhotoUrl } from "@/utils/data";
import {
  Loader2, User, Mail, Phone, AlignLeft, Code2,
  FileUp, Camera, X, Save,
} from "lucide-react";

const Field = ({ label, icon: Icon, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
      <Icon size={14} className="text-purple-500" /> {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: null,
  });
  const [resumeName, setResumeName] = useState("");

  useEffect(() => {
    if (user && open) {
      setInput({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        file: null,
      });
      setResumeName("");
    }
  }, [user, open]);

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setResumeName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    const skillsArray = input.skills.split(",").map((s) => s.trim()).filter(Boolean);
    formData.append("skills", JSON.stringify(skillsArray));
    if (input.file) formData.append("resume", input.file);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/upload-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile updated!", {
          description: "Your changes have been saved.",
        });
        setOpen(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const photoSrc = buildPhotoUrl(user?.profile?.profilePhoto);
  const initials = user?.fullname?.slice(0, 2).toUpperCase() || "U";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden dark:bg-gray-900 dark:border-white/10 rounded-3xl">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 px-6 pt-6 pb-10">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,white,transparent_50%)]" />
          <div className="relative flex items-center justify-between mb-5">
            <DialogHeader>
              <DialogTitle className="text-white text-xl font-bold">Edit Profile</DialogTitle>
            </DialogHeader>
          </div>

          {/* Avatar preview */}
          <div className="relative flex justify-center">
            {photoSrc ? (
              <img src={photoSrc} alt="avatar" className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30 shadow-xl" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-white/20 text-white font-bold text-3xl flex items-center justify-center border-4 border-white/20 shadow-xl">
                {initials}
              </div>
            )}
          </div>
          <p className="relative text-center text-white/70 text-xs mt-2">
            {user?.fullname}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pt-6 pb-6 -mt-6 relative">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-5 space-y-4 shadow-sm">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name" icon={User}>
                <input name="fullname" value={input.fullname} onChange={onChange}
                  placeholder="Jane Doe" className={inputCls} />
              </Field>
              <Field label="Phone" icon={Phone}>
                <input name="phoneNumber" value={input.phoneNumber} onChange={onChange}
                  placeholder="+91 9876543210" className={inputCls} />
              </Field>
            </div>

            <Field label="Email" icon={Mail}>
              <input type="email" name="email" value={input.email} onChange={onChange}
                placeholder="you@example.com" className={inputCls} />
            </Field>

            <Field label="Bio" icon={AlignLeft}>
              <textarea name="bio" value={input.bio} onChange={onChange}
                placeholder="Tell recruiters about yourself…"
                rows={3}
                className={`${inputCls} resize-none`} />
            </Field>

            <Field label="Skills (comma-separated)" icon={Code2}>
              <input name="skills" value={input.skills} onChange={onChange}
                placeholder="React, Node.js, MongoDB, Python"
                className={inputCls} />
            </Field>

            <Field label="Resume" icon={FileUp}>
              <label className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer transition-colors bg-gray-50 dark:bg-white/5">
                <FileUp size={18} className="text-purple-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {resumeName || user?.profile?.resumeOriginalname || "Choose PDF, DOC, or DOCX"}
                </span>
                <input type="file" accept=".pdf,.doc,.docx" hidden onChange={onFileChange} />
              </label>
            </Field>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-5">
            <button type="button" onClick={() => setOpen(false)}
              className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-white/20 transition">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-xl btn-gradient text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <><Loader2 className="animate-spin" size={16} /> Saving…</> : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
