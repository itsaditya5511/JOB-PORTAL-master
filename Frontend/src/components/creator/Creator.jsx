import React from "react";
import Navbar from "../components_lite/Navbar";
import profilePic from "../../assets/professional.jpg"; // Your photo

const Creator = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={profilePic}
              alt="Aditya Shinde"
              className="w-60 h-80 object-cover rounded-2xl shadow-md border"
            />
          </div>

          {/* Profile Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Aditya Shinde
            </h1>

            <p className="text-purple-600 font-medium mt-1">
              Full Stack Web Developer | MCA Graduate
            </p>

            <p className="text-gray-700 mt-4 leading-relaxed">
              I am a passionate and dedicated Full Stack Web Developer with a
              Master of Computer Applications (MCA) degree. I have hands-on
              experience in building modern web applications using the MERN
              stack (MongoDB, Express, React, Node.js).
            </p>

            <p className="text-gray-700 mt-3 leading-relaxed">
              My key skills include React.js, Tailwind CSS, Node.js, Express,
              MongoDB, REST APIs, JWT authentication, and UI/UX design. I enjoy
              creating clean, responsive, and user-friendly interfaces.
            </p>

            <p className="text-gray-700 mt-3 leading-relaxed">
              My career goal is to work in a multinational company where I can
              grow as a developer, contribute to impactful projects, and build
              high-quality software solutions.
            </p>

            {/* Contact / Skills */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                React.js
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Node.js
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                MongoDB
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Express.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
