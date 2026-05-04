import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";
import { Building2, Plus, Search, TrendingUp } from "lucide-react";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { companies } = useSelector((store) => store.company);
  useGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  const totalCompanies = companies?.length || 0;
  const recent = companies?.filter((c) => {
    const d = new Date(c.createdAt);
    return Date.now() - d.getTime() < 30 * 24 * 60 * 60 * 1000;
  }).length || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Companies</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage all your registered companies
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <div className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-center min-w-[80px]">
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{totalCompanies}</p>
                <p className="text-xs text-purple-500 dark:text-purple-400">Total</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-center min-w-[80px]">
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{recent}</p>
                <p className="text-xs text-emerald-500 dark:text-emerald-400">This month</p>
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
            placeholder="Search companies…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          onClick={() => navigate("/admin/companies/create")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-white text-sm font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
        >
          <Plus size={18} /> Add Company
        </button>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
