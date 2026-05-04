import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Briefcase, Plus, Search, Users, Clock } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { allAdminJobs } = useSelector((store) => store.job);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  const totalJobs = allAdminJobs?.length || 0;
  const recentJobs = allAdminJobs?.filter((j) => {
    return Date.now() - new Date(j.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
  }).length || 0;
  const totalPositions = allAdminJobs?.reduce((a, j) => a + (j.position || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Briefcase className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Listings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage and track all your posted roles
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3 flex-wrap">
              <div className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-center min-w-[80px]">
                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{totalJobs}</p>
                <p className="text-xs text-indigo-500 dark:text-indigo-400">Total Jobs</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-center min-w-[80px]">
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{recentJobs}</p>
                <p className="text-xs text-emerald-500 dark:text-emerald-400">This week</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 text-center min-w-[80px]">
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{totalPositions}</p>
                <p className="text-xs text-orange-500 dark:text-orange-400">Openings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white placeholder:text-gray-400"
            placeholder="Search by title or company…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          onClick={() => navigate("/admin/jobs/create")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-white text-sm font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
        >
          <Plus size={18} /> Post New Job
        </button>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
