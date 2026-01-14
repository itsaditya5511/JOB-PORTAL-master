import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm text-gray-700 border-b py-2">
    <span className="font-medium">{label}</span>
    <span>{value}</span>
  </div>
);

const Description = () => {
  const { id: jobId } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch job details.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!singleJob) return <div className="text-center py-20">No job found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md border p-6">

          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {singleJob.title}
              </h1>

              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-blue-100 text-blue-700">
                  {singleJob.position} Positions
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  {singleJob.salary} LPA
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  {singleJob.location}
                </Badge>
                <Badge className="bg-orange-100 text-orange-700">
                  {singleJob.jobType}
                </Badge>
              </div>
            </div>

            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`text-sm px-5 py-2 rounded-md ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {isApplied ? "Applied" : "Apply"}
            </Button>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mt-6 leading-relaxed">
            {singleJob.description}
          </p>

          {/* Details */}
          <div className="mt-6 space-y-2">
            <Detail label="Role" value={singleJob.position} />
            <Detail label="Location" value={singleJob.location} />
            <Detail label="Salary" value={`${singleJob.salary} LPA`} />
            <Detail label="Experience" value={`${singleJob.experienceLevel} Years`} />
            <Detail label="Applicants" value={singleJob.applications.length} />
            <Detail label="Job Type" value={singleJob.jobType} />
            <Detail label="Post Date" value={singleJob.createdAt.split("T")[0]} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Description;
