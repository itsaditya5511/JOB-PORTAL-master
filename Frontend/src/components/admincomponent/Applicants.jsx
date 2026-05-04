import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";
import { ArrowLeft, Users, Loader2 } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) dispatch(setAllApplicants(res.data.job));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  const count = applicants?.applications?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-7 flex items-center gap-5">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
            <Users className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Applicants
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {loading ? "Loading…" : `${count} candidate${count !== 1 ? "s" : ""} applied`}
            </p>
          </div>

          {/* Status legend */}
          <div className="ml-auto hidden md:flex items-center gap-3 text-xs font-medium">
            {[
              { label: "Pending", cls: "bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300" },
              { label: "Accepted", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" },
              { label: "Rejected", cls: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300" },
            ].map(({ label, cls }) => (
              <span key={label} className={`px-3 py-1.5 rounded-full ${cls}`}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin text-purple-500" size={32} />
          </div>
        ) : (
          <ApplicantsTable />
        )}
      </div>
    </div>
  );
};

export default Applicants;
