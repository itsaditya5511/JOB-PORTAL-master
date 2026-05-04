import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";
import { Building2, ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    if (!companyName.trim()) return toast.error("Company name is required");
    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(`"${companyName}" registered!`, {
          description: "Now set up your company profile — add a logo, description, and website.",
        });
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-2xl mx-auto px-6 py-6 flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/companies")}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">Back to Companies</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-white/10 p-10 shadow-sm">

          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center shadow-xl shadow-purple-500/25">
              <Building2 className="text-white" size={36} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Register a <span className="text-gradient">Company</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-sm mx-auto">
              Start by giving your company a name. You'll be able to add a logo, description, website, and location next.
            </p>
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
              <Sparkles size={14} className="text-purple-500" /> Company Name
            </label>
            <Input
              type="text"
              placeholder="e.g. Infosys, Google, Acme Corp"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
              className="h-12 text-base bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus-visible:ring-purple-500 dark:text-white placeholder:text-gray-400 rounded-xl"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500">
              You can always rename it later from the company settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/companies")}
              className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20 transition"
            >
              Cancel
            </button>
            <button
              onClick={registerNewCompany}
              disabled={loading || !companyName.trim()}
              className="flex-1 py-3 rounded-xl btn-gradient text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={16} /> Registering…</>
              ) : (
                <>Continue <ArrowRight size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
