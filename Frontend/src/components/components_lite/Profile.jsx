import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen, FileText, Briefcase } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const isResume = Boolean(user?.profile?.resume);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto my-10 px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 text-white text-3xl font-bold shadow-lg">
                {user?.fullname?.charAt(0)}
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.fullname}
                </h1>
                <p className="text-gray-600 max-w-md">
                  {user?.profile?.bio || "No bio added yet."}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 transition-all"
            >
              <Pen className="mr-2" size={18} /> Edit Profile
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <InfoCard
              icon={<Mail />}
              label="Email"
              value={user?.email}
              link={`mailto:${user?.email}`}
            />
            <InfoCard
              icon={<Contact />}
              label="Phone"
              value={user?.phoneNumber}
              link={`tel:${user?.phoneNumber}`}
            />
          </div>

          {/* Skills */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase size={20} /> Skills
            </h2>

            <div className="flex flex-wrap gap-2 mt-3">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-purple-100 text-purple-700 border border-purple-200"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-400">No skills added</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText size={20} /> Resume
            </h2>

            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`http://localhost:5011${user.profile.resume}`}
                className="inline-flex items-center gap-2 mt-2 text-blue-600 hover:underline font-medium"
              >
                View {user.profile.resumeOriginalname}
              </a>
            ) : (
              <p className="text-gray-400 mt-2">No resume uploaded</p>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-xl font-bold mb-4">Applied Jobs</h1>
          <AppliedJob />
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

const InfoCard = ({ icon, label, value, link }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow transition">
    <div className="text-purple-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <a href={link} className="font-medium text-gray-800 hover:underline">
        {value}
      </a>
    </div>
  </div>
);

export default Profile;
