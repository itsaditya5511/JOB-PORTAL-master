import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-6">
        <div
          className="max-w-5xl mx-auto bg-gray-50 dark:bg-gray-800 
          rounded-2xl shadow-xl p-8 md:p-12 space-y-10 animate-fadeIn"
        >
          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-extrabold 
            bg-gradient-to-r from-purple-600 to-orange-500 
            bg-clip-text text-transparent text-center"
          >
            Privacy Policy
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400">
            Effective Date: {new Date().getFullYear()}
          </p>

          <Section title="1. Introduction">
            This Privacy Policy explains how our Job Portal collects, uses, and
            protects your personal information when you use our services.
          </Section>

          <Section title="2. Information We Collect">
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email, phone number,
                resume/CV.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages
                visited, and time spent.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc ml-6 space-y-2">
              <li>To provide and improve our services</li>
              <li>To personalize your job search experience</li>
              <li>To communicate updates and notifications</li>
              <li>To ensure platform security and performance</li>
            </ul>
          </Section>

          <Section title="4. Data Security">
            We implement advanced security measures to protect your personal
            data, including encryption, secure servers, and access controls.
          </Section>

          <Section title="5. Sharing Your Information">
            We never sell your data. We only share information with trusted
            service providers or legal authorities when required.
          </Section>

          <Section title="6. Your Rights">
            <ul className="list-disc ml-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request corrections</li>
              <li>Request deletion</li>
            </ul>
          </Section>

          <Section title="7. Policy Updates">
            We may update this Privacy Policy periodically. All changes will be
            posted on this page.
          </Section>

          <Section title="8. Contact Us">
            For any questions regarding privacy, please contact us at:
            <span className="block mt-2 font-semibold text-purple-600">
              support@jobportal.com
            </span>
          </Section>
        </div>
      </div>

      <Footer />
    </>
  );
};

/* Reusable Section Component */
const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
      {title}
    </h2>
    <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
      {children}
    </div>
  </div>
);

export default PrivacyPolicy;
