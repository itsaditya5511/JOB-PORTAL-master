import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  LogOut,
  User2,
  Sun,
  Moon,
  Menu,
  X,
  Upload
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

/* 🔧 Helper Component */
const MobileItem = ({ to, label }) => (
  <Link to={to} className="block py-2 text-gray-700">
    {label}
  </Link>
);

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 🔧 Missing states */
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const avatarColor = "bg-purple-600";

  const toggleTheme = () => setDarkMode(!darkMode);
  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);


  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("") : "U";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">

        {/* Logo */}
        <Link
          to="/Home"
          className="group flex items-center gap-2 text-2xl font-extrabold 
                     transition-all duration-500 transform 
                     hover:scale-110 hover:rotate-3 
                     active:scale-95
                     sm:text-xl md:text-2xl lg:text-3xl"
        >
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 
                       bg-clip-text text-transparent 
                       drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]
                       group-hover:drop-shadow-[0_0_25px_rgba(236,72,153,0.9)]
                       transition-all duration-500">
            Job
          </span>

          <span className="text-gray-900 drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]
                       group-hover:text-orange-500 transition-all duration-500">
            Portal
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Browse">Browse</Link></li>
                <li><Link to="/Jobs">Jobs</Link></li>
                <li><Link to="/Creator">About</Link></li>
              </>
            )}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 transition-transform hover:rotate-12"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

            {!user ? (
              <div className="hidden md:flex gap-2">
                <Link to="/login" className="text-purple-600 font-semibold">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-4 py-1 rounded-lg"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative group">

                {/* Avatar + Greeting */}
                <div className="flex items-center gap-2 cursor-pointer">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="profile"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-9 h-9 rounded-full text-white flex items-center justify-center font-bold ${avatarColor}`}
                    >
                      {getInitials(user.fullname)}
                    </div>
                  )}

                  <div className="hidden md:block">
                    <p className="text-xs text-gray-500">{getGreeting()},</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {user.fullname}
                    </p>
                  </div>
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <label className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <Upload size={16} /> Upload Photo
                    <input type="file" hidden onChange={handleImageUpload} />
                  </label>

                  {user?.role !== "Recruiter" && (
  <Link
    to="/Profile"
    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
  >
    <User2 size={16} /> View Profile
  </Link>
)}


                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">
          <MobileItem to="/Home" label="Home" />
          <MobileItem to="/Browse" label="Browse" />
          <MobileItem to="/Jobs" label="Jobs" />
          <MobileItem to="/Creator" label="About" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
