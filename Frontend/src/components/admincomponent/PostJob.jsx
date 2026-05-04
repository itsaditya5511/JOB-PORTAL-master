import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Loader2, Briefcase, MapPin, DollarSign, Users,
  ClipboardList, ArrowLeft, Zap, Building2, Clock
} from "lucide-react";

const Field = ({ label, icon: Icon, children }) => (
  <div className="space-y-1.5">
    <Label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
      {Icon && <Icon size={14} className="text-purple-500" />} {label}
    </Label>
    {children}
  </div>
);

const PostJob = () => {
  const [input, setInput] = useState({
    title: "", description: "", requirements: "",
    salary: "", location: "", jobType: "",
    experience: "", position: 0, companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const onChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const selectCompany = (value) => {
    const co = companies.find((c) => c.name.toLowerCase() === value);
    if (co) setInput({ ...input, companyId: co._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) return toast.error("Please select a company first");
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Job posted successfully!", {
          description: `"${input.title}" is now live and accepting applicants.`,
        });
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Failed to post job");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-purple-500 dark:text-white placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/jobs")}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow">
            <Zap className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Post a New Job</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fill in the details to publish your role</p>
          </div>
        </div>
      </div>

      {companies.length === 0 && (
        <div className="max-w-4xl mx-auto mt-5 px-6">
          <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-300 rounded-xl px-4 py-3 text-sm">
            <Building2 size={18} className="shrink-0" />
            You need to <strong className="mx-1">register a company</strong> before posting jobs.
            <button onClick={() => navigate("/admin/companies/create")} className="ml-auto underline font-semibold">
              Add Company →
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={submitHandler} className="space-y-6">

          {/* Section: Basic Info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <Briefcase size={16} className="text-purple-500" /> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Job Title" icon={Briefcase}>
                <Input name="title" value={input.title} onChange={onChange}
                  placeholder="e.g. Senior Frontend Engineer" className={inputCls} />
              </Field>
              <Field label="Location" icon={MapPin}>
                <Input name="location" value={input.location} onChange={onChange}
                  placeholder="e.g. Mumbai / Remote" className={inputCls} />
              </Field>
              <Field label="Description" icon={ClipboardList}>
                <Input name="description" value={input.description} onChange={onChange}
                  placeholder="Describe the role and responsibilities" className={inputCls} />
              </Field>
              <Field label="Requirements" icon={ClipboardList}>
                <Input name="requirements" value={input.requirements} onChange={onChange}
                  placeholder="Comma-separated: React, Node.js, SQL" className={inputCls} />
              </Field>
            </div>
          </div>

          {/* Section: Details */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <DollarSign size={16} className="text-purple-500" /> Compensation & Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Salary (LPA)" icon={DollarSign}>
                <Input type="number" name="salary" value={input.salary} onChange={onChange}
                  placeholder="e.g. 12" className={inputCls} />
              </Field>
              <Field label="No. of Positions" icon={Users}>
                <Input type="number" name="position" value={input.position} onChange={onChange}
                  placeholder="e.g. 3" className={inputCls} />
              </Field>
              <Field label="Experience Required (years)" icon={Clock}>
                <Input type="number" name="experience" value={input.experience} onChange={onChange}
                  placeholder="e.g. 2" className={inputCls} />
              </Field>
              <Field label="Job Type" icon={Briefcase}>
                <Select onValueChange={(val) => setInput({ ...input, jobType: val })}>
                  <SelectTrigger className={inputCls}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["Full-time", "Part-time", "Remote", "Contract", "Internship"].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>

          {/* Section: Company */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
              <Building2 size={16} className="text-purple-500" /> Company
            </h2>
            {companies.length > 0 ? (
              <Field label="Select Company" icon={Building2}>
                <Select onValueChange={selectCompany}>
                  <SelectTrigger className={`w-full ${inputCls}`}>
                    <SelectValue placeholder="Choose your company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((c) => (
                        <SelectItem key={c._id} value={c.name.toLowerCase()}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No companies registered yet.{" "}
                <button type="button" onClick={() => navigate("/admin/companies/create")} className="text-purple-600 dark:text-purple-400 underline">
                  Add one first.
                </button>
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || companies.length === 0}
              className="px-8 py-2.5 rounded-xl btn-gradient text-sm font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={16} /> Publishing…</>
              ) : (
                <><Zap size={16} /> Publish Job</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
