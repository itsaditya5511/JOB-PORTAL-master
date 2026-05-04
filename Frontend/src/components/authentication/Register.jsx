import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Lock,
  Phone,
  User as UserIcon,
  Briefcase,
  GraduationCap,
  Loader2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setLoading } from "@/redux/authSlice";

const AuthScene = lazy(() => import("../three/AuthScene"));

const RoleCard = ({ value, label, icon: Icon, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={`relative flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
      selected
        ? "border-purple-500 bg-purple-500/20 shadow-md shadow-purple-500/20"
        : "border-gray-500/60 bg-white/10 hover:border-purple-400/70 hover:bg-white/15"
    }`}
  >
    <Icon size={20} className={selected ? "text-purple-300" : "text-gray-200"} />
    <span className={`font-medium ${selected ? "text-white" : "text-gray-200"}`}>{label}</span>
    {selected && (
      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
    )}
  </button>
);

const passwordStrength = (pw) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.fullname || !input.email || !input.password || !input.phoneNumber || !input.role) {
      return toast.error("All fields are required");
    }
    if (input.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        timeout: 15000,
      });
      if (res.data.success) {
        toast.success("Account created successfully! Please sign in.", {
          description: "Welcome to JobPortal — your career journey starts here.",
          duration: 5000,
        });
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
        description: "Please check your details and try again.",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const strength = passwordStrength(input.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "bg-gray-700",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ][strength];

  return (
    <div className="min-h-screen w-full flex bg-[#0b0420] text-white overflow-hidden">
      {/* Left: 3D scene */}
      <div className="hidden lg:flex w-1/2 relative">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-[#1a0838] to-[#0b0420]" />}>
            <AuthScene accent="#f97316" secondary="#a855f7" />
          </Suspense>
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full pointer-events-none">
          <Link to="/" className="pointer-events-auto inline-flex items-center gap-2 text-2xl font-extrabold w-fit">
            <Sparkles className="text-orange-400" />
            <span className="text-gradient">Job</span>
            <span className="text-white">Portal</span>
          </Link>
          <div className="max-w-md">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Build a career that <span className="text-gradient">moves you forward</span>.
            </h2>
            <p className="text-gray-300/90 text-lg">
              Create your account and unlock personalized job matches, application tracking, and a profile recruiters can find.
            </p>
            <ul className="mt-6 space-y-2 text-gray-200/90">
              <li className="flex items-center gap-2"><CheckCircle2 className="text-purple-400" size={18}/> Free forever for candidates</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-purple-400" size={18}/> One-click apply</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="text-purple-400" size={18}/> Privacy-first — your data stays yours</li>
            </ul>
          </div>
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} JobPortal</div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center p-6 sm:p-10 bg-gradient-to-br from-[#0b0420] via-[#150634] to-[#0b0420]">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/25 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl animate-blob animation-delay-2000" />

        <form
          onSubmit={submitHandler}
          className="relative z-10 w-full max-w-md glass-strong rounded-3xl p-8 shadow-2xl animate-fadeInUp"
        >
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold">
              Create your <span className="text-gradient">account</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">It's free and takes less than a minute.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-gray-200">Full name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={onChange}
                  placeholder="Jane Doe"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-gray-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-gray-200">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={onChange}
                    placeholder="+91 9876543210"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-gray-200">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={onChange}
                  placeholder="At least 8 characters"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                />
              </div>
              {input.password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full transition-all ${strengthColor}`}
                      style={{ width: `${(strength / 4) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-12 text-right">{strengthLabel}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-200">I am a</Label>
              <div className="flex gap-3">
                <RoleCard
                  value="Student"
                  label="Student"
                  icon={GraduationCap}
                  selected={input.role === "Student"}
                  onSelect={(v) => setInput({ ...input, role: v })}
                />
                <RoleCard
                  value="Recruiter"
                  label="Recruiter"
                  icon={Briefcase}
                  selected={input.role === "Recruiter"}
                  onSelect={(v) => setInput({ ...input, role: v })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-7 py-3 rounded-xl btn-gradient font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Creating account…
              </>
            ) : (
              <>
                Create Account <ArrowRight size={18} />
              </>
            )}
          </button>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
