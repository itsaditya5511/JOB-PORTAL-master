import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Header from "./Header";
import LatestJobs from "./LatestJobs";

import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

// Company images
import deloitte from "../../assets/deloitte.png";
import infosys from "../../assets/infosys.jpg";
import microsoft from "../../assets/microsoft.jpg";
import tcs from "../../assets/tcs.png";

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs.allJobs);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const companyImages = [deloitte, infosys, microsoft, tcs];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % companyImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + companyImages.length) % companyImages.length
    );
  };
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % companyImages.length);
  }, 3000); // change slide every 3 seconds

  return () => clearInterval(interval);
}, [companyImages.length]);


  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all">

      {/* Navbar */}
      <Navbar />

      {/* Hero Header */}
      <Header />

      {/* Company Image Carousel */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Companies Hiring Through Us
        </h2>

        <div className="relative w-full h-[100px] md:h-[600px] overflow-hidden rounded-xl shadow-lg">

          {companyImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="company"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 
            bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
          >
            ❮
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 
            bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
          >
            ❯
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-4">
          {companyImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full ${
                i === currentSlide ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 mt-24">

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Latest Job Openings
        </h2>

        {loading && (
          <div className="text-center py-16 text-purple-500 font-semibold animate-pulse">
            ⏳ Fetching the best jobs for you...
          </div>
        )}

        {error && (
          <div className="text-center py-16 text-red-500 font-semibold">
            ❌ Something went wrong. Please try again.
          </div>
        )}

        {!loading && !error && jobs?.length > 0 && (
          <div className="animate-fadeIn">
            <LatestJobs jobs={jobs} />
          </div>
        )}

        {!loading && !error && jobs?.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No job listings available right now.
          </div>
        )}
      </section>

      

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
