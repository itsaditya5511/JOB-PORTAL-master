import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User2, Sun, Moon, Menu, X, Camera, Sparkles, Settings, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT, buildPhotoUrl } from "@/utils/data";

const NavLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      active
        ? "text-purple-600 dark:text-purple-300"
        : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300"
    }`}
  >
    {label}
    {active && (
      <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-purple-600 to-orange-500" />
    )}
  </Link>
);

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [darkMode, setDarkMode] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() : "U";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

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
        toast.success("Profile photo updated!", { description: "Your new photo is saved permanently." });
        setDropOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {}, { withCredentials: true });
      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch {
      toast.error("Error logging out. Please try again.");
    }
  };

  const isActive = (path) => location.pathname.toLowerCase() === path.toLowerCase();

  const recruiterLinks = [{ to: "/admin/companies", label: "Companies" }, { to: "/admin/jobs", label: "Jobs" }];
  const candidateLinks = [{ to: "/Home", label: "Home" }, { to: "/Browse", label: "Browse" }, { to: "/Jobs", label: "Jobs" }, { to: "/Creator", label: "About" }];
  const links = user?.role === "Recruiter" ? recruiterLinks : candidateLinks;

  const photoSrc = buildPhotoUrl(user?.profile?.profilePhoto);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all ${scrolled ? "bg-white/80 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200/70 dark:border-white/10 shadow-sm" : "bg-white/0 dark:bg-transparent border-b border-transparent"}`}>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <Link to="/Home" className="group flex items-center gap-2 text-2xl font-extrabold">
          <Sparkles className="text-purple-500 group-hover:rotate-12 transition-transform" size={24} />
          <span className="text-gradient">Job</span>
          <span className="text-gray-900 dark:text-white">Portal</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => <NavLink key={l.to} to={l.to} label={l.label} active={isActive(l.to)} />)}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setDarkMode((d) => !d)} aria-label="Toggle theme"
            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition">
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
          </button>

          <button onClick={() => setMobileOpen((o) => !o)} className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="px-3 py-1.5 rounded-md text-sm font-medium text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-white/5">Login</Link>
              <Link to="/register" className="px-4 py-1.5 rounded-md text-sm font-semibold btn-gradient">Get Started</Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar trigger */}
              <button
                onClick={() => setDropOpen((o) => !o)}
                className="flex items-center gap-2 p-1 pl-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition border border-transparent hover:border-gray-200 dark:hover:border-white/10"
              >
                {photoSrc ? (
                  <img src={photoSrc} alt="avatar" className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/40" />
                ) : (
                  <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold bg-gradient-to-br from-purple-600 to-orange-500 shadow text-sm">
                    {getInitials(user.fullname)}
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 leading-none">{getGreeting()}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">{user.fullname}</p>
                </div>
                <ChevronDown size={14} className={`text-gray-400 transition-transform hidden md:block ${dropOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {dropOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden animate-fadeIn z-50">
                  {/* Header */}
                  <div className="relative px-5 py-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                    <div className="relative flex items-center gap-3">
                      <div className="relative">
                        {photoSrc ? (
                          <img src={photoSrc} alt="avatar" className="w-14 h-14 rounded-2xl object-cover border-2 border-white/40 shadow" />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-white/20 text-white font-bold text-xl flex items-center justify-center border-2 border-white/30">
                            {getInitials(user.fullname)}
                          </div>
                        )}
                        {/* Camera overlay */}
                        <label className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-100 transition">
                          {uploading ? (
                            <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Camera size={13} className="text-purple-600" />
                          )}
                          <input type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handlePhotoUpload} />
                        </label>
                      </div>
                      <div>
                        <p className="font-bold text-white text-base leading-tight">{user.fullname}</p>
                        <p className="text-white/75 text-xs mt-0.5">{user.email}</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <p className="relative text-white/60 text-[10px] mt-2">Tap the camera icon to change your photo</p>
                  </div>

                  {/* Menu items */}
                  <div className="py-2">
                    {user?.role !== "Recruiter" && (
                      <Link to="/Profile" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition group">
                        <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-500/20 transition">
                          <User2 size={16} className="text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">View Profile</p>
                          <p className="text-xs text-gray-400">Skills, resume & applications</p>
                        </div>
                      </Link>
                    )}

                    <div className="h-px bg-gray-100 dark:bg-white/5 mx-4 my-1" />

                    <button onClick={() => { logoutHandler(); setDropOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 dark:hover:bg-red-500/10 transition group">
                      <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-500/20 transition">
                        <LogOut size={16} className="text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-600 dark:text-red-400">Sign Out</p>
                        <p className="text-xs text-gray-400">See you next time!</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-white/10 px-4 py-3 space-y-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              className="block py-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-300">
              {l.label}
            </Link>
          ))}
          {!user && (
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 rounded-md border border-purple-500 text-purple-600 dark:text-purple-300">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2 rounded-md btn-gradient text-sm font-semibold">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
