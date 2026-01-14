import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsOfService = () => {
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
            Terms of Service
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-400">
            Effective Date: {new Date().getFullYear()}
          </p>

          <Section title="1. Introduction">
            Welcome to our Job Portal. These Terms of Service govern your use of
            our platform, services, and website. By accessing or using our
            services, you agree to comply with these terms.
          </Section>

          <Section title="2. Acceptance of Terms">
            By using this platform, you confirm that you accept these Terms of
            Service and agree to follow them. If you do not agree, please do not
            use our services.
          </Section>

          <Section title="3. Changes to Terms">
            We may update these Terms at any time. Continued use of the platform
            after changes means you accept the updated Terms.
          </Section>

          <Section title="4. User Responsibilities">
            You agree to:
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Use the platform lawfully</li>
              <li>Provide accurate information</li>
              <li>Respect other users</li>
              <li>Not misuse or abuse the system</li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            All content, logos, trademarks, and materials on this platform are
            owned by the Job Portal. Unauthorized use is prohibited.
          </Section>

          <Section title="6. Limitation of Liability">
            We are not responsible for any direct or indirect damages resulting
            from your use of this platform.
          </Section>

          <Section title="7. Governing Law">
            These Terms are governed by the laws of your local jurisdiction. Any
            disputes will be handled in local courts.
          </Section>

          <Section title="8. Contact Information">
            For any questions regarding these Terms, contact us at:
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

export default TermsOfService;
