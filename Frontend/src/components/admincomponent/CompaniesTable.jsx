import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, ExternalLink, Building2, Calendar, Globe, MapPin } from "lucide-react";
import { buildLogoUrl } from "@/utils/data";

const CompanyCard = ({ company, navigate }) => {
  const logo = buildLogoUrl(company.logo);
  const initials = company.name?.slice(0, 2).toUpperCase() || "CO";
  const date = company.createdAt
    ? new Date(company.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "—";

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 p-5 shadow-sm hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-500/5 hover:-translate-y-0.5 transition-all">
      {/* Edit button */}
      <button
        onClick={() => navigate(`/admin/companies/${company._id}`)}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-500/20"
      >
        <Edit2 size={14} />
      </button>

      {/* Logo + name */}
      <div className="flex items-center gap-4 mb-4">
        {logo ? (
          <img
            src={logo}
            alt={company.name}
            className="w-14 h-14 rounded-2xl object-cover border border-gray-100 dark:border-white/10 shadow"
          />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow">
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate capitalize">
            {company.name}
          </h3>
          {company.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
              {company.description}
            </p>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
          <Calendar size={11} /> {date}
        </span>
        {company.location && (
          <span className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2.5 py-1 rounded-full">
            <MapPin size={11} /> {company.location}
          </span>
        )}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full hover:underline"
          >
            <Globe size={11} /> Website
          </a>
        )}
      </div>

      {/* Edit CTA */}
      <button
        onClick={() => navigate(`/admin/companies/${company._id}`)}
        className="mt-4 w-full py-2 rounded-xl border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-gray-300 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors flex items-center justify-center gap-2"
      >
        <Edit2 size={14} /> Edit Company
      </button>
    </div>
  );
};

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const list = companies?.filter((c) =>
      !searchCompanyByText
        ? true
        : c.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    ) || [];
    setFiltered(list);
  }, [companies, searchCompanyByText]);

  if (!companies) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-44 rounded-2xl bg-gray-200 dark:bg-white/5" />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-5">
          <Building2 className="text-purple-500" size={36} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          No companies found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          {searchCompanyByText
            ? `No results for "${searchCompanyByText}". Try a different name.`
            : "Add your first company to start posting jobs."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {filtered.map((company) => (
        <CompanyCard key={company._id} company={company} navigate={navigate} />
      ))}
    </div>
  );
};

export default CompaniesTable;
