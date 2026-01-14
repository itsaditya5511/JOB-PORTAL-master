import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search, Briefcase, MapPin } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fadeIn">

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Find the Right{" "}
          <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            Job
          </span>{" "}
          That Fits Your Life
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Explore thousands of opportunities, connect with top companies,
          and build a career you’re proud of — all in one place.
        </p>

        {/* Search Bar */}
        <div
          className="mt-10 flex flex-col md:flex-row items-center 
          max-w-3xl mx-auto bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-700 
          rounded-full shadow-lg"
        >

          {/* Job Input */}
          <div className="flex items-center gap-2 px-4 py-3 w-full">
            <Briefcase className="text-purple-500" />
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent outline-none 
              text-gray-800 dark:text-white placeholder-gray-400"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-300 dark:bg-gray-700"></div>

          {/* Location Input */}
          <div className="hidden md:flex items-center gap-2 px-4 py-3">
            <MapPin className="text-purple-500" />
            <input
              type="text"
              placeholder="Location"
              className="w-36 bg-transparent outline-none 
              text-gray-800 dark:text-white placeholder-gray-400"
            />
          </div>

          {/* Search Button */}
          <Button
            onClick={searchjobHandler}
            className="px-6 py-2 m-2 
            rounded-full 
            bg-gradient-to-r from-purple-600 to-indigo-600 
            hover:from-purple-700 hover:to-indigo-700 
            text-white text-sm font-semibold 
            shadow-md hover:shadow-lg 
            transition-all duration-300 
            flex items-center gap-2 
            hover:scale-105 active:scale-95"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>

        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">

          <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition">
            💼 Verified Companies
          </div>

          <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition">
            ⚡ Fast & Easy Applications
          </div>

          <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md transition">
            📈 Career Growth Opportunities
          </div>

        </div>
      </div>
    </section>
  );
};

export default Header;
